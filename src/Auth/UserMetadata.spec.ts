import {
	interfaze,
	module,
	property,
	STATIC
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies";

import { UserMetadata } from "./UserMetadata";

describe( module( "carbonldp/Auth/UserMetadata" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.UserMetadata",
		"Interface that describes the metadata for a user."
	), ():void => {

		// TODO: Document

	} );

	describe( interfaze(
		"CarbonLDP.Auth.UserMetadataFactory",
		"Interface with the factory for `CarbonLDP.Auth.UserMetadata` objects."
	), ():void => {

		// TODO: Document

	} );

	describe( property(
		STATIC,
		"UserMetadata",
		"CarbonLDP.Auth.UserMetadataFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( UserMetadata ).toBeDefined();
			expect( UserMetadata ).toEqual( jasmine.any( Object ) );
		} );

		describe( "UserMetadata.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( UserMetadata.TYPE ).toBeDefined();
				expect( UserMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:UserMetadata", ():void => {
				expect( UserMetadata.TYPE ).toBe( CS.UserMetadata );
			} );

		} );

		describe( "UserMetadata.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( UserMetadata.SCHEMA ).toBeDefined();
				expect( UserMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have cs:authenticatedUser", ():void => {
				expect( UserMetadata.SCHEMA.authenticatedUser ).toEqual( {
					"@id": CS.authenticatedUser,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
