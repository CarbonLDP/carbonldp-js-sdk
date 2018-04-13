import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
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

		it( hasProperty(
			OBLIGATORY,
			"authenticatedUserMetadata",
			"CarbonLDP.Auth.AuthenticatedUserMetadata",
			"Fragment for the resource that contains metadata about the authenticated user."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.AuthenticatedUserInformationAccessorFactory",
		"Interface with the factory for `CarbonLDP.Auth.AuthenticatedUserInformationAccessor` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.AuthenticatedUserInformationAccessor"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

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

			it( "should have cs:authenticatedUserMetadata", ():void => {
				expect( AuthenticatedUserInformationAccessor.SCHEMA[ "authenticatedUserMetadata" ] ).toEqual( {
					"@id": CS.authenticatedUserMetadata,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
