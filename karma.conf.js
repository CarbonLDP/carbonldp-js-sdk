// Karma configuration
// Generated on Wed Nov 12 2014 12:33:32 GMT-0600 (CST)

const webpack = require( "webpack" );

module.exports = function( config ) {
	let configuration = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		frameworks: [ "jasmine-ajax", "jasmine", "es6-shim" ],

		// list of files / patterns to load in the browser
		files: [
			"test/test_index.ts",
		],

		mime: {
			"text/x-typescript": [ "ts" ]
		},

		// preprocess matching files before serving them to the browser
		preprocessors: {
			"test/test_index.ts": [ "webpack" ],
			"src/**/*.ts": [ "webpack" ],
		},

		webpack: {
			devtool: 'inline-source-map',

			resolve: {
				extensions: [ ".ts", ".js" ],
			},

			target: "node",
			node: {},
			externals: [ "nock", "file-type" ],
			plugins: [
				// ignore node dependencies in jsonld.js
				new webpack.IgnorePlugin( /^(?=.*)((?!\.\/\.\.\/src\/).)((?!webpack amd options).)*$/, /jsonld\/js$/ ),
			],


			module: {
				loaders: [
					{ test: /\.ts$/, loader: "awesome-typescript-loader" },
				],
			},
		},
		webpackMiddleware: {
			stats: 'errors-only'
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
		browsers: [ "Chrome" ],

		customLaunchers: {
			chrome_travis_ci: {
				base: "Chrome",
				flags: [ "--no-sandbox" ]
			}
		},


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	};

	if( process.env.TRAVIS ) configuration.browsers = [ "chrome_travis_ci" ];

	config.set( configuration );
};
