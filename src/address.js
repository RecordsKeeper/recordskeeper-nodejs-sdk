var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var address;
//var network = config['testnet']				#network variable to store the netwrok that you want to access

//if (network==config['testnet']){

	var rk_host = config['rk_host'];
	var rk_user = config['rk_user'];
	var rk_pass = config['rk_pass'];
	var rk_chain = config['rk_chain'];
//}	

/*else {

	var url = config['mainnet']['url'];
	var user = config['mainnet']['rkuser'];
	var password = config['mainnet']['passwd'];
	var chain = config['mainnet']['chain'];
}*/
class Address {

 /*constructor() {
  console.log('instance created');
};*/
 
 getAddress(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 
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
     
     //return address;
      }
    });
    while(address === undefined) {
      require('deasync').runLoopOnce();
    } 
      return address;
  }

getMultisigAddress(required, key) {
var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "createmultisig",
    "params": [required, "key"],
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
     
     //return address;
      }
    });
    while(address === undefined) {
      require('deasync').runLoopOnce();
    } 
      return address;
}

getMultisigWalletAddress(required, key) {
var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "addmultisigaddress",
    "params": [required, "key"],
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
     
     //return address;
      }
    });
    while(address === undefined) {
      require('deasync').runLoopOnce();
    } 
      return address;
}

retrieveAddresses() {
var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 
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
     
     //return address;
      }
    });
    while(address === undefined) {
      require('deasync').runLoopOnce();
    } 
      return address;
}

checkifValid(addr) {
var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var valid;
 
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
     valid= result['result']['isvalid'];
     if (valid == true){
        addressCheck = "Address is valid";
     }
      else {
        addressCheck = "Address is invalid";
      }
     //return address;
      }
    });
    while(valid === undefined) {
      require('deasync').runLoopOnce();
    } 
      return addressCheck;
}

checkifMineAllowed(addr) {
var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var permission;
 
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
     //return address;
      }
    });
    while(permission === undefined) {
      require('deasync').runLoopOnce();
    } 
      return permissionCheck;
}

checkBalance(address) {
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
     
     //return address;
      }
    });
    while(balance === undefined) {
      require('deasync').runLoopOnce();
    } 
      return balance;
}

importAddress(addr) {
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
    "params": [addr," ", false],
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
     if (status == null){
        resp = "Address successfully imported";
     } else {
        resp = 0;
     }
     //return address;
      }
    });
    while(status === undefined) {
      require('deasync').runLoopOnce();
    } 
      return resp;
 }
}


var info = new Address();
var r = info.checkBalance("mmQhinA2xkbxzz1b2DuNzZQNF3r2EFrqNA");
console.log(r);


