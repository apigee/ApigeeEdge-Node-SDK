var exports = module.exports = {};

/*
 *  A class to model a Apigee Edge App.
 *  Set the path in the options object.
 *
 *  @constructor
 *  @param {object} options {client:client, data: {'key': 'value'}}
 */
exports.App = function(options, callback) {
  this._client = options.client;
}

/*
*  A public method to get the org Developers list
*
*  @method getOrgDevelopersList
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.getDeveloperApps = function(email, options, callback) {
    var self = this;
    var options = {
      method:'GET',
      endpoint:'developers/' + email + "/apps",
      qs: options
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to get list of developer apps.');
        }
        if (typeof(callback) === 'function') {
          callback(err, data);
        }
      } else {
          if (typeof(callback) === 'function') {
            callback(err, data);
          }
      }
    });
}

/*
*  A public method to get the developer app details
*
*  @method getDeveloperAppDetails
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.getDeveloperAppDetails = function(email, appName, callback) {
    var self = this;
    var options = {
      method:'GET',
      endpoint:'developers/' + email + "/apps/" + appName
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to get developer app detail.');
        }
        if (typeof(callback) === 'function') {
          callback(err, data);
        }
      } else {
          if (typeof(callback) === 'function') {
            callback(err, data);
          }
      }
    });
}

/*
*  A public method to create App
*
*
*  @method createDeveloperApp
*  @public
*  @param {data}
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.createDeveloperApp = function(email, payload, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint:'developers/' + email + "/apps",
    body:payload
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to create developer app.');
      }
      if (typeof(callback) === 'function') {
        callback(err, data);
      }
    } else {
        if (typeof(callback) === 'function') {
          callback(err, data);
        }
    }
  });
}

/*
*  A public method to update App
*
*
*  @method updateDeveloperApp
*  @public
*  @param {data}
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.updateDeveloperApp = function(email, payload, callback) {
  var self = this;
  var options = {
    method:'PUT',
    endpoint:'developers/' + email + "/apps/" + payload.name,
    body:payload
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to update developer app.');
      }
      if (typeof(callback) === 'function') {
        callback(err, data);
      }
    } else {
        if (typeof(callback) === 'function') {
          callback(err, data);
        }
    }
  });
}

/*
*  A public method to delete App
*
*
*  @method deleteDeveloperApp
*  @public
*  @param {data}
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.deleteDeveloperApp = function(email, appName, callback) {
  var self = this;
  var options = {
    method:'DELETE',
    endpoint:'developers/' + email + "/apps/" + appName
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to delete developer app.');
      }
      if (typeof(callback) === 'function') {
        callback(err, data);
      }
    } else {
        if (typeof(callback) === 'function') {
          callback(err, data);
        }
    }
  });
}