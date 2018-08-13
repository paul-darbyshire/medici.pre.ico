/**
 * @file events.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

// Account balances
$('#balance').click(function(){
    getBalance();
});

// ETH raised
$('#ETHRaised').click(function(){
    getETHRaised();
});

// Contract settings
$('#closingTime').click(function(){
    setClosingTime();
});

$('#bonus').click(function(){
    setBonus();
});

$('#cap').click(function(){
    setCap();
});

$('#ethMin').click(function(){
    setETHMin();
});

// Contract methods
$('#pause').click(function(){
    pause();
});

$('#unpause').click(function(){
    unpause();
});

// Contract parameters
$('#psEpoch').click(function(){
    getParam(0);
});

$('#peEpoch').click(function(){
    getParam(1);
});

$('#psDate').click(function(){
    getParam(2);
});

$('#peDate').click(function(){
    getParam(3);
});

$('#pBonus').click(function(){
    getParam(4);
});

$('#pCap').click(function(){
    getParam(5);
});

$('#pETHMin').click(function(){
    getParam(6);
});

$('#oAddr').click(function(){
    getParam(7);
});

// Transaction details from Etherscan.io
$('#detTrxHash').click(function(){
    getDetailsTrxHash();
});

$('#detBlckNum').click(function(){
    getDetailsBlckNum();
});
