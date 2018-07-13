import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { BaseFreeResources } from "./BaseFreeResources";


describe( module( "carbonldp/FreeResources" ), () => {

	describe( interfaze(
		"CarbonLDP.BaseFreeResources",
		"Interface for the basic properties to create a free resources container."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.GeneralRegistry<any>",
			"The registry where the FreeResources scope is in."
		), ():void => {
			const target:BaseFreeResources[ "$registry" ] = {} as GeneralRegistry<any>;
			expect( target ).toBeDefined();
		} );

	} );

} );
