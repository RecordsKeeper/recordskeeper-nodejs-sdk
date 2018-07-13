Assets Class Usage 
========================

Library to work with RecordsKeeper assets.

You can create new assets and list all assets by using Assets class. You
just have to pass parameters to invoke the pre-defined functions.

Libraries
=========

Import these python libraries first to get started with the
functionality.

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

Assets Class
============

<div class="Assets">

Assets class is used to call assets related functions like create assets
and list assets functions which are used on the RecordsKeeeper
Blockchain.

</div>

**1. Create Assets on the RecordsKeeper Blockchain**

createAsset() function is used to create or issue an asset.

``` {.sourceCode .nodejs}
createAsset(address, asset_name, asset_qty, callback) 

var asset = new recordskeeper.Assets(); #object of class address 

asset.createAsset(address, asset_name, asset_qty, function(txid){          #createAsset() function call   

console.log(txid);                 # prints transaction id of the issued asset.

}); 
```

It will return the transaction id of the issued asset.

**2. Send Assets to a particular address on the RecordsKeeper
Blockchain**

You have to pass these three arguments to the createAsset function call:

-   address: address which will send the asset
-   asset\_name: name of the asset
-   qty: quantity of asset to be sent

sendAsset() function is used to send an asset.

``` {.sourceCode .nodejs}
sendAsset(address, assetname, qty, callback)  

var asset = new recordskeeper.Assets(); #object of class address 

asset.sendAsset(address, asset_name, asset_qty, function(txid){          #sendAsset() function call   

console.log(txid);                 # prints transaction id of the sent asset.

});
```

It will return the transaction id of the sent asset.

**3. List all assets on the RecordsKeeper Blockchain**

retrieveAssets() function is used to list all assets, no of assets,
issued quantity and issued transaction id of all the assets on
RecordsKeeper Blockchain.

``` {.sourceCode .nodejs}
retrieveAssets(callback) 

var asset = new recordskeeper.Assets(); #object of class address 

asset.retrieveAsset(function(response){      #retrieveAssets() function call

console.log(response['asset_name'])            #prints name of all the assets
console.log(response['asset_count'])           #prints total asset count
console.log(response['issue_id'])              #prints assets issued quantity
console.log(response['issue_qty'])             #prints assets issued transaction id

}); 
```

It will return all the assets, the count of the assets, issued quantity
of assets and issued transaction id of the asset on the RecordsKeeper
Blockchain.
