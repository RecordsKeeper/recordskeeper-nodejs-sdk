'use strict';
var assert = require('assert');
var config = require('./config.json');
var Permissions = require('../src/permissions.js');
var per = new Permissions(config);
var miningaddress = config['miningaddress'];
var nonminingaddress = config['nonminingaddress'];

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