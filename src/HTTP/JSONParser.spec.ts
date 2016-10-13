import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as JSONParser from "./JSONParser";
import DefaultExport from "./JSONParser";

describe( module(
	"Carbon/HTTP/JSONParser"
), ():void => {

	it( isDefined(), ():void => {
		expect( JSONParser ).toBeDefined();
		expect( Utils.isObject( JSONParser ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.HTTP.JSONParser.Class",
		"Wrapper class for the native `JSON.parse()` function using the `Promise` pattern.", [
			"Carbon.HTTP.Parser.Class<Object>",
		]
	), ():void => {

		it( isDefined(), ():void => {
			expect( JSONParser.Class ).toBeDefined();
			expect( Utils.isFunction( JSONParser.Class ) ).toBe( true );
			let value:JSONParser.Class = new JSONParser.Class();

			expect( value ).toBeTruthy();
			expect( value instanceof JSONParser.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"parse", [
				{ name: "body", type: "string", description: "A JSON string to parse." },
			],
			{ type: "Promise <Object>" }
		), ( done ):void => {
			let parser:JSONParser.Class = new JSONParser.Class();
			let jsonString:string = `{
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
			let jsonObject:Object = {
				anObject: {
					numericProperty: - 122,
					nullProperty: null,
					booleanProperty: true,
					dateProperty: "2011-09-23",
				},
				arrayOfObjects: [
					{
						item: 1,
					},
					{
						item: 2,
					},
					{
						item: 3,
					},
				],
				arrayOfIntegers: [
					1,
					2,
					3,
					4,
					5,
				],
			};

			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let spy:any = {
				success: ( resultObject ):void => {
					expect( resultObject ).toEqual( jsonObject );
				},
				error: ( errorObject ):void => {
					expect( errorObject instanceof Error ).toBe( true );
				},
			};
			let success:jasmine.Spy = spyOn( spy, "success" ).and.callThrough();
			let error:jasmine.Spy = spyOn( spy, "error" ).and.callThrough();

			let promises:Promise<any>[] = [];

			promises.push( parser.parse( jsonString ).then( spy.success, spy.error ) );
			promises.push( parser.parse( "some String /12121/ that is not JSON ))(*&^%$#@!" ).then( spy.success, spy.error ) );

			Promise.all( promises ).then( ():void => {
				expect( success.calls.count() ).toBe( 1 );
				expect( error.calls.count() ).toBe( 1 );
				done();
			}, done.fail );
		} );

	} );

	it( hasDefaultExport(
		"Carbon.HTTP.JSONParser.Class"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( JSONParser.Class );
	} );

} );
