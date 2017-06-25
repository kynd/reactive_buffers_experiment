var cross = require('./cross');
var normalize = require('./normalize');

module.exports = function( a, b, c ) {
  var r = [ 0.0, 0.0, 0.0 ];
  cross( r, a, b, c );
  normalize( r, r );
  return r;
};
