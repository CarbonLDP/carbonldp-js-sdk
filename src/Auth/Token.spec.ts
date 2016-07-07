import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature,
	hasProperty,
} from "./../test/JasmineExtender";
import * as NS from "./../NS";
import * as Token from "./Token";
import * as Utils from "./../Utils";

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

		expect( Token.RDF_CLASS ).toBe( NS.CS.Class.Token );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Token.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Token.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Token.SCHEMA, "key" ) ).toBe( true );
		expect( Token.SCHEMA[ "key" ] ).toEqual({
			"@id": NS.CS.Predicate.tokenKey,
			"@type": NS.XSD.DataType.string,
		});

		expect( Utils.hasProperty( Token.SCHEMA, "expirationTime" ) ).toBe( true );
		expect( Token.SCHEMA[ "expirationTime" ] ).toEqual({
			"@id": NS.CS.Predicate.expirationTime,
			"@type": NS.XSD.DataType.dateTime,
		});

	});

	describe( clazz( "Carbon.Auth.Token.Factory", "Factory class for `Carbon.Auth.Token.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( Token.Factory ).toBeDefined();
			expect( Utils.isFunction( Token.Factory ) ).toBe( true );
		} );

		it( hasMethod( STATIC, "is",
			"Returns true if the object provided is considered a `Carbon.Auth.Token.Class` object.", [
				{ name: "value", type: "any" }
			],
			{type: "boolean"}
		), ():void => {
			expect( "is" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.is ) ).toBe( true );

			expect( Token.Factory.is( false ) ).toBe( false );

			let object:Object = {
				"key": {
					"@id": "http://example.com/someID",
					"@type": "xsd:string",
				},
				"expirationTime": {
					"@id": "http://xmaple.com/anotherID",
					"@type": "xsd:dateTime",
				},
			};

			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			object[ "anotherProperty" ] = {
				"@id": "http://example.com/anotherPropertyID",
				"@type": "xsd:integer"
			};
			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			delete object[ "anotherProperty" ];
			delete object[ "key" ];
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );

			expect( Token.Factory.hasClassProperties( {} ) ).toBe( false );
		} );

		it( hasMethod( STATIC, "hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.Token.Class` object.", [
				{ name: "object", type: "Object" }
			],
			{type: "boolean"}
		), ():void => {
			expect( "hasClassProperties" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.hasClassProperties ) ).toBe( true );

			let object:Object = {
				"key": {
					"@id": "http://example.com/someID",
					"@type": "xsd:string",
				},
				"expirationTime": {
					"@id": "http://xmaple.com/anotherID",
					"@type": "xsd:dateTime",
				},
			};

			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			object[ "anotherProperty" ] = {
				"@id": "http://example.com/anotherPropertyID",
				"@type": "xsd:integer"
			};
			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			delete object[ "anotherProperty" ];
			delete object[ "key" ];
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );

			expect( Token.Factory.hasClassProperties( {} ) ).toBe( false );
		} );

		it( hasMethod(
			INSTANCE,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.Auth.Token.Class` object.", [
				{ name: "object", type: "T extends Object" }
			],
			{type: "Carbon.Auth.Token.Class"}
		), ():void => {
			expect( "decorate" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.decorate ) ).toBe( true );

			let object:any = {
				key: null,
				expirationTime: null
			};
			let token:Token.Class = Token.Factory.decorate( object );
			expect( token ).toEqual( {
				key: null,
				expirationTime: null
			} );
		});

	} );

} );