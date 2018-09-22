const path = require( "path" );

const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );

const commonConfig = require( "./webpack.common.js" );

const TEST_DIR = path.resolve( __dirname, "../test" );

module.exports = function( options = {} ) {
	Object.assign( options, { env: "test" } );

	return webpackMerge( commonConfig( options ), {
		devtool: "inline-source-map",

		resolve: {
			alias: {
				"sockjs-client$": path.resolve( TEST_DIR, "mock-sockjs" ),
			},
		},

		plugins: [
			new webpack.IgnorePlugin( /es6-promise/, /jsonld/ ),
		],

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "source-map-loader",
					enforce: "pre",
				},
			],
		},
	} );
};
