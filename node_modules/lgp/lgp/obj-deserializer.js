module.exports = function( input, opts ) {

  opts = opts ? opts : {};
  var scale = opts.scale ? opts.scale : 1.0;
  var invert = opts.flipYZ ? -1.0 : 1.0;
  var flipYZ = opts.flipYZ ? true : false;

  var positions = [];
  var normals = [];
  var texcoords = [];

  var cells = [];
  var ncells = [];
  var tcells = [];

  var vRegex = /^v\s*(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;
  var vt2Regex = /^vt\s*(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;                      //texcoord 2D
  var vt3Regex = /^vt\s*(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;   //texcoord 3D
  var vnRegex = /^vn\s*(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)[,|\s]?\s?(-?\d*\.?\d*e*[-\+]*\d*)\s*$/;       //normal
  var fRegex = /^f\s*(.*)/;                                                    //Find Face

  var fv = /^(\d+)$/;                                                         //Found vertex
  var fvt = /^(\d+)\/(\d+)$/;                                                 //Found vertex texcoord
  var fvnt = /^(\d+)\/(\d+)\/(\d+)$/;                                         //Found vertex normal texcoord
  var fvn = /^(\d+)\/\/(\d+)$/;                                               //Found vertex normal

  var lines = input.split( '\n' );
  var len = lines.length;
  var line, results;
  for( var i = 0; i < len; i++ ) {
    line = lines[ i ];

    results = line.match( vRegex ); // got a vertex
    if( results ) {
      var p = [];
      p.push( scale * parseFloat( results[ 1 ] ) );
      p.push( scale * parseFloat( results[ flipYZ ? 3 : 2 ] ) );
      p.push( scale * parseFloat( results[ flipYZ ? 2 : 3 ] ) );
      positions.push( p );
      continue;
    }

    results = line.match( vnRegex ); // got a normal
    if( results ) {
      var p = [];
      p.push( invert * parseFloat( results[ 1 ] ) );
      p.push( invert * parseFloat( results[ flipYZ ? 3 : 2 ] ) );
      p.push( invert * parseFloat( results[ flipYZ ? 2 : 3 ] ) );
      normals.push( p );
      continue;
    }

    results = line.match( vt2Regex ); // got a texcoord v2
    if( results ) {
      var t = [];
      t.push( parseFloat( results[ 1 ] ) );
      t.push( parseFloat( results[ 2 ] ) );
      texcoords.push( t );
      continue;
    }

    results = line.match( vt3Regex ); //got a texcoord v3
    if( results ) {
      var t = [];
      t.push( parseFloat( results[ 1 ] ) );
      t.push( parseFloat( results[ 2 ] ) );
      t.push( parseFloat( results[ 3 ] ) );
      texcoords.push( t );
      continue;
    }

    results = line.match( fRegex );
    if( results ) {
      var parts = results[ 1 ].split( ' ' );
      var plen = parts.length;

      var vpc = [];   //positions cells
      var vtc = [];   //texture cells
      var vnc = [];   //normal cells
      for( var k = 0; k < plen; k++ ) {
          var part = parts[ k ];

          var res = part.match( fv );
          if( res ) {
            vpc.push( parseInt( res[ 1 ] ) - 1 );
            continue;
          }

          res = part.match( fvt );
          if( res ) {
            vpc.push( parseInt( res[ 1 ] ) - 1 );
            vtc.push( parseInt( res[ 2 ] ) - 1 );
            continue;
          }

          res = part.match( fvnt );
          if( res ) {
            vpc.push( parseInt( res[ 1 ] ) - 1 );
            vtc.push( parseInt( res[ 2 ] ) - 1 );
            vnc.push( parseInt( res[ 3 ] ) - 1 );
            continue;
          }

          res = part.match( fvn );
          if( res ) {
            vpc.push( parseInt( res[ 1 ] ) - 1 );
            vnc.push( parseInt( res[ 2 ] ) - 1 );
            continue;
          }
      }

      if( vpc.length ) cells.push( vpc );
      if( vtc.length ) tcells.push( vtc );
      if( vnc.length ) ncells.push( vnc );
    }
  }

  return {
    positions: positions,
    normals: normals,
    texcoords: texcoords,
    cells: cells,
    tcells: tcells,
    ncells: ncells,
  };
};
