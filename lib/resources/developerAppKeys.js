var exports = module.exports = {};

/*
 *  A class to model a Apigee App Keys
 *  Set the path in the options object.
 *
 *  @constructor
 *  @param {object} options {client:client, data: {'key': 'value'}}
 */
exports.AppKeys = function(options, callback) {
  this._client = options.client;
}

/*
*  A public method to add ApiProducts to Key
*
*  @method addApiProduct
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.AppKeys.prototype.addApiProduct = function(email, appName, consumerKey, payload,  callback) {
    var self = this;
    var options = {
      method:'POST',
      endpoint:'developers/' + email + "/apps/" + appName + "/keys/" + consumerKey,
      body: payload
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to add api products to app keys.');
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
*  A public method to delete ApiProducts from Key
*
*  @method deleteApiProduct
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.AppKeys.prototype.deleteApiProduct = function(email, appName, consumerKey, apiProduct,  callback) {
    var self = this;
    var options = {
      method:'DELETE',
      endpoint:'developers/' + email + "/apps/" + appName + "/keys/" + consumerKey + "/apiproducts/" + apiProduct
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to delete api product from app keys.');
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