import {
	enumeration,
	hasEnumeral,
	isDefined,
	module
} from "../test/JasmineExtender";

import { AuthMethod } from "./AuthMethod";

describe( module( "carbonldp/Auth/AuthMethod" ), ():void => {

	describe( enumeration(
		"CarbonLDP.Auth.AuthMethod",
		"Enum with the methods of authentication supported by Carbon LDP."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AuthMethod ).toBeDefined();
			expect( AuthMethod ).toEqual( jasmine.any( Object ) );
		} );

		it( hasEnumeral(
			"BASIC",
			"HTTP Basic authentication sending the `username` and `password` in every call."
		), ():void => {
			expect( AuthMethod.BASIC ).toBeDefined();
		} );

		it( hasEnumeral(
			"TOKEN",
			"Authentication with `username` and `password` generating a token that will be sent in every call."
		), ():void => {
			expect( AuthMethod.TOKEN ).toBeDefined();
		} );

	} );

} );
