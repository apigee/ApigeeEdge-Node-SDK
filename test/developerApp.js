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

var developerApp = new apigeeEdge.developerApp({ client: client });
var developer = new apigeeEdge.developer({ client: client });
var apiProduct = new apigeeEdge.apiProduct({ client: client });

describe('DeveloperApp', function() {
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

  describe('Developer App CRUD Operations', function(){

    var createDeveloperAppData = {
      "name" : randomText(),
      "apiProducts": [],
      "attributes" : [
        {
          "name" : randomText(),
          "value" : randomText()
        },
        {
          "name" : "DisplayName",
          "value" : randomText()
        }
      ],
      "callbackUrl" : "http://www.apigee.com"
    };

    var consumerKey = "";

    before(function(done) {
      apiProduct.getApiProducts({}, function(error, data) {
        createDeveloperAppData.apiProducts = data;
        done();
      });
    });

    var updateDeveloperAppData = {
      "name" : createDeveloperAppData.name,
      "attributes" : [
        {
          "name" : "DisplayName",
          "value" : randomText()
        },
        {
          "name" : "Notes",
          "value" : randomText()
        },
        {
          "name" : randomText(),
          "value" : randomText()
        }
      ],
      "callbackUrl" : "http://www.apigee.com/updated"
    };


    it('Create App : should return error null & same app name used for create app call.', function(done){
      developerApp.createDeveloperApp(createDeveloperData.email, createDeveloperAppData, function(error, data) {
        expect(error).equal(null);
        expect(data.name).equal(createDeveloperAppData.name);
        consumerKey = data.credentials[0].consumerKey;
        done();
      });
    });

    it('Get App Details : should return error null & same app name used for get app call.', function(done){
      developerApp.getDeveloperAppDetails(createDeveloperData.email, createDeveloperAppData.name, function(error, data) {
        expect(error).equal(null);
        expect(data.name).equal(createDeveloperAppData.name);
        done();
      });
    });

    // App Attribute CRUD Tests
    it('Get App Attribute : should return error null & attribute value should match original.', function(done) {
      developerApp.getAppAttribute(createDeveloperData.email, createDeveloperAppData.name, createDeveloperAppData.attributes[0].name, function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal(createDeveloperAppData.attributes[0].value);
        done();
      });
    });

    it('Get All App Attributes : should return error null.', function(done) {
      developerApp.getAllAppAttributes(createDeveloperData.email, createDeveloperAppData.name, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Update App Attribute : should return error null & value should match updated value.', function(done) {
      developerApp.updateAppAttribute(createDeveloperData.email, createDeveloperAppData.name, createDeveloperAppData.attributes[0].name, 'updatedValue', function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal('updatedValue');
        done();
      });
    });

    it('Delete App Attribute : should return error null & response should match with deleting developer attribute value.', function(done) {
      developerApp.deleteAppAttribute(createDeveloperData.email, createDeveloperAppData.name, createDeveloperAppData.attributes[0].name, function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal('updatedValue');
        done();
      });
    });

    it('Update All App Attributes : should return error null', function(done) {
      developerApp.updateAllAppAttributes(createDeveloperData.email, createDeveloperAppData.name, createDeveloperAppData.attributes, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });
    

    it('Get All Developer Apps: should return error null.', function(done){
      developerApp.getDeveloperApps(createDeveloperData.email, {}, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Revoke Developer App: should return error null.', function(done){
      developerApp.setAppStatus(createDeveloperData.email, createDeveloperAppData.name, 'revoke', function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Approve Developer App: should return error null.', function(done){
      developerApp.setAppStatus(createDeveloperData.email, createDeveloperAppData.name, 'approve', function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Get Developer App Resources Count: should return error null.', function(done){
      developerApp.getDeveloperAppResourcesCount(createDeveloperData.email, createDeveloperAppData.name, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Update Developer App Scopes: should return error null.', function(done){
      var scopes = [ 'READ' ];
      developerApp.updateDeveloperAppScopes(createDeveloperData.email, createDeveloperAppData.name, consumerKey, scopes, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Regenerate App Keys: should return error null', function(done){
      developerApp.regenerateAppKeys(createDeveloperData.email, createDeveloperAppData.name, createDeveloperAppData.apiProducts, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });


    it('Get Developer by App Name: should return error null.', function(done){
      developer.getDeveloperByApp(createDeveloperAppData.name, function(error, data) {
        expect(error).equal(null);
        expect(data.developer[0].email).equal(createDeveloperData.email);
        done();
      });
    });

    it('Update App Details : should return error null & updated callback used for update app call.', function(done){
      developerApp.updateDeveloperApp(createDeveloperData.email, updateDeveloperAppData, function(error, data) {
        expect(error).equal(null);
        expect(data.callbackUrl).equal(updateDeveloperAppData.callbackUrl);
        done();
      });
    });

    it('Delete App : should return error null & same app nane used for delete app call.', function(done){
      developerApp.deleteDeveloperApp(createDeveloperData.email, createDeveloperAppData.name, function(error, data) {
        expect(error).equal(null);
        expect(data.name).equal(createDeveloperAppData.name);
        done();
      });
    });

  });
});
