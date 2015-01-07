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

var apiProduct = new apigeeEdge.apiProduct({ client: client });

describe('Api Products Testing', function() {

  describe('Api Products Operations', function(){



    it('Get All Api Products : should return error null .', function(done){
      apiProduct.getApiProducts({expand: true}, function(error, data) {
        expect(error).equal(null);
        done();
      });
    });




  });
});
