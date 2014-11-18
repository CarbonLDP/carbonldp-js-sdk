var tests = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function( path ) {
	return path.replace( /^\/base\//, '' ).replace( /\.js$/, '' );
};

Object.keys( window.__karma__.files ).forEach(
	function( file ) {
		if( TEST_REGEXP.test( file ) ) {
			// Normalize paths to RequireJS module names.
			tests.push( pathToModule( file ) );
		}
	}
);

require.config(
	{
		// Karma serves files under /base, which is the basePath from your config file
		baseUrl: '/base',

		paths: {
			'underscore': 'bower_components/underscore/underscore',
			'Squire':     'bower_components/squire/src/Squire',
			'jog': 'bower_components/jog/dist/jog.min'
		},

		packages: [
			{
				name:     'Carbon',
				location: 'src',
				main:     'Carbon'
			},
			{
				name:     'URIjs',
				location: 'bower_components/URIjs/src',
				main:     'URI'
			}
		],

		shim: {
			'underscore': {
				exports: '_'
			}
		}
	}
);

require(
	tests, function() {
		window.__karma__.start();
	}
);