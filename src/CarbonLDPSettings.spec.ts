import { CarbonLDPSettings } from "./CarbonLDPSettings";

import { DocumentsContextSettings } from "./Context/DocumentsContextSettings";


import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, OPTIONAL, } from "./test/JasmineExtender";

describe( module( "carbonldp/Settings" ), ():void => {

	describe( interfaze( "CarbonLDP.CarbonLDPSettings", "Interface of the possible settings used by the Carbon class." ), ():void => {

		it( extendsClass( "CarbonLDP.DocumentsContextSettings" ), ():void => {
			const target:DocumentsContextSettings = {} as CarbonLDPSettings;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"host",
			"string",
			"The host of the platform to connect to."
		), ():void => {
			const target:CarbonLDPSettings[ "host" ] = "" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"post",
			"number",
			"The optional port of the host to connect to."
		), ():void => {
			const target:CarbonLDPSettings[ "port" ] = 80 as number;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"ssl",
			"boolean",
			"Flag that indicates is the server is under a secure connection or not.\n" +
			"By default it will be set to true, making the host to be resolved as `https://`"
		), ():void => {
			const target:CarbonLDPSettings[ "ssl" ] = false as boolean;
			expect( target ).toBeDefined();
		} );

	} );

} );
