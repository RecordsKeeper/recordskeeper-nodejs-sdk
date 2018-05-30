var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Block {
 
 blockinfo(block_height){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var tx =[];
 var miner;
 var tx_count;
 var nonce;
 var blockhash;
 var previousblockhash;
 var nextblockhash; 
 var merkleroot;
 var blocktime;
 var difficulty;
 
 var size;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getblock",
    "params": [block_height],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{
     var result = response.body; 
     var count = result['result']['tx'];
     miner = result['result']['miner'];
     size = result['result']['size'];
     nonce = result['result']['nonce'];
     blockhash = result['result']['hash'];
     previousblockhash = result['result']['previousblockhash'];
     nextblockhash = result['result']['nextblockhash'];
     merkleroot = result['result']['merkleroot'];
     blocktime = result['result']['time'];
     difficulty = result['result']['difficulty'];
     tx_count = count.length;
     for (var i= 0; i< tx_count; i++){
     	tx.push(count[i]);
     }
     
      }
    });
    while(miner === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return [tx_count, tx, miner, size, nonce, blockhash, previousblockhash, nextblockhash, merkleroot, blocktime, difficulty];
  }

retrieveBlocks(block_range){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var blockhash = [];
 var miner = [];
 var blocktime = [];
 var tx_count = [];
 var result;
 
 var size;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "listblocks",
    "params": [block_range],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{
     result = response.body; 
     var count = result['result'];
     var block_count = count.length;
     for (var i= 0; i< block_count; i++){
     	miner.push(result['result'][i]['miner']);
     	blockhash.push(result['result'][i]['hash']);
     	blocktime.push(result['result'][i]['time']);
     	tx_count.push(result['result'][i]['txcount']);
     }
     
      }
    });
    while(result === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return [tx_count, miner, blockhash, blocktime];
  }



}

var info = new Block();
var r = info.retrieveBlocks("10-20");
console.log(r);