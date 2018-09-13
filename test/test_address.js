'use strict';
var config = require('./config.json');
var assert = require('assert');
var Address = require('../src/address.js');
var addr = new Address(config);
var validaddress = config['validaddress'];
var invalidaddress = config['invalidaddress'];
var miningaddress = config['miningaddress'];
var nonminingaddress = config['nonminingaddress'];
var multisigkey = config['multisigkey'];
var multisigaddress = config['multisigaddress'];

describe('#getAddress', function() {
    it('should generate a new address', function(done) {
        addr.getAddress(function(address){
        let length = address.length;
        assert(length>20);
        done();
        });
    });
  }); 

describe('#getMultisigAddress', function() {
   it('should generate a new multisig address', function(done) {
        addr.getMultisigAddress(2, multisigkey,function(response){
        assert.equal(response, multisigaddress);
        done();
        }); 
    });
});

describe('#getMultisigWalletAddress', function() {
   it('should return multisig wallet address', function(done) {
        addr.getMultisigWalletAddress(2, multisigkey,function(multiaddress){
        assert.equal(multiaddress, multisigaddress);
        done();
        }); 
    });
});


describe('#checkifValid', function() {
    it('Address should be valid', function(done) {
        addr.checkifValid(validaddress, function(addressCheck){
        assert.equal(addressCheck, "Address is valid");
        done();
        });
    });
 });

describe('#checkifnotValid', function() {
   it('Address should be invalid', function(done) {
        addr.checkifValid(invalidaddress, function(addressCheck){
        assert.equal(addressCheck, "Address is invalid");
        done();
        }); 
    });
});

describe('#checkifMineAllowed', function() {
   it('Address should has mining permission', function(done) {
        addr.checkifMineAllowed(miningaddress, function(permissionCheck){
        assert.equal(permissionCheck, "Address has mining permission");
        done();
        }); 
    });
});

describe('#checkifMinenotAllowed', function() {
   it('Address should not has mining permission', function(done) {
        addr.checkifMineAllowed(nonminingaddress, function(permissionCheck){
        assert.equal(permissionCheck, "Address has not mining permission");
        done();
        }); 
    });
});

describe('#checkBalance', function() {
   it('should return correct balance', function(done) {
        addr.checkBalance(validaddress, function(balance){
        assert(balance > 0);
        done();
        }); 
    });
});

describe('#importAddress', function() {
    it('Address should imported successfully', function(done) {
        addr.importAddress(validaddress, function(addressCheck){
        assert.equal(addressCheck, "Address successfully imported");
        done();
        });
    });
 });

 describe('#importAddress', function() {
    it('Address should not imported successfully', function(done) {
        addr.importAddress(invalidaddress, function(addressCheck){
        assert.equal(addressCheck, "Invalid Rk address or script");
        done();
        });
    });
 });



