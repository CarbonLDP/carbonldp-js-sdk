/// <reference path="../../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasDefaultExport
} from "./../test/JasmineExtender";
import * as Utils from "../Utils";

import * as JSONLDParser from "./JSONLDParser";
import DefaultExport from "./JSONLDParser";

describe( module(
	"Carbon/HTTP/JSONLDParser"
), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLDParser ).toBeDefined();
		expect( Utils.isObject( JSONLDParser ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.HTTP.JSONLDParser.Class",
		"Class wrapper for native `JSON.parse` using `Promise` pattern"
	), ():void => {

		it( isDefined(), ():void => {
			expect( JSONLDParser.Class ).toBeDefined();
			expect( Utils.isFunction( JSONLDParser.Class ) ).toBe( true );
			let value: JSONLDParser.Class = new JSONLDParser.Class();

			expect( value ).toBeTruthy();
			expect( value instanceof JSONLDParser.Class ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"parse", [
				{ name: "body", type: "string", description: "A JSON string to parse" }
			],
			{ type: "Promise <Object>" }
		), ( done ):void => {
			let compactedObject = {
				"@context": {
					"ex": "http://example.com/",
					"ns": "http://example.com/ns#",
				},
				"@id": "ex:resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"ns:string": [{
							"@value": "Document Resource"
						}],
						"ns:pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"ns:string": {
							"@value": "Fragment 1"
						},
						"ns:pointerSet": [
							{ "@id": "ex:resource/" },
							{ "@id": "ex:resource/#1" },
						],
					},
					{
						"@id": "ex:resource/#1",
						"ns:string": {
							"@value": "NamedFragment 1"
						},
					},
				],
			};
			let expandedObject = [{
				"@id": "http://example.com/resource/",
				"@graph": [
					{
						"@id": "http://example.com/resource/",
						"http://example.com/ns#string": [{
							"@value": "Document Resource"
						}],
						"http://example.com/ns#pointerSet": [
							{ "@id": "_:1" },
							{ "@id": "http://example.com/resource/#1" },
							{ "@id": "http://example.com/external-resource/" },
						],
					},
					{
						"@id": "_:1",
						"http://example.com/ns#string": [{
							"@value": "Fragment 1"
						}],
						"http://example.com/ns#pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"http://example.com/ns#string": [{
							"@value": "NamedFragment 1"
						}],
					},
				],
			}];
			let jsonString = JSON.stringify( expandedObject );
			let errorObject = {
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
						"ex:string": [{
							"@id": "Fragment 1"
						}],
						"ex:pointerSet": [
							{ "@id": "http://example.com/resource/" },
							{ "@id": "http://example.com/resource/#1" },
						],
					},
					{
						"@id": "http://example.com/resource/#1",
						"ex:string": [{
							"@anotherThing": "NamedFragment 1"
						}],
					},
				],
			};
			let errorString = JSON.stringify( errorObject );
			let parser: JSONLDParser.Class = new JSONLDParser.Class();

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let spies = {
				success: ( result ):void => {
					expect( result ).toEqual( expandedObject );
				},
				error: ( error ):void => {
					expect( error instanceof Error ).toBe( true );
				}
			};
			let success = spyOn(spies, 'success').and.callThrough();
			let error = spyOn(spies, 'error').and.callThrough();

			let promises: Promise<any>[] = [];

			promises.push( parser.parse( jsonString ).then( spies.success, spies.error ) );
			promises.push( parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spies.success, spies.error ) );
			promises.push( parser.parse( errorString ).then( spies.success, spies.error ) );

			Promise.all( promises ).then( ():void => {
				expect( success.calls.count() ).toBe( 1 );
				expect( error.calls.count() ).toBe( 2 );
				done();
			}, done.fail );
		});

	});

	it( hasDefaultExport(
		"Carbon.HTTP.JSONLDParser.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( JSONLDParser.Class );
	});

});
