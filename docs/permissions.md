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

var permission = new recordskeeper.Permissions(); //object of class Permissions  

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

var permission = new recordskeeper.Permissions(); //object of class Permissions

permission.grantPermission(address, permissions, function(response){    //revokePermission() function call

console.log(response)         //prints response of the revoke permision transaction

});
```

It will return the transaction id of the permission transaction.
