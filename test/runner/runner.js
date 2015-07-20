(function() {
	'use strict';

	// Configure RequireJS to shim Jasmine
	require.config( {
		baseUrl : '../../',
		paths   : {
			'jsonld'      : 'bower_components/jsonld.js/js/jsonld',
			'jasmine-ajax': 'bower_components/jasmine-ajax/lib/mock-ajax',

			'jasmine'     : 'test/runner/lib/jasmine-2.0.3/jasmine',
			'jasmine-html': 'test/runner/lib/jasmine-html',
			'boot'        : 'test/runner/lib/jasmine-2.0.3/boot',
			'jquery'      : 'test/runner/bower_components/jquery/jquery.min.js'
		},
		packages: [
			{
				name    : 'Carbon',
				location: 'src',
				main    : 'Carbon'
			}
		],
		shim    : {
			'jasmine'     : {
				exports: 'window.jasmineRequire'
			},
			'jasmine-html': {
				deps   : [ 'jasmine' ],
				exports: 'window.jasmineRequire'
			},
			'boot'        : {
				deps   : [ 'jasmine', 'jasmine-html' ],
				exports: 'window.jasmineRequire'
			}
		}
	} );

	// Define all of your specs here. These are RequireJS modules.
	var specs = [
		'src/HTTP/Request.spec',
		'src/Utils.spec'
	];

	// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
	// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
	// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
	// initialize the HTML Reporter and execute the environment.
	require( [ 'boot' ], function() {
		require( [ 'jasmine-ajax' ], function() {

		} );

		// Load the specs
		require( specs, function() {
			// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
			window.onload();
		} );
	} );
})();