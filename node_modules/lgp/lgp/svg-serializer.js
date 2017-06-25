var normalize = require('guf').normalizeArray;

var width = -1.0; var height = -1.0;

module.exports = function( input ) {
  var content = "";
  width = -1.0; height = -1.0;
  if( input.constructor === Array ) {
    for( var i = 0; i < input.length; i++ ) {
       content += serialize( input[0] );
    }
  }
  else {
    content += serialize( input );
  }
  var output = "<svg ";
  output += "width=\"" + width + "\" ";
  output += "height=\"" + height + "\" ";
  output += "xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n";
  output += content;
  output += "</svg>\n";
  return output;
};

function serialize( input ) {
  if( input.polyline === undefined && input.polygon === undefined ) {
    throw "Input Not Valid: Does not contain any polylines or polygons";
  }

  var points = input.polyline;
  var inc = input.size !== undefined ? input.size : 3;
  var stroke = input.stroke !== undefined ? input.stroke : "black";
  var strokeWidth = input.strokeWidth !== undefined ? input.strokeWidth : "1";
  var fill = input.fill !== undefined ? input.fill : "none";

  var type = "polyline";
  if( points === undefined ) {
    points = input.polygon;
    type = "polygon";
  }

  var pl;
  if( points[ 0 ].constructor === Array ) {
    pl = normalize( points );
    inc = 3;
  }
  else {
    pl = points;
  }

  var bb = calculateBoundingRect( pl );
  var tl = bb[ 0 ];
  var br = bb[ 1 ];
  var w = br[ 0 ] - tl[ 0 ];
  var h = tl[ 1 ] - br[ 1 ];
  if( w > width ) { width = w; }
  if( h > height ) { height = h; }
  tl[ 0 ] *= -1.0;
  var plen = pl.length;
  var output = "\t<" + type + " points=\""

  for( var i = 0; i < plen; i += inc ) {
    output += ( tl[ 0 ] + pl[ i ] ) + ",";
    output += ( tl[ 1 ] + ( -1.0 * pl[ i + 1 ] ) );
    if( i + inc < plen ) { output += " "; }
    else { output += "\" "; }
  }

  output += "stroke=\"" + stroke;
  output += "\" stroke-width=\"" + strokeWidth;
  output += "\" fill=\"" + fill;
  output += "\" />\n";

  return output;
}

function calculateBoundingRect( points ) {
  var tl = [ 100000000.0, -100000000.0 ];
  var br = [ -100000000.0, 100000000.0 ];

  var len = points.length;
  for( var i = 0; i < len; i += 3 ) {
    var x = points[ i ];
    var y = points[ i + 1 ];
    if( x < tl[ 0 ] ) { tl[ 0 ] = x; }
    if( x > br[ 0 ] ) { br[ 0 ] = x; }
    if( y > tl[ 1 ] ) { tl[ 1 ] = y; }
    if( y < br[ 1 ] ) { br[ 1 ] = y; }
  }
  return [ tl, br ];
}
