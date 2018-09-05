Address Class Usage 
========================

Library to work with RecordsKeeper addresses.

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

Creating Connection
===================

Config file to import config parameters:

``` {.sourceCode .nodejs}
var config = require('./config.json');
```

Importing chain url and chain name from config file:

-   URL: Url to connect to the chain (\[RPC Host\]:\[RPC Port\])
-   Chain-name: chain name

``` {.sourceCode .nodejs}
var rk_host = config['rk_host'];

var rk_chain = config['rk_chain'];
```

Node Authentication
===================

Importing user name and password values from config file to authenticate
the node:

-   User name: The rpc user is used to call the APIs.
-   Password: The rpc password is used to authenticate the APIs.

``` {.sourceCode .nodejs}
var rk_user = config['rk_user'];

var rk_pass = config['rk_pass'];
```

Address Class
=============

<div class="Address">

Address class is used to call address related functions like generate
new address, list all addresses and no of addresses on the node's
wallet, check if given address is valid or not, check if given address
has mining permission or not and check a particular address balance on
the node functions which are used on the RecordsKeeeper Blockchain.

</div>

**1. Generate new address on the node's wallet**

getAddress() function is used to generate a new wallet address.

``` {.sourceCode .nodejs}
getAddress(callback) //getAddress function definition 

var addr = new recordskeeper.Address(); //object of class address

addr.getAddress(function(address){          //getAddress() function call   

console.log(address);                 //prints a new address

}); 
```

It will return a new address of the wallet.

**2. Generate a new multisignature address**

You have to pass these two arguments to the getMultisigAddress function
call:

-   nrequired: to pass the no of signatures that are must to sign a
    transaction
-   key: pass any no of comma-seperated public addresses that are to be
    used with this multisig address as a single variable

getMultisigAddress() function is used to generate a new multisignature
address.

``` {.sourceCode .nodejs}
getMultisigAddress(required, key, callback)  //getMultisigAddress function definition

var addr = new recordskeeper.Address(); //object of class address 

addr.getMultisigAddress(required, key, function(address){           //getMultisigAddress() function call   

console.log(address);                          //prints a new multisig address

}); 
```

It will return a new multisignature address on RecordsKeeper Blockchain.

**3. Generate a new multisignature address on the node's wallet**

You have to pass these two arguments to the getMultisigWalletAddress
function call:

-   nrequired: to pass the no of signatures that are must to sign a
    transaction
-   key: pass any no of comma-seperated public addresses that are to be
    used with this multisig address as a single variable

getMultisigWalletAddress() function is used to generate a new wallet
address.

``` {.sourceCode .nodejs}
getMultisigWalletAddress(required, key, callback)  //getMultisigWalletAddress function definition

var addr = new recordskeeper.Address(); //object of class address 

addr.getMultisigWalletAddress(required, key, function(address){         //getMultisigAddress() function call   

console.log(address);                          //prints a new multisig address

}); 
```

It will return a new multisignature address on the wallet.

**4. List all addresses and no of addresses on the node's wallet**

retrieveAddresses() function is used to list all addresses and no of
addresses on the node's wallet.

``` {.sourceCode .nodejs}
retrieveAddresses(callback)  //retrieveAddresses function definition

var addr = new recordskeeper.Address(); //object of class address 

addr.retrieveAddresses(function(response){         //retrieveAddress() function call   

console.log(response['addresses']);                //prints all the addresses of the wallet

console.log(response['address_count']);             //prints the address count

});
```

It will return all the addresses and the count of the addresses on the
wallet.

**5. Check validity of the address**

You have to pass address as argument to the checkifValid function call:

-   Address: to check the validity

checkifValid() function is used to check validity of a particular
address.

``` {.sourceCode .nodejs}
checkifValid(address, callback)  //checkifValid function definition

var addr = new recordskeeper.Address(); //object of class address 

addr.checkifValid(address, function(response){         //checkifValid() function call   

console.log(response);                          //prints validity of the address

});
```

It will return if an address is valid or not.

**6. Check if given address has mining permission or not**

You have to pass address as argument to the checkifMineAllowed function
call:

-   Address: to check the permission status

checkifMineAllowed() function is used to sign raw transaction by passing
transaction hex of the raw transaction and the private key to sign the
raw transaction.

``` {.sourceCode .nodejs}
checkifMineAllowed(address, callback)  //checkifMineAllowed function definition

var addr = new recordskeeper.Address(); //object of class address 

addr.checkifMineAllowed(address, function(response){         //checkifMineAllowed() function call   

console.log(response);                          //prints permission status of the given address

});
```

It will return if mining permission is allowed or not.

**7. Check address balance on a particular node**

You have to pass address as argument to the checkifMineAllowed function
call:

-   Address: to check the balance

checkBalance() function is used to check the balance of the address.

``` {.sourceCode .nodejs}
checkBalance(address, callback)  //checkBalance function definition

 var addr = new recordskeeper.Address(); //object of class address 

 addr.checkBalance(address, function(balance){         //checkBalance() function call   

 console.log(balance);                          //prints balance of the address 

 }); 
```

It will return the balance of the address on RecordsKeeper Blockchain.

**8. Import a non-wallet address on RecordsKeeeper Blockchain**

You have to pass address as argument to the importAddress function call:

-   Address: non-wallet address to import on a particular node

importAddress() function is used to check the balance of the address.

``` {.sourceCode .nodejs}
importAddress(address, callback)  //importAddress function definition

 var addr = new recordskeeper.Address(); //object of class address 

 addr.importAddress(address, function(response){         //importAddress() function call   

 console.log(response);                      //prints response whether address is successfully imported or not 

 });  
```

It will return the response of the importAddress() function call.
