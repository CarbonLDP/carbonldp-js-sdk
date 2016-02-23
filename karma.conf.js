// Karma configuration
// Generated on Wed Nov 12 2014 12:33:32 GMT-0600 (CST)

module.exports = function( config ) {
	config.set( {
		basePath: "",

		frameworks: [ "jspm", "jasmine" ],

		jspm: {
			config: "jspm.config.js",
			packages: "test/jspm_packages/",

			loadFiles: [
				"test/karma-jasmine/lib/extender.js",
				"node_modules/jasmine-ajax/lib/mock-ajax.js",
				"node_modules/es6-shim/es6-shim.min.js",

				"src/**/*.spec.ts"
			],
			serveFiles: [
				"src/**/!(*.spec).ts"
			]
		},

		reporters: [ "documentation" ],

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ "Chrome" ],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	} );
};
