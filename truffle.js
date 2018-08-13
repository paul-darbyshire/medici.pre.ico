/**
* @file truffle.js
* @author Paul Darbyshire <paul@lancorscientific.com>
* @copyright Lancor Scientific Ltd. (c) 2018.
* @version 1.0.1
*/

require('babel-register');
require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");

let options  = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      gas: 6500000,
      network_id: '5777'
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://ropsten.infura.io/${process.env.INFURA_API_KEY}');
      },
      gas: 4712388, // $ truffle migrate --network ropsten
      network_id: 3
    },
    ganachecli: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // $ truffle migrate --network ganache-cli [run 'ganache-cli in seperate terminal]'
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      gas: 6500000,
      network_id: '5777'
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: '127.0.0.1',
    port: 7545
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

module.exports = options;
