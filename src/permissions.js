var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Permissions {
 getMultisigWalletAddress(address, permissions) {
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
    "method": "grant",
    "params": [address, permissions],
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
     status= result['result'];
     
     //return address;
      }
    });
    while(status === undefined) {
      require('deasync').runLoopOnce();
    } 
      return status;
}

 revokePermission(address, permissions) {
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
    "method": "revoke",
    "params": [address, permissions],
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
     status= result['result'];
     
     //return address;
      }
    });
    while(status === undefined) {
      require('deasync').runLoopOnce();
    } 
      return status;
 }


}