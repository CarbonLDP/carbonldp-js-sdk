import {
	clazz,
	isDefined,
	module,
} from "../test/JasmineExtender";

import * as Builder from "./Builder";

describe( module( "carbonldp/SPARQL/Builder", "Module that reexports the customized SPARQLER class." ), ():void => {

	it( isDefined(), ():void => {
		expect( Builder ).toBeDefined();
		expect( Builder ).toEqual( jasmine.any( Object ) );
	} );

	// TODO: Document `FinishSPARQLSelect`

	describe( clazz( "CarbonLDP.SPARQL.Builder.SPARQLBuilder", "Customized SPARQLER class to be used by the SDK" ), ():void => {

		// TODO: Test `SPARQLBuilder.constructor`

		// TODO: Test `SPARQLBuilder => FinishSPARQLSelect`

	} );

} );
