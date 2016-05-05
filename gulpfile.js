"use strict";

const fs = require( "fs" );
const del = require( "del" );
const packageJSON = require( "./package.json" );

const gulp = require( "gulp" );
const util = require( "gulp-util" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const dts = require( "dts-generator" );
const glob = require( "glob" );
const minimatch = require( "minimatch" );

const tslint = require( "gulp-tslint" );

const Builder = require( "systemjs-builder" );
const jeditor = require( "gulp-json-editor" );

const jasmine = require( "gulp-jasmine" );

let config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
		    "!src/test/**"
		],
		all: "src/**/*.ts",
		test: "/**/*.spec.js",
		main: "src/Carbon"
	},
	dist: {
		sfxBundle: "dist/bundles/Carbon.sfx.js",
		tsOutput: "dist",
		all: "dist/**/*",
		doc: "doc/*",
		temp: "temp"
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

gulp.task( "test:browser", ( done ) => {
	new karma.Server({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
});

gulp.task( "test:debug", ( done ) => {
	new karma.Server({
		configFile: __dirname + "/karma.conf.js",
		autoWatch: true,
		singleRun: false
	}, done ).start();
});

gulp.task( "clean:temp", () => {
	del.sync( config.dist.temp );
});

gulp.task( "test:node:compile", [ "clean:temp" ], () => {
	let tsProject = ts.createProject( "tsconfig.json" );
	let tsResults = gulp.src( config.source.all )
		.pipe( ts( tsProject ) );

	return tsResults.js
		.pipe( gulp.dest( config.dist.temp ) );
});

gulp.task( "test:node:exec", [ "test:node:compile" ], () => {
	return gulp.src( config.dist.temp + config.source.test )
		.pipe( jasmine() );
});

gulp.task( "test:node", ( done ) => {
	runSequence(
		"test:node:exec",
		"clean:temp",
		done
	);
});

gulp.task( "test", [ "test:browser", "test:node" ] );

gulp.task( "generate-doc", ( done ) => {
	new karma.Server({
		configFile: __dirname + "/karma.conf.js",
		reporters: [ "markdown" ],
		markdownReporter: {
			src: "build/doc-templates/template.hbs",
			partials: "build/doc-templates/partials/*.hbs",
			dest: "doc/README.md"
		},
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
		name: packageJSON.name,
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
	return del( [ config.dist.all, config.dist.doc ], done );
});

gulp.task( "lint", [ "ts-lint" ] );

gulp.task( "build", ( done ) => {
	runSequence(
		"clean:dist",
		[ "compile-library", "generate-doc", "bundle-sfx", "bundle-definitions" ],
		done
	);
});
