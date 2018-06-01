import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import * as Utils from "../../Utils";
import {
	CS,
	XSD
} from "../../Vocabularies";
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

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.AccessControlEntry"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is considered a `CarbonLDP.Auth.TransientACE` object.", [
				{ name: "object", type: "object", description: "The object to evaluate." },
			],
			{ type: "object is CarbonLDP.Auth.TransientACE" }
		), ():void => {} );

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

		// TODO: Separate in different tests
		it( "ACE.TYPE", ():void => {
			expect( ACE.TYPE ).toBeDefined();
			expect( Utils.isString( ACE.TYPE ) ).toBe( true );

			expect( ACE.TYPE ).toBe( CS.AccessControlEntry );
		} );

		// TODO: Separate in different tests
		it( "ACE.SCHEMA", ():void => {
			expect( ACE.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ACE.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( ACE.SCHEMA, "granting" ) ).toBe( true );
			expect( ACE.SCHEMA[ "granting" ] ).toEqual( {
				"@id": CS.granting,
				"@type": XSD.boolean,
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "permissions" ) ).toBe( true );
			expect( ACE.SCHEMA[ "permissions" ] ).toEqual( {
				"@id": CS.permission,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "subjects" ) ).toBe( true );
			expect( ACE.SCHEMA[ "subjects" ] ).toEqual( {
				"@id": CS.subject,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "subjectsClass" ) ).toBe( true );
			expect( ACE.SCHEMA[ "subjectsClass" ] ).toEqual( {
				"@id": CS.subjectClass,
				"@type": "@id",
			} );
		} );

	} );

} );
