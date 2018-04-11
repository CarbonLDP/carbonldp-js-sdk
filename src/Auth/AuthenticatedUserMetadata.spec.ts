import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";

import { AuthenticatedUserMetadata } from "./AuthenticatedUserMetadata";

describe( module( "carbonldp/Auth/AuthenticatedUserMetadata" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.AuthenticatedUserMetadata",
		"Interface that describes the metadata for a authenticated user."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"user",
			"CarbonLDP.Auth.PersistedUser",
			"Reference to the actual authenticated user."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.AuthenticatedUserMetadataFactory",
		"Interface with the factory for `CarbonLDP.Auth.AuthenticatedUserMetadata` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabulary.CS.AuthenticatedUserMetadata"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"AuthenticatedUserMetadata",
		"CarbonLDP.Auth.AuthenticatedUserMetadataFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( AuthenticatedUserMetadata ).toBeDefined();
			expect( AuthenticatedUserMetadata ).toEqual( jasmine.any( Object ) );
		} );

		describe( "AuthenticatedUserMetadata.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( AuthenticatedUserMetadata.TYPE ).toBeDefined();
				expect( AuthenticatedUserMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:AuthenticatedUserMetadata", ():void => {
				expect( AuthenticatedUserMetadata.TYPE ).toBe( CS.AuthenticatedUserMetadata );
			} );

		} );

		describe( "AuthenticatedUserMetadata.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( AuthenticatedUserMetadata.SCHEMA ).toBeDefined();
				expect( AuthenticatedUserMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have cs:user", ():void => {
				expect( AuthenticatedUserMetadata.SCHEMA.user ).toEqual( {
					"@id": CS.user,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
