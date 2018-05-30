var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Wallet  {

 importAddress(public_address) {
     var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
     var req = unirest("POST", rk_host);
     var status;
 
     req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "importaddress",
    "params": [public_address," ", false],
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
     status = result['result'];
     //return address;
      }
    });
    while(status === undefined) {
      require('deasync').runLoopOnce();
    } 
      return status;
 }

 createWallet(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var public_address;
 var private_key;
 var public_key;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "createkeypairs",
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
     public_address = result['result'][0]['address'];
     private_key = result['result'][0]['privkey'];
     public_key = result['result'][0]['pubkey'];

     
     //return address;
      }
    });
    while(public_address === undefined) {
      require('deasync').runLoopOnce();
    } 
      this.importAddress(public_address);
      return [public_address, private_key, public_key];
  }

  getPrivateKey(public_address) {
     var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
     var req = unirest("POST", rk_host);
     var private_key;
 
     req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "dumpprivkey",
    "params": [public_address],
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
     private_key = result['result'];
     //return address;
      }
    });
    while(private_key === undefined) {
      require('deasync').runLoopOnce();
    } 
      return private_key;
 }

 retrieveWalletinfo(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var balance;
 var tx_count;
 var unspent_tx;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getwalletinfo",
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
     balance = result['result']['balance'];
     tx_count = result['result']['txcount'];
     unspent_tx = result['result']['utxocount'];

     
     //return address;
      }
    });
    while(balance === undefined) {
      require('deasync').runLoopOnce();
    } 
      return [balance, tx_count, unspent_tx];
  }


}

var info = new Wallet();
var r = info.retrieveWalletinfo();
console.log(r);