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
					files  : [ 'src/**/*' ],
					tasks  : [] //all the tasks are run dynamically during the watch event handler
				}
			},
			karma    : {
				configFile: 'karma.conf.js',
				all_tests : {
					browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ]
				},
				unit      : {
					browsers: [ 'PhantomJS' ]
				}
			},
			requirejs: {
				dev : {
					options: {
						baseUrl                : '.',
						name                   : 'bower_components/almond/almond.js',
						include                : [ 'Carbon' ],
						packages               : [
							{
								name    : 'Carbon',
								location: 'src',
								main    : 'Carbon'
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
						packages               : [
							{
								name    : 'Carbon',
								location: 'src',
								main    : 'Carbon'
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

	grunt.registerTask( 'serve', [ 'watch' ] );
	grunt.registerTask( 'test', [ 'karma:all_tests' ] );
	grunt.registerTask( 'dependencies', [ 'requirejs:jsonld' ] );

};