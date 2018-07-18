'use strict';
var path = require('path');
var assert = require('assert');
var Stream = require('../src/stream.js');
var s = new Stream();
var fs = require('fs');
var config;
var stream;
var validaddress;
var txid;

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
    stream = config['stream'];
    validaddress = config['validaddress'];
    txid = config['txid']; 
} else {
    //require('dotenv').config();   
    stream = process.env.stream;
    validaddress = process.env.validaddress;
    txid = process.env.txid; 
}

describe('#publish', function() {
    it('should publish data', function(done) {
        s.publish(validaddress, stream, "key1", "data", function(response){
        var length = response.length;
        assert.equal(length, 64);
        done();
        });
    });
  }); 

 describe('#retrieve', function() {
    it('should retrieve data', function(done) {
        s.retrieve(stream, txid, function(response){
        assert.equal(response, 'data');
        done();
        });
    });
  }); 

  describe('#retrieveWithAddress', function() {
    it('should retrieve with Address', function(done) {
        s.retrieveWithAddress(stream, validaddress, 10, function(response){
        var key = response['key'][0];
        assert.equal(key, 'test');
        var txid = response['txid'][0];
        assert.equal(txid, 'a25958e2affed78050f10b84be66316df7eda4b76c18bdfc7c69d528dd2ccbc1');
        var data = response['data'][0];
        assert.equal(data, 'This is test data');
        done();
        });
    });
  }); 

  describe('#retrieveWithKey', function() {
    it('should retrieve data with Key', function(done) {
        s.retrieveWithKey(stream, "test", 10, function(response){
        var publisher = response['publishers'][0];
        assert.equal(publisher, validaddress);
        var txid = response['txid'][0];
        assert.equal(txid, 'a25958e2affed78050f10b84be66316df7eda4b76c18bdfc7c69d528dd2ccbc1');
        var data = response['data'][0];
        assert.equal(data, 'This is test data');
        done();
        });
    });
  }); 

 describe('#VerifyData', function() {
    it('should verify correct data', function(done) {
        s.verifyData(stream, "This is test data", 100, function(response){
        assert.equal(response, 'Data is successfully verified.');
        done();
        });
    });
  }); 

  describe('#DataNotVerified', function() {
    it('should convert single digits', function(done) {
        s.verifyData(stream, "This is test", 100, function(response){
        assert.equal(response, "No data found.");
        done();
        });
    });
  }); 
  
  describe('#retrieveItems', function() {
    it('should convert single digits', function(done) {
        s.retrieveItems(stream, 10, function(response){
        var publisher = response['publishers'][0];
        assert.equal(publisher, validaddress);
        var txid = response['txid'][0];
        assert.equal(txid, '8811dbd4c9b6ed537cf4b1552cddcc8751987e284f45ebf0649b5bb2d9078915');
        var data = response['data'][0];
        assert.equal(data, 'This is test data');
        var key = response['key'][0];
        assert.equal(key, 'test');
        done();
        });
    });
  }); 
