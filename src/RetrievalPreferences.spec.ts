import {
	STATIC,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	hasDefaultExport,
} from "./test/JasmineExtender";
import IllegalArgumentError from "./Errors/IllegalArgumentError";
import * as ObjectSchema from "./ObjectSchema";
import * as Utils from "./Utils";

import * as RetrievalPreferences from "./RetrievalPreferences";
import DefaultExport from "./RetrievalPreferences";

describe( module( "Carbon/RetrievalPreferences" ), ():void => {

	it( isDefined(), ():void => {
		expect( RetrievalPreferences ).toBeDefined();
		expect( Utils.isObject( RetrievalPreferences ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.RetrievalPreferences.Class",
		"Interface that represents the preferences that the server can manage when requesting members or children from a document."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"orderBy",
			"Carbon.RetrievalPreferences.OrderByProperty[]",
			"An array of objects that specifies the order of how the platform choose the members or children to retrieve. This not implies the returned elements should be in that order."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"limit",
			"number",
			"A positive number that indicates the total of element that will be retrieved."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"offset",
			"number",
			"If it is non-negative, the elements will be retrieved starring from the offset provided. If offset is negative, the elements retrieved will be that ones that start from that far the last element to the end."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.RetrievalPreferences.OrderByProperty",
		"Interface that represents the order preferences by a certain property."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"@id",
			"string",
			"The URI of the property. This URI can also be prefixed or a relative one."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@type",
			`"numeric" | "string" | "boolean" | "dateTime"`,
			"The type of property it is. The types actually supported are: `numeric`, `string`, `boolean` and `dateTime`."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"@language",
			"string",
			"If the property has multiple languages, this elements helps to choose which language will be the one to be used."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.RetrievalPreferences.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RetrievalPreferences.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
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
				{ name: "object", type: "Object", description: "The object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RetrievalPreferences.Factory.is ).toBeDefined();
			expect( Utils.isFunction( RetrievalPreferences.Factory.is ) ).toBe( true );

			let object:RetrievalPreferences.Class;

			object = {};
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( false );

			object = { orderBy: [] };
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = { limit: 0 };
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = { offset: 0 };
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );

			object = { orderBy: [], limit: 0 };
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = { orderBy: [], offset: 0 };
			expect( RetrievalPreferences.Factory.is( object ) ).toBe( true );
			object = { limit: 0, offset: 0 };
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
				{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", description: "The preferences to stringify." },
			],
			{ type: "string" }
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

			preferences = { limit: 10 };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?limit=10" );

			preferences = { offset: 5 };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?offset=5" );

			preferences = { limit: 10, offset: 5 };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "?limit=10&offset=5" );


			preferences = { orderBy: [] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( "" );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>` );

			preferences = { orderBy: [ { "@id": "-http://example.com/ns#property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>` );

			preferences = { orderBy: [ { "@id": "ex:property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>` );

			preferences = { orderBy: [ { "@id": "-ex:property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>` );

			preferences = { orderBy: [ { "@id": "property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/vocab%23property>` );

			preferences = { orderBy: [ { "@id": "-property" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>` );


			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "numeric" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric` );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "string" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23string>` );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "boolean" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>` );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "dateTime" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23dateTime>` );

			preferences = { orderBy: [ { "@id": "-http://example.com/ns#property", "@type": "numeric" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;numeric` );


			preferences = { orderBy: [ { "@id": "ex:property", "@type": "numeric" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric` );

			preferences = { orderBy: [ { "@id": "property", "@type": "string" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/vocab%23property>;<http://www.w3.org/2001/XMLSchema%23string>` );


			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;es` );

			preferences = { orderBy: [ { "@id": "-http://example.com/ns#property", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;es` );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@language": "en" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;en` );


			preferences = { orderBy: [ { "@id": "ex:property", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;es` );

			preferences = { orderBy: [ { "@id": "-property", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>;es` );


			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es` );

			preferences = { orderBy: [ { "@id": "-http://example.com/ns#property", "@type": "numeric", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/ns%23property>;numeric;es` );

			preferences = { orderBy: [ { "@id": "http://example.com/ns#property", "@language": "en", "@type": "boolean" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = { orderBy: [ { "@id": "ex:property", "@type": "numeric", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es` );

			preferences = { orderBy: [ { "@id": "-property", "@type": "numeric", "@language": "es" } ] };
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=-<http://example.com/vocab%23property>;numeric;es` );


			preferences = {
				orderBy: [
					{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
					{ "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				limit: 10, orderBy: [
					{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
					{ "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?limit=10&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				offset: 5, orderBy: [
					{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
					{ "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				limit: 10, offset: 5, orderBy: [
					{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
					{ "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences );
			expect( stringPreferences ).toBe( `?limit=10&offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				orderBy: [
					{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
					{ "@id": "-ex:another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = {
				limit: 10, orderBy: [
					{ "@id": "property", "@type": "numeric", "@language": "es" },
					{ "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?limit=10&orderBy=<http://example.com/vocab%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				offset: 5, orderBy: [
					{ "@id": "property", "@type": "numeric", "@language": "es" },
					{ "@id": "-ex:another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?offset=5&orderBy=<http://example.com/vocab%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );

			preferences = {
				limit: 10, offset: 5, orderBy: [
					{ "@id": "ex:property", "@type": "numeric", "@language": "es" },
					{ "@id": "-another-property", "@language": "en", "@type": "boolean" },
				],
			};
			stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences, digestedSchema );
			expect( stringPreferences ).toBe( `?limit=10&offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/vocab%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en` );


			preferences = <any> { orderBy: [ { "@type": "numeric" } ] };
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> { orderBy: [ { "@language": "es" } ] };
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> { orderBy: [ { "@type": "numeric", "@language": "es" } ] };
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "wrong-type" } ] };
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );

			preferences = <any> { orderBy: [ { "@id": "http://example.com/ns#property", "@type": "float" } ] };
			expect( () => RetrievalPreferences.Util.stringifyRetrievalPreferences( preferences ) ).toThrowError( IllegalArgumentError );
		} );

	} );

} );
