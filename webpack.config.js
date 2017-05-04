const path = require( "path" );
const webpack = require( "webpack" );

module.exports = {
	entry: {
		"Carbon.sfx": "./build/sfx.ts",
		"Carbon.sfx.min": "./build/sfx.ts",
	},

	output: {
		path: path.resolve( __dirname, "./dist/bundles" ),
		filename: "[name].js",
		libraryTarget: "umd",
		library: "Carbon",
	},

	resolve: {
		extensions: [ ".ts" ],
	},

	target: "node",
	externals: {
		"file-type": {
			commonjs: "file-type",
			commonjs2: "file-type",
			amd: "file-type",
			root: "fileType",
		},
	},

	devtool: "inline-source-map",

	plugins: [
		new webpack.optimize.UglifyJsPlugin( {
			include: /\.min\.js$/
		} ),
	],

	module: {
		rules: [
			{ test: /\.ts$/, loader: "awesome-typescript-loader" },
		],
	},
};