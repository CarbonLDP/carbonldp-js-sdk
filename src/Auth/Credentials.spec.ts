import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Document from "./../Document";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as Credentials from "./Credentials";
import DefaultExport from "./Credentials";

describe( module( "Carbon/Auth/Credentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( Credentials ).toBeDefined();
		expect( Utils.isObject( Credentials ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Credentials.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Credentials.RDF_CLASS ) ).toBe( true );

		expect( Credentials.RDF_CLASS ).toBe( NS.CS.Class.Credentials );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Credentials.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Credentials.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Credentials.SCHEMA, "email" ) ).toBe( true );
		expect( Credentials.SCHEMA[ "email" ] ).toEqual( {
			"@id": NS.VCARD.Predicate.email,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( Credentials.SCHEMA, "password" ) ).toBe( true );
		expect( Credentials.SCHEMA[ "password" ] ).toEqual( {
			"@id": NS.CS.Predicate.password,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( Credentials.SCHEMA, "enabled" ) ).toBe( true );
		expect( Credentials.SCHEMA[ "enabled" ] ).toEqual( {
			"@id": NS.CS.Predicate.enabled,
			"@type": NS.XSD.DataType.boolean,
		} );
	} );

	describe( interfaze(
		"Carbon.Auth.Credentials.Class",
		"Interface that represents an in-memory Credentials of a user."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {
			const user:Credentials.Class = <any> {};
			let document:Document.Class;

			document = user;
			expect( document ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"email",
			"string",
			"Email of the user credentials."
		), ():void => {
			const email:string = "a@email.com";
			const user:Credentials.Class = <any> {};

			user.email = email;
			expect( user.email ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"password",
			"string",
			"Password of the user credentials."
		), ():void => {
			const password:string = "THE-password";
			const user:Credentials.Class = <any> {};

			user.password = password;
			expect( user.password ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"enabled",
			"string",
			"The enabled of the user credentials."
		), ():void => {
			const enabled:boolean = true;
			const user:Credentials.Class = <any> {};

			user.enabled = enabled;
			expect( user.enabled ).toEqual( jasmine.any( Boolean ) );
		} );

	} );

	describe( clazz(
		"Carbon.Auth.Credentials.Factory",
		"Factory class for `Carbon.Auth.Credentials.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Credentials.Factory ).toBeDefined();
			expect( Utils.isFunction( Credentials.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.Auth.Credentials.Class` object with the email and password specified.", [
				{ name: "email", type: "string", description: "Email of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "Carbon.Auth.Credentials.Class" }
		), ():void => {
			expect( Credentials.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Credentials.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( Credentials.Factory, "createFrom" );

			Credentials.Factory.create( "email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "email.of.user@example.com", "myAwesomePassword" );

			Credentials.Factory.create( "another.email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "another.email.of.user@example.com", "myAwesomePassword" );

			Credentials.Factory.create( "", "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", "" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a `Carbon.Auth.Credentials.Class` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an Credentials." },
				{ name: "email", type: "string", description: "Email of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "T & Carbon.Auth.Credentials.Class" }
		), ():void => {
			expect( Credentials.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Credentials.Factory.createFrom ) ).toBe( true );

			interface TheCredentials {
				myProperty?:string;
			}
			interface MyCredentials extends Credentials.Class, TheCredentials {}

			let user:MyCredentials;
			user = Credentials.Factory.createFrom<TheCredentials>( {}, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeUndefined();
			expect( user.email ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.Credentials );

			user = Credentials.Factory.createFrom<TheCredentials>( { myProperty: "a property" }, "email.of.user@example.com", "myAwesomePassword" );
			expect( user.myProperty ).toBeDefined();
			expect( user.myProperty ).toBe( "a property" );
			expect( user.email ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.Credentials );

			expect( () => Credentials.Factory.createFrom( {}, "email.of.user@example.com", "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Credentials.Factory.createFrom( {}, "", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Credentials.Factory.createFrom( {}, "", "" ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Credentials.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let user:Credentials.Class;

		user = defaultExport;
		expect( user ).toEqual( jasmine.any( Object ) );
	} );

} );