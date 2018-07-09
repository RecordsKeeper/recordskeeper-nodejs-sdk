'use strict';
var unirest = require("unirest");
var path = require('path');
var config = require(path.resolve( __dirname,'../../../config.json'));
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

module.exports = class Address {
getAddress(callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var address;
 
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getnewaddress",
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
     address= result['result'];
     callback(address);
      }
    });
  }

 getMultisigAddress(required, key, callback) {
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var address;
 var keys = key.split(",");
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "createmultisig",
    "params": [required, keys],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     address= result['result'];
     if(address == null){
       address = result['error']['message'];
     } else {
        address= result['result']['address'];
     }
     callback(address);
    });
}

getMultisigWalletAddress(required, key, callback) {
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var multisigaddress;
 var address;
 var keys = key.split(",");
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "addmultisigaddress",
    "params": [required, keys],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     address= result['result'];
     if(address == null){
       multisigaddress = result['error']['message'];
     } else {
        multisigaddress= result['result'];
     }
     callback(multisigaddress);
    });
}

 retrieveAddresses(callback) {
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var address;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getaddresses",
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
     address= result['result'];
     callback(address);
     
      }
    });
}

 checkifValid(addr, callback) {
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var valid;
 var addressCheck;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "validateaddress",
    "params": [addr],
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
     valid = result['result']['isvalid'];
     if (valid == true){
        addressCheck = "Address is valid";
     }
      else {
        addressCheck = "Address is invalid";
      }
    callback(addressCheck);
      }
    });
  }

 checkifMineAllowed(addr, callback) {
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var permission;
 var permissionCheck;
 
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "validateaddress",
    "params": [addr],
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
     permission = result['result']['ismine'];
     if (permission == true){
        permissionCheck = "Address has mining permission";
     }
      else {
        permissionCheck  = "Address has not mining permission";
      }
      callback(permissionCheck);
      }
    });
      return permissionCheck;
}
checkBalance(address, callback) {
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
    "method": "getaddressbalances",
    "params": [address],
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
     balance= result['result'][0]['qty'];
     callback(balance);
      }
    });
}

importAddress(addr, callback) {
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
    "params": [addr," ", false],
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
}
