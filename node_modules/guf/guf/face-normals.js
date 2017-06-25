var normalize = require('guf').normalizeArray;
var calculateNormal = require('./calculate-normal');

module.exports = function( verts, faces ) {
  var positions = verts;
  var con = verts[ 0 ].constructor;
  if( con === Array || con == Float32Array ) {
    positions = normalize( verts );
  }
  var cells = faces[ 0 ].constructor === Array ? normalize( faces ) : faces;
  var normals = [];
  var i0, i1, i2;
  var a = [];
  var b = [];
  var c = [];
  var d = [];
  for( var i = 0; i < cells.length; i += 3 ) {
    i0 = cells[ i ] * 3;
	  i1 = cells[ i + 1 ] * 3;
	  i2 = cells[ i + 2 ] * 3;
    a[ 0 ] = positions[ i0 ]; a[ 1 ] = positions[ i0 + 1 ]; a[ 2 ] = positions[ i0 + 2 ];
    b[ 0 ] = positions[ i1 ]; b[ 1 ] = positions[ i1 + 1 ]; b[ 2 ] = positions[ i1 + 2 ];
    c[ 0 ] = positions[ i2 ]; c[ 1 ] = positions[ i2 + 1 ]; c[ 2 ] = positions[ i2 + 2 ];
    d = calculateNormal( a, b, c );
    normals[ i ] = d[ 0 ];
    normals[ i + 1 ] = d[ 1 ];
    normals[ i + 2 ] = d[ 2 ];
  }
  return normals;
};
