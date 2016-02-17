/// <reference path="../../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	constructor,

	isDefined,
	hasConstructor,
	hasProperty,
	hasMethod,
	hasSignature,
	hasDefaultExport
} from "./../test/JasmineExtender";
import * as Utils from "../Utils";

import * as JSONParser from "./JSONParser";
import DefaultExport from "./JSONParser";

describe( module(
	"Carbon/HTTP/JSONParser"
), ():void => {

	it( isDefined(), ():void => {
		expect( JSONParser ).toBeDefined();
		expect( Utils.isObject( JSONParser ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.HTTP.JSONParser.Class",
		"Class wrapper for native `JSON.parse` using `Promise` pattern"
	), ():void => {

		it( isDefined(), ():void => {
			expect( JSONParser.Class ).toBeDefined();
			expect( Utils.isFunction( JSONParser.Class ) ).toBe( true );
		});

		it( hasConstructor([
			{ name: "value", type: "string" }
		]), ():void => {
			let value: JSONParser.Class = new JSONParser.Class();

			expect( value ).toBeTruthy();
			expect( value instanceof JSONParser.Class ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"parse", [
				{ name: "body", type: "string", description: "A JSON string to parse" }
			],
			{ type: "Promise <Object>" }
		), ( done: () => void ):void => {
			let parser: JSONParser.Class = new JSONParser.Class();
			let jsonString = `{
			   "anObject": {
			      "numericProperty": -122,
			      "nullProperty": null,
			      "booleanProperty": true,
			      "dateProperty": "2011-09-23"
			   },
			   "arrayOfObjects": [
			      {
			         "item": 1
			      },
			      {
			         "item": 2
			      },
			      {
			         "item": 3
			      }
			   ],
			   "arrayOfIntegers": [
			      1,
			      2,
			      3,
			      4,
			      5
			   ]
			}`;
			let jsonObject: Object = {
				anObject: {
					numericProperty: -122,
					nullProperty: null,
					booleanProperty: true,
					dateProperty: "2011-09-23"
				},
				arrayOfObjects: [
					{
						item: 1
					},
					{
						item: 2
					},
					{
						item: 3
					}
				],
				arrayOfIntegers: [
					1,
					2,
					3,
					4,
					5
				]
			};

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let spy = {
				success: ( resultObject ):void => {
					expect( resultObject ).toEqual( jsonObject );
				},
				error: ( errorObject ):void => {
					expect( errorObject instanceof Error ).toBe( true );
				}
			};
			spyOn(spy, 'success').and.callThrough();
			spyOn(spy, 'error').and.callThrough();

			let promises: Promise<any>[] = [];

			promises.push( parser.parse( jsonString ).then( spy.success, spy.error ) );
			promises.push( parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spy.success, spy.error ) );

			Promise.all( promises ).then( ():void => {
				expect( spy.success.calls.count() ).toBe( 1 );
				expect( spy.error.calls.count() ).toBe( 1 );
				done();
			}, done );
		});

	});

	it( hasDefaultExport(
		"Carbon.HTTP.JSONParser.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( JSONParser.Class );
	});

});
