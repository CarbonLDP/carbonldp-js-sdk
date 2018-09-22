import { hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";

import { ContextSettings } from "./ContextSettings";


describe( module( "carbonldp/Context" ), () => {

	describe( interfaze( "CarbonLDP.ContextSettings", "Interface of the possible settings of a Context." ), ():void => {

		it( "should exists", ():void => {
			const target:ContextSettings = {} as ContextSettings;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"vocabulary",
			"string",
			"Optional default vocabulary to use as in the general schema of the context."
		), ():void => {
			const target:ContextSettings[ "vocabulary" ] = "" as string;
			expect( target ).toBeDefined();
		} );

	} );

} );
