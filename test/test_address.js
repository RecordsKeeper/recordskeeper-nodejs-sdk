'use strict';
var path = require('path');
var assert = require('assert');
var Address = require('../src/address.js');
var add = new Address();
var fs = require('fs');
var config;
var validaddress;
var invalidaddress;
var miningaddress;
var nonminingaddress;
var multisigkey;
var multisigaddress;

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
    invalidaddress = config['invalidaddress'];
    miningaddress = config['miningaddress'];
    nonminingaddress = config['nonminingaddress'];
    multisigkey = config['multisigkey'];
    multisigaddress = config['multisigaddress'];
} else {
    //require('dotenv').config();
    validaddress = process.env.validaddress;
    invalidaddress = process.env.invalidaddress;
    miningaddress = process.env.miningaddress;
    nonminingaddress = process.env.nonminingaddress;
    multisigkey = process.env.multisigkey;
    multisigaddress = process.env.multisigaddress; 
}

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




