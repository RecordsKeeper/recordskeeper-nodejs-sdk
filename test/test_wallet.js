'use strict';
var config = require('./config.json');
var assert = require('assert');
var Wallet = require('../src/wallet.js');
var wall = new Wallet(config);
var validaddress = config['validaddress'];
var priv_key = config['privatekey'];
var signedMessage = config['signedmessage'];

describe('#createWallet', function() {
    it('should create new wallet', function(done) {
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
    it('should generate correct private key', function(done) {
        wall.getPrivateKey(validaddress, function(address){
        let length = address.length;
        assert.equal(length, 56);
        done();
        });
    });
  }); 

describe('#retrieveWalletInfo', function() {
    it('should retrieve correct wallet information', function(done) {
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
    it('should backup wallet', function(done) {
        wall.backupWallet("wallet", function(response){
        assert.equal(response, 'Backup Successful');
        done();
        });
    });
  }); 

  describe('#importWallet', function() {
    it('should import wallet', function(done) {
        wall.importWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully imported');
        done();
        });
    });
  }); 

  describe('#dumpWallet', function() {
    it('should dump wallet', function(done) {
        wall.dumpWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully dumped');
        done();
        });
    });
  });

  describe('#lockWallet', function() {
    it('should lock wallet', function(done) {
        wall.lockWallet("wallet", function(response){
        assert.equal(response, 'Wallet is successfully encrypted');
        done();
        });
    });
  }); 

  describe('#unlockWallet', function() {
    it('should unlock wallet', function(done) {
        wall.unlockWallet("wallet", 100, function(response){
        assert.equal(response, 'Wallet is successfully unlocked');
        done();
        });
    });
  }); 

  describe('#changeWalletPassword', function() {
    it('should change the wallet password', function(done) {
        wall.changeWalletPassword("wallet", "100", function(response){
        assert.equal(response, 'Password successfully changed!');
        done();
        });
    });
  }); 

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
