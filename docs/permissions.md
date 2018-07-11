---
title: Permissions Class Usage
...

Libraries
=========

Import recordskeepr library first to get started with the functionality.

``` {.sourceCode .python}
var recordskeeper = require('recordskeeper'); 
```

Creating Connection
===================

Config file to import config parameters:

``` {.sourceCode .python}
var config = require('./config.json');
```

Importing chain url and chain name from config file:

-   URL: Url to connect to the chain (\[RPC Host\]:\[RPC Port\])
-   Chain-name: chain name

``` {.sourceCode .python}
var rk_host = config['rk_host'];

var rk_chain = config['rk_chain'];
```

Node Authentication
===================

Importing user name and password values from config file to authenticate
the node:

-   User name: The rpc user is used to call the APIs.
-   Password: The rpc password is used to authenticate the APIs.

``` {.sourceCode .python}
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

You have to pass these two arguments to the grantPermission function
call:

-   Permissions: list of comma-seperated permissions passed as a string
-   Address: to which you have to grant permission

grantPermission() function is used to grant permissions like connect,
send, receive, create, issue, mine, activate, admin to an address on
RecordsKeeper Blockchain.

``` {.sourceCode .python}
grantPermission(address, permissions, callback)

var permission = new recordskeeper.Permissions(); #object of class Permissions  

block.grantPermission(address, permissions, function(txid){ #grantPermission() function call   

console.log(txid)         # prints response of the grant permision transaction

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

``` {.sourceCode .python}
revokePermission(address, permissions, callback) 

var permission = new recordskeeper.Permissions(); #object of class Permissions

block.grantPermission(address, permissions, function(response){       #revokePermission() function call

console.log(response)         # prints response of the revoke permision transaction

});
```

It will return the transaction id of the permission transaction.
