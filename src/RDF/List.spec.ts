import {
	STATIC,

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

import * as List from "./List";
import DefaultExport from "./List";

describe( module( "Carbon/RDF/List" ), ():void => {

	it( isDefined(), ():void => {
		expect( List ).toBeDefined();
		expect( Utils.isObject( List ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.RDF.List.Class",
		"Interface that represents an `rdf:List`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@list",
			"Carbon.RDF.Value.Class[]",
			"Array if the elements in the list."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.List.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:List.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
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
				{ name: "value", type: "any" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( List.Factory.is ).toBeDefined();
			expect( Utils.isFunction( List.Factory.is ) ).toBe( true );

			let list:any = void 0;
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
