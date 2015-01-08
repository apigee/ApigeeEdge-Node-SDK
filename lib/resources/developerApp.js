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


/*
*  A public method to set App Status
*
*
*  @method setAppStatus
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {data} action
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.setAppStatus = function(email, appName, action, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint:'developers/' + email + '/apps/' + appName,
    qs: { 'action' : action },
    headers: { 'Content-Type' : 'application/octet-stream' }
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to set app status.');
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
*  A public method to get the developer app resource count
*
*  @method getDeveloperAppResourcesCount
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.getDeveloperAppResourcesCount = function(email, appName, callback) {
  var self = this;
  var options = {
    method:'GET',
    endpoint:'developers/' + email + "/apps/" + appName,
    qs: { 'query' : 'count', 'entity' : 'apiresources' },
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to get developer app resource count.');
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
*  A public method to update App Scopes
*
*
*  @method updateDeveloperAppScopes
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {data} consumerKey
*  @param {data} scopes
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.updateDeveloperAppScopes = function(email, appName, consumerKey, scopes, callback) {
  var self = this;
  var options = {
    method:'PUT',
    endpoint:'developers/' + email + "/apps/" + appName + "/keys/" + consumerKey,
    body: {
      "scopes": scopes
    }
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to update developer app scopes.');
      }
      if (typeof(callback) === 'function') {
        console.log(data);
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
*  A public method to regenerate App Keys
*
*
*  @method regenerateAppKeys
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {data} apiProducts
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.regenerateAppKeys = function(email, appName, apiProducts, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint:'developers/' + email + "/apps/" + appName,
    body: { "name" : appName, "apiproducts" : apiProducts }
  };

  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to regenerate developer app keys.');
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
*  A public method to get app attribute value
*
*  @method getAppAttribute
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {data} attributeName
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.getAppAttribute = function(email, appName, attributeName, callback) {
  var self = this;
  var options = {
    method:'GET',
    endpoint:'developers/' + email + "/apps/" + appName + "/attributes/" + attributeName,
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to get app attribute value.');
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
*  A public method to update App Attribute
*
*
*  @method updateAppAttribute
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {data} attributeName
*  @param {data} updateValue
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.updateAppAttribute = function(email, appName, attributeName, updateValue, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint:'developers/' + email + "/apps/" + appName + '/attributes/' + attributeName,
    headers: { 'Content-Type' : 'application/json' },
    body: {"value" : updateValue},
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to update app attribute.');
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
*  A public method to get delete app attribute by attribute name
*
*  @method deleteAppAttribute
*  @public
*  @param {email} email
*  @param {data} appName
*  @param {data} attributeName
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.deleteAppAttribute = function(email, appName, attributeName, callback) {
  var self = this;
  var options = {
    method:'DELETE',
    endpoint:'developers/' + email + "/apps/" + appName + '/attributes/' + attributeName,
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to delte app attribute.');
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
*  A public method to get all app attributes
*
*  @method getAllAppAttributes
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.App.prototype.getAllAppAttributes = function(email, appName, callback) {
  var self = this;
  var options = {
    method:'GET',
    endpoint:'developers/' + email + "/apps/" + appName + "/attributes",
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to get app attribute values.');
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
*  A public method to update All App Attributes
*
*
*  @method updateAllAppAttributes
*  @public
*  @param {data} email
*  @param {data} appName
*  @param {array} attributesList
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/

exports.App.prototype.updateAllAppAttributes = function(email, appName, attributesList, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint:'developers/' + email + "/apps/" + appName + '/attributes',
    headers: { 'Content-Type' : 'application/json' },
    body: { "attribute" : attributesList },
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to update app attributes.');
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
