'use strict';
var path = require('path');
var assert = require('assert');
var Permissions = require('../src/permissions.js');
var per = new Permissions();
var fs = require('fs');
var config;
var miningaddress;
var nonminingaddress;

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
        miningaddress = config['miningaddress'];
        nonminingaddress = config['nonminingaddress'];
} else {
    //require('dotenv').config();
    miningaddress = process.env.miningaddress;
    nonminingaddress = process.env.nonminingaddress; 
}

describe('#grantPermissions', function() {
    it('should grant permission', function(done) {
        per.grantPermissions(miningaddress, "mine", function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 
 
 describe('#failedgrantPermissions', function() {
    it('grant permission should failed', function(done) {
        per.grantPermissions(nonminingaddress, "mine", function(response){
        assert.equal(response, "Invalid address:"+" "+nonminingaddress);
        done();
        });
    });
  }); 

describe('#revokePermissions', function() {
    it('should revoke permission', function(done) {
        per.revokePermission(miningaddress, "mine", function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 

 describe('#failedrevokePermissions', function() {
    it('should not revoke permission', function(done) {
        per.revokePermission(nonminingaddress, "mine", function(response){
        assert.equal(response, "Invalid address:"+" "+nonminingaddress);
        done();
        });
    });
  }); 