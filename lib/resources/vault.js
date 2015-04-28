var exports = module.exports = {};

/*
 *  A class to model a Apigee Edge Vault.
 *  Set the path in the options object.
 *
 *  @constructor
 *  @param {object} options {client:client, data: {'key': 'value'}}
 */
exports.Vault = function(options, callback) {
  this._client = options.client;
}

/*
*  A public method to get the org Vault list
*
*  @method getOrgDevelopersList
*  @public
*  @param {string} type (env for environment, org for organization)
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.Vault.prototype.getVaultList = function(type, callback) {
    var self = this;
    var options = {
      method:'GET',
      endpoint: (type === 'env' ? 'environments/' + self._client.envName + '/': "") + 'vaults'
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to get list of vaults.');
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
*  A public method to create Vault
*
*
*  @method createVault
*  @public
*  @param {string} type (env for environment, org for organization)
*  @param {data}
*  @param {function} callback
*  @return {callback} callback(err, data)
*
*/
exports.Vault.prototype.createVault = function(type, payload, callback) {
  var self = this;
  var options = {
    method:'POST',
    endpoint: (type === 'env' ? 'environments/' + self._client.envName + '/': "") + 'vaults',
    body:payload
  };
  this._client.request(options, function(err, data) {
    if (err) {
      if (self.logging) {
        console.log('Error trying to create vault.');
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
*  A public method to delete vault by name
*
*  @method deleteVault
*  @public
*  @param {string} type (env for environment, org for organization)
*  @param {string} vaultName
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.Vault.prototype.deleteVault = function(type, name, callback) {
    var self = this;
    var options = {
      method: 'DELETE',
      endpoint: (type === 'env' ? 'environments/' + self._client.envName + '/': "") + 'vaults/' + name,
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to delete vault.');
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
*  A public method to get developer by email
*
*  @method getDeveloper
*  @public
*  @param {email} developeremail
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
// exports.Developer.prototype.getDeveloper = function(email, callback) {
//     var self = this;
//     var options = {
//       method:'GET',
//       endpoint:'developers/' + email
//     };
//     this._client.request(options, function(err, data) {
//       if (err) {
//         if (self.logging) {
//           console.log('Error trying to get developer information.');
//         }
//         if (typeof(callback) === 'function') {
//           callback(err, data);
//         }
//       } else {
//           if (typeof(callback) === 'function') {
//             callback(err, data);
//           }
//       }
//     });
// }



// /*
// *  A public method to create Developer
// *
// *
// *  @method createDeveloper
// *  @public
// *  @param {data}
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// *
// */

// exports.Developer.prototype.createDeveloper = function(payload, callback) {
//   var self = this;
//   var options = {
//     method:'POST',
//     endpoint:'developers',
//     body:payload
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to create developer.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//         if (typeof(callback) === 'function') {
//           callback(err, data);
//         }
//     }
//   });
// }

// /*
// *  A public methid to update Developer
// *
// *
// *  @method createDeveloper
// *  @public
// *  @param {data}
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// *
// */

// exports.Developer.prototype.updateDeveloper = function(payload, callback) {
//   var self = this;
//   var options = {
//     method:'POST',
//     endpoint:'developers/' + payload.email,
//     body:payload
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to update developer.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//         if (typeof(callback) === 'function') {
//           callback(err, data);
//         }
//     }
//   });
// }


// /*
// *  A public method to get delete developer by email
// *
// *  @method deleteDeveloper
// *  @public
// *  @param {email} developeremail
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// */
// exports.Developer.prototype.deleteDeveloper = function(email, callback) {
//     var self = this;
//     var options = {
//       method:'DELETE',
//       endpoint:'developers/' + email
//     };
//     this._client.request(options, function(err, data) {
//       if (err) {
//         if (self.logging) {
//           console.log('Error trying to get developer information.');
//         }
//         if (typeof(callback) === 'function') {
//           callback(err, data);
//         }
//       } else {
//           if (typeof(callback) === 'function') {
//             callback(err, data);
//           }
//       }
//     });
// }

// /*
// *  A public method to get developer by app name
// *
// *  @method getDeveloperByApp
// *  @public
// *  @param {string} appName
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// */
// exports.Developer.prototype.getDeveloperByApp = function(appName, callback) {
//   var self = this;
//   var options = {
//     method:'GET',
//     endpoint:'developers',
//     qs: { 'app' : appName }
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to get developer information.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }

// /*
// *  A public method to set Developer Status
// *
// *
// *  @method setDeveloperStatus
// *  @public
// *  @param {data} email
// *  @param {data} action
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// *
// */

// exports.Developer.prototype.setDeveloperStatus = function(email, action, callback) {
//   var self = this;
//   var options = {
//     method:'POST',
//     endpoint:'developers/' + email,
//     qs: { 'action' : action },
//     headers: { 'Content-Type' : 'application/octet-stream' }
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to set developer status.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }

// /*
// *  A public method to get developer attribute value
// *
// *  @method getDeveloperAttribute
// *  @public
// *  @param {data} email
// *  @param {data} attributeName
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// */
// exports.Developer.prototype.getDeveloperAttribute = function(email, attributeName, callback) {
//   var self = this;
//   var options = {
//     method:'GET',
//     endpoint:'developers/' + email + "/attributes/" + attributeName,
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to get developer attribute value.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }

// /*
// *  A public method to update Developer Attribute
// *
// *
// *  @method updateDeveloperAttribute
// *  @public
// *  @param {data} email
// *  @param {data} attributeName
// *  @param {data} updateValue
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// *
// */

// exports.Developer.prototype.updateDeveloperAttribute = function(email, attributeName, updateValue, callback) {
//   var self = this;
//   var options = {
//     method:'POST',
//     endpoint:'developers/' + email + '/attributes/' + attributeName,
//     headers: { 'Content-Type' : 'application/json' },
//     body: {"value" : updateValue},
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to update developer attribute.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }


// /*
// *  A public method to get delete developer attribute by attribute name
// *
// *  @method deleteDeveloperAttribute
// *  @public
// *  @param {email} email
// *  @param {data} attributeName
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// */
// exports.Developer.prototype.deleteDeveloperAttribute = function(email, attributeName, callback) {
//   var self = this;
//   var options = {
//     method:'DELETE',
//     endpoint:'developers/' + email + '/attributes/' + attributeName,
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to delete developer attribute.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }

// /*
// *  A public method to get all developer attributes
// *
// *  @method getAllDeveloperAttributes
// *  @public
// *  @param {data} email
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// */
// exports.Developer.prototype.getAllDeveloperAttributes = function(email, callback) {
//   var self = this;
//   var options = {
//     method:'GET',
//     endpoint:'developers/' + email + "/attributes",
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to get developer attribute values.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
// }

// /*
// *  A public method to update All Developer Attributes
// *
// *
// *  @method updateAllDeveloperAttributes
// *  @public
// *  @param {data} email
// *  @param {array} attributesList
// *  @param {function} callback
// *  @return {callback} callback(err, data)
// *
// */

// exports.Developer.prototype.updateAllDeveloperAttributes = function(email, attributesList, callback) {
//   var self = this;
//   var options = {
//     method:'POST',
//     endpoint:'developers/' + email + '/attributes',
//     headers: { 'Content-Type' : 'application/json' },
//     body: { "attribute" : attributesList },
//   };
//   this._client.request(options, function(err, data) {
//     if (err) {
//       if (self.logging) {
//         console.log('Error trying to update developer attributes.');
//       }
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     } else {
//       if (typeof(callback) === 'function') {
//         callback(err, data);
//       }
//     }
//   });
//}
