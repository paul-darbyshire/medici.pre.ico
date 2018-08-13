/**
* @file TestMedici.js
* @author Paul Darbyshire <paul@lancorscientific.com>
* @copyright Lancor Scientific Ltd. (c) 2018.
* @version 1.0.1
*/

const pify = require('pify');
const ethAsync = pify(web3.eth);
const ethGetBalance = ethAsync.getBalance;
const ethSendTransaction = ethAsync.sendTransaction;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

/**
* Convert number to Ether.
* @method ether
* @param {String} n - Number to convert to Ether
* @returns {web3.Bignumber} Ether amount
*/
ether = function(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
};

/**
* Duration in time.
* @method duration.
* @returns {int} Duaration period
*/
const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); }
};

/**
* Adavnce block.
* @method advanceBlock.
* @returns {None}
*/
advanceBlock = function () {
  return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
          }, (err, res) => {
          return err ? reject(err) : resolve(res);
      });
  });
};

const Medici = artifacts.require('Medici');

contract('Medici', function ([owner, wallet, buyer, anyone]) {
  let medici;
  let creator;
  let beneficiary;
  let openingTime;
  let closingTime;
  let cap;
  let bonus;
  let ethMin;

  const lessThanMin = ether(0.5);
  const amount = ether(1.5);

  before(async function () {
    await advanceBlock()
  
    medici = await Medici.deployed();

    creator = await medici.owner();
    beneficiary = await medici.wallet();

    openingTime = await medici.openingTime();
    closingTime = await medici.closingTime();
    afterClosingTime = closingTime + duration.seconds(1);

    cap = await medici.cap();
    bonus = await medici.bonus();
    ethMIn = await medici.ethMin();
  });

  describe('Successful deployment', function () {
    it('should deploy successfully', async function () {
      medici.should.exist
    });

    it('should be correct owner address', async function () {
      creator.should.be.equal(owner);
    })

    it('should be correct beneficiary address', async function () {
      beneficiary.should.be.equal(wallet);
    })
  });

  describe('Intialising values', function () {
    it('should fail with zero cap', async function () {
      await Medici.new(openingTime, closingTime, wallet, 0, bonus, ethMIn).should.not.be.fulfilled;
    });

    it('should fail with zero bonus', async function () {
      await Medici.new(openingTime, closingTime, wallet, cap, 0, ethMIn).should.not.be.fulfilled;
    });

    it('should fail with zero min. ETH accepted', async function () {
      await Medici.new(openingTime, closingTime, wallet, cap, bonus, 0).should.not.be.fulfilled;
    });
  });

  describe('Checking balances', function () {
    it('should have zero contract balance', async function () {
      const balance = await ethGetBalance(medici.address);
      assert.isTrue(balance.equals(ether(0)));
    });

    it('should be able to send an amount of ETH to contract', async function () {
      const pre = await ethGetBalance(wallet);
      await ethSendTransaction({ from: buyer, to: medici.address, value: amount, gas: 1000000 });
      const post = await ethGetBalance(wallet);
      assert.isTrue(pre.plus(amount).equals(post));
    });

    it('should set amount of ETH raised correctly', async function () {
      const ethRaised = await medici.ETHRaised();
      assert.isTrue(ethRaised.equals(amount));
    });
  });

  describe('Pausing contract', function () {
    it('should pause contract and not allow sending ETH', async function () {
      await medici.pause();
      await ethSendTransaction({ from: buyer, to: medici.address, value: amount, gas: 1000000 }).should.not.be.fulfilled;
    });

    it('should know contract is in pause state', async function () {
      const paused = await medici.paused();
      expect(paused).to.be.true;
    });

    it('should unpause contract and allow sending ETH', async function () {
      await medici.unpause();
      await ethSendTransaction({ from: buyer, to: medici.address, value: amount, gas: 1000000 }).should.be.fulfilled;
    });

    it('should know contract is in normal state', async function () {
      const paused = await medici.paused();
      expect(paused).to.be.false;
    });
  });

  describe('Checking minimum ETH purchase', function () {
    it('should not accept payments below minumum ETH amount', async function () {
      const pre = await ethGetBalance(wallet);
      await ethSendTransaction({ from: buyer, to: medici.address, value: lessThanMin, gas: 1000000 }).should.not.be.fulfilled;
      const post = await ethGetBalance(wallet);
      assert.isTrue(pre.equals(post));
    });
  });

  describe('Checking cap reached', function () {
    it('should not accept payments if cap reached', async function () {
      await ethSendTransaction({ from: buyer, to: medici.address, value: cap, gas: 1000000 }).should.be.fulfilled;
      await ethSendTransaction({ from: buyer, to: medici.address, value: amount, gas: 1000000 }).should.not.be.fulfilled;
    });
  });

  describe('Checking has closed', function () {
    it('should not have closed yet', async function () {
      const finished = await medici.hasClosed();
      expect(finished).to.be.false;
    });
  });

  describe('Contract ownership', function () {
    it('should have an owner', async function () {
      (await medici.owner()).should.eq(owner);
    });

    it('changes owner after transfer', async function () {
      await medici.transferOwnership(anyone, { from: owner });
      (await medici.owner()).should.eq(anyone);
    });

    it('changes owner back to original', async function () {
      await medici.transferOwnership(owner, { from: anyone });
      (await medici.owner()).should.eq(owner);
    });

    it('should prevent non-owners from transfering', async function () {
      await medici.transferOwnership(anyone, { from: anyone }).should.not.be.fulfilled;
    });

    it('should guard ownership against stuck state', async function () {
      await medici.transferOwnership(null, { from: owner }).should.not.be.fulfilled;
    });

    it('should prevent non-owners from renouncement', async function () {
      await medici.renounceOwnership({ from: anyone }).should.not.be.fulfilled;
    });

    it('loses owner after renouncement', async function () {
      await medici.renounceOwnership({ from: owner });
      (await medici.owner()).should.eq(ZERO_ADDRESS);
    });    
  });

  describe('Checking set methods', function () {
    it('should not reset cap if same value as before', async function () {
      await medici.setCap(cap).should.not.be.fulfilled;
    });

    it('should not reset bonus if same value as before', async function () {
      await medici.setBonus(bonus).should.not.be.fulfilled;
    });

    it('should not reset minimum ETH amount if same value as before', async function () {
      await medici.setETHMin(ethMin).should.not.be.fulfilled;
    });
  });
});