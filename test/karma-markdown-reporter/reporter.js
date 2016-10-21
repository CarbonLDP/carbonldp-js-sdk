"use strict";

var fs = require( "fs" );
var glob = require( "glob" );
var path = require( "path" );
var Handlebars = require( "handlebars" );
var swag = require( "swag" );
var markdown = require( "helper-markdown" );

swag.registerHelpers( Handlebars );

(() => {
	Handlebars.registerHelper( "new-line", () => {
		return "\n";
	} );
	Handlebars.registerHelper( "trim", str => {
		str = str || "";
		return str.replace( /\t/g, "" );
	} );

	const classRegex = /Carbon\.[.#A-z()]*/gm;

	Handlebars.registerHelper( "urlify", function( str, isHTML, noParagraph, options ) {
		if( typeof str !== "string" ) throw new Error( "urlify: An string was expected but received: " + str );
		if( ! options ) {
			options = noParagraph;
			noParagraph = void 0;
		}
		noParagraph = ! ! noParagraph;

		if( ! options ) {
			options = isHTML;
			isHTML = void 0;
		}
		isHTML = ! ! isHTML;

		if( noParagraph )
			str = str.replace( /<p>/gm, "" ).replace( /<\/p>/gm, "" );

		var uris = str.match( classRegex );
		if( uris !== null )
			uris = uris.map( uri => uri.replace( /\./g, "-" ).replace( /#/g, "+" ).replace( /\(\)/, "" ) );

		var index = 0;
		return str.replace( classRegex, ( matched ) => {
			if( isHTML )
				return `<a href="#${ uris[ index ++ ] }">${ matched }</a>`;
			return `[${ matched }](#${ uris[ index ++ ] })`;
		} );
	} );

	Handlebars.registerHelper( "markdown", markdown );

	Handlebars.registerHelper( "toc-tree", ( modules, options ) => {
		var elements = [];

		for( var i = 0; i < modules.length; ++ i ) {
			var interfaces = modules[ i ][ "interfaces" ] || [];
			var classes = modules[ i ][ "classes" ] || [];

			Array.prototype.push.apply( elements, interfaces.map( element => {
				return { path: element.path, description: element.description, type: "I" };
			} ) );
			Array.prototype.push.apply( elements, classes.map( element => {
				return { path: element.path, description: element.description, type: "C" };
			} ) );
		}

		elements = elements.sort( function( a, b ) {
			return a.path.localeCompare( b.path );
		} );

		var ret = "";
		for( var j = 0, length = elements.length; j < length; j ++ ) {
			ret = ret + options.fn( elements[ j ] );
		}

		return ret;
	} );

	Handlebars.registerHelper( "combineElements", ( module, options ) => {
		var elements = [];

		var interfaces = module[ "interfaces" ] || [];
		var classes = module[ "classes" ] || [];

		Array.prototype.push.apply( elements, interfaces.map( element => {
			return { element: element, isInterface: true };
		} ) );
		Array.prototype.push.apply( elements, classes.map( element => {
			return { element: element, isClass: true };
		} ) );

		elements = elements.sort( function( a, b ) {
			return a.element.path.localeCompare( b.element.path );
		} );

		var ret = "";
		for( var j = 0, length = elements.length; j < length; j ++ ) {
			ret = ret + options.fn( elements[ j ] );
		}

		return ret;
	} );


	Handlebars.registerHelper( "concat", function( value, string ) {
		value = "" + ( value || "" );
		string = "" + ( string || "" );

		return value + string;
	} );

	Handlebars.registerHelper( "areEqual", function( value1, value2, response1, response2 ) {
		response1 = response1 !== void 0 ? response1 : true;
		response2 = response1 !== void 0 ? response2 : false;

		if( value1 === value2 )
			return response1;
		return response2;
	} );

	Handlebars.registerHelper( "toURL", function( str ) {
		if( typeof str !== "string" ) throw new Error( "urlify: An string was expected but received: " + str );
		return str.replace( /\./g, "-" ).replace( /\//g, "-" ).replace( /#/g, "+" ).replace( /\(\)/, "" );
	} );

})();

var MarkdownReporter = (() => {
	var docsData;
	var template;
	var destFile;

	function isJSON( description ) {
		return description && description.indexOf( "JSON" ) === 0;
	}

	// Parse the string data of a suite or spec
	function parseData( data ) {
		if( isJSON( data ) ) {
			data = data.substring( 4 );
			try {
				return JSON.parse( data );
			} catch( error ) {
				console.warn( error );
			}
		}
		return { name: data };
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
		var name = suite.name;
		var type = suite.suiteType;
		delete suite.suiteType;

		switch( type ) {
			case "module":
				suite.path = suite.name;
				suite.name = suite.path.split( "/" ).pop();
				break;

			case "class":
				parent = parent[ "classes" ] || ( parent[ "classes" ] = {} );
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			case "interface":
				parent = parent[ "interfaces" ] || ( parent[ "interfaces" ] = {} );
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			case "constructor":
				return parent[ "constructors" ] || ( parent[ "constructors" ] = suite );

			case "method":
				parent = parent[ "methods" ] || ( parent[ "methods" ] = {} );

				if( suite.access !== null ) {
					parent = parent[ suite.access ] || ( parent[ suite.access ] = {} );
				}
				break;

			case "decoratedObject":
				return parent[ "decorated-object" ] || ( parent[ "decorated-object" ] = suite );

			case "enum":
				parent = parent[ "enums" ] || ( parent[ "enums" ] = {} );
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			default:
				name = name.replace( " ", "-" );
		}

		return parent[ name ] || ( parent[ name ] = suite );
	}

	function composeSpec( parent, spec ) {
		var signatures;
		var type = spec.specType;
		delete spec.specType;

		switch( type ) {
			case "constructor":
				var constructors = parent[ "constructors" ] || ( parent[ "constructors" ] = {} );
				signatures = constructors[ "signatures" ] || ( constructors[ "signatures" ] = [] );

				signatures.push( spec );
				break;

			case "method":
				var methods = parent[ "methods" ] || ( parent[ "methods" ] = {} );

				if( spec.access !== null ) {
					methods = methods[ spec.access ] || ( methods[ spec.access ] = {} );
				}

				var method = methods[ spec.name ] = { name: spec.name };

				signatures = method[ "signatures" ] || ( method[ "signatures" ] = [] );
				if( ! spec.returns )
					spec.returns = { type: "void" };
				if( ! method.returns )
					method.returns = spec.returns;

				signatures.push( spec );
				break;

			case "property":
				var properties = parent[ "properties" ] || ( parent[ "properties" ] = {} );

				if( spec.access !== null ) {
					properties = properties[ spec.access ] || ( properties[ spec.access ] = {} );
				}

				properties[ spec.name ] = spec;
				break;

			case "signature":
				signatures = parent[ "signatures" ] || ( parent[ "signatures" ] = [] );
				signatures.push( spec );

				if( ! spec.description )
					spec.description = parent.description;
				if( ! spec.returns )
					spec.returns = { type: "void" };
				if( ! parent.returns )
					parent.returns = spec.returns;

				break;

			case "super-class":
				var superClasses = parent[ "super-classes" ] || ( parent[ "super-classes" ] = [] );
				superClasses.push( spec );
				break;

			case "reexports":
				var reexports = parent[ "reexports" ] || ( parent[ "reexports" ] = [] );
				reexports.push( spec );
				break;

			case "defaultExport":
				parent[ "default-export" ] = spec;
				break;

			case "enum":
				var enumerals = parent[ "enumerals" ] || ( parent[ "enumerals" ] = [] );
				enumerals.push( spec );
				break;

			default:
				var name = spec.name.replace( " ", "-" );
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
	}

	function onRunStart( browsers, server ) {
		docsData = {};
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
		parseSpecs( docsData, results.specs );
		// fs.writeFileSync( "doc/data.json", JSON.stringify( docsData ), "utf8" );
	}

	function parseSpecs( parent, specs ) {
		let container;
		let data;
		for( let key of Object.keys( specs ) ) {
			data = parseData( key );
			container = getContainer( parent, data, true );
			for( let spec of specs[ key ]._ ) {
				data = parseData( spec );
				getContainer( container, data, false );
			}
			delete specs[ key ]._;
			parseSpecs( container, specs[ key ] );

			sortObjectProperty( container, "classes" );
			sortObjectProperty( container, "interfaces" );
			sortObjectProperty( container, "reexports" );
			sortObjectProperty( container, "enums" );

			let isClass;
			isClass = sortObjectProperty( container, "methods", "instance" );
			isClass = isClass || sortObjectProperty( container, "methods", "static" );
			if( ! isClass )
				sortObjectProperty( container, "methods" );

			isClass = sortObjectProperty( container, "properties", "instance" );
			isClass = isClass || sortObjectProperty( container, "properties", "static" );
			if( ! isClass )
				sortObjectProperty( container, "properties" );
		}
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
		var data = sortObject( docsData );
		var outData = template( { modules: data } );
		fs.writeFileSync( destFile, outData, "utf8" );
	}

	function sortObjectProperty( object, property, extra ) {
		if( ! object[ property ] ) return;
		var propertyObject = object[ property ];

		if( ! ! extra ) {
			if( ! propertyObject[ extra ] ) return;
			object = propertyObject;
			property = extra;

			propertyObject = propertyObject[ extra ];
		}

		if( Array.isArray( propertyObject ) ) {
			if( typeof propertyObject[ 0 ] === "string" ) return;
			return propertyObject.sort( function( a, b ) {
				return a.name.localeCompare( b.name )
			} );
		}

		return object[ property ] = sortObject( propertyObject );
	}

	function sortObject( object ) {
		var keys = Object.keys( object ).sort();
		var result = [];
		for( var key of keys ) {
			result.push( object[ key ] );
		}
		return result;
	}

	function obtainConfig( config, name ) {
		if( config[ name ] )
			return config[ name ];

		throw new Error( `No ${name} configuration provided.` );
	}

	function addPartials( partials ) {
		var partial;

		if( typeof partials === "object" ) {
			for( var key of Object.keys( partials ) ) {
				partial = partials[ key ];
				if( partial.src ) {
					partial = fs.readFileSync( partial.src, "utf8" );
				}
				Handlebars.registerPartial( key, partial );
			}

		} else if( typeof partials === "string" ) {
			glob( partials, function( err, files ) {
				if( err ) throw  err;

				for( var file of files ) {
					partial = fs.readFileSync( file, "utf8" );
					Handlebars.registerPartial( path.basename( file, ".hbs" ), partial );
				}
			} );
		} else {
			throw new Error( "Partials configuration malformed. Partial no recognized: " + partials );
		}
	}

	var MarkdownReporter = function( config ) {
		config = config.markdownReporter || {};
		var src = obtainConfig( config, "src" );
		destFile = obtainConfig( config, "dest" );

		src = fs.readFileSync( src, "utf8" );
		template = Handlebars.compile( src );

		var partials = Array.isArray( config.partials ) ? config.partials : [ config.partials ];
		for( var partial of partials ) {
			addPartials( partial );
		}

		// this.specSuccess = specSuccess;
		// this.specSkipped = specSkipped;
		// this.specFailure = specFailure;
		// this.onSpecComplete = onSpecComplete;
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
