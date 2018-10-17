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

	const classRegex = /CarbonLDP([./][./#a-zA-Z0-9]*)?/gmi;

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

		return str.replace( classRegex, ( matched ) => {
			const uri = toURL( matched );
			if( isHTML )
				return `<a href="#${ uri }">${ matched }</a>`;
			return `[${ matched }](#${ uri })`;
		} );
	} );

	Handlebars.registerHelper( "markdown", markdown );

	Handlebars.registerHelper( "toc-tree", ( modules, options ) => {
		var elements = [];

		for( var i = 0; i < modules.length; ++ i ) {
			var interfaces = modules[ i ][ "interfaces" ] || [];
			var classes = modules[ i ][ "classes" ] || [];
			var namespaces = modules[ i ][ "namespaces" ] || [];

			Array.prototype.push.apply( elements, interfaces.map( element => {
				return { path: element.path, description: element.description, type: "I" };
			} ) );
			Array.prototype.push.apply( elements, classes.map( element => {
				return { path: element.path, description: element.description, type: "C" };
			} ) );
			Array.prototype.push.apply( elements, namespaces.map( element => {
				return { path: element.path, description: element.description, type: "N" };
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
		var namespaces = module[ "namespaces" ] || [];

		Array.prototype.push.apply( elements, interfaces.map( element => {
			return { element: element, isInterface: true };
		} ) );
		Array.prototype.push.apply( elements, classes.map( element => {
			return { element: element, isClass: true };
		} ) );
		Array.prototype.push.apply( elements, namespaces.map( element => {
			return { element: element, isNamespace: true };
		} ) );

		elements = elements.sort( function( a, b ) {
			return a.element.path.localeCompare( b.element.path );
		} );

		var ret = "";
		for( var j = 0, length = elements.length; j < length; j ++ ) {
			ret = ret + options.fn( Object.assign( { "first": j === 0, "last": j === length - 1 }, elements[ j ] ) );
		}

		return ret;
	} );


	Handlebars.registerHelper( "concat", function( value, string ) {
		value = "" + (value || "");
		string = "" + (string || "");

		return value + string;
	} );

	Handlebars.registerHelper( "areEqual", function( value1, value2, response1, response2 ) {
		response1 = response1 !== void 0 ? response1 : true;
		response2 = response1 !== void 0 ? response2 : false;

		if( value1 === value2 )
			return response1;
		return response2;
	} );

	Handlebars.registerHelper( "toURL", toURL );

	function toURL( str ) {
		if( typeof str !== "string" ) throw new Error( "toURL: An string was expected but received: " + str );

		if( str.startsWith( "carbonldp/" ) ) str = "Module/" + str;

		return str
			.replace( /\./g, "-" )
			.replace( /\//g, "-" )
			.replace( /#/g, "+" )
			.replace( /\(\)/, "" );
	}
})();

var MarkdownReporter = (() => {
	var docsData;
	var template;
	var destFile;

	function isJSON( description ) {
		return description && description.indexOf( "JSON" ) === 0;
	}

	/**
	 * Parse the string data of a suite or spec.
	 * @param {string} data
	 * @returns {{}}
	 */
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

	/**
	 * Obtains or generate the object for store and arrange the specs data.
	 *
	 * @param {Object} parent
	 * @param {Object} data
	 * @returns {*}
	 */
	function getContainer( parent, data ) {
		if( "suiteType" in data ) {
			return composeSuite( parent, data );
		} else {
			return composeSpec( parent, data );
		}
	}

	function composeSuite( parent, suite ) {
		var name = suite.name;
		var type = suite.suiteType;

		switch( type ) {
			case "module":
				suite.path = suite.name;
				suite.name = suite.path.split( "/" ).pop();
				break;

			case "namespace":
				parent = parent[ "namespaces" ] || (parent[ "namespaces" ] = {});
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			case "class":
				parent = parent[ "classes" ] || (parent[ "classes" ] = {});
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			case "interface":
				parent = parent[ "interfaces" ] || (parent[ "interfaces" ] = {});
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			case "constructor":
				return parent[ "constructors" ] || (parent[ "constructors" ] = suite);

			case "method":
				parent = parent[ "methods" ] || (parent[ "methods" ] = {});

				if( suite.access !== null ) {
					parent = parent[ suite.access ] || (parent[ suite.access ] = {});
				}
				break;

			case "decoratedObject":
				return parent[ "decorated-object" ] || (parent[ "decorated-object" ] = suite);

			case "enum":
				parent = parent[ "enums" ] || (parent[ "enums" ] = {});
				suite.path = suite.name;
				suite.name = suite.path.split( "." ).pop();
				break;

			default:
				return null;
		}

		return parent[ name ] || (parent[ name ] = suite);
	}

	function composeSpec( parent, spec ) {
		var signatures;
		var type = spec.specType;
		delete spec.specType;

		switch( type ) {
			case "constructor":
				var constructors = parent[ "constructors" ] || (parent[ "constructors" ] = {});
				signatures = constructors[ "signatures" ] || (constructors[ "signatures" ] = []);

				signatures.push( spec );
				break;

			case "method":
				var methods = parent[ "methods" ] || (parent[ "methods" ] = {});

				if( spec.access !== null ) {
					methods = methods[ spec.access ] || (methods[ spec.access ] = {});
				}

				var method = methods[ spec.name ] = { name: spec.name };

				signatures = method[ "signatures" ] || (method[ "signatures" ] = []);
				if( ! spec.returns )
					spec.returns = { type: "void" };
				if( ! method.returns )
					method.returns = spec.returns;

				signatures.push( spec );
				break;

			case "property":
				var properties = parent[ "properties" ] || (parent[ "properties" ] = {});

				if( parent.suiteType !== "namespace" && spec.access !== null ) {
					properties = properties[ spec.access ] || (properties[ spec.access ] = {});
				}

				properties[ spec.name ] = spec;
				break;

			case "signature":
				signatures = parent[ "signatures" ] || (parent[ "signatures" ] = []);
				signatures.push( spec );

				if( ! spec.description )
					spec.description = parent.description;
				if( ! spec.returns )
					spec.returns = { type: "void" };
				if( ! parent.returns )
					parent.returns = spec.returns;

				break;

			case "super-class":
				var superClasses = parent[ "super-classes" ] || (parent[ "super-classes" ] = []);
				superClasses.push( spec );
				break;

			case "reexports":
				var reexports = parent[ "reexports" ] || (parent[ "reexports" ] = []);
				reexports.push( spec );
				break;

			case "defaultExport":
				parent[ "default-export" ] = spec;
				break;

			case "enum":
				var enumerals = parent[ "enumerals" ] || (parent[ "enumerals" ] = []);
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
		const container = getParentContainer( result.suite );
		if( container === null ) return;

		const data = parseData( result.description );
		getContainer( container, data );
	}

	/**
	 * @param {string[]} suites
	 * @return {{} | null}
	 */
	function getParentContainer( suites ) {
		let container = docsData;

		for( const suite of suites ) {
			if( ! isJSON( suite ) ) return null;
			const data = parseData( suite );

			container = getContainer( container, data );
			if( ! container ) return null;
		}

		return container;
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
		// parseSpecs( docsData, results.specs );
		// fs.writeFileSync( "doc/data.json", JSON.stringify( docsData ), "utf8" );
	}

	function parseSpecs( parent, specs ) {
		for( let key of Object.keys( specs ) ) {
			if( ! isJSON( key ) ) continue;
			const data = parseData( key );

			const container = getContainer( parent, data );
			if( container === null ) continue;

			for( let spec of specs[ key ]._ ) {
				const subData = parseData( spec );
				getContainer( container, subData );
			}
			delete specs[ key ]._;
			parseSpecs( container, specs[ key ] );

			sortObjectProperty( container, "namespaces" );
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
		const data = sortData( docsData );
		const outData = template( { modules: data } );
		fs.writeFileSync( destFile, outData, "utf8" );
	}

	/**
	 * @param {{name: string}|{name: string}[]|string[]} data
	 * @return {{name: string}[]|string[]}
	 */
	function sortData( data ) {
		const array = Array.isArray( data )
			? sortArray( data )
			: sortObject( data )
		;

		for( const element of array ) {
			if( typeof element !== "object" ) continue;

			// Order containers by name
			for( const key of [ "namespaces", "classes", "interfaces", "reexports", "enums" ] ) {
				if( ! element[ key ] ) continue;
				element[ key ] = sortData( element[ key ] );
			}

			// Order sub-containers
			for( const key of [ "methods", "properties" ] ) {
				if( ! element[ key ] ) continue;

				if( [ "module", "class" ].includes( element.suiteType ) ) {
					for( const subKey of [ "instance", "static" ] ) {
						if( ! (subKey in element[ key ]) ) continue;
						element[ key ][ subKey ] = sortObject( element[ key ][ subKey ] );
					}

				} else {
					element[ key ] = sortObject( element[ key ] );
				}
			}
		}

		return array;
	}

	/**
	 *
	 * @param {{name: string}} object
	 * @returns {{name: string}[]}
	 */
	function sortObject( object ) {
		return Object
			.keys( object )
			.sort()
			.map( key => object[ key ] )
			;
	}

	/**
	 * @param {{name: string}[]|string[]} array
	 * @returns {{name: string}[]|string[]}
	 */
	function sortArray( array ) {
		return array
			.sort( function( a, b ) {
				a = a.name ? a.name : a;
				b = b.name ? b.name : b;

				return a.localeCompare( b );
			} );
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
