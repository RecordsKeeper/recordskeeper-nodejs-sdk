Stream Class Usage 
========================

Library to work with RecordsKeeper streams.

You can publish, retrieve and verify stream data by using stream class.
You just have to pass parameters to invoke the pre-defined functions.

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

Stream Class
============

<div class="Stream">

Stream class to call stream related functions like publish,
retrievewithtxid, retrieveWithAddress, retrieveWithKey and verify data
functions which are used to publish data into the stream, retrieve data
from the stream and verify data from the stream.

</div>

**1. Publish**

You have to pass these four arguments to the publish function call:

-   Data Hex of the data to be published
-   Address of the publihser
-   Stream to which you want your data to be published
-   key Value for the data to be published

The **data.hex()** will convert the data into a hex value

``` {.sourceCode .nodejs}
publish(address, stream, key, data, callback)

var stream = new recordskeeper.Streams(); #object of class Stream   

stream.publish(address, stream, key, data, function(txid){          #publish() function call    

console.log(txid)   #prints the transaction id of the data published

});
```

It will return a transaction id of the published data, use this
information to retrieve the particular data from the stream.

**2. Retrieve an existing item from a particular stream against a
transaction id**

You have to pass these two arguments to the retrieve function call:

-   Stream name: which you want to access
-   Transaction id: id of the data you want to retrieve

``` {.sourceCode .nodejs}
retrieve(stream, txid)         

var stream = new recordskeeper.Streams(); #object of class Stream

stream.retrieve(stream, txid, function(txid){   #call retrieve function with stream and txid as the required parameters 

console.log(txid)   #prints info of the transaction

}); 
```

It will return the item's details like publisher address, key value,
confirmations, hexdata and transaction id.

**3. Retrieve an item against a particular publisher address**

You have to pass these three arguments to the retrieveWithAddress
function call:

-   Stream name: which you want to access
-   Publisher address: address of the data publisher you want to verify
-   Count: no of items you want to retrieve

``` {.sourceCode .nodejs}
retrieveWithAddress(stream, address, count, callback)

var stream = new recordskeeper.Streams(); #object of class Stream

stream.retrieveWithAddress(stream, address, count, function(response){   #call retrieve function with stream, address and count as the required parameters

console.log(response['key'])      #prints key value of the data
console.log(response['txid'])     #prints transaction id of the data
console.log(response['data'])     #prints raw data

}); 
```

It will return the key value, raw data and transaction id of the
published item.

**4. Retrieve an item against a particular key value**

You have to pass these three arguments to the retrieveWithKey function
call:

-   Stream name: which you want to access
-   Key: key value of the published data you want to verify
-   Count: no of items you want to retrieve

``` {.sourceCode .nodejs}
retrieveWithKey(stream, key, count, callback)

var stream = new recordskeeper.Streams(); #object of class Stream

stream.retrieveWithKey(stream, key, count, function(response){   #call retrieve function with stream, key and count as the required parameters

console.log(response['publishers'])    #prints publisher's address of the published data
console.log(response['txid'])        #prints transaction id of the data
console.log(response['data'])        #prints raw data

}); 
```

It will return the key value, raw data and transaction id of the
published item.

**5. Verify an data item on a particular stream of RecordsKeeper
Blockchain**

You have to pass these three arguments to the retrieveWithKey function
call:

-   Stream name: which you want to access
-   Data: against which you want to make a query
-   Count: count of items which will be queried

``` {.sourceCode .nodejs}
verifyData(stream, data, count, callback)

var stream = new recordskeeper.Streams(); #object of class Stream

stream.verifyData(stream, key, count, function(response){   #call verifyData function with data as the required parameters

console.log(response); #prints if verification is successful or not

});
```

It will return the result if verification is successful or not.

**6. Retrieve data items on a particular stream of RecordsKeeper
Blockchain**

You have to pass these two arguments to the verifyWithKey function call:

-   Stream name: which you want to access
-   Count: count of items which will be queried

``` {.sourceCode .nodejs}
retrieveItems(stream, count, callback)

var stream = new recordskeeper.Streams(); #object of class Stream

stream.retrieveItems(stream, count, function(response){   #call retrieveItems function with stream and count as the required parameters

console.log(response['address'])   #prints address of the publisher of the item
console.log(response['key'])        #prints key value of the stream itme
console.log(response['data'])       #prints raw data published
console.log(response['txid'])       #prints transaction id of the item published

}); 
```

It will return the address, key value, data and transaction id of the
stream item published.
