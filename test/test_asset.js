'use strict';
var path = require('path');
var assert = require('assert');
var Assets = require('../src/assets.js');
var As = new Assets();
var fs = require('fs');
var config;
var validaddress;

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
} else {
    //require('dotenv').config();
    validaddress = process.env.validaddress;
}

describe('#createAsset', function() {
    it('should create new asset', function(done) {
        As.createAsset(validaddress, "ABC", 100000, function(response){
        console.log(response);
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 

describe('#sendAsset', function() {
    it('should send assets', function(done) {
        As.sendAsset(validaddress, "XRK1", 1000, function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 

 describe('#retrieveAssets', function() {
    it('should retrieve asset information', function(done) {
        As.retrieveAsset(function(response){
        var name = response['asset_name'][0];
        assert.equal(name, 'testasset');
        var id = response['issue_id'][0];
        assert.equal(id, "7d6e52a1d0cfa9662709a7b2724c2ffc03701defc618481b59da4cd18fa20ddd");
        var qty = response['issue_qty'][0];
        assert.equal(qty, 10);
        var count = response['asset_count'];
        assert.equal(count, 17);
        done();
        });
    });
  });