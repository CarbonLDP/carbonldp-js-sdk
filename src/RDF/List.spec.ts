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
	} );

	describe( clazz(
		"Carbon.RDF.List.Factory",
		"Factory class for `Carbon.RDF.List.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( List.Factory ).toBeDefined();
			expect( Utils.isFunction( List.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.RDF.List.Class` object.", [
				{name: "value", type: "any"},
			],
			{type: "boolean"}
		), ():void => {
			expect( List.Factory.is ).toBeDefined();
			expect( Utils.isFunction( List.Factory.is ) ).toBe( true );

			let list:any;
			expect( List.Factory.is( list ) ).toBe( false );

			list = {
				"@list": null,
			};
			expect( List.Factory.is( list ) ).toBe( true );

			delete list[ "@list" ];
			expect( List.Factory.is( list ) ).toBe( false );
			list[ "@list" ] = true;
		} );

	} );

} );