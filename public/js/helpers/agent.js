/**
 * @file agent.js
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */

var platform = require('platform');

/* To run: $ node public/js/helpers/agent.js */

console.log('name: ', platform.name); 
console.log('version: ', platform.version); 
console.log('layout: ', platform.layout); 

const opsys = platform.os;
console.log('os arch.: ', opsys.architecture); 
console.log('os family: ', opsys.family); 
console.log('os version: ', opsys.version); 

console.log('desc.: ', platform.description);
console.log('product: ', platform.product); 
console.log('manu.: ', platform.manufacturer); 

var info = platform.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7.2; en; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 11.52');
console.log('name: ', info.name); 
console.log('version: ', info.version); 
console.log('layout: ', info.layout); 
console.log('os: ', info.os); 
console.log('desc.: ', info.description); 