var assert = require('assert');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var config = require('./configure.js');
var apigeeEdge = require('../');

var client = new apigeeEdge.client({
  'orgName'  : config.apigeeEdgeCredentials.orgName,
  'userName' : config.apigeeEdgeCredentials.userName,
  'password' : config.apigeeEdgeCredentials.password,
  'envName' : config.apigeeEdgeCredentials.envName,
  'logging' : config.apigeeEdgeCredentials.logging,
  'curl' : config.apigeeEdgeCredentials.curl
});

var vault = new apigeeEdge.vault({ client: client });

describe('Vault', function() {

  describe('Load All Vaults from an Organization', function() {
    it('Get Vault from : should return error null & ..', function(done) {
      vault.getVaultList('org', function(error, data) {
        expect(error).equal(null);
        done();
      });
    })
  });

  describe('Load All Vaults from an Environment', function() {
    it('Get Vault from : should return error null & ..', function(done) {
      vault.getVaultList('env', function(error, data) {
        expect(error).equal(null);
        done();
      });
    })
  });

  describe('Developer CRUD Operations', function() {

    function randomText() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for( var i=0; i < 10; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    var createVaultOrgLevel = {
      "name" : randomText(),
    };
    var createVaultEnvLevel = {
      "name" : randomText(),
    };
    /*
    var updateDeveloperData = {
      "email" : createDeveloperData.email,
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
    };*/

    it('Create Vault at Org level: should return error null & same name used for create vault call.', function(done) {
      vault.createVault('org', createVaultOrgLevel, function(error, data) {
        expect(error).equal(null);
        expect(data.name).equal(createVaultOrgLevel.name);
        done();
      });
    });

    it('Create Vault at Environment level: should return error null & same name used for create vault call.', function(done) {
      vault.createVault('env', createVaultEnvLevel, function(error, data) {
        expect(error).equal(null);
        expect(data.name).equal(createVaultEnvLevel.name);
        done();
      });
    });

/*

    it('Get Developer Details : should return error null & ..', function(done) {
      developer.getDeveloper(createDeveloperData.email, function(error, data) {
        expect(error).equal(null);
        expect(data.email).equal(createDeveloperData.email);
        done();
      });
    });

    it('Set Developer Status to Inactive : should return error null & ..', function(done) {
      developer.setDeveloperStatus(createDeveloperData.email, 'inactive', function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Set Developer Status to Active : should return error null & ..', function(done) {
      developer.setDeveloperStatus(createDeveloperData.email, 'active', function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    // Developer Attribute CRUD Tests
    it('Get Developer Attribute : should return error null & attribute value should match original.', function(done) {
      developer.getDeveloperAttribute(createDeveloperData.email, createDeveloperData.attributes[0].name, function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal(createDeveloperData.attributes[0].value);
        done();
      });
    });

    it('Get All Developer Attributes : should return error null.', function(done) {
      developer.getAllDeveloperAttributes(createDeveloperData.email, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Update Developer Attribute : should return error null & value should match updated value.', function(done) {
      developer.updateDeveloperAttribute(createDeveloperData.email, createDeveloperData.attributes[0].name, 'updatedValue', function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal('updatedValue');
        done();
      });
    });

    it('Delete Developer Attribute : should return error null & response should match with deleting developer attribute value.', function(done) {
      developer.deleteDeveloperAttribute(createDeveloperData.email, createDeveloperData.attributes[0].name, function(error, data) {
        expect(error).equal(null);
        expect(data.value).equal('updatedValue');
        done();
      });
    });

    it('Update All Developer Attributes : should return error null', function(done) {
      developer.updateAllDeveloperAttributes(createDeveloperData.email, createDeveloperData.attributes, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });

    it('Update Developer Details : should return error null & update firstname', function(done) {
      developer.updateDeveloper(updateDeveloperData, function(error, data) {
        expect(error).equal(null);
        expect(data.firstName).equal(updateDeveloperData.firstName);
        done();
      });
    });

    it('Delete Developer : should return error null & response should match with deleting developer email address.', function(done) {
      developer.deleteDeveloper(createDeveloperData.email, function(error, data) {
        expect(error).equal(null);
        expect(data.email).equal(createDeveloperData.email);
        done();
      });
    });*/

    it('Delete Vault at Org level: should return error null & response should match with deleting developer name.', function(done) {
      vault.deleteVault('org', createVaultOrgLevel.name, function(error, data) {
        expect(error).equal(null);
        //expect(data.name).equal(createDeveloperData.name);
        done();
      });
    });

    it('Delete Vault at Env level: should return error null & response should match with deleting developer name.', function(done) {
      vault.deleteVault('env', createVaultEnvLevel.name, function(error, data) {
        expect(error).equal(null);
        //expect(data.name).equal(createDeveloperData.name);
        done();
      });
    });
  });
});
