// Karma configuration
// Generated on Wed Nov 12 2014 12:33:32 GMT-0600 (CST)

module.exports = function( config ) {
	const configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		frameworks: [ "jasmine-ajax", "jasmine", "karma-typescript", "source-map-support" ],

		// list of files / patterns to load in the browser
		files: [
			"src/**/*.ts",
			"test/helpers/**/*.ts",
		],

		// pre-process matching files before serving them to the browser
		preprocessors: {
			"**/*.ts": [ "karma-typescript" ],
		},

		karmaTypescriptConfig: {
			tsconfig: "./tsconfig.json",
			bundlerOptions: {
				resolve: {
					alias: {
						"sockjs-client": "test/mock-sockjs.js",
					},
				},
				entrypoints: /\.spec\.ts$/,
				constants: {
					"process.env": {
						"NODE_ENV": "test",
					},
				},
			},
			compilerOptions: {
				sourceMap: true,
			},
			coverageOptions: {
				exclude: /(\.spec\.ts$)|(^test[\/\\].*)/,
				threshold: {
					global: {
						statements: 90,
						branches: 85,
						functions: 90,
						lines: 90,
					},
				},
			},
			reports: {
				"lcovonly": {
					"directory": "coverage",
					"filename": "lcov.info"
				},
				"html": "coverage",
				"text-summary": ""
			},
		},

		reporters: [ "mocha", "karma-typescript" ],

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

	config.set( configuration );
};
