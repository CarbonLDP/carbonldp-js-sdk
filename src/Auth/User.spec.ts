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

import * as User from "./User";
import DefaultExport from "./User";

describe( module( "Carbon/Auth/User" ), ():void => {

	it( isDefined(), ():void => {
		expect( User ).toBeDefined();
		expect( Utils.isObject( User ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( User.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( User.RDF_CLASS ) ).toBe( true );

		expect( User.RDF_CLASS ).toBe( NS.CS.Class.User );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( User.SCHEMA ).toBeDefined();
		expect( Utils.isObject( User.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( User.SCHEMA, "name" ) ).toBe( true );
		expect( User.SCHEMA[ "name" ] ).toEqual( {
			"@id": NS.CS.Predicate.namae,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( User.SCHEMA, "email" ) ).toBe( true );
		expect( User.SCHEMA[ "email" ] ).toEqual( {
			"@id": NS.VCARD.Predicate.email,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( User.SCHEMA, "password" ) ).toBe( true );
		expect( User.SCHEMA[ "password" ] ).toEqual( {
			"@id": NS.CS.Predicate.password,
			"@type": NS.XSD.DataType.string,
		} );
	} );

	describe( interfaze(
		"Carbon.Auth.User.Class",
		"Interface that represents an in-memory User of any Context."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {
			let user:User.Class = <any> {};
			let document:Document.Class;

			document = user;
			expect( document ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of the user."
		), ():void => {
			let name:string = "A name";
			let user:User.Class = <any> {};

			user.name = name;
			expect( user.name ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"email",
			"string",
			"The email of the user."
		), ():void => {
			let email:string = "a@email.com";
			let user:User.Class = <any> {};

			user.email = email;
			expect( user.email ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"password",
			"string",
			"The password of the user."
		), ():void => {
			let password:string = "THE-password";
			let user:User.Class = <any> {};

			user.password = password;
			expect( user.password ).toEqual( jasmine.any( String ) );
		} );

	} );

	describe( clazz(
		"Carbon.Auth.User.Factory",
		"Factory class for `Carbon.Auth.User.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( User.Factory ).toBeDefined();
			expect( Utils.isFunction( User.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Auth.User.Class` object.", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( User.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( User.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				email: null,
				password: null,
			};
			expect( User.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.email;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );
			object.email = null;

			delete object.password;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );
			object.password = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.User.Class` object.", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( User.Factory.is ).toBeDefined();
			expect( Utils.isFunction( User.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( User.Factory.is( object ) ).toBe( false );
			object.name = "User name";
			expect( User.Factory.is( object ) ).toBe( false );
			object.email = "email.of.user@example.com";
			expect( User.Factory.is( object ) ).toBe( false );
			object.password = "myAwesomePassword";
			expect( User.Factory.is( object ) ).toBe( false );

			object = Document.Factory.create();
			expect( User.Factory.is( object ) ).toBe( false );
			object.name = "User name";
			expect( User.Factory.is( object ) ).toBe( false );
			object.email = "email.of.user@example.com";
			expect( User.Factory.is( object ) ).toBe( false );
			object.password = "myAwesomePassword";
			expect( User.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.User );
			expect( User.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.Auth.User.Class` object with the name and email specified.", [
				{ name: "name", type: "string", description: "Name of the user to be created." },
				{ name: "email", type: "string", description: "Email of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "Carbon.Auth.User.Class" }
		), ():void => {
			expect( User.Factory.create ).toBeDefined();
			expect( Utils.isFunction( User.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( User.Factory, "createFrom" );

			User.Factory.create( "User name", "email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "User name", "email.of.user@example.com", "myAwesomePassword" );

			User.Factory.create( "Another User name", "another.email.of.user@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another User name", "another.email.of.user@example.com", "myAwesomePassword" );

			User.Factory.create( "", "", "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", "", "" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a `Carbon.Auth.User.Class` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an User." },
				{ name: "name", type: "string", description: "Name of the user to be created." },
				{ name: "email", type: "string", description: "Email of the user to be created." },
				{ name: "password", type: "string", description: "Password of the user to be created." },
			],
			{ type: "T & Carbon.Auth.User.Class" }
		), ():void => {
			expect( User.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( User.Factory.createFrom ) ).toBe( true );

			interface TheUser {
				myProperty?:string;
			}
			interface MyUser extends User.Class, TheUser {}

			let user:MyUser;
			user = User.Factory.createFrom<TheUser>( {}, "User name", "email.of.user@example.com", "myAwesomePassword" );
			expect( User.Factory.is( user ) ).toBe( true );
			expect( user.myProperty ).toBeUndefined();
			expect( user.name ).toBe( "User name" );
			expect( user.email ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.User );

			user = User.Factory.createFrom<TheUser>( { myProperty: "a property" }, "User name", "email.of.user@example.com", "myAwesomePassword" );
			expect( User.Factory.is( user ) ).toBe( true );
			expect( user.myProperty ).toBeDefined();
			expect( user.myProperty ).toBe( "a property" );
			expect( user.name ).toBe( "User name" );
			expect( user.email ).toBe( "email.of.user@example.com" );
			expect( user.password ).toBe( "myAwesomePassword" );
			expect( user.types ).toContain( NS.CS.Class.User );

			expect( () => User.Factory.createFrom( {}, "User name", "email.of.user@example.com", "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => User.Factory.createFrom( {}, "User name", "", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => User.Factory.createFrom( {}, "", "email.of.user@example.com", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => User.Factory.createFrom( {}, "", "", "" ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.User.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let user:User.Class;

		user = defaultExport;
		expect( user ).toEqual( jasmine.any( Object ) );
	} );

} );
