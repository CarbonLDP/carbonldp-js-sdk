var fileSystem = require( 'fs' );


function copyFile( source, target, callback ) {
	callback = callback ? callback : function() {
	};

	console.log( "Copying file '" + source + "' to '" + target + "'..." );

	var targetFolders = target.split( '/' );
	targetFolders.pop();

	ensureFolderStructureExists( targetFolders, function() {
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
	} );
}

function ensureFolderStructureExists( folders, callback, currentFolder ) {
	currentFolder = currentFolder ? currentFolder + '/' : '';

	if( folders.length == 0 ) {
		callback();
		return;
	}

	currentFolder = currentFolder + folders.shift();

	fileSystem.stat( currentFolder, function( error, stats ) {
		if( error == null && stats.isDirectory() ) {
			ensureFolderStructureExists( folders, callback, currentFolder );
			return;
		} else if( error.code != 'ENOENT' ) {
			console.log( "Couldn't read folder: '" + currentFolder + "'. Error: " + error );
			callback( error );
			return;
		}

		createFolder( folders, callback, currentFolder );
	} );
}

function createFolder( folders, callback, currentFolder ) {
	console.log( "Creating folder '" + currentFolder + "'..." );

	fileSystem.mkdir( currentFolder, function( error ) {
		if( error ) {
			console.log( "Couldn't create folder: '" + currentFolder + "'. Error: " + error );
			callback( error );
		}
		ensureFolderStructureExists( folders, callback, currentFolder );
	} );
}