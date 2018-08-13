/**
 * @file hash.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

var crypto = require('crypto');

/**
* Returns a hashed string of text.
* @function
* @param {String} str - Text to be hashed.
* @param {String} key - Private key.
*
* @returns {String} Hashed text.
*/

function getHash (str, key) {
  var hsh = crypto.createHmac('sha512', key);
  hsh.update(str);
  return hsh.digest('hex');
}

/* To run: $ node public/js/helpers/hash.js */

console.log('Hashed text: ', getHash('hello', 'secret'));