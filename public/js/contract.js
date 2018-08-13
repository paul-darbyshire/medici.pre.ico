/**
 * @file contract.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

 // Sets up the relevant Ethereum network connection
 // and injects the web3 interface into the website
 // so that we can interact with the smart contract
 // on the Ethereum blockchain.
const Web3 = require('web3');
const config = require('./config.js');

const web3 = new Web3(config.network);

const address = config.contract;

const crowdsaleJSON = require('../../build/contracts/Medici.json');
const crowdsaleABI = crowdsaleJSON.abi;
const crowdsale = new web3.eth.Contract(crowdsaleABI, address);

module.exports = {
    'web3':      web3,
    'crowdsale': crowdsale,
    'address':   address,
    'owner':     '0xDf41a70A1A72eCaEF6AAf421f36d253eC7fC879A'
};

