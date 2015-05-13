'use strict';

var pkg = require( './package.json' );

var endsWith = function( string, substring ) {
	var index = string.lastIndexOf( substring );
	return index === string.length - substring.length;
};

module.exports = function( grunt ) {

	// Load all grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	grunt.loadTasks( 'grunt_tasks' );

	// Project configuration.
	grunt.initConfig(
		{
			watch    : {
				main: {
					options: {
						spawn: false
					},
					files  : [ 'src/**/*.ts' ],
					tasks  : [] //all the tasks are run dynamically during the watch event handler
				}
			},
			karma    : {
				all_tests: {
					browsers  : [ 'PhantomJS', 'Chrome', 'Firefox' ],
					configFile: 'karma.conf.js'
				},
				unit     : {
					browsers  : [ 'Chrome' ],
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
						exclude                : [ 'jsonld' ],
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
						preserveLicenseComments: false
					}
				},
				prod: {
					options: {
						baseUrl                : '.',
						name                   : 'bower_components/almond/almond.js',
						include                : [ 'Carbon' ],
						exclude                : [ 'jsonld' ],
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
						preserveLicenseComments: false,
						generateSourceMaps     : true
					}
				}
			}
		}
	);

	grunt.registerTask( 'dist:dev', [ 'ts', 'karma:unit', 'requirejs:dev' ] );
	grunt.registerTask( 'test', [ 'karma:all_tests' ] );

};