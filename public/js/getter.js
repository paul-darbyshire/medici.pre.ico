/**
 * @file getter.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

require('./utils.js');
const contract = require('./contract.js');

//contract.web3.eth.getBlock('latest', function (e, res) {
//    console.log('latest', count++, res.number, res.timestamp);
//    //writeValue('lblock', 'Block: '+ res.number);
//});

getParam = function(n) {
console.log('Inside getParam()', n);
switch (n) {
    case 0:
        contract.crowdsale.methods.openingTime().call((err, res) => { 
            if (!err) {
                showAlert('Pre-ICO Opening Time = '+res+'s [Epoch]');
            } else {
                console.log(err);
            }
        });
        break;
    case 1:
        contract.crowdsale.methods.closingTime().call((err, res) => { 
            if (!err) {
                showAlert('Pre-ICO Closing Time = '+res+'s [Epoch]');
            } else {
                console.log(err);
            }
        });
        break;
    case 2:
        contract.crowdsale.methods.openingTime().call((err, res) => { 
            if (!err) {
                dat = new Date(res * 1000).toGMTString();
                showAlert('Pre-ICO Opening Date = '+dat);
            } else {
                console.log(err);
            }
        });
        break;
    case 3:
        contract.crowdsale.methods.closingTime().call((err, res) => { 
            if (!err) {
                dat = new Date(res * 1000).toGMTString();
                showAlert('Pre-ICO Closing Date = '+dat);
            } else {
                console.log(err);
            }
        });
        break;
    case 4:
        contract.crowdsale.methods.bonus().call((err, res) => { 
            if (!err) {
                console.log('Pre-ICO Bonus = ', res, '%');
                showAlert('Pre-ICO bonus = '+res+'%');
            } else {
                console.log(err);
            }
        });
        break;
    case 5:
        contract.crowdsale.methods.cap().call((err, res) => { 
            if (!err) {
                console.log('Pre-ICO softcap =', res / 1e18, 'ETH');
                showAlert('Pre-ICO softcap = '+res / 1e18+' ETH');
            } else {
                console.log(err);
            }
        });
        break;
    case 6:
        contract.crowdsale.methods.ethMin().call((err, res) => { 
            if (!err) {
                console.log('Pre-ICO ETH Minimum =', res / 1e18, 'ETH');
                showAlert('Pre-ICO ETH Minimum = '+res / 1e18+' ETH');
            } else {
                console.log(err);
            }
        });
        break;
    case 7:
        contract.crowdsale.methods.owner().call((err, res) => { 
            if (!err) {
                console.log('Owner address: ', res);
                showAlert('Owner address: \n'+res);
            } else {
                console.log(err);
            }
        });
        break;
      }
  };

getETHRaised = function() {
    console.log('Inside getETHRaised()');
   
    contract.crowdsale.methods.ETHRaised().call((err, res) => { 
        if(!err){
            console.log('ETH Raised: ', res / 1e18, 'ETH');
            showAlert('ETH raised: '+(res / 1e18).toFixed(2)+' ETH.');
        } else{
            console.log(err);
            showAlert(err);
        }
    });
};
  
getBalance = function() {
    console.log('Inside getBalance()');
    const address = document.getElementById('address').value;
    console.log('Address', address);

    if (address == "") showAlert('From: address empty? Please try again.');
    //else if (isAddress(address) == false) showAlert('Ethereum address not recognised?. Please try again.');
    contract.web3.eth.getBalance(address, (err, res) => { 
        if(!err){
            console.log('Wallet balance: ', res / 1e18, 'ETH');
            showAlert('Wallet address: '+address+'\nWallet balance: '+(res / 1e18).toFixed(2)+' ETH.');
        } else{
            console.log(err);
            showAlert(err);
        }
    });
};

// Transaction details from Etherscan.io
getDetailsTrxHash = function() {
    const trxHash = document.getElementById('trxHash').value;
    console.log('TrxHash: ', trxHash);
    if (trxHash == "") showAlert('Transaction hash empty? Please try again.');
    window.location.href = "https://ropsten.etherscan.io/tx/"+trxHash;
};

getDetailsBlckNum = function() {
    const blckNum = document.getElementById('blckNum').value;
    console.log('Block number: ', blckNum);
    if (blckNum == "") showAlert('Block number empty? Please try again.');
    window.location.href = "https://ropsten.etherscan.io/block/"+blckNum;
};

