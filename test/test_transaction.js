'use strict';
var path = require('path');
var assert = require('assert');
var Transaction = require('../src/transaction.js');
var tx = new Transaction();
var fs = require('fs');
var config;
var txhex;
var validaddress;
var txid;
var signedtxhex;
var priv_key;

function fileExists(path) {

  try  {
    return fs.statSync(path).isFile();
  }
  catch (e) {

    if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
      return false;
    }

    console.log("Exception fs.statSync (" + path + "): " + e);
    throw e; // something else went wrong, we don't have rights, ...
  }
}

if(fileExists('./config.json')== true){
    config = require(path.resolve( __dirname,'../../../config.json'));
    validaddress = config['validaddress'];
    txhex = config['txhex'];
    priv_key = config['privatekey'];
    signedtxhex = config['signedtxhex'];
    txid = config['txid'];
} else {
    require('dotenv').config();   
    txhex = process.env.txhex;
    priv_key = process.env.privatekey;
    signedtxhex = process.env.signedtxhex;
    validaddress = process.env.validaddress;
    txid = process.env.txid; 
}


describe('#sendTransaction', function() {
    it('should send a transaction', function(done) {
        tx.sendTransaction(validaddress, validaddress, "send", 10, function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 

 describe('#createRawTransaction', function() {
    it('should create a raw transaction', function(done) {
        tx.createRawTransaction(validaddress, validaddress, "send", 10, function(response){
        var length = response.length;
        assert.equal(length, 268);
        done();
        });
    });
  });

  describe('#signRawTransaction', function() {
    it('should sign raw transaction', function(done) {
        tx.signRawTransaction(txhex, priv_key, function(response){
        var length = response.length;
        assert.equal(length, 480);
        done();
        });
    });
  });

  describe('#sendRawTransaction', function() {
    it('should send raw transaction', function(done) {
        tx.sendRawTransaction(signedtxhex, function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  });

  describe('#sendSignedRawTransaction', function() {
    it('should send signed raw transaction', function(done) {
        tx.sendSignedTransaction(validaddress, validaddress, 10, priv_key, "data", function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  });

  describe('#retrieveTransaction', function() {
    it('should retrieve transaction', function(done) {
        tx.retrieveTransaction(txid, function(response){
        var hex = response['hex'];
        assert.equal(hex, txhex);
        var amount = response['amount'];
        assert.equal(amount, 0);
        var data = response['data'];
        assert.equal(data, 'data');
        done();
        });
    });
  }); 

  describe('#getFee', function() {
    it('should return transaction fee', function(done) {
        tx.getFee(validaddress, txid, function(response){
        assert.equal(response, 0);
        done();
        });
    });
  });
