var unirest = require("unirest");

class Transaction {

 constructor(config) {
    this.rk_host = config['rk_host'];
    this.rk_user = config['rk_user'];
    this.rk_pass = config['rk_pass'];
    this.rk_chain = config['rk_chain'];
    }

 sendTransaction(sender_address, reciever_address, data, amount, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var txid;
 var hexdata = Buffer.from(data, 'utf8').toString('hex');
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "createrawsendfrom",
    "params": [sender_address, {[reciever_address] : amount}, [hexdata], "send"],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
    
     var result = response.body; 
     txid = result['result'];
     txid = result['result'];
     if(txid == null){
        txid = result['error']['message'];
     } else {
       txid = result['result']; 
     }
     callback(txid);
    });
  }

 createRawTransaction(sender_address, reciever_address, data, amount, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var txhex;
 var hexdata = Buffer.from(data, 'utf8').toString('hex');
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "createrawsendfrom",
    "params": [sender_address, {[reciever_address] : amount}, [hexdata], ""],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
    
     var result = response.body; 
     txhex = result['result'];
     if(txhex == null){
        txhex = result['error']['message'];
     } else {
       txhex = result['result']; 
     }
     callback(txhex);
    });
  }

 signRawTransaction(txhex, private_key, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var priv_key = [];
 var status;
 var tx_status;
 priv_key.push(private_key);
 var signedtxhex;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "signrawtransaction",
    "params": [txhex, [], priv_key],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     var result = response.body;
     tx_status = result['result'];
     if(tx_status == null){
        signedtxhex = result['error']['message'];
     } else {
        status = result['result']['complete'];
        if(status == true){
        signedtxhex = result['result']['hex'];
     } else {
        signedtxhex = "Transaction has not been signed."
     }
 }
     callback(signedtxhex);
    }); 
  }

 sendRawTransaction(signedtxhex, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var txid;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "sendrawtransaction",
    "params": [signedtxhex],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     txid = result['result'];
     if(txid === null){
     txid = result['error']['message'];
      }
     else {
        txid = result['result'];
     }
     callback(txid);
    });
  }

sendSignedTransaction(sender_address, reciever_address, amount, private_key, data, callback) {
  	var hexdata = Buffer.from(data, 'utf8').toString('hex');
    this.createRawTransaction(sender_address, reciever_address, hexdata, amount,function(txhex){
    this.signRawTransaction(txhex, private_key, function(signedtxhex){
    this.sendRawTransaction(signedtxhex, function(txid){
          callback(txid);
        });

      }.bind(this));
    }.bind(this));
}

retrieveTransaction(txid, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var hex;
 var data;
 var amount;
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getrawtransaction",
    "params": [txid, 1],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     
     var result = response.body; 
     var status = result['result'];
     if(status == null){
        params_array = result['error']['message'];
     }
     else {
     var hexdata = result['result']['data'][0];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     amount = result['result']['vout'][0]['value'];
      params_array['data'] = data;
      params_array['amount'] = amount;
    }
      callback(params_array);
    });
  }

 getFee(address, txid, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var fee;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getaddresstransaction",
    "params": [address, txid, true],
    "id": 1,
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     
     var result = response.body; 
     var status = result['result'];
     if(status == null){
        fee = result['error']['message'];
     } else {
     var sent_amount = result['result']['vout'][0]['amount'];
     var balance_amount = result['result']['balance']['amount'];
     fee = Math.abs(balance_amount) - sent_amount;
 }
     callback(fee);
    }); 
  }
}

module.exports = Transaction;