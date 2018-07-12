import { Document } from "../Document/Document";
import { extendsClass, hasProperty, interfaze, module, OBLIGATORY } from "../test/JasmineExtender";

import { BaseResolvableFragment } from "./BaseResolvableFragment";
import { BaseTransientFragment } from "./BaseTransientFragment";


describe( module( "carbonldp/Fragment" ), () => {

	describe( interfaze(
		"CarbonLDP.BaseResolvableFragment",
		"Interface with the base properties for the creation of a Fragment."
	), () => {

		it( extendsClass( "CarbonLDP.BaseTransientFragment" ), () => {
			const target:BaseTransientFragment = {} as BaseResolvableFragment;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.Document"
		), ():void => {
			const target:BaseResolvableFragment[ "$registry" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

	} );

} );
