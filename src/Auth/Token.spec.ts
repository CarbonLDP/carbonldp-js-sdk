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

	describe( clazz(
		"Carbon.Auth.Token.Factory",
		"Instead of instantiate this class, it is recommended to use the already exposed instance `Carbon.Auth.Token.factory`"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Token.Factory ).toBeDefined();
			expect( Utils.isFunction( Token.Factory ) ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"hasClassProperties",
			"Returns true if the object provided has the necessary information to be utilized as a object of type `Carbon.Auth.Token.Class`", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			let factory: Token.Factory = new Token.Factory();

			expect( "hasClassProperties" in factory ).toBe( true );
			expect( Utils.isFunction( factory.hasClassProperties ) ).toBe( true );

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

			expect( factory.hasClassProperties( object ) ).toBe( true );

			object["anotherProperty"] = {
				"@id": "http://example.com/anotherPropertyID",
				"@type": "xsd:integer"
			};
			expect( factory.hasClassProperties( object ) ).toBe( true );

			delete object["anotherProperty"];
			delete object["key"];
			expect( factory.hasClassProperties( object ) ).toBe( false );

			expect( factory.hasClassProperties( {} ) ).toBe( false );
		});

		it( hasMethod(
			INSTANCE,
			"decorate",
			"Adds any necessary data to the object provided to be utilized as a type `Carbon.Auth.Token.Class`", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "Carbon.Auth.Token.Class" }
		), ():void => {
			let factory: Token.Factory = new Token.Factory();

			expect( "decorate" in factory ).toBe( true );
			expect( Utils.isFunction( factory.decorate ) ).toBe( true );

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
				let factory: Token.Factory = new Token.Factory();

				expect( "hasRDFClass" in factory ).toBe( true );
				expect( Utils.isFunction( factory.hasRDFClass ) ).toBe( true );

				// TODO: Test behaviour
			});

			it( hasSignature(
				"Description", [
					{ name: "expandedObject", type: "Object" }
				],
				{ type: "boolean" }
			), ():void => {
				let factory: Token.Factory = new Token.Factory();

				expect( "hasRDFClass" in factory ).toBe( true );
				expect( Utils.isFunction( factory.hasRDFClass ) ).toBe( true );

				// TODO: Test behaviour
			});

		});

	});

});