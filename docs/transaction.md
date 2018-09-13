Transaction Class Usage 
========================

Library to work with RecordsKeeper transactions.

You can send transaction, create raw transaction, sign raw transaction,
send raw transaction, send signed transaction, retrieve transaction
information and calculate transaction's fees by using transaction class.
You just have to pass parameters to invoke the pre-defined functions.

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

Transaction Class
=================

<div class="Transaction">

Transaction class is used to call transaction related functions like
create raw transaction, sign transaction, send transaction , retrieve
transaction and verify transaction functions which are used to create
raw transactions, send transactions, sign transactions, retrieve
transactions and verify transactions on the RecordsKeeeper Blockchain.

</div>

**1. Send Transaction without signing with private key**

You have to pass these three arguments to the sendTransaction function
call:

-   Transaction's sender address
-   Transaction's reciever address
-   Amount to be sent in transaction

sendTransaction() function is used to send transaction by passing
reciever's address, sender's address and amount.

``` {.sourceCode .nodejs}
sendTransaction(sender_address, reciever_address, data, amount, callback)

var tx = new recordskeeper.Transaction(config); #object of class Transaction  

tx.sendTransaction(sender_address, reciever_address, data, amount, function(txid){          #sendTransaction() function call    

console.log(txid)           #prints transaction id of the sent transaction

});
```

It will return the transaction id of the raw transaction.

**2. Send Transaction by signing with private key**

You have to pass these four arguments to the sendSignedTransaction
function call:

-   Transaction's sender address
-   Transaction's reciever address
-   Amount to be sent in transaction
-   Private key of the sender's address

sendSignedTransaction() function is used to send transaction by passing
reciever's address, sender's address, private key of sender and amount.
In this function private key is required to sign transaction.

``` {.sourceCode .nodejs}
sendSignedTransaction(sender_address, reciever_address, amount, private_key, data, callback) 

var tx = new recordskeeper.Transaction(config); #object of class Transaction 

tx.sendSignedTransaction(sender_address, reciever_address, amount, private_key, data, function(txid){ 

console.log(txid);        #prints transaction id of the signed transaction

});
```

It will return transaction id of the signed transaction.

**3. Create raw transaction**

You have to pass these three arguments to the createRawTransaction
function call:

-   Transaction's sender address
-   Transaction's reciever address
-   Amount to be sent in transaction

createRawTransaction() function is used to create raw transaction by
passing reciever's address, sender's address and amount.

``` {.sourceCode .nodejs}
createRawTransaction(sender_address, reciever_address, amount, data, callback)  

var tx = new recordskeeper.Transaction(config); #object of class Transaction

tx.createRawTransaction(sender_address, reciever_address, amount, data, function(txhex){ 

console.log(txhex)      #prints transaction hex of the raw transaction

});
```

It will return transaction hex of the raw transaction.

**4. Sign raw transaction**

You have to pass these three arguments to the signRawTransaction
function call:

-   Transaction hex of the raw transaction
-   Private key to sign raw transaction

signRawTransaction() function is used to sign raw transaction by passing
transaction hex of the raw transaction and the private key to sign the
raw transaction.

``` {.sourceCode .nodejs}
signRawTransaction(txhex, private_key, callback)

var tx = new recordskeeper.Transaction(config); #object of class Transaction

tx.signRawTransaction(txhex, private_key, function(signedtxhex){  

console.log(signedtxhex)      #prints signed transaction hex of the raw transaction

});
```

It will return signed transaction hex of the raw transaction.

**5. Send raw transaction**

You have to pass these three arguments to the sendRawTransaction
function call:

-   Signed transaction hex of the raw transaction

sendRawTransaction() function is used to send raw transaction by passing
signed transaction hex of the raw transaction.

``` {.sourceCode .nodejs}
sendRawTransaction(signedtxhex, callback)

var tx = new recordskeeper.Transaction(config); #object of class Transaction 

tx.sendRawTransaction(signed_txHex, function(txid){ 

console.log(txid)     #prints transaction id of the raw transaction

});
```

It will return transaction id of the raw transaction sent on to the
Blockchain.

**6. Retrieve a transaction from the Blockchain**

You have to pass given argument to the retrieveTransaction function
call:

-   Transaction id of the transaction you want to retrieve

retrieveTransaction() function is used to retrieve transaction's
information by passing transaction id to the function.

``` {.sourceCode .nodejs}
retrieveTransaction(txid, callback)

var tx = new recordskeeper.Transaction(config); #object of class Transaction

tx.sendRawTransaction(signed_txHex, function(response){  

console.log(response['sent data'])       #prints sent data
console.log(response['sent amount'])     #prints sent amount

});
```

It will return the sent data and sent amount of the retrieved
transaction.

**7. Calculate a particular transaction's fee on RecordsKeeper
Blockchain**

You have to pass these two arguments to the getFee function call:

-   Transaction id of the transaction you want to calculate fee for
-   Sender's address

getFee() function is used to calculate transaction's fee by passing
transaction id and sender's address to the function.

``` {.sourceCode .nodejs}
getFee(address, txid, callback)

var tx = new recordskeeper.Transaction(config); #object of class Transaction

tx.getFee(address, tx_id, function(fee){

console.log(fee)             #prints fees consumed in the verified transaction

});
```

It will return the fees consumed in the transaction.
