'use strict';
var path = require('path');
var config = require(path.resolve( __dirname,'../../../config.json'));
var assert = require('assert');
var Address = require('../src/address.js');
var add = new Address();
var validaddress = config['validaddress'];
var invalidaddress = config['invalidaddress'];
var miningaddress = config['miningaddress'];
var nonminingaddress = config['nonminingaddress'];
var multisigkey = config['multisigkey'];
var multisigaddress = config['multisigaddress'];

describe('#getAddress', function() {
    it('should generate a new address', function(done) {
        add.getAddress(function(address){
        let length = address.length;
        assert(length>20);
        done();
        });
    });
  }); 

describe('#getMultisigAddress', function() {
   it('should generate a new multisig address', function(done) {
        add.getMultisigAddress(2, multisigkey,function(response){
        assert.equal(response, multisigaddress);
        done();
        }); 
    });
});

describe('#getMultisigWalletAddress', function() {
   it('should return multisig wallet address', function(done) {
        add.getMultisigWalletAddress(2, multisigkey,function(multiaddress){
        assert.equal(multiaddress, multisigaddress);
        done();
        }); 
    });
});


describe('#checkifValid', function() {
    it('Address should be valid', function(done) {
        add.checkifValid(validaddress, function(addressCheck){
        assert.equal(addressCheck, "Address is valid");
        done();
        });
    });
 });

describe('#checkifnotValid', function() {
   it('Address should be invalid', function(done) {
        add.checkifValid(invalidaddress, function(addressCheck){
        assert.equal(addressCheck, "Address is invalid");
        done();
        }); 
    });
});

describe('#checkifMineAllowed', function() {
   it('Address should has mining permission', function(done) {
        add.checkifMineAllowed(miningaddress, function(permissionCheck){
        assert.equal(permissionCheck, "Address has mining permission");
        done();
        }); 
    });
});

describe('#checkifMinenotAllowed', function() {
   it('Address should not has mining permission', function(done) {
        add.checkifMineAllowed(nonminingaddress, function(permissionCheck){
        assert.equal(permissionCheck, "Address has not mining permission");
        done();
        }); 
    });
});

describe('#checkBalance', function() {
   it('should return correct balance', function(done) {
        add.checkBalance(validaddress, function(balance){
        assert(balance > 0);
        done();
        }); 
    });
});

describe('#importAddress', function() {
    it('Address should imported successfully', function(done) {
        add.importAddress(validaddress, function(addressCheck){
        assert.equal(addressCheck, "Address successfully imported");
        done();
        });
    });
 });

 describe('#importAddress', function() {
    it('Address should not imported successfully', function(done) {
        add.importAddress(invalidaddress, function(addressCheck){
        assert.equal(addressCheck, "Invalid Rk address or script");
        done();
        });
    });
 });



