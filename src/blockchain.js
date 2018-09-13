var unirest = require("unirest");

class Blockchain {
 
 constructor(config) {
    this.rk_host = config['rk_host'];
    this.rk_user = config['rk_user'];
    this.rk_pass = config['rk_pass'];
    this.rk_chain = config['rk_chain'];
    }

 getChainInfo(callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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
    "chain_name": this.rk_chain
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
      params_array['maximum-block-size']=max_blocksize;
      params_array['default-network-port']=default_networkport;
      params_array['default-rpc-port']=default_networkport;
      params_array['mining-diversity'] = mining_diversity;
      params_array['chain-name'] = chain_name;
      callback(params_array);
    }); 
  }

 getNodeInfo(callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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
    "chain_name": this.rk_chain
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
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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
    "chain_name": this.rk_chain
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
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var tx_count;
 var tx = [];
 var params_array = {};
 var chain_name = this.rk_chain;
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
    "chain_name": chain_name
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
    "chain_name": chain_name
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
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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
    "chain_name": this.rk_chain
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

module.exports = Blockchain;