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

module.exports = class Permissions {
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