const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );

const commonConfig = require( "./webpack.common.js" );

module.exports = function( options ) {
	return webpackMerge( commonConfig( options ), {
		devtool: "inline-source-map",

		plugins: [
			new webpack.IgnorePlugin( /nock/ ),
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
