import {module, isDefined, clazz, hasMethod, STATIC} from "./test/JasmineExtender";
import IllegalArgumentError from "./Errors/IllegalArgumentError";
import * as ObjectSchema from "./ObjectSchema";
import * as Utils from "./Utils";

import * as RetrievalPreferences from "./RetrievalPreferences";

describe( module( "Carbon/RetrievalPreferences" ), ():void => {

	it( isDefined(), ():void => {
		expect( RetrievalPreferences ).toBeDefined();
		expect( Utils.isObject( RetrievalPreferences ) ).toBe( true );
	} );

	describe( clazz( "Carbon.RetrievalPreferences.Factory", "Factory class for `Carbon.RetrievalPreferences.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( RetrievalPreferences.Factory ).toBeDefined();
			expect( Utils.isFunction( RetrievalPreferences.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided has the properties of a `Carbon.RetrievalPreferences.Class` object.", [
				{name: "object", type: "Object", description: "The object to check."}
			],
			{type: "boolean"}
		), ():void => {
			expect( RetrievalPreferences.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RetrievalPreferences.Factory.is ) ).toBe( true );

			let object:RetrievalPreferences.Class;

			object = {};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( false );

			object = {orderBy: []};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = {limit: 0};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = {offset: 0};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );

			object = {orderBy: [], limit: 0};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = {orderBy: [], offset: 0};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = {limit: 0, offset: 0};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
		} );

	} );

	describe( clazz( "Carbon.RetrievalPreferences.Util", "Class with useful functions to manage `Carbon.RetrievalPreferences.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( RetrievalPreferences.Util ).toBeDefined();
			expect( Utils.isFunction( RetrievalPreferences.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"stringifyRetrievalPreferences",
			"Convert the `Carbon.RetrievalPreferences.Class` object to a URL query string.", [
				{name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", description: "The preferences to stringify."}
			],
			{type: "string"}
		), ():void => {
			expect( RetrievalPreferences.Util.stringifyRetrievalPreferences ).toBeDefined();
			expect( Utils.isFunction( RetrievalPreferences.Util.stringifyRetrievalPreferences ) ).toBe( true );

			let preferences:RetrievalPreferences.Class;
			let stringPreferences:string;
			let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( {
				"@vocab": "http://example.com/vocab#",
				"ex": "http://example.com/ns#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
			} );

			preferences = {};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "" );

			preferences = {limit: 10};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?limit=10" );

			preferences = {offset: 5};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?offset=5" );

			preferences = {limit: 10, offset: 5};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?limit=10&offset=5" );


			preferences = {orderBy: []};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "" );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>` );

			preferences = {orderBy: [ {"@id": "-http://example.com/ns#property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>` );

			preferences = {orderBy: [ {"@id": "ex:property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>` );

			preferences = {orderBy: [ {"@id": "-ex:property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>` );

			preferences = {orderBy: [ {"@id": "property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/vocab%23property>` );

			preferences = {orderBy: [ {"@id": "-property"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>` );


			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "numeric"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric` );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "string"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23string>` );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "boolean"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>` );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "dateTime"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23dateTime>` );

			preferences = {orderBy: [ {"@id": "-http://example.com/ns#property", "@type": "numeric"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;numeric` );


			preferences = {orderBy: [ {"@id": "ex:property", "@type": "numeric"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric` );

			preferences = {orderBy: [ {"@id": "property", "@type": "string"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/vocab%23property>;<http://www.w3.org/2001/XMLSchema%23string>` );


			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;es` );

			preferences = {orderBy: [ {"@id": "-http://example.com/ns#property", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;es` );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@language": "en"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;en` );


			preferences = {orderBy: [ {"@id": "ex:property", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;es` );

			preferences = {orderBy: [ {"@id": "-property", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>;es` );


			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es` );

			preferences = {orderBy: [ {"@id": "-http://example.com/ns#property", "@type": "numeric", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;numeric;es` );

			preferences = {orderBy: [ {"@id": "http://example.com/ns#property", "@language": "en", "@type": "boolean"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {orderBy: [ {"@id": "ex:property", "@type": "numeric", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es` );

			preferences = {orderBy: [ {"@id": "-property", "@type": "numeric", "@language": "es"} ]};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>;numeric;es` );


			preferences = {
				orderBy: [
					{"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"},
					{"@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				limit: 10, orderBy: [
					{"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"},
					{"@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?limit=10&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				offset: 5, orderBy: [
					{"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"},
					{"@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				limit: 10, offset: 5, orderBy: [
					{"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"},
					{"@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?limit=10&offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				orderBy: [
					{"@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es"},
					{"@id": "-ex:another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				limit: 10, orderBy: [
					{"@id": "property", "@type": "numeric", "@language": "es"},
					{"@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?limit=10&orderBy=<http://example.com/vocab%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				offset: 5, orderBy: [
					{"@id": "property", "@type": "numeric", "@language": "es"},
					{"@id": "-ex:another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?offset=5&orderBy=<http://example.com/vocab%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				limit: 10, offset: 5, orderBy: [
					{"@id": "ex:property", "@type": "numeric", "@language": "es"},
					{"@id": "-another-property", "@language": "en", "@type": "boolean"}
				]
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?limit=10&offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/vocab%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = <any> {orderBy: [ {"@type": "numeric"} ]};
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> {orderBy: [ {"@language": "es"} ]};
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> {orderBy: [ {"@type": "numeric", "@language": "es"} ]};
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "wrong-type"} ]};
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> {orderBy: [ {"@id": "http://example.com/ns#property", "@type": "float"} ]};
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );