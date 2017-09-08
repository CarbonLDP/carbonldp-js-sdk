const webpack = require( "webpack" );

module.exports = function( options ) {
	return {
		resolve: {
			extensions: [ ".ts", ".js" ],
		},

		node: {
			global: true,
			process: true,

			console: false,
			setImmediate: false,
			Buffer: false,
			__filename: false,
			__dirname: false,

			url: "empty",
			http: "empty",
			https: "empty",
		},

		plugins: [
			new webpack.IgnorePlugin( /file-type/ ),
		],

		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: "awesome-typescript-loader",
				},
			],
		},
	};
};
