var config = require('./config.json');
var unirest = require("unirest");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

module.exports = class Transaction {

 sendTransaction(sender_address, reciever_address, data, amount, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        //console.log(response.error);
        throw new Error(response.error);
     }
      else{
     var result = response.body; 
     txid = result['result'];
     callback(txid);
      }
    });
  }

 createRawTransaction(sender_address, reciever_address, data, amount, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        //console.log(response.error);
        throw new Error(response.error);
     }
      else{
     var result = response.body; 
     txhex = result['result'];
     callback(txhex);
      }
    });
  }

 signRawTransaction(txhex, private_key, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var priv_key = [];
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        //console.log(response.error);
        throw new Error(response.error);
     }
      else{
     var result = response.body;
     signedtxhex = result['result']['hex'];
     callback(signedtxhex);
      }
    }); 
  }

 sendRawTransaction(signedtxhex, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var txid;
 var tx;
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     tx = result['result'];
     if(tx === null){
     txid = result['error']['message'];
      }
     else {
        txid = tx; 
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
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{
     
     var result = response.body; 
     hex = result['result']['hex'];
     var hexdata = result['result']['data'][0];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     amount = result['result']['vout'][0]['value'];
      }
      params_array['hex'] = hex;
      params_array['data'] = data;
      params_array['amount'] = amount;
      callback(params_array);
    });
  }

 getFee(address, txid, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{
     
     var result = response.body; 
     var sent_amount = result['result']['vout'][0]['amount'];
     var balance_amount = result['result']['balance']['amount'];
     fee = Math.abs(balance_amount) - sent_amount;
     callback(fee);
      }
    }); 
  }


}