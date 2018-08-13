/**
* @file 2_deploy_contract.js
* @author Paul Darbyshire <paul@lancorscientific.com>
* @copyright Lancor Scientific Ltd. (c) 2018.
* @version 1.0.1
*/

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

var Medici = artifacts.require('Medici');

module.exports = function(deployer) {

    const openingTime = Math.floor(Date.now() / 1000) + duration.seconds(60);
    const closingTime = openingTime + duration.weeks(4);

    const wallet = web3.eth.accounts[1];
    const cap = ether(20);      /// e.g., 20 ETH
    const bonus = 40;           /// e.g., 40%
    const ethMin = ether(1.5);  /// e.g., 1.75 ETH
    
    deployer.deploy(Medici, 
        openingTime, 
        closingTime, 
        wallet, 
        cap, 
        bonus, 
        ethMin
    ); 
};