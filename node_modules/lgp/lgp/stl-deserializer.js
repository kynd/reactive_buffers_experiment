module.exports = function( input, opts ) {

  opts = opts ? opts : {};
  var scale = opts.scale ? opts.scale : 1.0;
  var flipYZ = opts.flipYZ ? true : false;

  var objects = [];
  var currentObject;

  var solidStartRegex = /^solid\s(.*)$/;
  var solidEndRegex  = /^endsolid\s(.*)$/;
  var facetNormalRegex = /^\s*facet\snormal\s(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;
  var vertexRegex = /^\s*vertex\s(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;

  var x, y, z;

  var lines = input.split( '\n' );
  var len = lines.length;
  var line, results;
  for( var i = 0; i < len; i++ ) {
    line = lines[ i ];
    var res = line.match( solidStartRegex ); // got a new solid
    if( res ) {
      currentObject = {
        name: res[ 1 ],
        normals: [],
        positions: []
      };
      continue;
    }

    res = line.match( facetNormalRegex );
    if( res ) {
      x = parseFloat( res[ 1 ] );
      y = parseFloat( res[ flipYZ ? 3 : 2 ] );
      z = parseFloat( res[ flipYZ ? 2 : 3 ] );
      currentObject.normals.push( [ x, y, z ] );
      currentObject.normals.push( [ x, y, z ] );
      currentObject.normals.push( [ x, y, z ] );
      continue;
    }

    res = line.match( vertexRegex );
    if( res ) {
      currentObject.positions.push( [
        scale * parseFloat( res[ 1 ] ),
        scale * parseFloat( res[ flipYZ ? 3 : 2 ] ),
        scale * parseFloat( res[ flipYZ ? 2 : 3 ] )
      ] );
      continue;
    }

    var res = line.match( solidEndRegex );
    if( res ) {
      objects.push( currentObject );
    }
  }

  return objects;
};
