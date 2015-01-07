var assert = require('assert');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var config = require('./configure.js');
var apigeeEdge = require('../');

var client = new apigeeEdge.client({
  'orgName'  : config.apigeeEdgeCredentials.orgName,
  'userName' : config.apigeeEdgeCredentials.userName,
  'password' : config.apigeeEdgeCredentials.password
});

var developerAppKeys = new apigeeEdge.developerAppKeys({ client: client });
var developerApp = new apigeeEdge.developerApp({ client: client });
var developer = new apigeeEdge.developer({ client: client });
var apiProduct = new apigeeEdge.apiProduct({ client: client });

describe('Developer App Keys Testing', function() {

  function randomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 10; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  var createDeveloperData = {
    "email" : randomText() + "@" + randomText() + ".com",
    "firstName" : randomText(),
    "lastName" :  randomText(),
    "userName" :  randomText(),
    "attributes" : [
    {
      "name" : randomText(),
      "value" : randomText()
    },
    {
      "name" : randomText(),
      "value" : randomText()
    }
    ]
  };


  before(function(done) {
    // runs before all tests in this block
    developer.createDeveloper(createDeveloperData, function(error, data) {
      done();
    });
  });

  after(function(done){
    // runs after all tests in this block
    developer.deleteDeveloper(createDeveloperData.email, function(error, data) {
      done();
    });
  });


  describe('Api Products - App Keys Operations Testing', function(){

    var createDeveloperAppData = {
      "name" : randomText(),
      "apiProducts": [],
      "attributes" : [
      {
        "name" : "DisplayName",
        "value" : randomText()
      }
      ],
      "callbackUrl" : "http://www.apigee.com"
    };

    var consumerKey = "";
    var loadedApiProducts = [];





    before(function(done) {
      // runs before all tests in this block
      developerApp.createDeveloperApp(createDeveloperData.email, createDeveloperAppData, function(error, data) {
        consumerKey = data.credentials[0].consumerKey;
        done();
      });
    });

    before(function(done) {
      // runs before all tests in this block
      apiProduct.getApiProducts({}, function(error, data) {
        loadedApiProducts = data;
        done();
      });
    });

    after(function(done){
      // runs after all tests in this block
      developerApp.deleteDeveloperApp(createDeveloperData.email, createDeveloperAppData.name, function(error, data) {
        done();
      });
    });

    it('Add Api Products to Key : Should return error null', function(done){
      var payload = { "apiProducts" : loadedApiProducts };
      developerAppKeys.addApiProduct(createDeveloperData.email, createDeveloperAppData.name , consumerKey, payload , function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Delete Api Products from Key : Should return error null', function(done){
      developerAppKeys.deleteApiProduct(createDeveloperData.email, createDeveloperAppData.name , consumerKey, loadedApiProducts[0] , function(error, data) {
        expect(error).equal(null);
        done();
      });
    });



  });
});
