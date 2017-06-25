module.exports = function( a ) {
  var result = [];
  var len = a.length;
  var slen = a[ 0 ].length;
  var addZ = slen < 3 ? true : false;
  for( var i = 0; i < len; i++ ) {
    for( var j = 0; j < slen; j++ ) { result.push( a[ i ][ j ] ); }
    if( addZ ) { result.push( 0.0 ); }
  }
  return result;
};
