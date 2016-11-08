"use strict";

const fs = require( "fs" );
const del = require( "del" );

const gulp = require( "gulp" );
const util = require( "gulp-util" );
const replace = require( "gulp-replace" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const tslint = require( "gulp-tslint" );

const jeditor = require( "gulp-json-editor" );

const jasmine = require( "gulp-jasmine" );

const Builder = require( "jspm" ).Builder;

const htmlMinifier = require( "gulp-htmlmin" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
			"!src/test/**"
		],
		all: "src/**/*.ts",
		test: "/**/*.spec.js",
		main: "src/Carbon.ts"
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
		[ "compile:typescript", "compile:documentation", "bundle:sfx" ],
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
	let builder = new Builder();
	builder.buildStatic( "build/sfx.js", config.dist.sfxBundle, {
		"sourceMaps": "inline",
		"mangle": false,
		"lowResSourceMaps": false,
		"removeComments": true,
	} ).then( () => {
		done();
	} ).catch( ( error ) => {
		util.log( error );
		done( error );
	} );
} );

gulp.task( "clean:dist", ( done ) => {
	return del( [ config.dist.all, config.dist.doc ], done );
} );

gulp.task( "clean:temp", () => {
	del.sync( config.dist.temp );
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
	return gulp.src( config.source.typescript )
		.pipe( tslint( {
			tslint: require( "tslint" )
		} ) )
		.pipe( tslint.report( "prose" ) )
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

			json.jspm = {
				map: json.jspm.map,
			};

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.tsOutput ) );
	;
} );

gulp.task( "test", ( done ) => {
	runSequence(
		[ "test:browser", "test:node" ],
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

gulp.task( "test:node", ( done ) => {
	runSequence(
		"test:node|exec",
		"clean:temp",
		done
	);
} );

gulp.task( "test:node|compile", [ "clean:temp" ], () => {
	let tsProject = ts.createProject( "tsconfig.json" );
	let tsResults = gulp.src( config.source.all )
		.pipe( tsProject() );

	return tsResults.js
		.pipe( gulp.dest( config.dist.temp ) );
} );

gulp.task( "test:node|exec", [ "test:node|compile" ], () => {
	return gulp.src( config.dist.temp + config.source.test )
		.pipe( jasmine( {
			includeStackTrace: true
		} ) );
} );
