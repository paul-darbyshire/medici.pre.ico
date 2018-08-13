/**
 * @file setter.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

var Tx = require('ethereumjs-tx');
require('./utils.js');
const contract = require('./contract.js');

// THIS NEEDS TO BE SECURED
// require('dotenv').config();
// e.g., const pkey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
const pkey = Buffer.from('127f1cb84914fcfc258a220bbf1fa6c7d77553157eadc6980cfddadc42bc7499', 'hex');
const payer = contract.owner; 
console.log('owner: ', contract.owner);
console.log('payer: ', payer);
console.log('addr.: ', contract.address);

/**
* Set owner address.
* @method setOwner
* @returns {None}.
*/
setOwner = function() {
  console.log('Inside setOwner()');
  var newOwner = document.getElementById('newOwner').value;
  check(newOwner);
  console.log('New owner address:', newOwner);
  const func = contract.crowdsale.methods.transferOwnership(newOwner);
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
        const txParams = {
          nonce:    contract.web3.utils.toHex(txCount),
          gasLimit: contract.web3.utils.toHex(420000),
          gasPrice: contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
          to:       contract.address,
          data:     funcABI,
          from:     payer,
      };

      const tx = new Tx(txParams);
      tx.sign(pkey);

      const serializedTx = tx.serialize();

      contract.crowdsale.methods.owner().call().then(val => console.log('Owner address before: ' + val));

      contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
        contract.crowdsale.methods.owner().call().then(val => console.log('Owner address after: ' + val));
        showAlert('Transaction processed successfully...\nOWNER ADDRESS UPDATED.');
      });
    });
  });
};

/**
* Set closing time.
* @method setClosingTime
* @returns {None}
*/
setClosingTime = function() {
  console.log('Inside setClosingTime()');
  var newClosingTime = document.getElementById("newClosingTime").value;
  check(newClosingTime);
  console.log('New Pre-ICO closing time:', newClosingTime);
  const func = contract.crowdsale.methods.setClosingTime(newClosingTime);
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
      const txParams = {
        nonce:    contract.web3.utils.toHex(txCount),
        gasLimit: contract.web3.utils.toHex(420000),
        gasPrice: contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
        to:       contract.address,
        data:     funcABI,
        from:     payer,
      };

      const tx = new Tx(txParams);
      tx.sign(pkey);

      const serializedTx = tx.serialize();

      contract.crowdsale.methods.closingTime().call().then(val => console.log("Pre-ICO closing time before: " + val));

      contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
        contract.crowdsale.methods.closingTime().call().then(val => console.log("Pre-ICO closing time after: " + val));
        showAlert('Transaction processed successfully...\nPre-ICO CLOSING TIME UPDATED.');
      });
    });
  });
};

/**
* Set bonus (%).
* @method setBonus
* @returns {None}.
*/
setBonus = function() {
  console.log('Inside setBonus()');
  var newBonus = document.getElementById("newBonus").value;
  check(newBonus);
  console.log('New Pre-ICO bonus: ', newBonus, '%');
  const func = contract.crowdsale.methods.setBonus(newBonus);
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
      const txParams = {
        nonce:    contract.web3.utils.toHex(txCount),
        gasLimit: contract.web3.utils.toHex(420000),
        gasPrice: contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
        to:       contract.address,
        data:     funcABI,
        from:     payer,
      };

      const tx = new Tx(txParams);
      tx.sign(pkey);

      const serializedTx = tx.serialize();

      contract.crowdsale.methods.bonus().call().then(val => console.log("Pre-ICO bonus before: " + val +'%'));

      contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
        contract.crowdsale.methods.bonus().call().then(val => console.log("Pre-ICO bonus after: " + val +'%'));
        showAlert('Transaction processed successfully...\nPre-ICO BONUS UPDATED.');
      });
    });
  });
};

/**
* Set cap amount.
* @method setCap
* @returns {None}.
*/
setCap = function() {
  console.log('Inside setCap()');
  var newCap = document.getElementById("newCap").value;
  check(newCap);
  console.log('New Pre-ICO softcap:', newCap, 'ETH');
  const func = contract.crowdsale.methods.setCap(newCap * 1e18);
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
      const txParams = {
        nonce:    contract.web3.utils.toHex(txCount),
        gasLimit: contract.web3.utils.toHex(420000),
        gasPrice: contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
        to:       contract.address,
        data:     funcABI,
        from:     payer,
      };

      const tx = new Tx(txParams);
      tx.sign(pkey);

      const serializedTx = tx.serialize();

      contract.crowdsale.methods.cap().call().then(val => console.log("Pre-ICO softcap before: " + val / 1e18+ ' ETH'));

      contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
        contract.crowdsale.methods.cap().call().then(val => console.log("Pre-ICO softcap after: " + val / 1e18+ ' ETH'));
        showAlert('Transaction processed successfully...\nPre-ICO SOFTCAP UPDATED.');
      });
    });
  });
};

/**
* Set minimum ETH accepted.
* @method setETHMin
* @returns {None}.
*/
setETHMin = function() {
  console.log('Inside setETHMin()');
  var newETHMin = document.getElementById("newETHMin").value;
  check(newETHMin);
  console.log('New Pre-ICO ETH min.: ', newETHMin, 'ETH');
  const func = contract.crowdsale.methods.setETHMin(newETHMin * 1e18);
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
      const txParams = {
        nonce:    contract.web3.utils.toHex(txCount),
        gasLimit: contract.web3.utils.toHex(420000),
        gasPrice: contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
        to:       contract.address,
        data:     funcABI,
        from:     payer,
      };

      const tx = new Tx(txParams);
      tx.sign(pkey);

      const serializedTx = tx.serialize();

      contract.crowdsale.methods.ethMin().call().then(val => console.log("Pre-ICO ETH min. before: " + val / 1e18+' ETH'));

      contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
        contract.crowdsale.methods.ethMin().call().then(val => console.log("Pre-ICO ETH min. after: " + val / 1e18+' ETH'));
        showAlert('Transaction processed successfully...\nPre-ICO MINIMUM ETH ACCEPTED UPDATED.');
      });
    });
  });
};