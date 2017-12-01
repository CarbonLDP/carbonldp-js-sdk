"use strict";

const fs = require( "fs" );
const path = require( "path" );

const del = require( "del" );
const filter = require( 'gulp-filter' );

const gulp = require( "gulp" );
const util = require( "gulp-util" );
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
const webpackStream = require( "webpack-stream" );
const named = require( "vinyl-named" );
const merge2 = require( "merge2" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
			"!src/test/**",
		],
		all: "src/**/*.ts",
		test: "**/*.spec.js",
		main: "src/Carbon.ts",
	},
	dist: {
		sfxBundle: "dist/bundles/Carbon.sfx.js",
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

gulp.task( "compile:documentation", [ "compile:documentation:html" ] );

gulp.task( "compile:documentation:html", ( done ) => {
	runSequence(
		"compile:documentation|compile",
		"compile:documentation|minify",
		done
	);
} );

gulp.task( "compile:documentation|compile", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		reporters: [ "markdown" ],
		markdownReporter: {
			src: "build/docs/html/template.hbs",
			partials: "build/docs/html/partials/*.hbs",
			dest: "docs/index.html"
		},
		singleRun: true
	}, done ).start();
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

gulp.task( "compile:documentation:markdown", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		reporters: [ "markdown" ],
		markdownReporter: {
			src: "build/docs/markdown/template.hbs",
			partials: "build/docs/markdown/partials/*.hbs",
			dest: "docs/README.md"
		},
		singleRun: true
	}, done ).start();
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
		"sockjs-client": path.resolve( __dirname, "test/mock-sockjs.js" ),
		"webstomp-client/src/frame.js": path.resolve( __dirname, "temp/node_modules/frame.js" ),
	} );

	require( "source-map-support/register" );

	let babelStream = gulp
		.src( "node_modules/webstomp-client/src/frame.js" )
		.pipe( named() )
		.pipe( webpackStream( {
			output: { libraryTarget: "umd" },
		} ) )
		.pipe( gulp.dest( path.resolve( config.dist.temp, "node_modules" ) ) );

	let tsProject = ts.createProject( "tsconfig.json" );
	let tsResults = gulp.src( [ "{src,test}/**/*.ts" ] )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.js
		.pipe( sourcemaps.mapSources( ( sourcePath ) => path.resolve( "./", sourcePath ) ) )
		.pipe( sourcemaps.write( ".", {
			includeContent: false,
		} ) );

	const stream = merge2( babelStream, tsResults )
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
