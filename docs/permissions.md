Permissions Class Usage 
========================
Library to work with RecordsKeeper permissions.

You can grant and revoke permissions like connect, send, receive, create, issue, mine, activate, admin by using Assets class. You just have to pass parameters to invoke the pre-defined functions.

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

Permissions Class
=================

<div class="Permissions">

Permissions class is used to call permissions related functions like
grant and revoke permissions for an address functions which are used on
the RecordsKeeeper Blockchain.

</div>

**1. Grant Permissions to an address on the RecordsKeeper Blockchain**

You have to pass these two arguments to the grantPermissions function
call:

-   Permissions: list of comma-seperated permissions passed as a string
-   Address: to which you have to grant permission

grantPermissions() function is used to grant permissions like connect,
send, receive, create, issue, mine, activate, admin to an address on
RecordsKeeper Blockchain.

``` {.sourceCode .nodejs}
grantPermissions(address, permissions, callback)

var permission = new recordskeeper.Permissions(config); //object of class Permissions  

permission.grantPermissions(address, permissions, function(txid){ //grantPermissions() function call   

console.log(txid)         //prints response of the grant permision transaction

});
```

It will return the transaction id of the permission transaction.

**2. Revoke Permissions to an address on the RecordsKeeper Blockchain**

You have to pass these two arguments to the revokePermission function
call:

-   Permissions: list of comma-seperated permissions passed as a string
-   Address: to which you have to grant permission

revokePermission() function is used to revoke permissions like connect,
send, receive, create, issue, mine, activate, admin to an address on
RecordsKeeper Blockchain.

``` {.sourceCode .nodejs}
revokePermission(address, permissions, callback) 

var permission = new recordskeeper.Permissions(config); //object of class Permissions

permission.grantPermission(address, permissions, function(response){    //revokePermission() function call

console.log(response)         //prints response of the revoke permision transaction

});
```

It will return the transaction id of the permission transaction.
