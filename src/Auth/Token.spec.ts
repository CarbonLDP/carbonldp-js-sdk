import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature
} from "../test/JasmineExtender";
import * as Token from "./Token";
import * as Utils from "../Utils";

describe( module(
	"Carbon/Auth/Token",
	""
), ():void => {

	it( isDefined(), ():void => {
		expect( Token ).toBeDefined();
		expect( Utils.isObject( Token ) ).toBe( true );
	});

	describe( clazz( "Carbon.Auth.Token.Factory", "" ), ():void => {

		it( isDefined(), ():void => {
			expect( Token.Factory ).toBeDefined();
			expect( Utils.isFunction( Token.Factory ) ).toBe( true );
		});

		it( hasMethod( STATIC, "is",
			"Duck tape tests if the value sent is a Token object", [
				{ name: "value", type: "any" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( "is" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.is ) ).toBe( true );

			expect( Token.Factory.is( false ) ).toBe( false );

			let object: Object = {
				"key": {
					"@id": "http://example.com/someID",
					"@type":"xsd:string",
				},
				"expirationTime": {
					"@id": "http://xmaple.com/anotherID",
					"@type": "xsd:dateTime",
				},
			};

			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			object["anotherProperty"] = {
				"@id": "http://example.com/anotherPropertyID",
				"@type": "xsd:integer"
			};
			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			delete object["anotherProperty"];
			delete object["key"];
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );

			expect( Token.Factory.hasClassProperties( {} ) ).toBe( false );
		});

		it( hasMethod( STATIC, "hasClassProperties",
			"Returns true if the object provided has the necessary information to be utilized as a object of type `Carbon.Auth.Token.Class`", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( "hasClassProperties" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.hasClassProperties ) ).toBe( true );

			let object: Object = {
				"key": {
					"@id": "http://example.com/someID",
					"@type":"xsd:string",
				},
				"expirationTime": {
					"@id": "http://xmaple.com/anotherID",
					"@type": "xsd:dateTime",
				},
			};

			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			object["anotherProperty"] = {
				"@id": "http://example.com/anotherPropertyID",
				"@type": "xsd:integer"
			};
			expect( Token.Factory.hasClassProperties( object ) ).toBe( true );

			delete object["anotherProperty"];
			delete object["key"];
			expect( Token.Factory.hasClassProperties( object ) ).toBe( false );

			expect( Token.Factory.hasClassProperties( {} ) ).toBe( false );
		});

		it( hasMethod(
			INSTANCE,
			"decorate",
			"Adds any necessary data to the object provided to be utilized as a type `Carbon.Auth.Token.Class`", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "Carbon.Auth.Token.Class" }
		), ():void => {
			expect( "decorate" in Token.Factory ).toBe( true );
			expect( Utils.isFunction( Token.Factory.decorate ) ).toBe( true );

			// TODO: Test behaviour
		});

		describe( method(
			INSTANCE,
			"hasRDFClass",
			"Description"
		), ():void => {

			it( hasSignature(
				"Description", [
					{ name: "pointer", type: "Carbon.Pointer.Class" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( "hasRDFClass" in Token.Factory ).toBe( true );
				expect( Utils.isFunction( Token.Factory.hasRDFClass ) ).toBe( true );

				// TODO: Test behaviour
			});

			it( hasSignature(
				"Description", [
					{ name: "expandedObject", type: "Object" }
				],
				{ type: "boolean" }
			), ():void => {
				expect( "hasRDFClass" in Token.Factory ).toBe( true );
				expect( Utils.isFunction( Token.Factory.hasRDFClass ) ).toBe( true );

				// TODO: Test behaviour
			});

		});

	});

});