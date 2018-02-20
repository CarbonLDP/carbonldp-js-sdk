import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as Resource from "./../Resource";
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
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as Token from "./Token";
import DefaultExport from "./Token";

describe( module( "Carbon/Auth/Token" ), ():void => {

	it( isDefined(), ():void => {
		expect( Token ).toBeDefined();
		expect( Utils.isObject( Token ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Token.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Token.RDF_CLASS ) ).toBe( true );

		expect( Token.RDF_CLASS ).toBe( CS.Token );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Token.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Token.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Token.SCHEMA, "key" ) ).toBe( true );
		expect( Token.SCHEMA[ "key" ] ).toEqual( {
			"@id": CS.tokenKey,
			"@type": XSD.string,
		} );

		expect( Utils.hasProperty( Token.SCHEMA, "expirationTime" ) ).toBe( true );
		expect( Token.SCHEMA[ "expirationTime" ] ).toEqual( {
			"@id": CS.expirationTime,
			"@type": XSD.dateTime,
		} );

	} );

	describe( interfaze(
		"Carbon.Auth.Token.Class",
		"Interface that represents an authentication token for every context."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"user",
			"Carbon.Auth.PersistedUser.Class",
			"User that has been requested the token, and which authentication the token represents."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"expirationTime",
			"Date",
			"The time when the token will expire."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"key",
			"string",
			"The value to provide as the authentication token in the headers of a a request."
		), ():void => {} );

	} );

	describe( clazz( "Carbon.Auth.Token.Factory", "Factory class for `Carbon.Auth.Token.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( Token.Factory ).toBeDefined();
			expect( Utils.isFunction( Token.Factory ) ).toBe( true );
		} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"Carbon.ObjectSchema.Class"
		), ():void => {
			expect( Token.SCHEMA ).toBeDefined();
			expect( Utils.isObject( Token.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( Token.SCHEMA, "key" ) ).toBe( true );
			expect( Token.SCHEMA[ "key" ] ).toEqual( {
				"@id": CS.tokenKey,
				"@type": XSD.string,
			} );

			expect( Utils.hasProperty( Token.SCHEMA, "expirationTime" ) ).toBe( true );
			expect( Token.SCHEMA[ "expirationTime" ] ).toEqual( {
				"@id": CS.expirationTime,
				"@type": XSD.dateTime,
			} );

			expect( Utils.hasProperty( Token.SCHEMA, "user" ) ).toBe( true );
			expect( Token.SCHEMA[ "user" ] ).toEqual( {
				"@id": CS.credentialsOf,
				"@type": "@id",
			} );

		} );

		it( hasMethod( STATIC, "is",
			"Returns true if the object provided is considered a `Carbon.Auth.Token.Class` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( "is" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.is ) ).toBe( true );

			expect( Token.Factory.is( false ) ).toBe( false );
			expect( Token.Factory.is( {} ) ).toBe( false );

			let object:any = Resource.Factory.createFrom( {
				key: null,
				expirationTime: null,
				user: null,
			} );

			expect( Token.Factory.is( object ) ).toBe( true );

			delete object.key;
			expect( Token.Factory.is( object ) ).toBe( false );
			object.key = null;

			delete object.expirationTime;
			expect( Token.Factory.is( object ) ).toBe( false );
			object.expirationTime = null;

			delete object.user;
			expect( Token.Factory.is( object ) ).toBe( false );
			object.user = null;
		} );

		it( hasMethod( STATIC, "hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.Token.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( "hasClassProperties" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.hasClassProperties ) ).toBe( true );

			expect( Token.Factory.hasClassProperties( {} ) ).toBe( false );

			let object:any = {
				key: null,
				expirationTime: null,
				user: null,
			};

			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			object.anotherProperty = null;
			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );
			delete object[ "anotherProperty" ];

			delete object.key;
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );
			object.key = null;

			delete object.expirationTime;
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );
			object.expirationTime = null;

			delete object.user;
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );
			object.user = null;
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Auth.Token.Class` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & Carbon.Auth.Token.Class" }
		), ():void => {
			expect( "decorate" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.decorate ) ).toBe( true );

			let object:any = {
				key: null,
				expirationTime: null,
				user: null,
			};
			let token:Token.Class = Token.Factory.decorate( object );
			// Decorate does nothing
			expect( token ).toEqual( <any> {
				key: null,
				expirationTime: null,
				user: null,
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Ticket.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Token.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
