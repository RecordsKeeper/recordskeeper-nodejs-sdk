var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Blockchain {
 getChainInfo(){
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
      	console.log(result);
        chain_protocol = result['result']['chain-protocol'];
		chain_description = result['result']['chain-description'];
		root_stream = result['result']['root-stream-name'];
		max_blocksize = result['result']['maximum-block-size'];
		default_networkport = result['result']['default-network-port'];
		default_rpcport = result['result']['default-rpc-port'];
		mining_diversity = result['result']['mining-diversity'];
		chain_name = result['result']['chain-name'];
     
      }
    });
    while(chain_protocol === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return [chain_protocol, chain_description, root_stream, max_blocksize, default_networkport, default_rpcport, mining_diversity, chain_name];
  }

 getNodeInfo(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var node_balance;
 var synced_blocks;
 var node_address;
 var difficulty;
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
    });
    while(node_balance === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return [node_balance, synced_blocks, node_address, difficulty];
  }

 permissions(){
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
        
     
      }
    });
    while(per_count === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return permissions;
  }

 getpendingTransactions(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var tx_count;
 var tx = [];
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
        
     
      }
    });
    while(tx_count === undefined) {
      require('deasync').runLoopOnce();
    } 

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
    });
    while(tx_count === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return [tx_count, tx];
  }

 checkNodeBalance(){
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
      	//console.log(result);
      	balance = result['result']['total'][0]['qty'];
      	}
    });
    while(balance === undefined) {
      require('deasync').runLoopOnce();
    } 
      
      return balance;
  }


}

var info = new Blockchain();
var r = info.checkNodeBalance();
console.log(r);