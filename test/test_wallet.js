'use strict';
var path = require('path');
var assert = require('assert');
var Wallet = require('../src/wallet.js');
var wall = new Wallet();
var fs = require('fs');
var config;
var validaddress;
var signedMessage;
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
    priv_key = config['privatekey'];
    signedMessage = config['signedmessage'];
} else {
    //require('dotenv').config();   
    priv_key = process.env.privatekey;
    signedMessage = process.env.signedMessage;
    validaddress = process.env.validaddress;
}

describe('#createWallet', function() {
    it('should convert single digits', function(done) {
        wall.createWallet(function(response){
        var public_address = response['public_address'];
        let length = public_address.length;
        assert.equal(length, 38);
        var private_key = response['private_key'];
        let priv_length = private_key.length;
        assert.equal(priv_length, 56);
        var public_key = response['public_key'];
        let pub_length = public_key.length;
        assert.equal(pub_length, 66);
        done();
        });
    });
  });

describe('#getPrivateKey', function() {
    it('should convert single digits', function(done) {
        wall.getPrivateKey(validaddress, function(address){
        let length = address.length;
        assert.equal(length, 56);
        done();
        });
    });
  }); 

describe('#retrieveWalletInfo', function() {
    it('should convert single digits', function(done) {
        wall.retrieveWalletInfo(function(response){
        var balance = response['balance'];
        assert(balance>1000);
        var tx_count = response['tx-count']
        assert(tx_count> 100);
        var unspent_tx = response['unspent-tx'];
        assert(unspent_tx >= 0);
        done();
        });
    });
  });

 describe('#backupWallet', function() {
    it('should convert single digits', function(done) {
        wall.backupWallet("wallet", function(response){
        assert.equal(response, 'Backup Successful');
        done();
        });
    });
  }); 

  describe('#dumpWallet', function() {
    it('should convert single digits', function(done) {
        wall.dumpWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully dumped');
        done();
        });
    });
  });

  describe('#importWallet', function() {
    it('should convert single digits', function(done) {
        wall.importWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully imported');
        done();
        });
    });
  }); 


 /* describe('#lockWallet', function() {
    it('should convert single digits', function(done) {
        wall.lockWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully encrypted');
        done();
        });
    });
  }); 

  describe('#unlockWallet', function() {
    it('should convert single digits', function(done) {
        wall.unlockWallet("wallet", 100, function(response){
        assert.equal(response, 'Wallet is successfully unlocked');
        done();
        });
    });
  }); 

  describe('#changeWalletPassword', function() {
    it('should convert single digits', function(done) {
        wall.changeWalletPassword("wallet", "100", function(response){
        assert.equal(response, 'Password successfully changed!');
        done();
        });
    });
  }); */

  describe('#signMessage', function() {
    it('should convert single digits', function(done) {
        wall.signMessage(priv_key, "wallet", function(response){
        let length = response.length;
        assert.equal(length, 88);
        done();
        });
    });
  });

  describe('#verifyMessage', function() {
    it('should convert single digits', function(done) {
        wall.verifyMessage(validaddress, signedMessage, "Hii", function(response){
        assert.equal(response, 'Message is verified');
        done();
        });
    });
  });
