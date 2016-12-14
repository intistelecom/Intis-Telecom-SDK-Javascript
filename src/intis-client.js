function IntisClient(login, api_key, api_host) {

  var GATEWAY = new IntisGateway(login, api_key, api_host);

  this.getBalance = function(success, error) {
    GATEWAY.request('/get/balance.php', {}, success, error);
  };

  this.send = function(phone, text, sender, success, error, sendingTime) {
    var params = {};
    params.phone = phone;
    params.text = text;
    params.sender = sender;
    if(sendingTime){
      params.sendingTime = sendingTime;
    }

    GATEWAY.request('/get/send.php', params, success, error);
  };

  this.getStatus = function(state, success, error) {
    var params = {};
    params.state = state;

    GATEWAY.request('/get/status.php', params, success, error);
  };  

  this.getPrices = function(success, error) {
    GATEWAY.request('/get/prices.php', {}, success, error);
  };

}

function IntisGateway(login, api_key, api_host) {

  this.request = function(path, params, success, error) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();

    var url_params = prepareParams(params);

    xhr.open('GET', 'https://' + api_host + '/external' + path + "?" + url_params, true);

    xhr.onload = function() {
      if (typeof success === 'function') {
        success(JSON.parse(this.responseText));
      }
    }

    xhr.onerror = function() {
      if (typeof error === 'function') {
        error(this.status);
      }
    }

    xhr.send();
  };

  function prepareParams(params){
    if(params===undefined){
      params = {}
    }

    params.login = login;
    params.timestamp = + new Date();

    var keys = Object.keys(params), 
    url_params = "",
    signature = "";

    keys.sort();

    for (var i = 0; i < keys.length; i++) {
      if (url_params != "") {
        url_params += "&";
      }
      url_params += keys[i] + "=" + encodeURIComponent(params[keys[i]]);
      signature += params[keys[i]];
    }

    signature += api_key;

    signature = md5(signature);
    
    if (url_params != "") {
      url_params += "&";
    }    
    url_params += "signature=" + signature;

    return url_params;
  }
}