import { enumeration, hasEnumeral, isDefined, module } from "../test/JasmineExtender";

import { ContainerType } from "./ContainerType";


describe( module( "carbonldp/ObjectSchema" ), ():void => {

	describe( enumeration(
		"CarbonLDP.ContainerType",
		"Enum for the types that a container can be."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ContainerType ).toBeDefined();
			expect( ContainerType ).toEqual( jasmine.any( Object ) );
		} );

		it( hasEnumeral(
			"SET"
		), ():void => {
			expect( ContainerType.SET ).toBeDefined();
		} );

		it( hasEnumeral(
			"LIST"
		), ():void => {
			expect( ContainerType.LIST ).toBeDefined();
		} );

		it( hasEnumeral(
			"LANGUAGE"
		), ():void => {
			expect( ContainerType.LANGUAGE ).toBeDefined();
		} );

	} );

} );
