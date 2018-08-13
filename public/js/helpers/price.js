/**
 * @file price.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

const crypto = require('cryptocompare');
global.fetch = require('node-fetch');

/**
* Returns ETH, BTC and GBP price against $USD.
* @function
*
* @returns {String} Prices.
*/

getPrice = function() {
  crypto.priceMulti(['ETH', 'BTC', 'GBP'], ['USD']).then(price => {
    console.log('ETH: ', price.ETH.USD.toFixed(4));
    console.log('BTC: ', price.BTC.USD.toFixed(4));
    console.log('GBP: ', price.GBP.USD.toFixed(4));
  }).catch(console.error);
};

/* To run: $ node public/js/helpers/price.js */

getPrice();