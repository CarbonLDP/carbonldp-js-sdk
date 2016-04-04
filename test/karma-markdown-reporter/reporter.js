"use strict";

let MarkdownReporter = (() => {
	let docsData;

	function isJSON( description ) {
		return description && description.indexOf( "JSON" ) === 0;
	}

	// Parse the string data of a suite or spec
	function parseData( data ) {
		if ( isJSON( data ) ) {
			data = data.substring( 4 );
			try {
				return JSON.parse( data );
			} catch( error ) {
				// TODO: Handle error
				throw error;
			}
		} else {
			return { name: data };
		}
	}

	// Obtains or generate the object for store and arrange the specs data
	function getContainer( parent, data, isSuite ) {
		if( "suiteType" in data || isSuite ) {
			return composeSuite( parent, data );
		} else {
			return composeSpec( parent, data );
		}
	}

	function composeSuite( parent, suite ) {
		let name = suite.name;
		let type = suite.suiteType;
		delete suite.suiteType;

		switch( type ) {
			case "module":
				break;

			case "class":
				parent = parent[ "classes" ] || ( parent[ "classes" ] = new Map() );
				break;

			case "interface":
				// TODO not used in specs yet, implement when used
				return null;

			case "constructor":
				return parent[ "constructors" ] || ( parent[ "constructors" ] = suite );

			case "method":
				parent = parent[ "methods" ] || ( parent[ "methods" ] || new Map() );
				break;

			case "decoratedObject":
				return parent[ "decorated-object" ] || ( parent[ "decorated-object" ] = suite );

			case "enum":
				parent = parent[ "enums" ] || ( parent[ "enums" ] = new Map() );
				break;

			default:
				name = name.replace( " ", "-" );
		}

		if ( parent instanceof Map )
			return parent.has( name ) ? parent.get( name ) : ( parent.set( name, suite ).get( name ) );
		else
			return parent[ name ] = suite;
	}

	function composeSpec( parent, spec ) {
		let signatures;
		let type = spec.specType;
		delete spec.specType;

		switch( type ) {
			case "constructor":
				let constructors = parent[ "constructors" ] || ( parent[ "constructors" ] = {} );
				signatures = constructors[ "signatures" ] || ( constructors[ "signatures" ] = [] );

				signatures.push( spec );
				break;

			case "method":
				let methods = parent[ "methods" ] || ( parent[ "methods" ] = new Map() );
				signatures = spec[ "signatures" ] || ( spec[ "signatures" ] = [] );

				methods.set( spec.name, { access: spec.access, name: spec.name } );
				signatures.push( spec );
				break;

			case "property":
				let properties = parent[ "methods" ] || ( parent[ "methods" ] = new Map() );
				properties.set( spec.name,  spec );
				break;

			case "signature":
				signatures = parent[ "signatures" ] || ( parent[ "signatures" ] = [] );
				signatures.push( spec );

				if( ! spec.description )
					spec.description = parent.description;

				break;

			case "super-class":
				let superClasses = parent[ "super-classes" ] || ( parent[ "super-classes" ] = [] );
				superClasses.push( spec );
				break;

			case "interface":
				// TODO not used in specs yet, implement when used
				return null;

			case "reexports":
				let reexports = parent[ "reexports" ] || ( parent[ "reexports" ] = [] );
				reexports.push( spec );
				break;

			case "defaultExport":
				parent[ "default-export" ] = spec;
				break;

			case "enum":
				let enumerals = parent[ "enumerals" ] || ( parent[ "enumerals"] = [] );
				enumerals.push( spec );
				break;

			default:
				let name = spec.name.replace( " ", "-" );

				if ( parent instanceof  Map )
					parent.set( name, true );
				else
					parent[ name ] = true;

				break;
		}

		return spec;
	}

	function specSuccess() {

	}

	function specSkipped() {

	}

	function specFailure() {

	}

	/**
	 *
	 * @param browser
	 * @param {Object} result
	 * @param {string} result.description
	 * @param {string} result.id
	 * @param {boolean} result.skipped
	 * @param {boolean} result.success
	 * @param {string[]} result.suite - Suites the spec belongs to, from top to bottom
	 */
	function onSpecComplete( browser, result ) {
		let container;
		let path = [].concat( result.suite, result.description );
		let maxDepth = path.length - 1;

		path.reduce( function ( previous, current, depth ) {
			current = parseData( current );

			container = getContainer( previous, current, depth < maxDepth );

			return container;
		}, docsData );
	}

	function onRunStart( browsers, server ) {
		docsData = new Map();
	}

	/**
	 *
	 * @param browser
	 * @param {Object} results
	 * @param {Object} results.specs - A map-object like containing a property per suite, each property points to another map-object like constructing the spec tree
	 * @param {string[]} results.specs._ - A list of all the specs of the suite
	 * @param server
	 */
	function onBrowserStart( browser, results, server ) {

	}

	/**
	 *
	 * @param browsers
	 * @param {Object} overallResults - Results of the complete testsuite
	 * @param {boolean} overallResults.disconnected
	 * @param {boolean} overallResults.error
	 * @param {int} overallResults.exitCode
	 * @param {int} overallResults.failed - Number of tests failed
	 * @param {int} overallResults.success - Number of successful tests
	 * @param server
	 */
	function onRunComplete( browsers, overallResults, server ) {
		console.log( docsData );
	}

	function obtainConfig( config, name ) {
		if ( config[ name ] )
			return config[ name ];

		throw new Error( `No ${src} configuration provided.` );
	}

	let MarkdownReporter = function( config ) {
		config = config.markdownReporter || {};

		this.specSuccess = specSuccess;
		this.specSkipped = specSkipped;
		this.specFailure = specFailure;
		this.onSpecComplete = onSpecComplete;
		this.onRunStart = onRunStart;
		this.onBrowserStart = onBrowserStart;
		this.onRunComplete = onRunComplete;
	};
	MarkdownReporter.$inject = [ "config" ];

	return MarkdownReporter;
})();

module.exports = {
	"reporter:markdown": [ "type", MarkdownReporter ]
};
