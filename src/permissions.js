var unirest = require("unirest");

class Permissions {

 constructor(config) {
    this.rk_host = config['rk_host'];
    this.rk_user = config['rk_user'];
    this.rk_pass = config['rk_pass'];
    this.rk_chain = config['rk_chain'];
    }
 
 grantPermissions(address, permissions, callback) {
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
    "method": "grant",
    "params": [address, permissions],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     txid = result['result'];
     if(txid == null){
        txid = result['error']['message'];
     } else {
       txid = result['result']; 
     }
     callback(txid);
    });
}

 revokePermission(address, permissions, callback) {
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
    "method": "revoke",
    "params": [address, permissions],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     txid = result['result'];
     if(txid == null){
        txid = result['error']['message'];
     } else {
       txid = result['result']; 
     }
     callback(txid);
    });
    } 
 }

 module.exports = Permissions;