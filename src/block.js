var path = require('path');
var config = require(path.resolve( __dirname,'../../../config.json'));
var unirest = require("unirest");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

module.exports = class Block {
 
 blockinfo(block_height, callback){
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
 var param_array = {};
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
     callback(param_array);
      }
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
     param_array['miner']= miner;
     param_array['blockhash']= blockhash;
     param_array['blocktime']= blocktime;
     param_array['tx_count']=tx_count;
     callback(param_array);
     
      }
    });
  }



}