import {
	interfaze,
	module,
	property,
	STATIC
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";

import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";

describe( module( "carbonldp/Auth/AuthenticatedUserInformationAccessor" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.AuthenticatedUserInformationAccessor",
		"Interface that describes the metadata for a user."
	), ():void => {

		// TODO: Document

	} );

	describe( interfaze(
		"CarbonLDP.Auth.AuthenticatedUserInformationAccessorFactory",
		"Interface with the factory for `CarbonLDP.Auth.AuthenticatedUserInformationAccessor` objects."
	), ():void => {

		// TODO: Document

	} );

	describe( property(
		STATIC,
		"AuthenticatedUserInformationAccessor",
		"CarbonLDP.Auth.AuthenticatedUserInformationAccessorFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( AuthenticatedUserInformationAccessor ).toBeDefined();
			expect( AuthenticatedUserInformationAccessor ).toEqual( jasmine.any( Object ) );
		} );

		describe( "AuthenticatedUserInformationAccessor.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( AuthenticatedUserInformationAccessor.TYPE ).toBeDefined();
				expect( AuthenticatedUserInformationAccessor.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:AuthenticatedUserInformationAccessor", ():void => {
				expect( AuthenticatedUserInformationAccessor.TYPE ).toBe( CS.AuthenticatedUserInformationAccessor );
			} );

		} );

		describe( "AuthenticatedUserInformationAccessor.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( AuthenticatedUserInformationAccessor.SCHEMA ).toBeDefined();
				expect( AuthenticatedUserInformationAccessor.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have cs:authenticatedUser", ():void => {
				expect( AuthenticatedUserInformationAccessor.SCHEMA.authenticatedUser ).toEqual( {
					"@id": CS.authenticatedUser,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
