import { clazz, hasMethod, INSTANCE, isDefined, module } from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import * as StringParser from "./StringParser";


describe( module( "carbonldp/HTTP/StringParser" ), ():void => {

	it( isDefined(), ():void => {
		expect( StringParser ).toBeDefined();
		expect( Utils.isObject( StringParser ) ).toEqual( true );
	} );

	describe( clazz(
		"CarbonLDP.HTTP.StringParser",
		"Parses the body of a `CarbonLDP.HTTP.Response` and returns a string.", [
			"CarbonLDP.HTTP.Parser<string>",
		]
	), ():void => {

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"parse",
			"Gets a string and returns a Promise with the same string.", [
				{ name: "body", type: "string" },
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

} );
