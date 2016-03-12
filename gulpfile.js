"use strict";

let del = require( "del" );

let gulp = require( "gulp" );
let util = require( "gulp-util" );

let karma = require( "karma" );

let sourcemaps = require( "gulp-sourcemaps" );
let ts = require( "gulp-typescript" );
let dts = require( "dts-generator" );
let tslint = require( "gulp-tslint" );

let Builder = require( "systemjs-builder" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts"
		],
		main: "src/Carbon"
	},
	dist: {
		sfxBundle: "dist/bundles/Carbon.sfx.js",
		tsOutput: "dist",
		all: "dist/**/*"
	}
};

gulp.task( "ts-lint", () => {
	return gulp.src( config.source.typescript )
		.pipe( tslint({
			tslint: require( "tslint" )
		}) )
		.pipe( tslint.report( "prose" ) )
	;
});

gulp.task( "test", ( done ) => {
	new karma.Server({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
});

gulp.task( "compile-library", () => {
	let tsProject = ts.createProject({
		"declaration": true,
		"target": "es5",
		"module": "commonjs",
		"removeComments": true,
	});

	let tsResults = gulp.src( config.source.typescript )
			.pipe( sourcemaps.init() )
			.pipe( ts( tsProject ) );

	tsResults.dts
			.pipe( gulp.dest( config.dist.tsOutput ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( config.dist.tsOutput ) )
	;
});

gulp.task( "bundle-sfx", ( done ) => {
	let builder = new Builder();

	builder.buildStatic( "build/sfx.js", config.dist.sfxBundle, {
		sourceMaps: true,
		config: {
			"transpiler": "typescript",
			"typescriptOptions": {
				"sourceMap": true,
				"inlineSourceMap": false,
			},
			"paths": {
				"build/sfx.js": "build/sfx.js",
				"Carbon": "src/Carbon.ts",
				"jsonld": "node_modules/jsonld/js/jsonld.js",
				"*": "*.ts"
			}
		}
	}).then( () => {
		done();
	}).catch( ( error ) => {
		util.log( error );
	});
});

gulp.task( "bundle-definitions", ( done ) => {
	dts.default({
		name: "carbon",
		project: "src/",
		out: "dist/bundles/carbon.d.ts"
	}).then( () => {
		done();
	});
});

gulp.task( "clean:dist", ( done ) => {
	return del( config.dist.all, done );
});


gulp.task( "lint", [ "ts-lint" ] );
gulp.task( "build", [ "test", "ts-lint" ], () => {
	return gulp.start( "build:afterTesting" );
});
gulp.task( "build:afterTesting", [ "clean:dist" ], () => { return gulp.start( "build:afterCleaning" ); });
gulp.task( "build:afterCleaning", [ "compile-library", "bundle-sfx", "bundle-definitions" ] );
