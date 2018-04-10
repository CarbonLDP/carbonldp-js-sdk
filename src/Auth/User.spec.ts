import { anyThatMatches } from "../../test/helpers/jasmine-equalities";
import { StrictMinus } from "../../test/helpers/types";
import { BlankNode } from "../BlankNode";
import { Document } from "../Document";
import { Fragment } from "../Fragment";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

import {
	User,
	UserBase
} from "./User";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";

describe( module( "carbonldp/Auth/User" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.User",
		"Interface that represents an in-memory User of any Context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document" ), ():void => {
			let user:User = <any> {};
			let document:Document;

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
			let user:User = <any> {};

			user.name = name;
			expect( user.name ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"credentials",
			"CarbonLDP.Auth.UsernameAndPasswordCredentials"
		), ():void => {
			const target:User[ "credentials" ] = {} as Fragment & UsernameAndPasswordCredentials;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"updateCredentials",
			"Add a credentials fragment with the properties provided. The document needs to be saved for the changes be applied in the platform.",
			[
				{ name: "username", type: "string" },
				{ name: "password", type: "string" },
			]
		), ():void => {
			const target:User[ "updateCredentials" ] = ( username?:string, password?:string ):Fragment & UsernameAndPasswordCredentials => null;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.UserFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.User` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.User"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the properties that defines a `CarbonLDP.Auth.User` object.", [
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object is a `CarbonLDP.Auth.User` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				"Creates a `CarbonLDP.Auth.User` object.",
				[
					{ name: "data", type: "CarbonLDP.Auth.UserBase", description: "The data requited for creating a User document." },
				],
				{ type: "CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends CarbonLDP.Auth.UserBase" ],
				"Creates a `CarbonLDP.Auth.User` object with the one provided.",
				[
					{ name: "object", type: "T" },
				],
				{ type: "T & CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `CarbonLDP.Auth.User` object.", [
					{ name: "object", type: "T", description: "The object to decorate." },
				],
				{ type: "T & CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"User",
		"CarbonLDP.Auth.UserFactory"
	), ():void => {

		type MockUser = StrictMinus<User, Document>;

		it( isDefined(), ():void => {
			expect( User ).toBeDefined();
			expect( User ).toEqual( jasmine.any( Object ) );
		} );


		// TODO: Separate in different test
		it( "User.TYPE", ():void => {
			expect( User.TYPE ).toBeDefined();
			expect( Utils.isString( User.TYPE ) ).toBe( true );

			expect( User.TYPE ).toBe( CS.User );
		} );

		// TODO: Separate in different test
		it( "User.SCHEMA", ():void => {
			expect( User.SCHEMA ).toBeDefined();
			expect( Utils.isObject( User.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( User.SCHEMA, "name" ) ).toBe( true );
			expect( User.SCHEMA[ "name" ] ).toEqual( {
				"@id": CS.name,
				"@type": XSD.string,
			} );
		} );

		describe( "User.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( User.isDecorated ).toBeDefined();
				expect( User.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should only reject in required properties", ():void => {
				const object:MockUser = {
					name: null,
					credentials: null,

					updateCredentials: ():any => {},
				};
				expect( User.isDecorated( object ) ).toBe( true );

				delete object.name;
				expect( User.isDecorated( object ) ).toBe( true );
				object.name = null;

				delete object.credentials;
				expect( User.isDecorated( object ) ).toBe( true );
				object.credentials = null;

				delete object.updateCredentials;
				expect( User.isDecorated( object ) ).toBe( false );
				object.updateCredentials = ():any => {};
			} );

		} );

		describe( "User.create", ():void => {

			it( "should exists", ():void => {
				expect( User.create ).toBeDefined();
				expect( User.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call `User.createFrom`", ():void => {
				const spy:jasmine.Spy = spyOn( User, "createFrom" );

				User.create( { credentials: null } );
				expect( spy ).toHaveBeenCalledWith( jasmine.any( Object ) );
			} );

			it( "should pass the base object properties in copy", ():void => {
				const spy:jasmine.Spy = spyOn( User, "createFrom" );

				const base:UserBase = { name: "User name", credentials: null };
				User.create( base );

				expect( spy.calls.argsFor( 0 )[ 0 ] ).toEqual( base );
				expect( spy.calls.argsFor( 0 )[ 0 ] ).not.toBe( base );
			} );

		} );

		describe( "User.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( User.createFrom ).toBeDefined();
				expect( User.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `User.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( User, "decorate" )
					.and.callThrough();

				const object:{ the:string } & UserBase = { the: "object", credentials: null };
				User.createFrom( object );

				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should add cs:User type", ():void => {
				const user:User = User.createFrom( { credentials: null } );

				expect( user.types ).toContain( User.TYPE );
			} );

			it( "should convert the credentials in a fragment", ():void => {
				const user:User = User.createFrom( {
					credentials: UsernameAndPasswordCredentials.create( {
						username: "username@example.com",
						password: "password",
					} ),
				} );

				expect( user.credentials ).toEqual( anyThatMatches( BlankNode.is, "BlankNode" ) as any );
			} );

		} );

		describe( "User.decorate", ():void => {

			it( "should exists", ():void => {
				expect( User.decorate ).toBeDefined();
				expect( User.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same object", ():void => {
				const object:object = {};
				const returned:object = User.decorate( object );
				expect( returned ).toBe( object );
			} );

			it( "should return without changes if already with class properties", ():void => {
				const fn:() => any = () => {};
				const object:MockUser = {
					name: null,
					credentials: null,

					updateCredentials: fn,
				};

				User.decorate( object );
				expect( object ).toEqual( jasmine.objectContaining( {
					updateCredentials: fn,
				} ) );
			} );

			it( "should add the class properties", ():void => {
				const returned:User = User.decorate( {} );
				expect( returned ).toEqual( jasmine.objectContaining( {
					updateCredentials: jasmine.any( Function ),
				} ) );
			} );

			it( "should call `Document.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( Document, "decorate" );

				const object:object = { the: "object" };
				User.decorate( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

		} );


		describe( "Decorated User", ():void => {

			let user:User;
			beforeEach( ():void => {
				user = User.create( {
					name: "User name",
					credentials: void 0,
				} );
			} );

			describe( "User.updateCredentials", ():void => {

				it( "should exists", ():void => {
					expect( user.updateCredentials ).toBeDefined();
					expect( user.updateCredentials ).toEqual( jasmine.any( Function ) );
				} );

				it( "should assign the credentials property", ():void => {
					user.updateCredentials( "username", "password" );

					expect( user.credentials ).toBeDefined();
					expect( user.credentials ).toEqual( jasmine.objectContaining( {
						username: "username",
						password: "password",
					} ) );
				} );

				it( "should return a credentials object", ():void => {
					const returned:UsernameAndPasswordCredentials = user.updateCredentials( "username", "password" );

					expect( returned ).toBeDefined();
					expect( returned ).toEqual( jasmine.objectContaining( {
						username: "username",
						password: "password",
					} ) );
				} );

				it( "should assign same object that returned", ():void => {
					const returned:UsernameAndPasswordCredentials = user.updateCredentials( "username", "password" );

					expect( returned ).toBeDefined( user.credentials );
				} );

				it( "should credentials be a blank node", ():void => {
					user.updateCredentials( "username", "password" );

					expect( user.credentials ).toBeDefined();
					expect( user.credentials ).toEqual( anyThatMatches( BlankNode.is, "BlankNode" ) as any );
				} );

			} );

		} );

	} );

} );
