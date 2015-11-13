var del = require( 'del' );

var gulp = require( 'gulp' );
var util = require( 'gulp-util' );

var karma = require( 'karma' );

var sourcemaps = require( 'gulp-sourcemaps' );
var ts = require( 'gulp-typescript' );
var tslint = require( 'gulp-tslint' );

var Builder = require( 'systemjs-builder' );

var config = {
	source: {
		typescript: [
			'src/**/*.ts',
			'!src/**/*.spec.ts'
		],
		main: 'src/Carbon'
	},
	dist: {
		sfxBundle: 'dist/bundles/Carbon.sfx.js',
		tsOutput: 'dist/js',
		all: 'dist/**/*'
	}
};

gulp.task( 'ts-lint', function() {
	return gulp.src( config.source.typescript )
		.pipe( tslint() )
		.pipe( tslint.report( 'prose' ) )
	;
});

gulp.task( 'test', function( done ) {
	new karma.Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done ).start();
});

gulp.task( 'compile-library', function() {
	var tsProject = ts.createProject({
		"declaration": true,
		"module": "commonjs",
		"target": "es5"
	});

	var tsResults = gulp.src( config.source.typescript )
			.pipe( sourcemaps.init() )
			.pipe( ts( tsProject ) );

	tsResults.dts
			.pipe( gulp.dest( config.dist.tsOutput ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( config.dist.tsOutput ) )
	;
});

gulp.task( 'bundle-sfx', function( done ) {
	var builder = new Builder();

	builder.buildStatic( "build/sfx.js", config.dist.sfxBundle, {
		config: {
			"transpiler": "typescript",
			"paths": {
				"build/sfx.js": "build/sfx.js",
				"Carbon": "src/Carbon.ts",
				"jsonld": "node_modules/jsonld/js/jsonld.js",
				"*": "*.ts"
			}
		}
	}).then( function() {
		done();
	}).catch( function( error ) {
		util.log( error );
	});
});

gulp.task( 'clean:dist', function( done ) {
	return del( config.dist.all, done );
});


gulp.task( 'lint', [ 'ts-lint' ] );
gulp.task( 'build', [ 'test', 'ts-lint' ], function() {
	return gulp.start( 'build:afterTesting' );
});
gulp.task( 'build:afterTesting', [ 'clean:dist' ], function() { return gulp.start( 'build:afterCleaning' ); });
gulp.task( 'build:afterCleaning', [ 'compile-library', 'bundle-sfx' ] );