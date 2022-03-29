const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.createNewTransaction(100,'AK','Krosha');
bitcoin.createNewTransaction(200,'AK','Krosha');
bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');

console.log(bitcoin);
