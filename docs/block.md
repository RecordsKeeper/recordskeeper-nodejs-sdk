Block Class Usage 
========================

Library to work with RecordsKeeper block informaion.

You can collect block information by using block class. You just have to
pass parameters to invoke the pre-defined functions.

Libraries
=========

Import recordskeepr library first to get started with the functionality.

``` {.sourceCode .nodejs}
var recordskeeper = require('recordskeeper');  
```

Importing Config
===================

Config file to import config parameters:

``` {.sourceCode .nodejs}
var config = require('./config.json');
```

Block Class
===========

<div class="Block">

**1. Block info to retrieve block information**

</div>

Block class is used to call block related function like blockinfo which
is used to retrieve block details like block's hash value, size, nonce,
transaction ids, transaction count, miner address, previous block hash,
next block hash, merkleroot, blocktime and difficulty of the block for
which you have made the query.

You have to pass these block height as the argument to the blockinfo
function call:

-   Block height: height of the block of which you want to collect info

``` {.sourceCode .nodejs}
blockInfo(block_height, callback)

var block = new recordskeeper.Block(config); //object of class block

block.blockInfo(block_height, function(response){          //blockInfo() function call 

console.log(response['tx_count'])      //prints transaction count of the block
console.log(response['tx'])           //prints transaction ids of the block
console.log(response['size'])         //prints size of the block
console.log(response['blockhash'])    //prints hash value of the block
console.log(response['nonce'])        //prints nonce of the block
console.log(response['miner'])        //prints miner's address of the block
console.log(response['nextblockhash'])  //prints next block's hash
console.log(response['previousblockhash']) //prints previous block's hash
console.log(response['merkleroot'])   //prints merkle root of the block
console.log(response['blocktime'])    //prints time at which block is mined
console.log(response['difficulty'])   //prints difficulty of the block

 });
```

It will return transaction ids, transaction count, nonce, size, hash
value, previous block's hash value, next block hash value, merkle root,
difficulty, blocktime and miner address of the block.

**2. Retrieve a range of blocks on RecordsKeeper chain**

You have to pass these block height as the argument to the
retrieveBlocks function call:

-   Block range: range of the block of which you want to collect info

``` {.sourceCode .nodejs}

retrieveBlocks(block_range)

var block = new recordskeeper.Block(config); //object of class block

block.retrieveBlocks(block_range, function(response){ //retrieveBlocks() function call

console.log(response['blockhash']) //prints hash of the blocks
console.log(response['miner']) //prints miner of the blocks
console.log(response['blocktime']) //prints block time of the blocks
console.log(response['tx-count']) //prints transaction count of the blocks

});
```

It will return blockhash, miner address, blocktime and transaction count
of the blocks.
