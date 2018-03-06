import {
	clazz,
	constructor,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	module,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { Header } from "./Header";
import DefaultExport from "./Header";

describe( module( "carbonldp/HTTP/Header" ), ():void => {

	describe( clazz( "CarbonLDP.HTTP.Header.Header", "Class to manage the values in an HTTP header." ), ():void => {

		// Mock data
		let valuesArray:string[] = [
			"a_value",
			"another_value",
			"last_value",
		];
		let valuesString:string = "a_value, another_value, last_value";

		it( isDefined(), ():void => {
			expect( Header ).toBeDefined();
			expect( Utils.isFunction( Header ) ).toBe( true );
		} );

		describe( constructor(), ():void => {

			// TODO: Test empty constructor
			it( hasSignature(), ():void => {} );

			it( hasSignature( [
				{ name: "values", type: "string[]" },
			] ), ():void => {
				let header:Header = new Header( valuesArray );

				expect( header ).toBeTruthy();
				expect( header instanceof Header ).toBe( true );
			} );

			it( hasSignature( [
				{ name: "value", type: "string" },
			] ), ():void => {
				let header:Header = new Header( valuesString );

				expect( header ).toBeTruthy();
				expect( header instanceof Header ).toBe( true );
			} );

		} );

		// TODO: Test `Header.hasValue`

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let header:Header = new Header( valuesArray );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( valuesString );

			header = new Header( valuesString );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( valuesString );

			header = new Header( "" );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( "" );

			header = new Header( [] );

			expect( header.toString ).toBeDefined();
			expect( Utils.isFunction( header.toString ) ).toBe( true );

			expect( header.toString() ).toBe( "" );
		} );

		it( hasProperty(
			INSTANCE,
			"values",
			"string[]",
			"Array that contains each value of the header."
		), ():void => {
			let header:Header = new Header( valuesArray );

			expect( header.values ).toBeDefined();
			expect( Utils.isArray( header.values ) ).toBe( true );

			expect( header.values ).toEqual( valuesArray );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"parseHeaders",
			"Returns a Map object which relates all header names with a `CarbonLDP.HTTP.Header.Header` object containing their values.", [
				{ name: "headersString", type: "string" },
			],
			{ type: "Map <string, CarbonLDP.HTTP.Header.Header>" }
		), ():void => {
			expect( Header.parseHeaders ).toBeDefined();
			expect( Utils.isFunction( Header.parseHeaders ) ).toBe( true );

			let headersString:string = `
				Host: http://example.com
				User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)
				Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
				Cache-Control: no-cache
			`;
			let headersMap:Map<string, Header> = Header.parseHeaders( headersString );

			expect( Utils.isMap( headersMap ) ).toBe( true );
			expect( headersMap.size ).toBe( 4 );
			expect( headersMap.get( "host" ).toString() ).toEqual( "http://example.com" );
			expect( headersMap.get( "user-agent" ).toString() ).toBe( "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)" );
			expect( headersMap.get( "cache-control" ).toString() ).toBe( "no-cache" );
			expect( headersMap.get( "accept" ) ).toEqual( new Header( "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" ) );
		} );

	} );

	it( hasDefaultExport(
		"CarbonLDP.HTTP.Header.Header"
	), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( Header );
	} );

} );
