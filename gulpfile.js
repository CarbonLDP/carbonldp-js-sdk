"use strict";

const fs = require( "fs" );
const del = require( "del" );
const packageJSON = require( "./package.json" );

const gulp = require( "gulp" );
const util = require( "gulp-util" );

const karma = require( "karma" );

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const dts = require( "dts-generator" );
const glob = require( "glob" );
const minimatch = require( "minimatch" );

const tslint = require( "gulp-tslint" );

const Builder = require( "systemjs-builder" );
const jeditor = require( "gulp-json-editor" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
		    "!src/test/**"
		],
		main: "src/Carbon"
	},
	dist: {
		sfxBundle: "dist/bundles/Carbon.sfx.js",
		tsOutput: "dist",
		all: "dist/**/*"
	},
	bundledDefinition: {
		excludedFiles: [
			"test",
		    "tsconfig.json"
		],
		definitionFiles: [
			"../typings/typings.d.ts"
		]
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
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true,
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
			// TODO: Use tsconfig.json (need to update JSPM to 0.17)
			"typescriptOptions": {
				"module": "commonjs",
				"noImplicitAny": false,
				"removeComments": true,
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

gulp.task( "bundle-definitions", [ "bundle-definitions:tsconfig-creation", "bundle-definitions:bundling", "bundle-definitions:cleaning" ] );
gulp.task( "bundle-definitions:tsconfig-creation", ( done ) => {
	glob( "src/**", ( error, files ) => {
		files = files.filter( ( file ) => {
			return config.source.typescript.reduce( ( previous, current ) => previous && minimatch( file, current ), true );
		});
		files = files.map( ( file ) => file.replace( "src/", "" ) );

		gulp.src( "./tsconfig.json" )
			.pipe( jeditor( (json) => {
				delete json.exclude;

				json.files = files;

				return json;
			} ) )
			.pipe( gulp.dest( "./src" ) )
			.on( "end", done )
		;
	});
});
gulp.task( "bundle-definitions:bundling", [ "bundle-definitions:tsconfig-creation" ], ( done ) => {
	dts.default({
		name: packageJSON.version,
		project: "src/",
		out: "dist/bundles/carbon.d.ts"
	}).then( () => {
		done();
	});
});
gulp.task( "bundle-definitions:cleaning", [ "bundle-definitions:bundling" ], () => {
	return del( [ "./src/tsconfig.json" ] );
});

gulp.task( "clean:dist", ( done ) => {
	return del( config.dist.all, done );
});

gulp.task( "lint", [ "ts-lint" ] );

gulp.task( "build", [ "clean:dist" ], () => { return gulp.start( "build:afterCleaning" ); });
gulp.task( "build:afterCleaning", [ "compile-library", "bundle-sfx", "bundle-definitions" ] );
