var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Assets {
 
 createAsset(address, asset_name, asset_qty){
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
    "method": "issue",
    "params": [address, asset_name, asset_qty],
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
     txid = result['result'];
     
     //return address;
      }
    });
    while(txid === undefined) {
      require('deasync').runLoopOnce();
    } 
      return txid;
  }

 retrieveAsset(){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var asset_count;
 var asset_name = [];
 var issue_id = []; 
 var issue_qty = [];
 var asset_count = [];
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "issue",
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
     asset_count = result['result'];
     var count = asset_count.length;
     for (var i= 0; i<= count; i++){
     	var name = result['result']['name'];
     	var id = result['result']['issuetxid'];
     	var qty = result['result']['issueraw'];
        asset_name.push(name);
        issue_id.push(id);
        issue_qty.push(qty);
     }
     
      }
    });
    while(asset_count === undefined) {
      require('deasync').runLoopOnce();
    } 
      return asset_name, issue_id, issue_qty, asset_count;
  }

}

var info = new Assets();
var r = info.retrieveAsset();
console.log(r);