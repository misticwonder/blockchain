const bitcoin = new Blockchain();

// GET /blockchain - get entire blockchain
app.get('/blockchain', function(req, res) {
  res.send(bitcoin);
});

// POST /transaction - create a new transaction
app.post('/transaction', function(req, res) {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

// POST or GET /mine - mine a new block by using the proofOfWork
app.post('/mine', function(req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1,
  };

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  // TODO add reward for miner

  res.json({note: 'New block mined successfully', block: newBlock});
});


const crypto = require('crypto');
const nodeAddress = crypto.randomUUID().split('-').join('');
// if a transaction is made from the address 00, it is a mining reward.
bitcoin.createNewTransaction(12.5, '00', nodeAddress);
