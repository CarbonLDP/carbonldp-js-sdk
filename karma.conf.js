// Karma configuration
// Generated on Wed Nov 12 2014 12:33:32 GMT-0600 (CST)

module.exports = function( config ) {
	let configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		frameworks: [ "jasmine-ajax", "jasmine", "karma-typescript" ],

		// list of files / patterns to load in the browser
		files: [
			"src/**/*.ts",
		],

		karmaTypescriptConfig: {
			tsconfig: "./tsconfig.json",
			bundlerOptions: {
				// TODO: https://github.com/monounity/karma-typescript/issues/144
				// sourceMap: true,
				addNodeGlobals: false,
				entrypoints: /\.spec\.ts$/,
				exclude: [ "file-type", "nock", "http", "https", "url",
					// TODO: https://github.com/monounity/karma-typescript/issues/166
					       "crypto", "jsonld-request", "pkginfo", "request", "util", "xmldom" ],
				// noParse: [ "jsonld" ],
			},
			compilerOptions: {
				sourceMap: true,
			},
		},

		// preprocess matching files before serving them to the browser
		preprocessors: {
			"src/**/*.ts": [ "karma-typescript" ],
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
