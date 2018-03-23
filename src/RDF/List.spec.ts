import {
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

import { RDFList } from "./List";

describe( module( "carbonldp/RDF/List" ), ():void => {

	describe( interfaze(
		"CarbonLDP.RDF.RDFList",
		"Interface that represents an RDF List."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@list",
			"CarbonLDP.RDF.RDFValue[]",
			"Array if the elements in the list."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.RDF.RDFListFactory",
		"Interface with the factory and utils for `CarbonLDP.RDF.RDFList` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.RDF.RDFList` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.RDF.RDFList" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RDFList",
		"CarbonLDP.RDF.RDFListFactory"
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
