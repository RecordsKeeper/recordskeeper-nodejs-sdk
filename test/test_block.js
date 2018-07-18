'use strict';
var path = require('path');
var assert = require('assert');
var Block = require('../src/block.js');
var fs = require('fs');
var b = new Block();
var config;
var validaddress;
var block_miner;
var block_size;
var block_nonce;
var block_hash;
var previousblock_hash;
var nextblock_hash;
var merkle_root;
var block_time;
var block_difficulty;
var block_tx_count;

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
    block_miner = config['block-miner'];
    block_size = config['block-size'];
    block_nonce = config['block-nonce'];
    block_hash = config['blockhash'];
    previousblock_hash =  config['previousblockhash'];
    nextblock_hash =  config['nextblockhash'];
    merkle_root =  config['merkle-root'];
    block_time = config['block-time'];
    block_difficulty = config['block-difficulty'];
    block_tx_count = config['block-tx-count'];
} else {
    require('dotenv').config();
    validaddress = process.env.validaddress;
    block_miner = process.env.block-miner;
    block_size = process.env.block-size;
    block_nonce = process.env.block-nonce;
    block_hash = process.env.blockhash;
    previousblock_hash = process.env.previousblockhash;
    nextblock_hash =  process.env.nextblockhash;
    merkle_root =  process.env.merkle-root;
    block_time = process.env.block-time;
    block_difficulty = process.env.block-difficulty;
    block_tx_count = process.env.block-tx-count;
}



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
        var tx_count = response['tx-count'][0];
        assert.equal(tx_count, block_tx_count);
        done();
        });
    });
  }); 