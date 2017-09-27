const path = require( "path" );

const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );

const DIST_DIR = path.resolve( __dirname, "../dist" );
const SRC_DIR = path.resolve( __dirname, "../build" );
const commonConfig = require( "./webpack.common.js" );

module.exports = function( options ) {
	return webpackMerge( commonConfig( options ), {
		entry: {
			"Carbon.sfx": path.resolve( SRC_DIR, "sfx.ts" ),
			"Carbon.sfx.min": path.resolve( SRC_DIR, "sfx.ts" ),
		},

		output: {
			path: path.resolve( DIST_DIR, "bundles" ),
			filename: "[name].js",
			libraryTarget: "umd",
			library: "Carbon",
		},

		plugins: [
			new webpack.optimize.UglifyJsPlugin( {
				include: /\.min\.js$/
			} ),
		],
	} );
};
