(function() {
	'use strict';

	// Configure RequireJS to shim Jasmine
	require.config( {
		baseUrl : '../',
		paths   : {
			'jasmine'     : 'test/lib/jasmine-2.0.3/jasmine',
			'jasmine-html': 'test/lib/jasmine-html',
			'boot'        : 'test/lib/jasmine-2.0.3/boot',
			'jsonld'      : 'bower_components/jsonld.js/js/jsonld',
			'jasmine-ajax': 'bower_components/jasmine-ajax/lib/mock-ajax'
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
		'src/Carbon.spec',
		'src/HTTP.spec',
		'src/rdf/DocumentResource.spec',
		'src/rdf/FragmentResource.spec',
		'src/rdf/PersistedDocumentResource.spec',
		'src/rdf/RDFDocument.spec',
		'src/rdf/Resource.spec',
		'src/Resources.spec',
		'src/REST.spec',
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