/**
 * @file method.js
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
const pKey = Buffer.from('127f1cb84914fcfc258a220bbf1fa6c7d77553157eadc6980cfddadc42bc7499', 'hex');
const payer = contract.owner; 

/**
* Pause contract.
* @method pause
* @returns {None}
*/
pause = function() {
  console.log('Inside pause())');
  const func = contract.crowdsale.methods.pause();
  const funcABI = func.encodeABI();

  func.estimateGas({ from: payer }).then((gasAmount) => {
    console.log('Estimated gas: ', gasAmount, 'Wei');

    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
        const txParams = {
            nonce:      contract.web3.utils.toHex(txCount),
            gasLimit:   contract.web3.utils.toHex(420000),
            gasPrice:   contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
            to:         contract.address,
            data:       funcABI,
            from:       payer,
        };

        const tx = new Tx(txParams);
        tx.sign(pKey);

        const serializedTx = tx.serialize();

        contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
            console.log('Transaction receipt: ', receipt);
            showAlert('Transaction processed successfully...\nCONTRACT PAUSED.');
      });
    });
  });
};

/**
* Unpause contract.
* @method unpause
* @returns {None}
*/
unpause = function() {
    console.log('Inside unpause())');
    const func = contract.crowdsale.methods.unpause();
    const funcABI = func.encodeABI();
  
    func.estimateGas({ from: payer }).then((gasAmount) => {
        console.log('Estimated gas: ', gasAmount, 'Wei');
    
    contract.web3.eth.getTransactionCount(payer, (err, txCount) => {
        const txParams = {
            nonce:      contract.web3.utils.toHex(txCount),
            gasLimit:   contract.web3.utils.toHex(420000),
            gasPrice:   contract.web3.utils.toHex(contract.web3.utils.toWei('10', 'gwei')),
            to:         contract.address,
            data:       funcABI,
            from:       payer,
        };
  
        const tx = new Tx(txParams);
        tx.sign(pKey);
  
        const serializedTx = tx.serialize();
  
        contract.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
            console.log('Transaction receipt: ', receipt);
            showAlert('Transaction processed successfully...\nCONTRACT UNPAUSED.');
        });
      });
    });
  };



