"use strict";

const fs = require( "fs" );
const path = require( "path" );

const promisify = require( "util" ).promisify;

const del = require( "del" );

const filter = require( "gulp-filter" );

const gulp = require( "gulp" );
const replace = require( "gulp-replace" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const tslint = require( "tslint" );
const gulpTslint = require( "gulp-tslint" );

const jeditor = require( "gulp-json-editor" );

const jasmine = require( "gulp-jasmine" );

const webpack = require( "webpack" );

const htmlMinifier = require( "gulp-htmlmin" );

const moduleAlias = require( "module-alias" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
			"!src/test/**",
		],
		all: "src/**/*.ts",
		test: "**/*.spec.js",
		main: "src/CarbonLDP.ts",
	},
	dist: {
		sfxBundle: "dist/bundles/CarbonLDP.sfx.js",
		tsOutput: "dist",
		all: "dist/**/*",
		doc: "doc/*",
		temp: "temp"
	},
};

gulp.task( "default", [ "build" ] );

gulp.task( "version", () => {
	let pk = JSON.parse( fs.readFileSync( "./package.json" ) );
	return gulp.src( config.source.main )
		.pipe( replace( /(static get version\(\):string \{ return ")(.*)("; })/g, `$1${pk.version}$3` ) )
		.pipe( gulp.dest( "src/" ) )
		;
} );

gulp.task( "build", ( done ) => {
	runSequence(
		"version",
		"clean:dist",
		[ "compile:typescript", "bundle:sfx" ],
		"prepare:npm-package",
		"finish",
		done
	);
} );

// "build" task isn't exiting after finishing everything it needs to do
// For now this task will finish the process
// TODO: Find the real culprit
gulp.task( "finish", () => {
	process.exit( 0 );
} );

gulp.task( "bundle:sfx", ( done ) => {
	let compiler = webpack( require( "./webpack.config.js" ) );
	compiler.run( ( error ) => {
		if( error ) done( error );
		else done();
	} );
} );

gulp.task( "clean:dist", ( done ) => {
	return del( [ config.dist.all, config.dist.doc ], done );
} );

/**
 * Removes unused files (.js, .map) that were created by a compiler from files that no longer exists
 */
gulp.task( "clean:src", ( done ) => {
	Promise.all( [
		processDirectory( "src" ),
		processDirectory( "test/helpers" )
	] ).then( () => {
		done();
	} ).catch( ( error ) => {
		done( error );
	} );

	function cleanDirectory( directory ) {
		return promisify( fs.readdir )( directory ).then( ( files ) => {
			return processDirectoryFiles( directory, files );
		} );
	}

	function processDirectoryFiles( directory, files ) {
		let promises = [];
		for( let file of files ) {
			let path = getPath( directory, file );
			promises.push( promisify( fs.lstat )( path ).then( ( fileStats ) => {
				if( fileStats.isDirectory() ) return processDirectory( path );
				else if( fileStats.isFile() ) return processFile( path );
				else return Promise.resolve( false );
			} ) );
		}

		return Promise.all( promises ).then( ( erasedStatuses ) => {
			return erasedStatuses.reduce( ( previous, current ) => previous && current, true );
		} );
	}

	function processDirectory( directory ) {
		let allContentsWereErased;

		return cleanDirectory( directory ).then( ( _allContentsWereErased ) => {
			allContentsWereErased = _allContentsWereErased;
			if( allContentsWereErased ) {
				console.log( `All files of directory '${directory}' were removed. Deleting it...` );
				return promisify( fs.rmdir )( directory );
			}
		} ).then( () => {
			return allContentsWereErased;
		} );
	}

	function processFile( file ) {
		let extension = getFileExtension( file );
		if( extension === null ) return Promise.resolve( false );

		let hasSrcFilePromise;
		let hasSrcFile;

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

		return hasSrcFilePromise.then( ( _hasSrcFile ) => {
			hasSrcFile = _hasSrcFile;
			if( ! hasSrcFile ) {
				console.log( `File '${file}' doesn't have a src file. Deleting it...` );
				return promisify( fs.unlink )( file );
			}
		} ).then( () => {
			return ! hasSrcFile;
		} );
	}

	function jsHasSrc( file ) {
		let directory = getDirectory( file );
		let fileName = getFileName( file );
		let tsFile = directory + "/" + fileName + ".ts";

		return fileExists( tsFile );
	}

	function mapHasSrc( file ) {
		let directory = getDirectory( file );
		let srcFileName = getFileName( file );
		let srcFileExtension = getFileExtension( srcFileName );

		let srcFile = directory + "/" + srcFileName;

		switch( srcFileExtension ) {
			case "js":
				return jsHasSrc( srcFile );
			default:
				return Promise.resolve( true );
		}
	}

	function fileExists( file ) {
		return promisify( fs.lstat )( file ).then( ( fileStat ) => {
			return true;
		} ).catch( ( error ) => {
			if( error.code === "ENOENT" ) return false;
			else return Promise.reject( error );
		} );
	}

	function getDirectory( file ) {
		let pathParts = file.split( "/" );

		pathParts.pop();

		if( pathParts.length === 0 ) return "/";

		return pathParts.join( "/" );
	}

	function getPath( directory, fileName ) {
		return directory + "/" + fileName;
	}

	function getFile( filePath ) {
		let pathParts = filePath.split( "/" );
		return pathParts[ pathParts.length - 1 ];
	}

	function getFileName( file ) {
		let fileName = getFile( file );
		let fileParts = fileName.split( "." );

		fileParts.pop();

		if( fileParts.length === 0 ) return file;

		return fileParts.join( "." );
	}

	function getFileExtension( file ) {
		let fileName = getFile( file );
		let fileParts = fileName.split( "." );

		if( fileParts.length === 1 ) return null;

		return fileParts[ fileParts.length - 1 ];
	}
} );

gulp.task( "compile:documentation", ( done ) => {
	done( "Not implemented." );
} );

gulp.task( "compile:documentation|minify", () => {
	return gulp.src( "docs/index.html" )
		.pipe( htmlMinifier( {
			collapseWhitespace: true,
			conservativeCollapse: true,
			removeComments: true
		} ) )
		.pipe( gulp.dest( "docs" ) )
		;
} );

gulp.task( "compile:typescript", () => {
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true,
	} );

	let tsResults = gulp.src( config.source.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	tsResults.dts
		.pipe( gulp.dest( config.dist.tsOutput ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( config.dist.tsOutput ) )
		;
} );

gulp.task( "lint", [ "lint:typescript" ] );

gulp.task( "lint:typescript", () => {
	let program = tslint.Linter.createProgram( "./tsconfig.json" );
	return gulp.src( config.source.typescript )
		.pipe( gulpTslint( {
			formatter: "prose",
			program,
		} ) )
		.pipe( gulpTslint.report() )
		;
} );

gulp.task( "prepare:npm-package", ( done ) => {
	runSequence(
		[ "prepare:npm-package|copy:documentation", "prepare:npm-package|copy:package-json" ],
		done
	);
} );

gulp.task( "prepare:npm-package|copy:documentation", () => {
	return gulp.src( [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
		"documentation/**/*"
	], { base: "./" } ).pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "prepare:npm-package|copy:package-json", () => {
	return gulp.src( "package.json" )
		.pipe( jeditor( ( json ) => {
			delete json.private;
			delete json.scripts;
			delete json.devDependencies;

			json.main = json.main.replace( "dist/", "" );
			json.typings = json.typings.replace( "dist/", "" );

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "test", ( done ) => {
	runSequence(
		"test:node",
		"test:browser",
		"finish",
		done
	);
} );

gulp.task( "test:browser", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
} );

gulp.task( "test:debug", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		autoWatch: true,
		singleRun: false
	}, done ).start();
} );

gulp.task( "test:node", () => {
	process.env.NODE_ENV = "test";

	moduleAlias.addAliases( {
		"sockjs-client": path.resolve( __dirname, config.dist.temp, "test/mock-sockjs" ),
	} );

	require( "source-map-support/register" );

	let tsProject = ts.createProject( "tsconfig.json" );
	let stream = gulp.src( [ "{src,test}/**/*.ts" ] )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.js
		.pipe( sourcemaps.mapSources( ( sourcePath ) => path.resolve( "./", sourcePath ) ) )
		.pipe( sourcemaps.write( ".", {
			includeContent: false,
		} ) )
		.pipe( gulp.dest( config.dist.temp ) )
		.pipe( filter( [ config.source.test, "**/test/**/index.js" ] ) )
		.pipe( jasmine( {
			includeStackTrace: true,
		} ) );

	stream.on( "jasmineDone", deleteTmpDir );
	stream.on( "error", deleteTmpDir );

	return stream;
} );

function deleteTmpDir() {
	del.sync( config.dist.temp );
}
