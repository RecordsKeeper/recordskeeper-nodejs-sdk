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
    //require('dotenv').config();   
    rk_host = process.env.rk_host;
    rk_user = process.env.rk_user;
    rk_pass = process.env.rk_pass;
    rk_chain = process.env.rk_chain;
}

module.exports = class Wallet  {

importAddress(public_address, callback) {
      var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
      var req = unirest("POST", rk_host);
      var status;
      var resp;
 
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
     var result = response.body; 
     status = result['result'];
     var error = result['error'];
     if (status == null & error == null){
        resp = "Address successfully imported";
     } else if((status == null & error != null)){
        resp = error['message'];
     } else {
        resp = 0;
     }
     callback(resp); 
  });
}

 createWallet(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var public_address;
 var private_key;
 var public_key;
 var walletCredentials = {};
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
    
     this.importAddress(public_address, function(response){
      walletCredentials['public_address'] = public_address;
      walletCredentials['private_key'] = private_key;
      walletCredentials['public_key'] = public_key;
      callback(walletCredentials);
      });
  }
       }.bind(this)); 
  }

  getPrivateKey(public_address, callback) {
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
     var result = response.body; 
     private_key = result['result']   
     if (private_key == null){
     private_key = result['error']['message'];
 } else {
    private_key = result['result'];
 }
     callback(private_key);
    });
      
 }

 retrieveWalletInfo(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var balance;
 var tx_count;
 var unspent_tx;
 var walletCredentials = {};
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
     walletCredentials['balance'] = balance;
     walletCredentials['tx-count'] = tx_count;
     walletCredentials['unspent-tx'] = unspent_tx;
     callback(walletCredentials);
      }
    });
  }

 backupWallet(filename, callback) {
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
    "method": "backupwallet",
    "params": [filename],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Backup Successful";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}
 
importWallet(filename, callback) {
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
    "method": "importwallet",
    "params": [filename],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Wallet is successfully imported";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}

dumpWallet(filename, callback) {
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
    "method": "dumpwallet",
    "params": [filename],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Wallet is successfully dumped";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}

lockWallet(password, callback) {
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
    "method": "encryptwallet",
    "params": [password],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Wallet is successfully encrypted";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}

unlockWallet(password, unlocktime, callback) {
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
    "method": "walletpassphrase",
    "params": [password, unlocktime],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Wallet is successfully unlocked";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}

changeWalletPassword(old_password, new_password, callback) {
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
    "method": "walletpassphrasechange",
    "params": [old_password, new_password],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']   
     if (status == null){
     status = "Password successfully changed!";
 } else {
    status = result['error']['message'];
 }
     callback(status);
    });
}

signMessage(private_key, message, callback) {
      var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
      var req = unirest("POST", rk_host);
      var status;
      var message;
 
     req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "signmessage",
    "params": [private_key, message],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result'];
     if(status == null){
     message = result['error']['message'];
     } else {
        message = result['result'];
     }  
     callback(message);
    });
}

verifyMessage(address, signedMessage, message, callback) {
      var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
      var req = unirest("POST", rk_host);
      var status;
      var valid;
 
     req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "verifymessage",
    "params": [address, signedMessage, message],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result']; 
     if (status == null){
        valid = result['error']['message'];
     } else {
     if(status == true){
        valid = "Message is verified";
     }  
     else {
        valid = "Message is incorrect";
     }
 }
     callback(valid);
    });
}

}