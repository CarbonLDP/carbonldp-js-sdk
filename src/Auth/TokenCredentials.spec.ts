import { Resource } from "../Resource";
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
import {
	CS,
	XSD,
} from "../Vocabularies";
import * as Utils from "./../Utils";

import * as TokenCredentials from "./TokenCredentials";
import DefaultExport from "./TokenCredentials";

describe( module( "Carbon/Auth/TokenCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( TokenCredentials ).toBeDefined();
		expect( Utils.isObject( TokenCredentials ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( TokenCredentials.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( TokenCredentials.RDF_CLASS ) ).toBe( true );

		expect( TokenCredentials.RDF_CLASS ).toBe( CS.Token );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( TokenCredentials.SCHEMA ).toBeDefined();
		expect( Utils.isObject( TokenCredentials.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( TokenCredentials.SCHEMA, "key" ) ).toBe( true );
		expect( TokenCredentials.SCHEMA[ "key" ] ).toEqual( {
			"@id": CS.tokenKey,
			"@type": XSD.string,
		} );

		expect( Utils.hasProperty( TokenCredentials.SCHEMA, "expirationTime" ) ).toBe( true );
		expect( TokenCredentials.SCHEMA[ "expirationTime" ] ).toEqual( {
			"@id": CS.expirationTime,
			"@type": XSD.dateTime,
		} );

		expect( Utils.hasProperty( TokenCredentials.SCHEMA, "user" ) ).toBe( true );
		expect( TokenCredentials.SCHEMA[ "user" ] ).toEqual( {
			"@id": CS.credentialsOf,
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TokenCredentials.Class",
		"Interface that represents an authentication token for every context."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"user",
			"CarbonLDP.Auth.PersistedUser.Class",
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

	describe( clazz( "CarbonLDP.Auth.TokenCredentials.Factory", "Factory class for `CarbonLDP.Auth.TokenCredentials.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( TokenCredentials.Factory ).toBeDefined();
			expect( Utils.isFunction( TokenCredentials.Factory ) ).toBe( true );
		} );

		it( hasMethod( STATIC, "is",
			"Returns true if the object provided is considered a `CarbonLDP.Auth.TokenCredentials.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( "is" in TokenCredentials.Factory ).toBe( true );
			expect( Utils.isFunction( TokenCredentials.Factory.is ) ).toBe( true );

			expect( TokenCredentials.Factory.is( {} ) ).toBe( false );

			let object:any = Resource.createFrom( {
				key: null,
				expirationTime: null,
				user: null,
			} );

			expect( TokenCredentials.Factory.is( object ) ).toBe( true );

			delete object.key;
			expect( TokenCredentials.Factory.is( object ) ).toBe( false );
			object.key = null;

			delete object.expirationTime;
			expect( TokenCredentials.Factory.is( object ) ).toBe( false );
			object.expirationTime = null;

			delete object.user;
			expect( TokenCredentials.Factory.is( object ) ).toBe( true );
			object.user = null;
		} );

		it( hasMethod( STATIC, "hasClassProperties",
			"Returns true if the object provided has the properties of a `CarbonLDP.Auth.TokenCredentials.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( "hasClassProperties" in TokenCredentials.Factory ).toBe( true );
			expect( Utils.isFunction( TokenCredentials.Factory.hasClassProperties ) ).toBe( true );

			expect( TokenCredentials.Factory.hasClassProperties( {} ) ).toBe( false );

			let object:any = {
				key: null,
				expirationTime: null,
				user: null,
			};

			expect( TokenCredentials.Factory.hasClassProperties( object ) ).toBe( true );

			object.anotherProperty = null;
			expect( TokenCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			delete object[ "anotherProperty" ];

			delete object.key;
			expect( TokenCredentials.Factory.hasClassProperties( object ) ).toBe( false );
			object.key = null;

			delete object.expirationTime;
			expect( TokenCredentials.Factory.hasClassProperties( object ) ).toBe( false );
			object.expirationTime = null;

			delete object.user;
			expect( TokenCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			object.user = null;
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.Ticket.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:TokenCredentials.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
