import { clazz, isDefined, module } from "../test/JasmineExtender";

import { ObjectSchemaUtils } from "./ObjectSchemaUtils";


describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( clazz( "CarbonLDP.ObjectSchemaUtils",
		"Class with useful functions that use schemas."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ObjectSchemaUtils ).toBeDefined();
			expect( ObjectSchemaUtils ).toEqual( jasmine.any( Function ) );
		} );

		// TODO: Document and test .resolveProperty

	} );

} );
