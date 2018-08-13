/**
 * @file secure.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

var crypto = require('crypto'),

algorithm = 'aes-256-gcm',
password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
  
iv = '60iP0h6vJoEa';
//iv = Buffer.from(crypto.randomBytes(32), 'utf8');

module.exports = {

    encrypt: function (text) {
        var cipher = crypto.createCipheriv(algorithm, password, iv);
        var encrypted = cipher.update(text,'utf8','hex');
        encrypted += cipher.final('hex');
        var tag = cipher.getAuthTag();

        //console.log('encrypted: ', encrypted);
        //console.log('iv: ', iv);
        //console.log('tag: ', tag);

        return { content: encrypted, tag: tag };
    },

    decrypt: function (encrypted) {
        var decipher = crypto.createDecipheriv(algorithm, password, iv);
        decipher.setAuthTag(encrypted.tag);
        var decrypted = decipher.update(encrypted.content,'hex','utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
};

