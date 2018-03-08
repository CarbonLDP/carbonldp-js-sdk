import {
	clazz,
	hasMethod,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import { JSONLDParser } from "./Parser";

describe( module(
	"carbonldp/JSONLD/Parser"
), ():void => {

	describe( clazz(
		"CarbonLDP.JSONLD.Parser.JSONLDParser",
		"Class to parse strings to valid JSONLD objects.", [
			"CarbonLDP.HTTP.Parser<object[]>",
		]
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		// TODO: Separate in different tests
		it( isDefined(), ():void => {
			expect( JSONLDParser ).toBeDefined();
			expect( Utils.isFunction( JSONLDParser ) ).toBe( true );
			let value:JSONLDParser = new JSONLDParser();

			expect( value ).toBeTruthy();
			expect( value instanceof JSONLDParser ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"parse",
			"Parse the string provided using the `CarbonLDP.JSONLD.Processor.JSONLDProcessor#expand()` method.", [
				{ name: "body", type: "string", description: "A JSON-LD string to parse." },
			],
			{ type: "Promise<object[]>", description: "Promise that contains the parsed JSONLD object. If error occurs a `CarbonLDP.Errors.InvalidJSONLDSyntaxError` will be thrown." }
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
			let parser:JSONLDParser = new JSONLDParser();

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
			let successSpy:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let errorSpy:jasmine.Spy = spyOn( spies, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];

			promises.push( parser.parse( jsonString ).then( spies.success, spies.error ) );
			promises.push( parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spies.success, spies.error ) );
			promises.push( parser.parse( errorString ).then( spies.success, spies.error ) );

			Promise.all( promises ).then( ():void => {
				expect( successSpy.calls.count() ).toBe( 1 );
				expect( errorSpy.calls.count() ).toBe( 2 );
				done();
			}, done.fail );
		} );

	} );

} );
