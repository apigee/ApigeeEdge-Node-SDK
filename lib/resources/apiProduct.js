var exports = module.exports = {};

/*
 *  A class to model a Apigee Api Product.
 *  Set the path in the options object.
 *
 *  @constructor
 *  @param {object} options {client:client, data: {'key': 'value'}}
 */
exports.ApiProduct = function(options, callback) {
  this._client = options.client;
}

/*
*  A public method to get the org API Products
*
*  @method getApiProducts
*  @public
*  @param {function} callback
*  @return {callback} callback(err, data)
*/
exports.ApiProduct.prototype.getApiProducts = function(options, callback) {
    var self = this;
    var options = {
      method:'GET',
      endpoint:'apiproducts',
      qs: options
    };
    this._client.request(options, function(err, data) {
      if (err) {
        if (self.logging) {
          console.log('Error trying to get list of Api Products.');
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