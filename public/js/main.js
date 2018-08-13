// $ browserify public/js/app.js -o public/js/bundle.js
/**
 * @file app.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

 // Main app entry point.
require('web3');
const config = require('./config.js');
const crypto = require('cryptocompare');
global.fetch = require('node-fetch');
require('./include.js');

const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;

// Ethereum client & test network
const target = 'Ropsten Test Network';
writeValue('platform', 'Client: '+ target);
writeValue('network', 'Network: '+ config.network.substring(0, config.network.length - 10));

// Contract address
writeValue('contractAddress', config.contract);

// Rates & bonus
crypto.priceMulti(['ETH', 'BTC', 'GBP'], ['USD']).then(price => {
  var MDIPriceUSD = 0.15; // $USD 0.15
  var minPurchaseUSD = 500; 
  var ETHPrice = price.ETH.USD.toFixed(4);
  var minPurchaseETH = minPurchaseUSD / ETHPrice;
  MDIPriceETH = 1 / (price.ETH.USD / MDIPriceUSD);
  const bonus = 20.0; 
  var tokensPerETHWithBonus = ((ETHPrice / MDIPriceUSD) * (1 + (bonus / 100)));
  writeValue('tokensPerETHWithBonus', '1 ETH = '+tokensPerETHWithBonus.toLocaleString('en', { useGrouping: true })+' MDI');
    
  // Soft cap $5,000,000 ($5m)
  var softCapUSD = 5.0 * 1e6;
  var softCapETH = (softCapUSD / ETHPrice);
  writeValue('ETHPrice', '1 ETH = $USD '+ETHPrice.toLocaleString('en', { useGrouping: true }));
  writeValue('MDIPriceUSD', '1 MDI = $USD '+MDIPriceUSD);
  writeValue('MDIPriceETH', '1 MDI = '+MDIPriceETH.toFixed(6)+' ETH');
  writeValue('minPurchaseUSD', '$USD '+minPurchaseUSD.toLocaleString('en', { useGrouping: true }));
  writeValue('minPurchaseETH', minPurchaseETH.toLocaleString('en', { useGrouping: true })+' ETH');
  writeValue('softCapUSD', '$USD '+softCapUSD.toLocaleString('en', { useGrouping: true }));
  writeValue('softCapETH', softCapETH.toLocaleString('en', { useGrouping: true })+' ETH');
}).catch(console.error);