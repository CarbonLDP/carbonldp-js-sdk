import {
	STATIC,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";
import DefaultExport from "./RawResults";

describe( module( "Carbon/SPARQL/RawResults" ), ():void => {

	it( isDefined(), ():void => {
		expect( RawResults ).toBeDefined();
		expect( Utils.isObject( RawResults ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.SPARQL.RawResults",
		"Class that specifies the result types of a SPARQL query."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RawResults.ValueTypes ).toBeDefined();
			expect( Utils.isFunction( RawResults.ValueTypes ) ).toBe( true );
		} );

		it( hasProperty(
			STATIC,
			"URI",
			"string"
		), ():void => {
			expect( RawResults.ValueTypes.URI ).toBeDefined();
			expect( Utils.isString( RawResults.ValueTypes.URI ) ).toBe( true );

			expect( RawResults.ValueTypes.URI ).toBe( "uri" );
		} );

		it( hasProperty(
			STATIC,
			"LITERAL",
			"string"
		), ():void => {
			expect( RawResults.ValueTypes.LITERAL ).toBeDefined();
			expect( Utils.isString( RawResults.ValueTypes.LITERAL ) ).toBe( true );

			expect( RawResults.ValueTypes.LITERAL ).toBe( "literal" );
		} );

		it( hasProperty(
			STATIC,
			"BNODE",
			"string"
		), ():void => {
			expect( RawResults.ValueTypes.BNODE ).toBeDefined();
			expect( Utils.isString( RawResults.ValueTypes.BNODE ) ).toBe( true );

			expect( RawResults.ValueTypes.BNODE ).toBe( "bnode" );
		} );

	} );

	describe( interfaze(
		"Carbon.SPARQL.RawResults.Class",
		"Interface that represents the raw response of a SPARQL query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"head",
			`{ "vars"?:string[], "links"?:string[] }`,
			"Contains an array `vars` with the possible elements inside the results bindings properties. Can also contains an array `link`, that contains URI to further information about the results."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"results",
			`{ "bindings":Carbon.SPARQL.RawResults.BindingObject[] }`,
			"The results of a `SELECT` query."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"boolean",
			"boolean",
			"The result of an `ASK` query."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.SPARQL.RawResults.BindingObject",
		"Interface that represents the raw response of a SPARQL query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"[ name:string ]",
			"Carbon.SPARQL.RawResults.BindingProperty",
			"An entry of every `vars` requested as the `name` variable, containing the binding property with its value."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.SPARQL.RawResults.BindingProperty",
		"Interface that represents every entry of a `Carbon.SPARQL.RawResults.BindingObject`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"type",
			"string",
			"The type of binding property, it could be `uri`, `literal` or `bnode`."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"value",
			"string",
			"The string value of binding property."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"datatype",
			"string",
			"The URI of the type of the binding property. This is only present when the property is of type `literal`."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"xml:lang",
			"string",
			"If the property is a `literal` and of data type `xsd:string`, this property indicates if it has an specific language."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.SPARQL.RawResults.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RawResults.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.SPARQL.RawResults.Factory",
		"Factory class for `Carbon.SPARQL.RawResults.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RawResults.Factory ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.SPARQL.RawResult.Class` object.", [
				{ name: "value", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RawResults.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( RawResults.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				head: null,
				results: null,
				boolean: null,
			};
			expect( RawResults.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.head;
			expect( RawResults.Factory.hasClassProperties( object ) ).toBe( false );
			object.head = null;

			delete object.results;
			expect( RawResults.Factory.hasClassProperties( object ) ).toBe( true );
			object.results = null;

			delete object.boolean;
			expect( RawResults.Factory.hasClassProperties( object ) ).toBe( true );
			object.boolean = null;

			expect( RawResults.Factory.hasClassProperties( null ) ).toBe( false );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.SPARQL.RawResult.Class` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RawResults.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory.is ) ).toBe( true );

			let object:Object;

			object = { "head": {} };
			expect( RawResults.Factory.is( object ) ).toBe( true );
			object = { "head": {}, results: {} };
			expect( RawResults.Factory.is( object ) ).toBe( true );
			object = { "head": {}, boolean: {} };
			expect( RawResults.Factory.is( object ) ).toBe( true );

			object = { "boolean": {} };
			expect( RawResults.Factory.is( object ) ).toBe( false );
			object = { "results": {} };
			expect( RawResults.Factory.is( object ) ).toBe( false );

			expect( RawResults.Factory.is( "another thing" ) ).toBe( false );
			expect( RawResults.Factory.is( 100 ) ).toBe( false );
			expect( RawResults.Factory.is( {} ) ).toBe( false );
			expect( RawResults.Factory.is( [] ) ).toBe( false );
			expect( RawResults.Factory.is( null ) ).toBe( false );
			expect( RawResults.Factory.is( undefined ) ).toBe( false );
		} );

	} );

} );
