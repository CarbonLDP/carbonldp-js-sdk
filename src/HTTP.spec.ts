/// <reference path="../typings/jasmine/jasmine.d.ts" />
import * as HTTP from "./HTTP";
import * as Utils from "./Utils";

describe( "HTTP", function () {
	it( "is defined", function () {
		expect( HTTP ).not.toBeNull();
	} );

	describe( "has enum, StatusCode, which", function () {
		it( "is defined", function () {
			expect( HTTP.StatusCode ).toBeDefined();
		} );
	} );

	describe( "has class, Header.Class, which", function () {
		it( "is defined", function () {
			expect( HTTP.Header.Class ).not.toBeNull();
			expect( Utils.isFunction( HTTP.Header.Class ) ).toBe( true );
		} );
		it( "has a constructor, ( value ), which takes a string representation and parses it", function () {
			let header:HTTP.Header.Class;

			header = new HTTP.Header.Class( "value1, value2, value3, value4" );
			expect( header.values ).not.toBeNull();
			expect( Utils.isArray( header.values ) ).toBeTruthy();
			expect( header.values.length ).toEqual( 4 );
		} );
		it( "has a constructor, ( values ), which takes an array of HeaderValues", function () {
			let header:HTTP.Header.Class;

			header = new HTTP.Header.Class(
				[
					new HTTP.Header.Value( "value1" ),
					new HTTP.Header.Value( "value2" ),
					new HTTP.Header.Value( "value3" ),
					new HTTP.Header.Value( "value4" )
				]
			);

			expect( header.values ).not.toBeNull();
			expect( Utils.isArray( header.values ) ).toBeTruthy();
			expect( header.values.length ).toEqual( 4 );
		} );
		it( "has a method, toString(), which returns it\'s string representation", function () {
			let header:HTTP.Header.Class;

			header = new HTTP.Header.Class();
			header.values.push( new HTTP.Header.Value( "header1" ) );
			header.values.push( new HTTP.Header.Value( "header2" ) );
			header.values.push( new HTTP.Header.Value( "header3" ) );
			header.values.push( new HTTP.Header.Value( "header4" ) );

			expect( header.toString() ).toEqual( "header1, header2, header3, header4" );
		} );
	} );

	describe( "has class, HeaderValue, which", function () {
		it( "is defined", function () {
			expect( HTTP.Header.Value ).not.toBeNull();
			expect( Utils.isFunction( HTTP.Header.Value ) ).toBe( true );
		} );
		it( "has a constructor, ( value ), which takes a string representation and parses it", function () {
			let value:HTTP.Header.Value;

			value = new HTTP.Header.Value( 'include="http://example.org"; return=representation' );
			expect( value.mainKey ).toEqual( "include" );
			expect( value.mainValue ).toEqual( "http://example.org" );
			expect( value.secondaryKey ).toEqual( "return" );
			expect( value.secondaryValue ).toEqual( "representation" );

			value = new HTTP.Header.Value( '"http://example.org"; representation' );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( "http://example.org" );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toEqual( "representation" );

			value = new HTTP.Header.Value( "something" );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( "something" );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toBeNull();
		} );
		it( "has a constructor, ( mainKey, mainValue, secondaryKey, secondaryValue ), which takes the header parts", function () {
			let value:HTTP.Header.Value;

			value = new HTTP.Header.Value( "include", "http://example.org", "return", "representation" );
			expect( value.mainKey ).toEqual( "include" );
			expect( value.mainValue ).toEqual( "http://example.org" );
			expect( value.secondaryKey ).toEqual( "return" );
			expect( value.secondaryValue ).toEqual( "representation" );

			value = new HTTP.Header.Value( null, "http://example.org", null, "representation" );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( "http://example.org" );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toEqual( "representation" );

			value = new HTTP.Header.Value( null, "something", null, null );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( "something" );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toBeNull();
		} );
		it( "has method, toString(), which constructs the string representation", function () {
			// TODO: Test
		} );
	} );

	describe( "has class, Response, which", function () {
		it( "is defined", function () {
			expect( HTTP.Response ).toBeDefined();
		} );
	} );
} );