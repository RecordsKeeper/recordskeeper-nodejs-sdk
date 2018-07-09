'use strict';
var path = require('path');
var config = require(path.resolve( __dirname,'../../../config.json'));
var assert = require('assert');
var Block = require('../src/block.js');
var b = new Block();
var block_miner = config['block-miner'];
var block_size = config['block-size'];
var block_nonce = config['block-nonce'];
var block_hash = config['blockhash'];
var previousblock_hash =  config['previousblockhash'];
var nextblock_hash =  config['nextblockhash'];
var merkle_root =  config['merkle-root'];
var block_time = config['block-time'];
var block_difficulty = config['block-difficulty'];
var block_tx_count = config['block-tx-count'];



describe('#blockinfo', function() {
    it('should return correct blockinfo', function(done) {
        b.blockinfo("2", function(response){
        var miner = response['miner'];
        assert.equal(miner, block_miner);
        var size = response['size'];
        assert.equal(size, block_size);
        var nonce = response['nonce'];
        assert.equal(nonce, block_nonce);
        var blockhash = response['blockhash'];
        assert.equal(blockhash, block_hash );
        var previousblockhash = response['previousblockhash'];
        assert.equal(previousblockhash, previousblock_hash );
        var nextblockhash = response['nextblockhash'];
        assert.equal(nextblockhash, nextblock_hash );
        var merkleroot = response['merkleroot'];
        assert.equal(merkleroot, merkle_root );
        var blocktime = response['blocktime'];
        assert.equal(blocktime, block_time);
        var difficulty = response['difficulty'];
        assert.equal(difficulty, block_difficulty );
        var tx_count = response['tx_count'];
        assert.equal(tx_count, block_tx_count);
        done();
        });
    });
  }); 

 describe('#retrieveBlocks', function() {
    it('should retrieve correct blockrangeinfo', function(done) {
        b.retrieveBlocks("2-10", function(response){
        var miner = response['miner'][0];
        assert.equal(miner, block_miner);
        var blockhash = response['blockhash'][0];
        assert.equal(blockhash, block_hash );
        var blocktime = response['blocktime'][0];
        assert.equal(blocktime, block_time);
        var tx_count = response['tx_count'][0];
        assert.equal(tx_count, block_tx_count);
        done();
        });
    });
  }); 