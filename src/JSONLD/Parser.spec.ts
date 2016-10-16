import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasDefaultExport,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as JSONLDParser from "./Parser";
import DefaultExport from "./Parser";

describe( module(
	"Carbon/HTTP/JSONLDParser"
), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLDParser ).toBeDefined();
		expect( Utils.isObject( JSONLDParser ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.HTTP.JSONLDParser.Class",
		"Class to parse strings to valid JSONLD objects.", [
			"Carbon.HTTP.Parser.Class<Object[]>",
		]
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( JSONLDParser.Class ).toBeDefined();
			expect( Utils.isFunction( JSONLDParser.Class ) ).toBe( true );
			let value:JSONLDParser.Class = new JSONLDParser.Class();

			expect( value ).toBeTruthy();
			expect( value instanceof JSONLDParser.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the string provided using the `Carbon.JSONLD.Process.Class.expand()` method.", [
				{ name: "body", type: "string", description: "A JSON-LD string to parse." },
			],
			{ type: "Promise<Object[]>", description: "Promise that contains the parsed JSONLD object. If error occurs a `Carbon.Errors.InvalidJSONLDSyntaxError` will be thrown." }
		), ( done ):void => {
			jasmine.Ajax.stubRequest( /Should be error context/ ).andReturn( {
				status: 404,
			} );

			let compactedObject:Object = {
				"@context": {
					"ex": "http://example.com/",
					"ns": "http://example.com/ns#",
				},
				"@id": "ex:resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"ns:string": [ {
							"@value": "Document Resource",
						} ],
						"ns:pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"ns:string": {
							"@value": "Fragment 1",
						},
						"ns:pointerSet": [
							{ "@id": "ex:resource/" },
							{ "@id": "ex:resource/#1" },
						],
					},
					{
						"@id": "ex:resource/#1",
						"ns:string": {
							"@value": "NamedFragment 1",
						},
					},
				],
			};
			let expandedObject:Object = [ {
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [ {
							"@value": "Document Resource",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [ {
							"@value": "Fragment 1",
						} ],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [ {
							"@value": "NamedFragment 1",
						} ],
					},
				],
			} ];
			let jsonString:string = JSON.stringify( compactedObject );
			let errorObject:Object = {
				"@context": "Should be error context",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"ex:string": "Document Resource",
						"ex:pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"ex:string": [ {
							"@id": "Fragment 1",
						} ],
						"ex:pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"ex:string": [ {
							"@anotherThing": "NamedFragment 1",
						} ],
					},
				],
			};
			let errorString:string = JSON.stringify( errorObject );
			let parser:JSONLDParser.Class = new JSONLDParser.Class();

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let spies:any = {
				success: ( result ):void => {
					expect( result ).toEqual( expandedObject );
				},
				error: ( error ):void => {
					expect( error instanceof Error ).toBe( true );
				},
			};
			let success:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let error:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];

			promises.push( parser.parse( jsonString ).then( spies.success, spies.error ) );
			promises.push( parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spies.success, spies.error ) );
			promises.push( parser.parse( errorString ).then( spies.success, spies.error ) );

			Promise.all( promises ).then( ():void => {
				expect( success.calls.count() ).toBe( 1 );
				expect( error.calls.count() ).toBe( 2 );
				done();
			}, done.fail );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.HTTP.JSONLDParser.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( JSONLDParser.Class );
	} );

} );
