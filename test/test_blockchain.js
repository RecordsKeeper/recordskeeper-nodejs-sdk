'use strict';
var path = require('path');
var assert = require('assert');
var fs = require('fs');
var Blockchain = require('../src/blockchain.js');
var b = new Blockchain();
var config;
var blockchain_protocol;
var blockchain_description;
var blockchain_root_stream;
var max_blocksize;
var default_networkport;
var default_rpcport;
var blockchain_mining_diversity;
var blockchain_name;
var nodeaddress;

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
    blockchain_protocol = config['chain-protocol'];
    blockchain_description = config['chain-description'];
    blockchain_root_stream = config['chain-root-stream'];
    max_blocksize = config['max-block-size'];
    default_networkport = config['default-network-port'];
    default_rpcport = config['default-rpc-port'];
    blockchain_mining_diversity = config['mining-diversity'];
    blockchain_name= config['chain-name'];
    nodeaddress = config['node-address'];
} else {
    require('dotenv').config();
    blockchain_protocol = process.env.chain-protocol;
    blockchain_description = process.env.chain-description;
    blockchain_root_stream = process.env.chain-root-stream;
    max_blocksize = process.env.max-block-size;
    default_networkport = process.env.default-network-port;
    default_rpcport = process.env.default-rpc-port;
    blockchain_mining_diversity = process.env.mining-diversity;
    blockchain_name= process.env.chain-name;
    nodeaddress = process.env.node-address;
}


describe('#getChainInfo', function() {
    it('should return correct chain information', function(done) {
        b.getChainInfo(function(response){
        var chain_protocol = response['chain-protocol'];
        assert.equal(chain_protocol, blockchain_protocol);
        var chain_description = response['chain-description'];
        assert.equal(chain_description, blockchain_description);
        var root_stream_name = response['root-stream-name'];
        assert.equal(root_stream_name, blockchain_root_stream);
        var maximum_block_size = response['maximum-blocksize'];
        assert.equal(maximum_block_size, max_blocksize);
        var default_network_port = response['default-network-port'];
        assert.equal(default_network_port, default_networkport );
        var default_rpc_port = response['default-rpc-port'];
        assert.equal(default_rpc_port, default_rpcport );
        var mining_diversity = response['mining-diversity'];
        assert.equal(mining_diversity, blockchain_mining_diversity);
        var chain_name = response['chain-name'];
        assert.equal(chain_name, blockchain_name );
        done();
        });
    });
  }); 

 describe('#getNodeInfo', function() {
    it('should return correct node info', function(done) {
        b.getNodeInfo(function(response){
        var node_balance = response['node-balance'];
        assert(node_balance>100);
        var blocks = response['blocks'];
        assert(blocks>100);
        var node_address = response['node-address'];
        assert.equal(node_address, nodeaddress);
        var difficulty = response['difficulty'];
        assert(difficulty<1);
        done();
    });
  });
  }); 

  describe('#permissions', function() {
    it('should return correct permissions', function(done) {
        b.permissions(function(permissions){
        assert(permissions, ['mine', 'admin', 'activate', 'connect', 'send', 'receive', 'issue', 'create']);
        done();
    });
  });
  });

 describe('#getpendingTransactions', function() {
    it('should return correct pending transactions', function(done) {
        b.getpendingTransactions(function(response){
        var tx_count = response['tx-count'];
        assert(tx_count>=0);
        var tx = response['tx'];
        assert.deepEqual(tx, []);
        done();
    });
  });
  });

  describe('#checkNodeBalance', function() {
    it('should return correct node balance', function(done) {
        b.checkNodeBalance(function(balance){
        assert(balance>0);
        done();
    });
  });
  });  
