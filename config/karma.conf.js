// Karma configuration
// Generated on Wed Nov 12 2014 12:33:32 GMT-0600 (CST)
const webpackConfig = require( "./webpack.test.js" );

module.exports = function( config ) {
	const configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		frameworks: [ "jasmine-ajax", "jasmine" ],

		// list of files / patterns to load in the browser
		files: [
			"test/tests_index.js",
		],

		mime: {
			"text/x-typescript": [ "ts" ]
		},

		webpack: webpackConfig( { env: "test" } ),
		webpackMiddleware: {
			stats: "errors-only"
		},

		// pre-process matching files before serving them to the browser
		preprocessors: {
			"test/tests_index.js": [ "webpack", "sourcemap" ],
		},

		reporters: [ "documentation" ],

		// reporter options
		mochaReporter: {
			ignoreSkipped: true,
		},

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
		browserNoActivityTimeout: 60 * 1000,
		browsers: [ "ChromeHeadless" ],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	};

	if( process.env.TRAVIS ) configuration.browsers = [ "ChromeHeadless" ];

	config.set( configuration );
};
