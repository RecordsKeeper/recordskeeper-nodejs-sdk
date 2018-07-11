var path = require('path');
var config = require(path.resolve( __dirname,'../../config.json'));
var unirest = require("unirest");
var rk_host = config['rk_host'];
var rk_user = config['rk_user'];
var rk_pass = config['rk_pass'];
var rk_chain = config['rk_chain'];

module.exports = class Stream {

 publish(address, stream, key, data, callback){
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
        console.log(response);
        throw new Error(response.error);
     }
      else{
     var result = response.body; 
     txid = result['result'];
     callback(txid);
      }
    });
     
      
  }

 retrieve(stream, txid, callback){
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
     callback(data);
      }
    });
  }

 retrieveWithAddress(stream, address, count, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 var key;
 var txid;
 var result_data = [];
 var key_values = [];
 var total_txid = [];
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreampublisheritems",
    "params": [stream, address, false, count],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response);
        throw new Error(response.error);
     }
      else{
     for (var i = 0; i <=count - 1; i++){
        var result = response.body; 
        var hexdata = result['result'][i]['data'];
        var data = Buffer.from(hexdata, 'hex').toString('utf8');
        var txid = result['result'][i]['txid'];
        var key = result['result'][i]['key'];
        result_data.push(data);
        total_txid.push(txid);
        key_values.push(key);
      }
      }
     params_array['key'] = key_values;
     params_array['txid'] = total_txid;
     params_array['data'] = result_data;
     callback(params_array);
    });
  }

 retrieveWithKey(stream, key, count, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var data;
 var publisher;
 var txid;
 var result_data = [];
 var publishers = [];
 var total_txid = [];
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "liststreamkeyitems",
    "params": [stream, key, false, count],
    "id": 1,
    "chain_name": rk_chain
    });
    req.end(function (response) {
    if (response.error){
        console.log(response.error);
        throw new Error(response.error);
     }
      else{
     

     for (var i = 0; i <=count - 1; i++){
        var result = response.body; 
        var hexdata = result['result'][i]['data'];
        publisher = result['result'][i]['publishers'];
        txid = result['result'][i]['txid'];
        data = Buffer.from(hexdata, 'hex').toString('utf8');
        result_data.push(data);
        total_txid.push(txid);
        publishers.push(publisher);
      }
      }
     params_array['publishers'] = publishers;
     params_array['txid'] = total_txid;
     params_array['data'] = result_data;
     callback(params_array);
    });
  }

 verifyData(stream, data, count, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var stream_data;
 var result_data = [];
 var res;
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
     for (var i = 0; i <=count-1; i++){
     var result = response.body; 
     var hexdata = result['result'][i]['data'];
     stream_data = Buffer.from(hexdata, 'hex').toString('utf8');
     result_data.push(stream_data);
      }
       if (result_data.includes(data)) {
        res = "Data is successfully verified.";
    }
        else{
        res = "No data found.";
     }
      callback(res);
      }
    });
  }

 retrieveItems(stream, count, callback){
 var auth = 'Basic ' + Buffer.from(rk_user + ':' + rk_pass).toString('base64');
 var req = unirest("POST", rk_host);
 var address = [];
 var result_data = [];
 var key_values = [];
 var total_txid = [];
 var params_array = {};
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
        var hexdata = result['result'][i]['data'];
        var data = Buffer.from(hexdata, 'hex').toString('utf8');
        var publisher = result['result'][i]['publishers'];
        var txid = result['result'][i]['txid'];
        var key = result['result'][i]['key'];
        address.push(publisher);
        result_data.push(data);
        total_txid.push(txid);
        key_values.push(key);
      }
      params_array['publishers'] = address;
      params_array['txid'] = total_txid;
      params_array['key'] = key_values;
      params_array['data'] = result_data;
      callback(params_array);
      }
    });
  }



}