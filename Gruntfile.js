'use strict';

var pkg = require( './package.json' );

var endsWith = function( string, substring ) {
	var index = string.lastIndexOf( substring );
	return index === string.length - substring.length;
};

module.exports = function( grunt ) {

	// Load all grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	// Project configuration.
	grunt.initConfig(
		{
			karma    : {
				all_tests: {
					browsers  : [ 'PhantomJS', 'Chrome', 'Firefox' ],
					configFile: 'karma.conf.js'
				},
				unit     : {
					browsers  : [ 'PhantomJS' ],
					configFile: 'karma.conf.js',
					logLevel  : 'DEBUG'
				}
			},
			ts       : {
				default: {
					src    : [ 'src/**/*.ts' ],
					options: {
						compiler: 'node_modules/typescript/bin/tsc',
						module  : 'amd',
						target  : 'es5',
						verbose : true,
						fast    : 'never'
					}
				}
			},
			requirejs: {
				dev : {
					options: {
						baseUrl                : '.',
						name                   : 'bower_components/almond/almond.js',
						include                : [ 'Carbon' ],
						exclude                : [],
						packages               : [
							{
								name    : 'Carbon',
								location: 'src',
								main    : 'Carbon'
							},
							{
								name    : 'jsonld',
								location: 'bower_components/jsonld.js/js',
								main    : 'jsonld'
							}
						],
						out                    : 'dist/Carbon.js',
						wrap                   : {
							startFile: 'build/start.frag',
							endFile  : 'build/end.frag'
						},
						optimize               : 'none',
						preserveLicenseComments: true
					}
				},
				prod: {
					options: {
						baseUrl                : '.',
						name                   : 'bower_components/almond/almond.js',
						include                : [ 'Carbon' ],
						exclude                : [],
						packages               : [
							{
								name    : 'Carbon',
								location: 'src',
								main    : 'Carbon'
							},
							{
								name    : 'jsonld',
								location: 'bower_components/jsonld.js/js',
								main    : 'jsonld'
							}
						],
						out                    : 'dist/Carbon.min.js',
						wrap                   : {
							startFile: 'build/start.frag',
							endFile  : 'build/end.frag'
						},
						optimize               : 'uglify2',
						preserveLicenseComments: true,
						generateSourceMaps     : false
					}
				}
			}
		}
	);
	grunt.registerTask( 'dist', [ 'ts', 'karma:unit', 'requirejs:dev', 'requirejs:prod' ] );
	grunt.registerTask( 'dist:dev', [ 'ts', 'karma:unit', 'requirejs:dev' ] );
	grunt.registerTask( 'dist:prod', [ 'ts', 'karma:unit', 'requirejs:prod' ] );
	grunt.registerTask( 'test', [ 'karma:all_tests' ] );

};