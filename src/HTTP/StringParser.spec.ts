import {
	clazz,
	hasDefaultExport,
	hasMethod,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as StringParser from "./StringParser";
import DefaultExport from "./StringParser";

describe( module( "Carbon/HTTP/StringParser" ), ():void => {

	it( isDefined(), ():void => {
		expect( StringParser ).toBeDefined();
		expect( Utils.isObject( StringParser ) ).toEqual( true );
	} );

	describe( clazz(
		"Carbon.HTTP.StringParser.StringParser",
		"Parses a `Carbon.HTTP.Response.Response` and returns a string.", [
			"Carbon.HTTP.Parser.Parser<string>",
		]
	), ():void => {

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"parse",
			"Gets a string and returns a Promise with the same string.", [
				{ name: "body", type: "Carbon.HTTP.Response.Response" },
			],
			{ type: "Promise<string>" }
		), ( done:DoneFn ):void => {
			let stringParser:StringParser.StringParser = new StringParser.StringParser();

			// Property Integrity
			(() => {
				expect( "parse" in stringParser ).toEqual( true );
				expect( Utils.isFunction( stringParser.parse ) ).toEqual( true );
			})();

			let promises:Promise<any>[] = [];

			// Execution
			(() => {
				let body:string = "This is the body";
				let promise:Promise<string> = stringParser.parse( body );

				expect( promise ).toBeDefined();
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ( parsedBody ):void => {
					expect( parsedBody ).toEqual( body );
				} ) );
			})();

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done.fail( error );
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.HTTP.StringParser.StringParser" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toEqual( StringParser.StringParser );
	} );
} );
