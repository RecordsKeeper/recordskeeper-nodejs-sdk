 'use strict';
var path = require('path');
var Streams = require(path.resolve( __dirname,"./wallet.js"));
var tx = new Streams();
tx.importWallet("wallet", function(response){
    console.log(response);
});