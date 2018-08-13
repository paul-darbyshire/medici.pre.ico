/**
 * @file detail.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

const contract = require('./contract.js');

const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;

contract.crowdsale.methods.openingTime().call((err, res) => { 
    if (!err) {
        dat = new Date(res * 1000).toGMTString();
        writeValue('startDate', dat);
    } else {
        console.log(err);
    }
});

contract.crowdsale.methods.closingTime().call((err, res) => { 
    if (!err) {
        dat = new Date(res * 1000).toGMTString();
        writeValue('endDate', dat);
    } else {
        console.log(err);
    }
});

contract.crowdsale.methods.paused().call((err, res) => { 
    if (!err) {
        console.log('Paused: ', res);
        if (res) writeValue('isPaused', 'Contract currently paused...');
    } else {
        console.log(err);
    }
});

contract.crowdsale.methods.capReached().call((err, res) => { 
    if (!err) {
        console.log('Cap reached: ', res);
        if (res) writeValue('capReached', 'Softcap reached!');
    } else {
        console.log(err);
    }
});

contract.crowdsale.methods.hasClosed().call((err, res) => { 
    if (!err) {
        console.log('Has closed: ', res);
        if (res) writeValue('hasClosed', 'Pre-ICO closed!');
    } else {
        console.log(err);
    }
});


contract.crowdsale.methods.ETHRaised().call((err, res) => { 
    if (!err) {
        writeValue('totalETHRaised', (res / 1e18).toFixed(2));
    } else {
        console.log(err);
    }
});



