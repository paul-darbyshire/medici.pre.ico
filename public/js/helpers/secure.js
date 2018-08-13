/**
 * @file secure.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

const crypto = require('crypto');

/*
GCM is an authentication encryption mode of operation, it is composed by two separate functions: one for encryption (AES-CTR) and 
one for authentication (GMAC). It receives as input:

    a Key
    a unique IV
    Data to be processed only with authentication (associated data)
    Data to be processed by encryption and authentication

It outputs:

    The encrypted data of input 4
    An authentication TAG

The authentication TAG is an input to the decryption, if someone tampered with your associated data or with your encrypted data, GCM decryption 
will notice this and will not output any data (or return an error and you should discard the received data without processing it)
*/
const aes256gcm = (key) => {
  const ALGO = 'aes-256-gcm';

  /**
  * Returns base64-encoded ciphertext.
  * @method encrypt
  * @param {String} str - Text to be hashed.
  * @returns {String} Encrypted text.
  */
  const encrypt = (str) => {
    const iv = Buffer.from(crypto.randomBytes(16), 'utf8');
    const cipher = crypto.createCipheriv(ALGO, key, iv);

    let enc = cipher.update(str, 'utf8', 'base64');
    enc += cipher.final('base64');
    return [enc, iv, cipher.getAuthTag()];
  };

  /**
  * Returns base64-encoded ciphertext into a utf8-encoded string.
  * @method decrypt
  * @param {String} enc - Encrypted text.
  * @param {String} iv - Initialisation vector.
  * @param {String} authTag - Authentication tag.
  * @returns {String} Encrypted text.
  */
  const decrypt = (enc, iv, authTag) => {
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, 'base64', 'utf8');
    str += decipher.final('utf8');
    return str;
  };

  return { encrypt, decrypt };
};

/* To run: $ node public/js/helpers/secure.js */

const KEY = Buffer.from(crypto.randomBytes(32), 'utf8');
console.log('KEY: ', KEY);
const aesCipher = aes256gcm(KEY);
const [encrypted, iv, authTag] = aesCipher.encrypt('Alice gives a key to Bob and Bob gives it back to Alice');
console.log('encrypted: ', encrypted);
console.log('iv: ', iv);
console.log('tag: ', authTag);
const decrypt = aesCipher.decrypt(encrypted, iv, authTag);

console.log(decrypt); 