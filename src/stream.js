var config = require('./config.json');
var unirest = require("unirest");
var deasync = require("deasync");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

class Stream {

 publish(address, stream, key, data){
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
    "method": "publishfrom",
    "params": [address, stream, key, hexdata],
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

 retrieve(stream, txid){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "getstreamitem",
    "params": [stream, txid],
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
     var hexdata = result['result']['data'];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     
     //return address;
      }
    });
    while(data === undefined) {
      require('deasync').runLoopOnce();
    } 
      return data;
  }

 retrieveWithAddress(stream, address){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 var key;
 var txid;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreampublisheritems",
    "params": [stream, address],
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
     var hexdata = result['result'][0]['data'];
     key = result['result'][0]['key'];
     txid = result['result'][0]['txid'];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     
     //return address;
      }
    });
    while(data === undefined) {
      require('deasync').runLoopOnce();
    } 
      return [key,data,txid];
  }

 retrieveWithKey(stream, key){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 var publisher;
 var txid;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreamkeyitems",
    "params": [stream, key],
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
     var hexdata = result['result'][0]['data'];
     publisher = result['result'][0]['publishers'];
     txid = result['result'][0]['txid'];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     
     //return address;
      }
    });
    while(data === undefined) {
      require('deasync').runLoopOnce();
    } 
      return [publisher,data,txid];
  }

 VerifyData(stream, data, count){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 var result_data = [];
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreamitems",
    "params": [stream, false, count],
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
     var hexdata = result['result'][0]['data'];
     data = Buffer.from(hexdata, 'hex').toString('utf8');

     	for (var i = 0; i <=count; i++){
     	result_data.push(data);
     	console.log(result_data);
      }
       if (result_data == []) {
        result_data.push("No data found");
     }

     
     //return address;
      }
    });
    while(result_data == []) {
      require('deasync').runLoopOnce();
    } 
      return result_data;
  }

 retrieveItems(stream, count){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var address = [],
 var result_data = [];
 var key_values = [];
 var total_txid = [];
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreamitems",
    "params": [stream, false, count],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{

     	for (var i = 0; i <=count; i++){
     	var result = response.body; 
        var hexdata = result['result'][0]['data'];
        var data = Buffer.from(hexdata, 'hex').toString('utf8');
        var publisher = result['result'][0]['publishers'];
        var txid = result['result'][0]['txid'];
        var key = result['result'][0]['key'];
        address.push(publisher);
        result_data.push(data);
        total_txid.push(txid);
        key_values.push(key);
      }

     
     //return address;
      }
    });
    while(result_data == []) {
      require('deasync').runLoopOnce();
    } 
      return address, result_data, key_values, total_txid;
  }



}

var info = new Stream();
var r = info.VerifyData("root", "datascc", 1);
console.log(r);