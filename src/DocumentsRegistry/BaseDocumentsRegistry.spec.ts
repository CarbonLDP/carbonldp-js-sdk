import { DocumentsContext } from "../Context/DocumentsContext";

import { hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";


describe( module( "carbonldp/DocumentsRegistry" ), () => {

	describe( interfaze(
		"CarbonLDP.BaseDocumentsRegistry",
		"Base data for the DocumentsRegistry."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:BaseDocumentsRegistry[ "context" ] = {} as DocumentsContext;
			expect( target ).toBeDefined();
		} );

	} );

} );
