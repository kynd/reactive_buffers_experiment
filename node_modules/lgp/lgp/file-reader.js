module.exports = function( filePath, callback ) {
  var client = new XMLHttpRequest();
  client.open( 'GET', filePath );
  client.onreadystatechange = function() {
    if( client.readyState !== XMLHttpRequest.DONE ) {
      return;
    }

    if( client.status !== 200 ) {
      return;
    }

    if( callback ) {
      callback( client.responseText );
    }
  }
  client.send();
};
