import {
	clazz,
	constructor,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { Header } from "./Header";

describe( module( "carbonldp/HTTP/Header" ), ():void => {

	describe( clazz( "CarbonLDP.HTTP.Header", "Class to manage the values in an HTTP header." ), ():void => {

		// Mock data
		let valuesArray:string[] = [
			"a_value",
			"another_value",
			"last_value",
		];
		let valuesString:string = "a_value, another_value, last_value";

		it( isDefined(), ():void => {
			expect( Header ).toBeDefined();
			expect( Header ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature( [
				{ name: "values", type: "string | string[]", optional: true },
			] ), ():void => {} );

			it( "should accept empty params", () => {
				const instance:Header = new Header();
				expect( instance ).toEqual( jasmine.any( Header ) );
			} );

			it( "should initialize empty values", () => {
				const instance:Header = new Header();
				expect( instance.values ).toEqual( [] );
			} );


			it( "should accept values string", () => {
				const instance:Header = new Header( "a_value, another_value, last_value" );
				expect( instance ).toEqual( jasmine.any( Header ) );
			} );

			it( "should initialize values from string", () => {
				const instance:Header = new Header( "a_value, another_value, last_value" );
				expect( instance.values ).toEqual( [
					"a_value",
					"another_value",
					"last_value",
				] );
			} );


			it( "should accept values array", () => {
				const instance:Header = new Header( [ "a_value", "another_value" ] );
				expect( instance ).toEqual( jasmine.any( Header ) );
			} );

			it( "should initialize values from array", () => {
				const instance:Header = new Header( [ "a_value", "another_value" ] );
				expect( instance.values ).toEqual( [ "a_value", "another_value" ] );
			} );

		} );

		describe( method( INSTANCE, "hasValue" ), () => {

			it( hasSignature(
				"Returns true if the values array contains the provided value.",
				[
					{ name: "value", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Header.prototype.hasValue ).toBeDefined();
				expect( Header.prototype.hasValue ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true if has the value", () => {
				const header:Header = new Header( [ "a_value", "another_value", "last_value" ] );

				const returned:boolean = header.hasValue( "another_value" );
				expect( returned ).toBe( true );
			} );

			it( "should return false if has NOT the value", () => {
				const header:Header = new Header( [ "a_value", "another_value", "last_value" ] );

				const returned:boolean = header.hasValue( "no_has_value" );
				expect( returned ).toBe( false );
			} );

		} );

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
			const target:Header[ "values" ] = [] as string[];
			expect( target ).toBeDefined();
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"parseHeaders",
			"Returns a Map object which relates all header names with a `CarbonLDP.HTTP.Header` object containing their values.", [
				{ name: "headersString", type: "string" },
			],
			{ type: "Map <string, CarbonLDP.HTTP.Header>" }
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

} );
