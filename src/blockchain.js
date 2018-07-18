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

module.exports = class Blockchain {
 getChainInfo(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var chain_protocol;
 var chain_description;
 var root_stream;
 var max_blocksize;
 var default_networkport;
 var default_rpcport;
 var mining_diversity;
 var chain_name;
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getblockchainparams",
    "params": [],
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
        chain_protocol = result['result']['chain-protocol'];
		    chain_description = result['result']['chain-description'];
		    root_stream = result['result']['root-stream-name'];
		    max_blocksize = result['result']['maximum-block-size'];
		    default_networkport = result['result']['default-network-port'];
		    default_rpcport = result['result']['default-rpc-port'];
		    mining_diversity = result['result']['mining-diversity'];
		    chain_name = result['result']['chain-name'];
      }
      params_array['chain-protocol']=chain_protocol;
      params_array['chain-description']=chain_description;
      params_array['root-stream-name']=root_stream;
      params_array['maximum-blocksize']=max_blocksize;
      params_array['default-network-port']=default_networkport;
      params_array['default-rpc-port']=default_networkport;
      params_array['mining-diversity'] = mining_diversity;
      params_array['chain-name'] = chain_name;
      callback(params_array);
    }); 
  }

 getNodeInfo(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var node_balance;
 var synced_blocks;
 var node_address;
 var difficulty;
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getinfo",
    "params": [],
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
    node_balance = result['result']['balance']
		synced_blocks = result['result']['blocks']
		node_address = result['result']['nodeaddress']
		difficulty = result['result']['difficulty']
     
      }

      params_array['node-balance']=node_balance;
      params_array['blocks']=synced_blocks;
      params_array['node-address']=node_address;
      params_array['difficulty']=difficulty;
      callback(params_array);

    });
  }

 permissions(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var permissions = [];
 var per_count;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "listpermissions",
    "params": [],
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
      	var count = result['result'];
      	per_count = count.length;
      	for(var i=0; i < per_count; i++){
      		permissions.push(count[i]['type']);
      	}
        
        callback(permissions);
     
      }
    });
  }

 getpendingTransactions(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var tx_count;
 var tx = [];
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getmempoolinfo",
    "params": [],
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
      	var count = result['result'];
      	tx_count = count['size'];
       if(tx_count!=0){
       req.headers({
      "cache-control": "no-cache",
      "authorization": auth,
      "content-type": "application/json"
      });
 
     req.type("json");
     req.send({
    "method": "getrawmempool",
    "params": [],
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
      	var count = result['result'];
      	tx_count = count.length;
      	for(var i=0; i < tx_count; i++){
      		tx.push(count);
      	}
      }
      params_array['tx-count'] = tx_count;
      params_array['tx'] = tx;
      callback(params_array);
    }); 
  } else {
    tx.push("No pending transactions");

  }
   params_array['tx-count'] = tx_count;
        params_array['tx'] = tx;
        callback(params_array);
       }
    });
  }

 checkNodeBalance(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var balance;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getmultibalances",
    "params": [],
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
      	balance = result['result']['total'][0]['qty'];
      	}
        callback(balance);
    });
  }


}