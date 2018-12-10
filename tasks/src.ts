import fs from "fs";
import gulp from "gulp";
import { promisify } from "util";


export const cleanSRC:gulp.TaskFunction = ( done ) => {
	Promise
		.all( [
			processDirectory( "src" ),
			processDirectory( "test/helpers" ),
		] )
		.then( () => {
			done();
		} )
		.catch( ( error ) => {
			done( error );
		} );

	function cleanDirectory( directory:string ):Promise<boolean> {
		return promisify( fs.readdir )( directory )
			.then( ( files ) => {
				return processDirectoryFiles( directory, files );
			} );
	}

	function processDirectoryFiles( directory:string, files:string[] ):Promise<boolean> {
		const promises:Promise<boolean>[] = [];
		for( const file of files ) {
			const path:string = getPath( directory, file );
			promises.push( promisify( fs.lstat )( path ).then( ( fileStats ) => {
				if( fileStats.isDirectory() ) return processDirectory( path );
				else if( fileStats.isFile() ) return processFile( path );
				else return Promise.resolve( false );
			} ) );
		}

		return Promise
			.all( promises )
			.then( ( erasedStatuses ) => {
				return erasedStatuses.reduce( ( previous, current ) => previous && current, true );
			} );
	}

	function processDirectory( directory:string ):Promise<boolean> {
		let allContentsWereErased:boolean;

		return cleanDirectory( directory )
			.then( ( _allContentsWereErased ) => {
				allContentsWereErased = _allContentsWereErased;
				if( allContentsWereErased ) {
					console.log( `All files of directory '${directory}' were removed. Deleting it...` );
					return promisify( fs.rmdir )( directory );
				}
			} )
			.then( () => {
				return allContentsWereErased;
			} );
	}

	function processFile( file:string ):Promise<boolean> {
		const extension:string | null = getFileExtension( file );
		if( extension === null ) return Promise.resolve( false );

		let hasSrcFilePromise:Promise<boolean>;
		let hasSrcFile:boolean;

		switch( extension ) {
			case "js":
				hasSrcFilePromise = jsHasSrc( file );
				break;
			case "map":
				hasSrcFilePromise = mapHasSrc( file );
				break;
			default:
				return Promise.resolve( false );
		}

		return hasSrcFilePromise
			.then( ( _hasSrcFile ) => {
				hasSrcFile = _hasSrcFile;
				if( ! hasSrcFile ) {
					console.log( `File '${file}' doesn't have a src file. Deleting it...` );
					return promisify( fs.unlink )( file );
				}
			} )
			.then( () => {
				return ! hasSrcFile;
			} );
	}

	function jsHasSrc( file:string ):Promise<boolean> {
		const directory:string = getDirectory( file );
		const fileName:string = getFileName( file );
		const tsFile:string = directory + "/" + fileName + ".ts";

		return fileExists( tsFile );
	}

	function mapHasSrc( file:string ):Promise<boolean> {
		const directory:string = getDirectory( file );
		const srcFileName:string = getFileName( file );
		const srcFileExtension:string | null = getFileExtension( srcFileName );

		const srcFile:string = directory + "/" + srcFileName;

		switch( srcFileExtension ) {
			case "js":
				return jsHasSrc( srcFile );
			default:
				return Promise.resolve( true );
		}
	}

	function fileExists( file:string ):Promise<boolean> {
		return promisify( fs.lstat )( file )
			.then( () => {
				return true;
			} )
			.catch<boolean>( ( error ) => {
				if( error.code === "ENOENT" ) return false;
				else return Promise.reject( error );
			} );
	}

	function getDirectory( file:string ):string {
		const pathParts:string[] = file.split( "/" );

		pathParts.pop();

		if( pathParts.length === 0 ) return "/";

		return pathParts.join( "/" );
	}

	function getPath( directory:string, fileName:string ):string {
		return directory + "/" + fileName;
	}

	function getFile( filePath:string ):string {
		const pathParts:string[] = filePath.split( "/" );
		return pathParts[ pathParts.length - 1 ];
	}

	function getFileName( file:string ):string {
		const fileName:string = getFile( file );
		const fileParts:string[] = fileName.split( "." );

		fileParts.pop();

		if( fileParts.length === 0 ) return file;

		return fileParts.join( "." );
	}

	function getFileExtension( file:string ):string | null {
		const fileName:string = getFile( file );
		const fileParts:string[] = fileName.split( "." );

		if( fileParts.length === 1 ) return null;

		return fileParts[ fileParts.length - 1 ];
	}
};
cleanSRC.displayName = "clean:src";
