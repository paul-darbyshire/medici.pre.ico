/**
* @file utils.js
* @author Paul Darbyshire <paul@lancorscientific.com>
* @copyright Lancor Scientific Ltd. (c) 2018.
* @version 1.0.1
*/

/**
* Show alert meassge.
* @method showAlert
* @param {String} msg - Message to show in alert.
* @returns {String}.
*/
showAlert = function(msg) {
    alert(msg);
    location.reload();
};

/**
* Check input text.
* @method check
* @param {String} n - Text to check.
* @returns {None}.
*/
check = function(n) {
    if (n == "") showAlert('Field empty? Please try again.');
    else if (n == 0) showAlert('Field is zero? Please try again.');
    else if (isNaN(n)) showAlert('Input not valid! Please try again.');
};

/**
* Copy text to clipboard.
* @method copy
* @param {String} str - Text to copy
* @returns {None}
*/
copy = function(str) {
    var inp =document.createElement('input');
    document.body.appendChild(inp);
    inp.value = str.textContent;
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
};

/**
* Checks if the given string is an address as per EIP 55
* @method isAddress
* @param {String} address The given HEX adress
* @return {Boolean}
*/
var isAddress = function (address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // Check if it has the basic requirements of an address
      return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      // If it all small caps or all all caps, return true
      return true;
  } else {
      // Otherwise check each case
      return isChecksumAddress(address);
  }
};

/**
* Checks if the given string is a checksummed address.
* @method isChecksumAddress
* @param {String} address The given HEX adress
* @return {Boolean}
*/
var isChecksumAddress = function (address) {
  // Check each case
  address = address.replace('0x','');
  var addressHash = sha3(address.toLowerCase());
  for (var i = 0; i < 40; i++ ) {
      // The nth letter should be uppercase if the nth digit of casemap is 1
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
          return false;
      }
  }
  return true;
};