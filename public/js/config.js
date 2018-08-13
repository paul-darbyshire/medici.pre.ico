/**
 * @file config.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

 // Sets the relevant configuration parameters to wotk with the
 // smart contract deployed on the Ethereum blockchain.
require('dotenv').config();

module.exports = {
    'contract' : '0xc56b1022a6e9d645c3a3e6a0169bac761c93a0f1',
    'network' : 'https://ropsten.infura.io/'+process.env.INFURA_API_KEY
};