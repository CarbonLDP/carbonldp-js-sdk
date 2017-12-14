import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "../test/JasmineExtender";

import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

describe( module( "Carbon/Auth/UsernameAndPasswordCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( UsernameAndPasswordCredentials ).toBeDefined();
		expect( UsernameAndPasswordCredentials ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( UsernameAndPasswordCredentials.RDF_CLASS ).toBeDefined();
		expect( UsernameAndPasswordCredentials.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( UsernameAndPasswordCredentials.RDF_CLASS ).toBe( NS.CS.Class.UsernameAndPasswordCredentials );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( UsernameAndPasswordCredentials.SCHEMA ).toBeDefined();
		expect( UsernameAndPasswordCredentials.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( Utils.hasProperty( UsernameAndPasswordCredentials.SCHEMA, "username" ) ).toBe( true );
		expect( UsernameAndPasswordCredentials.SCHEMA[ "username" ] ).toEqual( {
			"@id": NS.CS.Predicate.username,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( UsernameAndPasswordCredentials.SCHEMA, "password" ) ).toBe( true );
		expect( UsernameAndPasswordCredentials.SCHEMA[ "password" ] ).toEqual( {
			"@id": NS.CS.Predicate.password,
			"@type": NS.XSD.DataType.string,
		} );
	} );

	describe( interfaze(
		"Carbon.Auth.UsernameAndPasswordCredentials.Class",
		"Interface that represents an in-memory UsernameAndPasswordCredentials of a user."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as UsernameAndPasswordCredentials.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"username",
			"string",
			"Username of the user credentials."
		), ():void => {
			const username:UsernameAndPasswordCredentials.Class[ "username" ] = "user@email.com";
			expect( username ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"password",
			"string",
			"Password of the user credentials."
		), ():void => {
			const password:UsernameAndPasswordCredentials.Class[ "password" ] = "THE-password";
			expect( password ).toBeDefined();
		} );

	} );

	describe( clazz(
		"Carbon.Auth.UsernameAndPasswordCredentials.Factory",
		"Factory class for `Carbon.Auth.UsernameAndPasswordCredentials.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsernameAndPasswordCredentials.Factory ).toBeDefined();
			expect( UsernameAndPasswordCredentials.Factory ).toEqual( jasmine.any( Function ) );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.Auth.UsernameAndPasswordCredentials.Class` object with the email and password specified.", [
				{ name: "username", type: "string", description: "Username of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "Carbon.Auth.UsernameAndPasswordCredentials.Class" }
		), ():void => {
			expect( UsernameAndPasswordCredentials.Factory.create ).toBeDefined();
			expect( UsernameAndPasswordCredentials.Factory.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( UsernameAndPasswordCredentials.Factory, "createFrom" );

			UsernameAndPasswordCredentials.Factory.create( "email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "email.of.user@example.com", "myAwesomePassword" );

			UsernameAndPasswordCredentials.Factory.create( "another.email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "another.email.of.user@example.com", "myAwesomePassword" );

			UsernameAndPasswordCredentials.Factory.create( "", "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", "" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends object" ],
			"Creates a `Carbon.Auth.UsernameAndPasswordCredentials.Class` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an UsernameAndPasswordCredentials." },
				{ name: "username", type: "string", description: "Username of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "T & Carbon.Auth.UsernameAndPasswordCredentials.Class" }
		), ():void => {
			expect( UsernameAndPasswordCredentials.Factory.createFrom ).toBeDefined();
			expect( UsernameAndPasswordCredentials.Factory.createFrom ).toEqual( jasmine.any( Function ) );

			interface TheCredentials {
				myProperty?:string;
			}

			interface MyCredentials extends UsernameAndPasswordCredentials.Class, TheCredentials {}

			let user:MyCredentials;
			user = UsernameAndPasswordCredentials.Factory.createFrom<TheCredentials>( {}, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeUndefined();
			expect( user.username ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.UsernameAndPasswordCredentials );

			user = UsernameAndPasswordCredentials.Factory.createFrom<TheCredentials>( { myProperty: "a property" }, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeDefined();
			expect( user.myProperty ).toBe( "a property" );
			expect( user.username ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.UsernameAndPasswordCredentials );

			expect( () => UsernameAndPasswordCredentials.Factory.createFrom( {}, "email.of.user@example.com", "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => UsernameAndPasswordCredentials.Factory.createFrom( {}, "", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => UsernameAndPasswordCredentials.Factory.createFrom( {}, "", "" ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.UsernameAndPasswordCredentials.Class" ), ():void => {
		let defaultExport:UsernameAndPasswordCredentials.default = <any> {};
		let user:UsernameAndPasswordCredentials.Class;

		user = defaultExport;
		expect( user ).toEqual( jasmine.any( Object ) );
	} );

} );
