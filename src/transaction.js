var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Transaction {

 sendTransaction(sender_address, reciever_address, data, amount){
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
     
     //return address;
      }
    });
    while(txid === undefined) {
      require('deasync').runLoopOnce();
    } 
      return txid;
  }

 createRawTransaction(sender_address, reciever_address, data, amount){
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
     
     //return address;
      }
    });
    while(txhex === undefined) {
      require('deasync').runLoopOnce();
    } 
      return txhex;
  }

 signRawTransaction(txhex, private_key){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var priv_key = [];
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
     
     //return address;
      }
    });
    while(signedtxhex === undefined) {
      require('deasync').runLoopOnce();
    } 
      return signedtxhex;
  }

 sendRawTransaction(signedtxhex){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
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
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response);
        throw new Error(response.error);
     }
      else{
     var result = response.body; 
     txid = result['result'];
     
     //return address;
      }
    });
    while(txid === undefined) {
      require('deasync').runLoopOnce();
    } 
      return txid;
  }

  sendSignedTransaction(sender_address, reciever_address, amount, private_key, data) {
  	var hexdata = Buffer.from(data, 'utf8').toString('hex');
    var txhex = this.createRawTransaction(sender_address, reciever_address, data, amount);
    var signed_tx_hex = this.signRawTransaction(txhex, private_key);
    var tx_id = this.sendRawTransaction(signed_tx_hex);
    return tx_id;
}

retrieveTransaction(txid){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var hex;
 var data;
 var amount;
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
     data = result['result']['data'];
     amount = result['result']['vout'][0]['value'];
     
     //return address;
      }
    });
    while(hex === undefined) {
      require('deasync').runLoopOnce();
    } 
      return [hex, data, amount];
  }

 getFee(address, txid){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var fee
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
     fee = result['result']['balance']['amount'];
     
     //return address;
      }
    });
    while(fee === undefined) {
      require('deasync').runLoopOnce();
    } 
      return fee;
  }


}

var info = new Transaction();
var r = info.getFee("mpC8A8Fob9ADZQA7iLrctKtwzyWTx118Q9","a5f7f479af5f465814aaf07f9f89297266641d2b71ede9e87653403c7581c1f7");
console.log(r);