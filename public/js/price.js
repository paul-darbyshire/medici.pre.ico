/**
 * @file price.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

const crypto = require('cryptocompare');
global.fetch = require('node-fetch');

const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;

/**
* Get cryptocurrency prices.
* @method getPrice
* @returns {None}.
*/
getPrice = function() {
  crypto.priceMulti(['ETH', 'BTC', 'GBP'], ['USD']).then(price => {
    //console.log('ETH: ', price.ETH.USD.toFixed(4));
    //console.log('BTC: ', price.BTC.USD.toFixed(4));
    //console.log('GBP: ', price.GBP.USD.toFixed(4));
    writeValue('ETH', 'ETH: '+price.ETH.USD.toFixed(2));
    writeValue('BTC', 'BTC: '+price.BTC.USD.toFixed(2));
    writeValue('GBP', 'GBP: '+price.GBP.USD.toFixed(2));
    writeValue('ETHPrice', '1 ETH = $USD '+price.ETH.USD.toFixed(2));
  }).catch(console.error);
};

getPrice();