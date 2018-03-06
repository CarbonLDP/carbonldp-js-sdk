import {
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import DefaultExport, { RDFList } from "./List";

describe( module( "Carbon/RDF/List" ), ():void => {

	describe( interfaze(
		"Carbon.RDF.List.RDFList",
		"Interface that represents an `rdf:List`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@list",
			"Carbon.RDF.Value.RDFValue[]",
			"Array if the elements in the list."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RDF.List.RDFList" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RDFList;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.RDF.List.RDFListFactory",
		"Interface with the factory and utils for `Carbon.RDF.List.RDFList` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `Carbon.RDF.List.RDFList` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is Carbon.RDF.List.RDFList" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RDFList",
		"Carbon.RDF.List.RDFListFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDFList ).toBeDefined();
			expect( RDFList ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different models
		it( "RDFList.is", ():void => {
			expect( RDFList.is ).toBeDefined();
			expect( Utils.isFunction( RDFList.is ) ).toBe( true );

			let list:any = void 0;
			expect( RDFList.is( list ) ).toBe( false );

			list = {
				"@list": null,
			};
			expect( RDFList.is( list ) ).toBe( true );

			delete list[ "@list" ];
			expect( RDFList.is( list ) ).toBe( false );
			list[ "@list" ] = true;
		} );

	} );

} );
