Blockchain Class Usage 
========================

Library to work with Blockchain in RecordsKeeper Blockchain.

You can generate new address, check all addresses, check address
validity, check address permissions, check address balance by using
Address class. You just have to pass parameters to invoke the
pre-defined functions.

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

Blockchain Class
================

<div class="Blockchain">

Blockchain class is used to call blockchain related functions like
retrieving blockchain parameters, retrieving node's information,
retrieving mempool's information, retrieving node's permissions and
check node's balance functions which are used on the RecordsKeeeper
Blockchain.

</div>

**1. Retrieve Blockchain parameters of RecordsKeeper Blockchain**

getChainInfo() function is used to retrieve Blockchain parameters.

``` {.sourceCode .nodejs}
getChainInfo(callback)  

var blockchain = new recordskeeper.Blockchain(config); //object of class blockchain

blockchain.getChainInfo(function(response){          //getChainInfo() function call  

console.log(response['chain-protocol'])         //prints blockchain's protocol
console.log(response['chain-description'])      //prints blockchain's description
console.log(response['root-stream-name'])       //prints blockchain's root stream
console.log(response['maximum-blocksize'])      //prints blockchain's maximum block size
console.log(response['default-network-port'])   //prints blockchain's default network port
console.log(response['default-rpc-port'])       //prints blockchain's default rpc port
console.log(response['mining-diversity'])       //prints blockchain's mining diversity
console.log(response['chain-name'])             //prints blockchain's name

 });
```

It will return the information about RecordsKeeper blockchain's
parameters.

**2. Retrieve node's information on RecordsKeeper Blockchain**

getNodeInfo() function is used to retrieve node's information on
RecordsKeeper Blockchain.

``` {.sourceCode .nodejs}
getNodeInfo(callback) 

var blockchain = new recordskeeper.Blockchain(config); //object of class blockchain

blockchain.getNodeInfo(function(response){      //getNodeInfo() function call

console.log(response['node-balance'])     //prints balance of the node
console.log(response['blocks'])     //prints no of synced blocks
console.log(response['node-address'])     //prints node's address
console.log(response['difficulty'])     //prints node's difficulty 

 });
```

It will return node's balance, no of synced blocks, node's address and
node's difficulty.

**3. Retrieve permissions given to the node on RecordsKeeper
Blockchain**

permissions() function is used to retrieve node's permissions.

``` {.sourceCode .nodejs}
permissions(callback)

var blockchain = new recordskeeper.Blockchain(config); //object of class blockchain

blockchain.permissions(function(permissions){         //permissions() function call 

console.log(permissions)      //prints permissions available to the node

 });
```

It will return the permissions available to the node.

**4. Retrieve pending transaction's information on RecordsKeeper
Blockchain**

getpendingTransactions() function is used to retrieve pending
transaction's information like no of pending transactions and the
pending transactions.

``` {.sourceCode .nodejs}
getpendingTransactions(callback) 

var blockchain = new recordskeeper.Blockchain(config); //object of class blockchain

blockchain.getpendingTransactions(function(response){    //getpendingTransactions() function call

console.log(response['tx'])            //prints pending transactions
console.log(response['tx_count'])      //prints pending transaction count

 });
```

It will return the information of pending transactions on Recordskeeper
Blockchain.

**5. Check node's total balance**

checkNodeBalance() function is used to check the total balance of the
node.

``` {.sourceCode .nodejs}
checkNodeBalance(callback)

var blockchain = new recordskeeper.Blockchain(config); //object of class blockchain

blockchain.checkNodeBalance(function(balance){  //checkNodeBalance() function call

console.log(balance);          //prints total balance of the node

 });
```

It will return the total balance of the node on RecordsKeeper
Blockchain.
