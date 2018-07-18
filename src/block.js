var path = require('path');
var unirest = require("unirest");
var fs = require('fs');
var config;
var rk_host;
var rk_user;
var rk_pass;
var rk_chain;

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
    rk_host = config['rk_host'];
    rk_user = config['rk_user'];
    rk_pass = config['rk_pass'];
    rk_chain = config['rk_chain']; 
} else {
    require('dotenv').config();   
    rk_host = process.env.rk_host;
    rk_user = process.env.rk_user;
    rk_pass = process.env.rk_pass;
    rk_chain = process.env.rk_chain;
}

module.exports = class Block {
 
 blockinfo(block_height, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var blockheight = String(block_height);
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
 var param_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getblock",
    "params": [blockheight],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     var status = result['result'];
     if(status == null){
        param_array = result['error']['message'];
     } else {
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
     param_array['tx_count']=tx_count;
     param_array['tx']= tx;
     param_array['miner']= miner;
     param_array['size']= size;
     param_array['nonce']= nonce;
     param_array['blockhash']= blockhash;
     param_array['previousblockhash']= previousblockhash;
     param_array['nextblockhash']= nextblockhash;
     param_array['merkleroot']= merkleroot;
     param_array['blocktime']= blocktime;
     param_array['difficulty']= difficulty;
 }
     callback(param_array);
    }); 
  }

retrieveBlocks(block_range, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var blockhash = [];
 var miner = [];
 var blocktime = [];
 var tx_count = [];
 var result;
 var param_array= {};
 
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
     result = response.body; 
     var count = result['result'];
     if (count == null){
        param_array = result['error']['message'];
     } else {
     var block_count = count.length;
     for (var i= 0; i< block_count; i++){
     	miner.push(result['result'][i]['miner']);
     	blockhash.push(result['result'][i]['hash']);
     	blocktime.push(result['result'][i]['time']);
     	tx_count.push(result['result'][i]['txcount']);
     }
     param_array['miner']= miner;
     param_array['blockhash']= blockhash;
     param_array['blocktime']= blocktime;
     param_array['tx-count']=tx_count;
 }
     callback(param_array);
    });
  }



}