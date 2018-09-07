import { enumeration, hasEnumeral, module } from "../test/JasmineExtender";

import { QueryPropertyType } from "./QueryPropertyType";


describe( module( "carbonldp/QueryDocuments/QueryPropertyType" ), () => {

	describe( enumeration(
		"CarbonLDP.QueryDocuments.QueryPropertyType",
		"Enum fot the type of data expected to return for a property."
	), () => {

		it( "should exists", () => {
			expect( QueryPropertyType ).toBeDefined();
			expect( QueryPropertyType ).toEqual( jasmine.any( Object ) );
		} );


		it( hasEnumeral(
			"FULL",
			"The property is expected to point to a fulled resolved document"
		), () => {
			expect( QueryPropertyType.FULL ).toBeDefined();
		} );

		it( hasEnumeral(
			"PARTIAL",
			"The property is expected to point to a partial resource (document/fragment)."
		), () => {
			expect( QueryPropertyType.PARTIAL ).toBeDefined();
		} );

		it( hasEnumeral(
			"ALL",
			"The property is expected to point to a resource with all is properties but without related fragments resolved."
		), () => {
			expect( QueryPropertyType.ALL ).toBeDefined();
		} );

		it( hasEnumeral(
			"EMPTY",
			"The property point to a literal, or its known."
		), () => {
			expect( QueryPropertyType.EMPTY ).toBeDefined();
		} );

	} );

} );
