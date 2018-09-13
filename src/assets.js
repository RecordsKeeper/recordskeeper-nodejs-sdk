var unirest = require("unirest");

class Assets {

constructor(config) {
    this.rk_host = config['rk_host'];
    this.rk_user = config['rk_user'];
    this.rk_pass = config['rk_pass'];
    this.rk_chain = config['rk_chain'];
    }
 
 createAsset(address, asset_name, asset_qty, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
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

 sendAsset(address, asset_name, asset_qty, callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var txid;
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "sendasset",
    "params": [address, asset_name, asset_qty],
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

 retrieveAsset(callback){
 var auth = 'Basic ' + Buffer.from(this.rk_user + ':' + this.rk_pass).toString('base64');
 var req = unirest("POST", this.rk_host);
 var asset_count;
 var asset_name = [];
 var issue_id = []; 
 var issue_qty = [];
 var asset_count = [];
 var params_array = {};
 req.headers({
    "cache-control": "no-cache",
    "authorization": auth,
    "content-type": "application/json"
    });
 
     req.type("json");
     req.send({
    "method": "listassets",
    "params": [],
    "id": 1,
    "chain_name": this.rk_chain
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
     for (var i= 0; i< count; i++){
        asset_name.push(result['result'][i]['name']);
        issue_id.push(result['result'][i]['issuetxid']);
        issue_qty.push(result['result'][i]['issueraw']);
     }

     params_array['asset_name']=asset_name;
     params_array['issue_id']=issue_id;
     params_array['issue_qty']=issue_qty;
     params_array['asset_count']=count;
     callback(params_array);
      }
    }); 
  }

}

module.exports = Assets;