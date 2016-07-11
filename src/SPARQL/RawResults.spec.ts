import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty,
	hasMethod,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";

describe( module( "Carbon/SPARQL/RawResults" ), ():void => {

	it( isDefined(), ():void => {
		expect( RawResults ).toBeDefined();
		expect( Utils.isObject( RawResults ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.SPARQL.RawResults",
		"Class where specifies the types a SPARQL query result can be"
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

	describe( clazz(
		"Carbon.SPARQL.RawResults.Factory",
		"Factory class for RawResults objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RawResults.Factory ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided contains the properties required to be a `Carbon.SPARQL.RawResult.Class` object", [
				{name: "value", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( RawResults.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
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
			"Returns true if the object provided is a `Carbon.SPARQL.RawResult.Class` object", [
				{name: "value", type: "any"}
			],
			{type: "boolean"}
		), ():void => {
			expect( RawResults.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RawResults.Factory.is ) ).toBe( true );

			let object:Object;

			object = {"head": {}};
			expect( RawResults.Factory.is( object ) ).toBe( true );
			object = {"head": {}, results: {}};
			expect( RawResults.Factory.is( object ) ).toBe( true );
			object = {"head": {}, boolean: {}};
			expect( RawResults.Factory.is( object ) ).toBe( true );

			object = {"boolean": {}};
			expect( RawResults.Factory.is( object ) ).toBe( false );
			object = {"results": {}};
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