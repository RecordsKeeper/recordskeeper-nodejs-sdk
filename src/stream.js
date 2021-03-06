var unirest = require("unirest");

class Streams {

 constructor(config) {
    this.rk_host = config['rk_host'];
    this.rk_user = config['rk_user'];
    this.rk_pass = config['rk_pass'];
    this.rk_chain = config['rk_chain'];
    }

 publish(address, stream, key, data, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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
    "chain_name": this.rk_chain
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

 retrieve(stream, txid, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var data;
 var status;
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
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     var result = response.body; 
     status = result['result'];
     if(status == null){
        data = result['error']['message'];
     } else {
     var hexdata = result['result']['data'];
     data = Buffer.from(hexdata, 'hex').toString('utf8');
     }
      callback(data);
    });
  }

 retrieveWithAddress(stream, address, count, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var data;
 var key;
 var txid;
 var status;
 var result;
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
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
    result = response.body;
    status = result['result'];
     if(status == null){
        params_array = result['error']['message'];
     } else {
     var length = status.length;
     for (var i = 0; i < length; i++){
        var hexdata = result['result'][i]['data'];
        var data = Buffer.from(hexdata, 'hex').toString('utf8');
        var txid = result['result'][i]['txid'];
        var key = result['result'][i]['key'];
        result_data.push(data);
        total_txid.push(txid);
        key_values.push(key);
       }
     
     params_array['key'] = key_values;
     params_array['txid'] = total_txid;
     params_array['data'] = result_data;
      }
     callback(params_array);
    });
  }

 retrieveWithKey(stream, key, count, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var data;
 var publisher;
 var txid;
 var result;
 var status;
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
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     result = response.body;
     status = result['result'];
     if(status == null){
        params_array = result['error']['message'];
     } else {
     var length = status.length;
     for (var i = 0; i < length; i++){ 
        var hexdata = result['result'][i]['data'];
        publisher = result['result'][i]['publishers'];
        txid = result['result'][i]['txid'];
        data = Buffer.from(hexdata, 'hex').toString('utf8');
        result_data.push(data);
        total_txid.push(txid);
        publishers.push(publisher);
       }
     params_array['publishers'] = publishers;
     params_array['txid'] = total_txid;
     params_array['data'] = result_data;
 }
     callback(params_array);
    });
  }

 verifyData(stream, data, count, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var stream_data;
 var result_data = [];
 var res;
 var result;
 var status;
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
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
     result = response.body;
     status = result['result'];
     
     if(status == null){
        res = result['error']['message'];
     } else {
     var length = status.length;
     for (var i = 0; i < length; i++){
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
    }
      callback(res);
    });
  }

 retrieveItems(stream, count, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var address = [];
 var result_data = [];
 var key_values = [];
 var total_txid = [];
 var params_array = {};
 var result;
 var status;
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
    "chain_name": this.rk_chain
    });
    req.end(function (response) {
    result = response.body;
    status = result['result'];
    
     if(status == null){
        params_array = result['error']['message'];
     } else {

        var length = status.length;
     	for (var i = 0; i < length; i++){
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
  }
      callback(params_array);
    });
  }
}

module.exports = Streams;