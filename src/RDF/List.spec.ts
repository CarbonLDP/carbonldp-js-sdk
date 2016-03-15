/// <reference path="./../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Value from "./Value";
import * as Errors from "./../Errors";

import * as List from "./List";

describe( module( "Carbon/RDF/List" ), ():void => {

	it( isDefined(), ():void => {
		expect( List ).toBeDefined();
		expect( Utils.isObject( List ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.RDF.List.Factory",
		"Class Factory to manage creation and management of List objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( List.Factory ).toBeDefined();
			expect( Utils.isFunction( List.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided can be called a RDF List", [
				{ name: "value", type: "any" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( List.Factory.is ).toBeDefined();
			expect( Utils.isFunction( List.Factory.is ) ).toBe( true );

			expect( List.Factory.is( { "@list": [] } ) ).toBe( true );
			expect( List.Factory.is( { "@list": [ "a" ] } ) ).toBe( true );
			expect( List.Factory.is( { "@list": [ { "@value": "a", "@type": "xsd:string" }, { "@value": 1, "@type": "xsd:number" } ] } ) ).toBe( true );
			expect( List.Factory.is( { "@list": [ 1, 2, 3 ] } ) ).toBe( true );

			expect( List.Factory.is( { "@list": "something else" } ) ).toBe( false );
			expect( List.Factory.is( { "@list": 1 } ) ).toBe( false );
			expect( List.Factory.is( { "list": [] } ) ).toBe( false );
			expect( List.Factory.is( { "something": "else" } ) ).toBe( false );
			expect( List.Factory.is( {} ) ).toBe( false );
		});

	});

});