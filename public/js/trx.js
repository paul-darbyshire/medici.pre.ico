
/**
 * @file trx.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

const crypto = require('cryptocompare');
global.fetch = require('node-fetch');
const contract = require('./contract.js');

/**
* Get ETH price.
* @method getETHPrice
* @returns {String}.
*/
getETHPrice = function () {
    console.log('inside getETHPrice()');
    const ETHPrice = document.getElementById('ETHPrice').value;
    console.log('ETHPrice: ', ETHPrice);
    return ETHPrice;
};

/**
* Get rate with bonus.
* @method getRateWithBonus
* @returns {String}.
*/
getRateWithBonus = function () {
    console.log('inside getRateWithBonus()');
    const rateWithBonus = document.getElementById('tokensPerETHWithBonus').value;
    console.log('rateWithBonus: ', rateWithBonus);
    return rateWithBonus;
};

/**
* Get transaction details.
* @method getTransactionDetails
* @param {String} hash - Hash address.
* @returns {Array}.
*/
getTransactionDetails = function(hash, callback) {
    console.log('inside getTransactionDetails()');
    
    var dets = [];
    contract.web3.eth.getTransaction(hash, function(err, trx) {                              
        dets.push(trx.hash);
        dets.push(trx.nonce);
        dets.push(trx.blockHash);
        dets.push(trx.blockNumber);
        dets.push(trx.transactionIndex);
        dets.push(trx.input);
        dets.push(trx.from); // buyer
        dets.push(trx.to); // contract address
        dets.push((trx.value / 1e18).toFixed(4)); // amount (ETH)
        dets.push(trx.gasPrice);
        dets.push(trx.gas);
        contract.web3.eth.getTransactionReceipt(trx.hash, function(err, rcp) {  
            console.log('Trx receipt: ', rcp); 
            dets.push(rcp.cumulativeGasUsed);
            dets.push(rcp.gasUsed);
            dets.push(rcp.status); // success/failure
            dets.push(rcp.logs[0].id); // log
            dets.push(rcp.logs[0].topics[0]); // signature
            dets.push(rcp.logs[0].topics.length); // signators
        });
        contract.web3.eth.getBlock(trx.blockNumber, function(err, blk) {   
            dets.push(blk.timestamp);
            dets.push(new Date(blk.timestamp * 1000).toGMTString());
        });
        crypto.priceMulti(['ETH', 'BTC', 'GBP'], ['USD']).then(price => {
            // Rates & bonus
            var ETHPrice = price.ETH.USD.toFixed(4);
            dets.push(ETHPrice); // ETH price (/$USD)
            var MDIPriceUSD = 0.15; // $USD 0.15
            dets.push(MDIPriceUSD); 
            contract.crowdsale.methods.bonus().call((err, res) => { 
                if (!err) {
                    dets.push(res); 
                    var tokensPerETHWithBonus = ((ETHPrice / MDIPriceUSD) * (1 + (res / 100)));
                    dets.push(tokensPerETHWithBonus); // Not distributed yet, for record
                    dets.push(tokensPerETHWithBonus * (trx.value / 1e18)); // Not distributed yet, for record
                } else {
                    console.log(err);
                }
            });
        });
        return callback(dets);
    });
};

/**
* Get transaction details.
* @method getPastEvents
* @returns {Object}.
*/
contract.crowdsale.getPastEvents('ETHTransfer', {
    filter: { address: contract.crowdsale.address }, 
    fromBlock: 0,
    toBlock: 'latest'
    }, function(err, res){ 
        console.log(res);
        console.log('Length: ', res.length); 
        const l = res.length;
        getTransactionDetails(res[l - 1].transactionHash, function (arr) {
            console.log('tdets: ', arr);
        });
    }).then(function(res){ 
        /* console.log(res);*/ 
});