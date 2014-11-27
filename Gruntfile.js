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
			watch:     {
				main: {
					options: {
						spawn: false
					},
					files:   [ 'src/**/*' ],
					tasks:   [] //all the tasks are run dynamically during the watch event handler
				}
			},
			karma:     {
				configFile: 'karma.conf.js',
				all_tests:  {
					browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ]
				},
				unit:       {
					browsers: [ 'PhantomJS' ]
				}
			},
			requirejs: {
				jsonld: {
					options: {
						baseUrl:        '',
						include:        [
							'bower_components/jsonld.js/js/jsonld'
						],
						out:            'src/dependencies/jsonld.js/jsonld.js',
						removeCombined: true,
						optimize:       'none',
						preserveLicenseComments: false,
						wrap:           {
							startFile: 'src/dependencies/jsonld.js/start.js',
							endFile:   'src/dependencies/jsonld.js/end.js'
						}
					}
				}
			}
		}
	);

	grunt.registerTask( 'serve', [ 'watch' ] );
	grunt.registerTask( 'test', [ 'karma:all_tests' ] );
	grunt.registerTask( 'dependencies', [ 'requirejs:jsonld' ] );

};