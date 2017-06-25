var cross = require('./cross');
var normalize = require('./normalize');
var normalizeArray = require('./normalize-array');

module.exports = function( verts, faces ) {
  var positions = verts[0].constructor === Array ? normalizeArray( verts ) : verts;
  var cells = faces[0].constructor === Array ? normalizeArray( faces ) : faces;

  //Create Vertex Face Map ( tells you which vert belong to what faces )
  var map = {};
  var plen = positions.length / 3;
  for( var i = 0; i < plen; i++ ) { map[ i ] = []; }

  //Fill in Map
  var clen = cells.length;
  var i0, i1, i2, index;
  for( var i = 0; i < clen; i += 3 ) {
    index = i;
    i0 = index; i1 = index + 1; i2 = index + 2;
      map[ cells[ i0 ] ].push( i );
      map[ cells[ i1 ] ].push( i );
      map[ cells[ i2 ] ].push( i );
  }

  //Calculate Vertex Normals
  var normals = [];
  var temp = [ 0.0, 0.0, 0.0 ];
  var norm = [ 0.0, 0.0, 0.0 ];
  var keys = Object.keys( map );
  var v0, v1, v2, a = [ 0.0, 0.0, 0.0 ], b = [ 0.0, 0.0, 0.0 ], c = [ 0.0, 0.0, 0.0 ];
  for( var i = 0; i < keys.length; i++ ) {
    var faces = map[ keys[ i ] ];
    for( var j = 0; j < faces.length; j++ ) {
      var index = faces[ j ];

      v0 = cells[ index ];
      v1 = cells[ index + 1 ];
      v2 = cells[ index + 2 ];

      a[ 0 ] = positions[ v0 * 3 ];
      a[ 1 ] = positions[ v0 * 3 + 1 ];
      a[ 2 ] = positions[ v0 * 3 + 2 ];

      b[ 0 ] = positions[ v1 * 3 ];
      b[ 1 ] = positions[ v1 * 3 + 1 ];
      b[ 2 ] = positions[ v1 * 3 + 2 ];

      c[ 0 ] = positions[ v2 * 3 ];
      c[ 1 ] = positions[ v2 * 3 + 1 ];
      c[ 2 ] = positions[ v2 * 3 + 2 ];

      cross( temp, a, b, c );

      norm[ 0 ] += temp[ 0 ];
      norm[ 1 ] += temp[ 1 ];
      norm[ 2 ] += temp[ 2 ];
    }
    normalize( norm, norm );
    normals.push( norm[ 0 ] , norm[ 1 ], norm[ 2 ] );
    norm[ 0 ] = 0.0; norm[ 1 ] = 0.0; norm[ 2 ] = 0.0;
  }
  return normals;
};
