var fileSystem = require( 'fs' );
copyFile( 'scripts/pre-commit', '.git/hooks/pre-commit', function( error ) {
	if( error ) process.exit( 1 );
	else process.exit();
} );


function copyFile( source, target, callback ) {
	callback = callback ? callback : function() {
	};

	console.log( "Copying file '" + source + "' to '" + target + "'..." );

	var callbackCalled = false;

	var readStream = fileSystem.createReadStream( source );
	readStream.on( "error", done );

	var writeStream = fileSystem.createWriteStream( target );
	writeStream.on( "error", done );
	writeStream.on( "close", done );

	readStream.pipe( writeStream );

	function done( error ) {
		if( error ) console.error( 'Couldn\'t copy the file. Error:' + error );
		else console.log( 'File copied successfully' );

		callback( error );
	}
}