import { AnyJasmineValue } from "../../../test/helpers/types";
import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import { CS } from "../../Vocabularies";
import { ACE } from "./ACE";


describe( module( "carbonldp/Auth/ACE" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.ACE",
		"Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.TransientACE" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Fragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"CarbonLDP.Auth.ACL",
			"Reference to the persisted ACL where the current ACE belongs."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.ACEFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.ACE` objects."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.TransientACEFactory" ), () => {} );

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.AccessControlEntry"
		), ():void => {} );

		describe( property(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {

			it( "should exists", ():void => {
				expect( ACE.SCHEMA ).toBeDefined();
				expect( ACE.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should has model properties", () => {
				type Target = AnyJasmineValue<Required<Pick<ACE,
					| "subject"
					| "permissions">>>;

				expect( ACE.SCHEMA as Target ).toEqual( {
					subject: jasmine.any( Object ),
					permissions: jasmine.any( Object ),
				} );
			} );

			it( "should have cs:subject", () => {
				expect( ACE.SCHEMA[ "subject" ] ).toEqual( {
					"@id": CS.subject,
					"@type": "@id",
				} );
			} );

			it( "should have cs:permission", () => {
				expect( ACE.SCHEMA[ "permissions" ] ).toEqual( {
					"@id": CS.permission,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"ACE",
		"CarbonLDP.Auth.ACEFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( ACE ).toBeDefined();
			expect( ACE ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
