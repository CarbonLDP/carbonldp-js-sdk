var gulp = require( 'gulp' );
var sourcemaps = require( 'gulp-sourcemaps' );
var ts = require( 'gulp-typescript' );
var tslint = require( 'gulp-tslint' );
var gutil = require( 'gulp-util' );

var config = {
	source: {
		javascript: 'src/**/*.js',
		typescript: 'src/**/*.ts'
	},
	tsOutput: 'src/'
};

gulp.task( 'ts-lint', function() {
	return gulp.src( config.source.typescript )
		.pipe( tslint() )
		.pipe( tslint.report( 'prose' ) )
	;
});

gulp.task( 'tsc', function() {
	var tsProject = ts.createProject( 'tsconfig.json' );

	var tsResults = gulp.src( config.source.typescript )
			.pipe( sourcemaps.init() )
			.pipe( ts( tsProject ) );

	tsResults.dts
			.pipe( gulp.dest( config.tsOutput ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( config.tsOutput ) )
	;
});

gulp.task( 'clean-ts', function( callback ) {
	var typeScriptGeneratedFiles = [
		config.tsOutput + '**/*.js',
		config.tsOutput + '**/*.js.map'
	];

	del( typeScriptGeneratedFiles, callback );
});