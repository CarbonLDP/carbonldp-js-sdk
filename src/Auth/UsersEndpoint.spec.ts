import {
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";

import { UsersEndpoint } from "./UsersEndpoint";


describe( module( "carbonldp/Auth/UsersEndpoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpoint",
		"Endpoint for manage the users of a Carbon LDP instance."
	), ():void => {
	} );

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpointFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.UsersEndpoint` objects."
	), ():void => {
		// TODO: Document
	} );

	describe( property(
		STATIC,
		"UsersEndpoint",
		"CarbonLDP.AuthUsersEndpointFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsersEndpoint ).toBeDefined();
			expect( UsersEndpoint ).toEqual( jasmine.any( Object ) );
		} );

		describe( "UsersEndpoint.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( UsersEndpoint.TYPE ).toBeDefined();
				expect( UsersEndpoint.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should bbe cs:Users", ():void => {
				expect( UsersEndpoint.TYPE ).toBe( CS.Users );
			} );

		} );

		// TODO: UsersEndpoint.isDecorated
		// TODO: UsersEndpoint.decorate

		// TODO: Test decorated

	} );

} );
