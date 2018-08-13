/**
 * @file session.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

 var uniqid = require('uniqid');

 /**
 * Returns a unique Session ID.
 * @function
 * @param {Number} n - ID of the uniqid.
 * 
 * @returns {Number} Current value of the Session ID.
 */

function getSessionID (n) {
  var res;

  if (n == 1) res = uniqid();
  else if (n == 2) res = uniqid.process();
  else res = uniqid.time();
  return res;
}

/* To run: $ node public/js/helpers/session.js */
console.log('uniqid:           ', getSessionID(1));
console.log('uniqid.process(): ', getSessionID(2));
console.log('uniqid.time():    ', getSessionID());