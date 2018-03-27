import { VolatileResource } from "../LDP";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";


describe( module( "carbonldp/Auth/UsernameAndPasswordCredentials" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.UsernameAndPasswordCredentials",
		"Interface that represents an in-memory UsernameAndPasswordCredentials of a user."
	), ():void => {

		it( extendsClass( "CarbonLDP.VolatileResource" ), ():void => {
			const target:VolatileResource = {} as UsernameAndPasswordCredentials;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"username",
			"string",
			"Username of the user credentials."
		), ():void => {
			const username:UsernameAndPasswordCredentials[ "username" ] = "user@email.com";
			expect( username ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"password",
			"string",
			"Password of the user credentials."
		), ():void => {
			const password:UsernameAndPasswordCredentials[ "password" ] = "THE-password";
			expect( password ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.UsernameAndPasswordCredentialsFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.UsernameAndPasswordCredentials` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.UsernameAndPasswordCredentials"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.Auth.UsernameAndPasswordCredentials` object with the email and password specified.", [
				{ name: "username", type: "string", description: "Username of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "CarbonLDP.Auth.UsernameAndPasswordCredentials" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.Auth.UsernameAndPasswordCredentials` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an " },
				{ name: "username", type: "string", description: "Username of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "T & CarbonLDP.Auth.UsernameAndPasswordCredentials" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"UsernameAndPasswordCredentials",
		"CarbonLDP.Auth.UsernameAndPasswordCredentialsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordCredentials ).toBeDefined();
			expect( UsernameAndPasswordCredentials ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "UsernameAndPasswordCredentials.TYPE", ():void => {
			expect( UsernameAndPasswordCredentials.TYPE ).toBeDefined();
			expect( UsernameAndPasswordCredentials.TYPE ).toEqual( jasmine.any( String ) );

			expect( UsernameAndPasswordCredentials.TYPE ).toBe( CS.UsernameAndPasswordCredentials );
		} );

		// TODO: Separate in different tests
		it( "UsernameAndPasswordCredentials.SCHEMA", ():void => {
			expect( UsernameAndPasswordCredentials.SCHEMA ).toBeDefined();
			expect( UsernameAndPasswordCredentials.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( Utils.hasProperty( UsernameAndPasswordCredentials.SCHEMA, "username" ) ).toBe( true );
			expect( UsernameAndPasswordCredentials.SCHEMA[ "username" ] ).toEqual( {
				"@id": CS.username,
				"@type": XSD.string,
			} );

			expect( Utils.hasProperty( UsernameAndPasswordCredentials.SCHEMA, "password" ) ).toBe( true );
			expect( UsernameAndPasswordCredentials.SCHEMA[ "password" ] ).toEqual( {
				"@id": CS.password,
				"@type": XSD.string,
			} );
		} );

		// TODO: Separate in different tests
		it( "UsernameAndPasswordCredentials.create", ():void => {
			expect( UsernameAndPasswordCredentials.create ).toBeDefined();
			expect( UsernameAndPasswordCredentials.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( UsernameAndPasswordCredentials, "createFrom" );

			UsernameAndPasswordCredentials.create( "email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "email.of.user@example.com", "myAwesomePassword" );

			UsernameAndPasswordCredentials.create( "another.email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "another.email.of.user@example.com", "myAwesomePassword" );

			UsernameAndPasswordCredentials.create( "", "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", "" );
		} );

		// TODO: Separate in different tests
		it( "UsernameAndPasswordCredentials.createFrom", ():void => {
			expect( UsernameAndPasswordCredentials.createFrom ).toBeDefined();
			expect( UsernameAndPasswordCredentials.createFrom ).toEqual( jasmine.any( Function ) );

			interface TheCredentials {
				myProperty?:string;
			}

			interface MyCredentials extends UsernameAndPasswordCredentials, TheCredentials {}

			let user:MyCredentials;
			user = UsernameAndPasswordCredentials.createFrom<TheCredentials>( {}, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeUndefined();
			expect( user.username ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( CS.UsernameAndPasswordCredentials );

			user = UsernameAndPasswordCredentials.createFrom<TheCredentials>( { myProperty: "a property" }, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeDefined();
			expect( user.myProperty ).toBe( "a property" );
			expect( user.username ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( CS.UsernameAndPasswordCredentials );

			user = UsernameAndPasswordCredentials.createFrom<TheCredentials>( {}, "email.of.user@example.com" );
			expect( user.username ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBeUndefined();
			expect( user.types ).toContain( CS.UsernameAndPasswordCredentials );

			user = UsernameAndPasswordCredentials.createFrom<TheCredentials>( {}, null, "myAwesomePassword" );
			expect( user.username ).toBeUndefined();
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( CS.UsernameAndPasswordCredentials );
		} );

	} );

} );
