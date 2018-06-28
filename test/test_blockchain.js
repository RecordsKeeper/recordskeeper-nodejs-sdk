'use strict';
var config = require('../src/config.json');
var assert = require('assert');
var Blockchain = require('../src/blockchain.js');
var b = new Blockchain();
var blockchain_protocol = config['chain-protocol'];
var blockchain_description = config['chain-description'];
var blockchain_root_stream = config['chain-root-stream'];
var max_blocksize = config['max-block-size'];
var default_networkport = config['default-network-port'];
var default_rpcport = config['default-rpc-port'];
var blockchain_mining_diversity = config['mining-diversity'];
var blockchain_name= config['chain-name'];
var nodeaddress = config['node-address'];

describe('#getChainInfo', function() {
    it('should return correct chain information', function(done) {
        b.getChainInfo(function(response){
        var chain_protocol = response['chain-protocol'];
        assert.equal(chain_protocol, blockchain_protocol);
        var chain_description = response['chain-description'];
        assert.equal(chain_description, blockchain_description);
        var root_stream_name = response['root-stream-name'];
        assert.equal(root_stream_name, blockchain_root_stream);
        var maximum_block_size = response['maximum-block-size'];
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
