// Load configration file
var configuration = require('./configure');
var request = require('request');

var ApigeeEdge = {};


ApigeeEdge.Client = function(options) {
  //Apigee Edge endpoint
  this.URI = options.URI || 'https://api.enterprise.apigee.com/v1';
  // Apigeee Edge OrgName
  this.orgName = options.orgName;

  // Apigeee Edge EnvName
  this.envName = options.envName;

  // Apigee Edge Authentication Credentials
  this.userName = options.userName;
  this.password = options.password;

  //timeout and callbacks
  this._callTimeout =  options.callTimeout || 30000; //default to 30 seconds

  // Logging
  this.logging = options.logging || false;

  // cURL
  this.curl = options.curl || false;
};

/*
*  Main function for making requests to the API.  Can be called directly.
*
*  options object:
*  `method` - http method (GET, POST, PUT, or DELETE), defaults to GET
*  `qs` - object containing querystring values to be appended to the uri
*  `body` - object containing entity body for POST and PUT requests
*  `endpoint` - API endpoint, for example 'users/fred'
*
*
*  @method request
*  @public
*  @params {object} options
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
ApigeeEdge.Client.prototype.request = function (options, callback) {
  var self = this;
  var method = options.method || 'GET';
  var endpoint = options.endpoint;
  var body = options.body || {};
  var qs = options.qs || {};
  var headers = options.headers || {};
  var orgName = this.orgName;
  var userName = this.userName;
  var password = this.password;

  if(!orgName || !userName || !password){
    console.log("Please check Apigee Edge Connection Configuration");
  }

  var uri = this.URI + '/organizations/' + orgName + "/" + endpoint;


  if (this.logging) {
    console.log('calling: ' + method + ' ' + uri);
  }

  this._start = new Date().getTime();

  var callOptions = {
    method: method,
    uri: uri,
    json: body,
    qs: qs,
    headers: {
            'User-Agent': configuration.userAgent
        }
  };

  if(this.curl) console.log(self.generatecURL(callOptions));
  // Add Custom Headers if any
  for (var prop in headers) {
    callOptions.headers[prop] = headers[prop];
  }

  request(callOptions, function (err, response, data) {

    response.body = response.body || {};
    data = data || {};

    self._end = new Date().getTime();
    if(response.statusCode === 200 || response.statusCode === 201 || response.statusCode == 204) {
      if (self.logging) {
        console.log('success (time: ' + self.calcTimeDiff() + '): ' + method + ' ' + uri);
      }
      callback(err, data);
    } else {
        err = true;
        data.statusCode = response.statusCode;
        var error = response.body.error;
        var errorDesc = response.body.message;
        if (self.logging) {
          console.log('Error (' + response.statusCode + ')(' + error + '): ' + errorDesc);
        }
        if (typeof(callback) === 'function') {
          callback(err, response.body);
        }
      }
  }).auth(this.userName, this.password, true);
};

ApigeeEdge.Client.prototype.generatecURL = function (options) {
  var curl = 'curl';
  var method = (options.method || 'GET').toUpperCase();
  var body = options.body || {};
  var uri = options.uri;

  //curl - add the method to the command (no need to add anything for GET)
  if (method === 'POST') {curl += ' -X POST'; }
  else if (method === 'PUT') { curl += ' -X PUT'; }
  else if (method === 'DELETE') { curl += ' -X DELETE'; }
  else { curl += ' -X GET'; }

  //curl - append the path
  curl += ' ' + uri;

  //curl - add the body
  body = JSON.stringify(body); //only in node module
  if (body !== '"{}"' && method !== 'GET' && method !== 'DELETE') {
    //curl - add in the json obj
    curl += " -d '" + body + "'";
  }
  //log the curl command to the console
  //console.log(curl);
  return curl;
};


/*
*  A private method to get call timing of last call
*/
ApigeeEdge.Client.prototype.calcTimeDiff = function() {
 var seconds = 0;
 var time = this._end - this._start;
 try {
    seconds = ((time/10) / 60).toFixed(2);
 } catch(e) { return 0; }
 return seconds;
}



// Loading Developer Resource
var resourceDeveloper = require('./resources/developer.js');
var resourceApp = require('./resources/developerApp.js');
var resourceApiProduct = require('./resources/apiProduct.js');
var resourceAppKeys = require('./resources/developerAppKeys.js');
var resourceVault = require('./resources/vault.js');


exports.client = ApigeeEdge.Client;
exports.developer = resourceDeveloper.Developer;
exports.developerApp = resourceApp.App;
exports.developerAppKeys = resourceAppKeys.AppKeys;
exports.apiProduct = resourceApiProduct.ApiProduct;
exports.vault = resourceVault.Vault;
exports.version = configuration.sdkVersion;
exports.userAgent = configuration.userAgent;