const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const SRC_DIR = path.resolve( __dirname, '../src/' );
const DIST_DIR = path.resolve( __dirname, '../../../docs/' );

module.exports = {
	mode: 'production',

	entry: {
		'bundle': path.resolve( SRC_DIR, 'entry-point.js' ),
	},

	output: {
		path: DIST_DIR,
		filename: 'scripts/bundle.min.js',
	},

	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							discardComments: { removeAll: true },
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require( 'autoprefixer' ),
							]
						}
					},
					{
						loader: 'sass-loader'
					}
				],
			},
			{
				test: /fonts\/.*\.(woff|svg|eot|ttf|woff2)$/,
				loader: [
					{
						loader: 'url-loader',
						query: {
							limit: 1024,
							name: 'assets/[name].[ext]',
						},
					},
					'image-webpack-loader',
				],
			},
		],
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin( {
				cache: true,
				parallel: true,
				sourceMap: false,
				uglifyOptions: {
					output: {
						comments: false,
						beautify: false,
					},
				},
			} ),
			new OptimizeCSSAssetsPlugin( {} )
		]
	},

	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'assets/styles.min.css',
		} ),
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
		} ),
		new webpack.DefinePlugin( {
			"process.env": {
				"NODE_ENV": JSON.stringify( "prod" ),
			},
		} ),
	],
};
