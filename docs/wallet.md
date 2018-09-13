Wallet Class Usage 
========================

Library to work with RecordsKeeper wallet functionalities.

You can create wallet, dump wallet into a file, backup wallet into a
file, import wallet from a file, lock wallet, unlock wallet, change
wallet's password, retrieve private key, retrieve wallet's information,
sign and verify message by using wallet class. You just have to pass
parameters to invoke the pre-defined functions.

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

Wallet Class
============

<div class="Wallet">

Wallet class is used to call wallet related functions like create
wallet, retrieve private key of wallet address, retrieve wallet's
information, dump wallet, lock wallet, unlock wallet, change wallet's
password, create wallet's backup, import wallet's backup, sign message
and verify message functions on RecordsKeeeper Blockchain.

</div>

**1. Create wallet on RecordsKeeper blockchain**

createWallet() function is used to create wallet on RecordsKeeper
blockchain

``` {.sourceCode .nodejs}
createWallet(callback)  

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.createWallet(function(response){          //createWallet() function call    

console.log(response['public_address'])        //prints public address of the wallet
console.log(response['private_key'])           //prints private key of the wallet
console.log(response['public_key'])            //prints public key of the wallet

});
```

It will return the public address, public key and private key.

**2. Retrieve private key of an address**

You have to pass address argument to the getPrivateKey function call:

-   Public Address: address whose private key is to be retrieved

getPrivateKey() function is used to retrieve private key of the given
address.

``` {.sourceCode .nodejs}
getPrivateKey(public_address)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.getPrivateKey(public_address, function(private_key){ 

console.log(private_key)        //prints private key of the given address

});
```

It will return private key of the given address.

**3. Retrieve node wallet's information**

retrieveWalletinfo() function is used to retrieve node wallet's
information.

``` {.sourceCode .nodejs}
retrieveWalletinfo(callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.retrieveWalletInfo(function(response){ 

console.log(response['balance'])      //prints wallet's balance
console.log(response['tx-count'])     //prints wallet transaction count
console.log(response['unspent-tx'])   //prints unspent wallet transactions

});
```

It will return wallet's balance, transaction count and unspent
transactions.

**4. Create wallet's backup**

You have to pass these three arguments to the backupWallet function
call:

-   Filename: wallet's backup file name

backupWallet() function is used to create backup of the wallet.dat file.

``` {.sourceCode .nodejs}
backupWallet(filename, callback) 

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.backupWallet(filename, function(response){ 

console.log(response);      //prints result

});
```

It will return the response of the backup wallet function. The backup of
the wallet is created in your chain's directory and you can simply
access your file by using same filename that you have passed with the
backupwallet function. Creates a backup of the wallet.dat file in which
the node’s private keys and watch-only addresses are stored. The backup
is created in file filename. Use with caution – any node with access to
this file can perform any action restricted to this node’s addresses.

**5. Import backup wallet**

You have to pass these three arguments to the importWallet function
call:

-   Filename: wallet's backup file name

importWallet() function is used to import wallet's backup file.

``` {.sourceCode .nodejs}
importWallet(filename, callback) 

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.importWallet(filename, function(response){ 

console.log(response);    //prints result

});
```

It will return the response of the import wallet function. It will
import the entire set of private keys which were dumped (using
dumpwallet) into file filename.

**6. Dump wallet on RecordsKeeper blockchain**

You have to pass these three arguments to the dumpWallet function call:

-   Filename: file name to dump wallet in

dumpWallet() function is used to retrieve transaction's information by
passing transaction id to the function.

``` {.sourceCode .nodejs}
dumpWallet(filename, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.dumpWallet(filename, function(response){

console.log(response);   //prints result
```

> });

It will return the response of the dump wallet function. Dumps the
entire set of private keys in the wallet into a human-readable text
format in file filename. Use with caution – any node with access to this
file can perform any action restricted to this node’s addresses.

**7. Locking wallet with a password on RecordsKeeper Blockchain**

You have to pass password as an argument to the lockWallet function
call:

-   Password: password to lock the wallet

lockWallet() function is used to verify transaction's information by
passing transaction id and sender's address to the function.

``` {.sourceCode .nodejs}
lockWallet(password, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet 

wallet.lockWallet(password, function(response){

console.log(response)     //prints result

});
```

It will return the the response of the lock wallet function. This
encrypts the node’s wallet for the first time, using passphrase as the
password for unlocking. Once encryption is complete, the wallet’s
private keys can no longer be retrieved directly from the wallet.dat
file on disk, and chain will stop and need to be restarted. Use with
caution – once a wallet has been encrypted it cannot be permanently
unencrypted, and must be unlocked for signing transactions with the
unlockwallet function.

**8. Unlocking wallet with the password on RecordsKeeper Blockchain**

You have to pass these two arguments to the unlockWallet function call:

-   Password: password to unlock the wallet
-   unlocktime: seconds for which wallet remains unlock

unlockWallet() function is used to verify transaction's information by
passing transaction id and sender's address to the function.

``` {.sourceCode .nodejs}
unlockWallet(password, unlock_time, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.unlockWallet(password, unlock_time, function(response){

console.log(response)     //prints result

});
```

It will return the response of the unlock wallet function. This uses
passphrase to unlock the node’s wallet for signing transactions for the
next timeout seconds. This will also need to be called before the node
can connect to other nodes or sign blocks that it has mined.

**9. Change wallet's password**

You have to pass these two arguments to the changeWalletPassword
function call:

-   Old Password: old password of the wallet
-   New Password: new password of the wallet

changeWalletPassword() function is used to change wallet's password and
set new password.

``` {.sourceCode .nodejs}
changeWalletPassword(old_password, new_password, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.changeWalletPassword(password, new_password, function(response){

console.log(response);     //prints result

});
```

This changes the wallet’s password from old-password to new-password.

**10. Sign Message on RecordsKeeper Blockchain**

You have to pass these two arguments to the signMessage function call:

-   Message: message to send
-   Private Key: private key of the sender's wallet address

signMessage() function is used to change wallet's password and set new
password.

``` {.sourceCode .nodejs}
signMessage(private_key, message, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.signMessage(priavte_key, message, function(signedMessage){

console.log(signedMessage)   //prints signed message

});
```

It will return the signed message.

**11. Verify Message on RecordsKeeper Blockchain**

You have to pass these three arguments to the verifyMessage function
call:

-   Message: message to send
-   Private Key: private key of the sender's wallet address

verifyMessage() function is used to change wallet's password and set new
password.

``` {.sourceCode .nodejs}
verifyMessage(address, signedMessage, message, callback)

var wallet = new recordskeeper.Wallet(config); //object of class wallet

wallet.verifyMessage(address, signedMessage, message, function(validity){ 

console.log(validity)     //prints validity of the message

});
```

It will return the validity of the message.
