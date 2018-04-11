const path = require( "path" );

const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );

const DIST_DIR = path.resolve( __dirname, "../dist" );
const SRC_DIR = path.resolve( __dirname, "../build" );
const commonConfig = require( "./webpack.common.js" );

module.exports = function( options = {} ) {
	Object.assign( options, { env: "prod" } );

	return webpackMerge( commonConfig( options ), {
		entry: {
			"CarbonLDP.sfx": path.resolve( SRC_DIR, "sfx.ts" ),
			"CarbonLDP.sfx.min": path.resolve( SRC_DIR, "sfx.ts" ),
		},

		output: {
			path: path.resolve( DIST_DIR, "bundles" ),
			filename: "[name].js",
			libraryTarget: "umd",
			library: "CarbonLDP",
		},

		plugins: [
			new webpack.optimize.UglifyJsPlugin( {
				include: /\.min\.js$/
			} ),
		],
	} );
};
