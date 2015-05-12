/// <reference path="../typings/jasmine/jasmine.d.ts" />
import * as HTTP from './HTTP';
import * as Utils from './Utils';

describe( 'HTTP', function () {
	it( 'is defined', function () {
		expect( HTTP ).not.toBeNull();
	} );

	describe( 'has enum, StatusCode, which', function () {
		it( 'is defined', function () {
			expect( HTTP.StatusCode ).toBeDefined();
		} );
	} );

	describe( 'has class, Header, which', function () {
		it( 'is defined', function () {
			expect( HTTP.Header ).not.toBeNull();
			expect( Utils.isFunction( HTTP.Header ) ).toBe( true );
		} );
		it( 'has a constructor, ( value ), which takes a string representation and parses it', function () {
			var header:HTTP.Header;

			header = new HTTP.Header( 'value1, value2, value3, value4' );
			expect( header.values ).not.toBeNull();
			expect( Utils.isArray( header.values ) ).toBeTruthy();
			expect( header.values.length ).toEqual( 4 );
		} );
		it( 'has a constructor, ( values ), which takes an array of HeaderValues', function () {
			var header:HTTP.Header;

			header = new HTTP.Header(
				[
					new HTTP.HeaderValue( 'value1' ),
					new HTTP.HeaderValue( 'value2' ),
					new HTTP.HeaderValue( 'value3' ),
					new HTTP.HeaderValue( 'value4' )
				]
			);

			expect( header.values ).not.toBeNull();
			expect( Utils.isArray( header.values ) ).toBeTruthy();
			expect( header.values.length ).toEqual( 4 );
		} );
		it( 'has a method, toString(), which returns it\'s string representation', function () {
			var header:HTTP.Header;

			header = new HTTP.Header();
			header.values.push( new HTTP.HeaderValue( 'header1' ) );
			header.values.push( new HTTP.HeaderValue( 'header2' ) );
			header.values.push( new HTTP.HeaderValue( 'header3' ) );
			header.values.push( new HTTP.HeaderValue( 'header4' ) );

			expect( header.toString() ).toEqual( 'header1, header2, header3, header4' );
		} );
	} );

	describe( 'has class, HeaderValue, which', function () {
		it( 'is defined', function () {
			expect( HTTP.HeaderValue ).not.toBeNull();
			expect( Utils.isFunction( HTTP.HeaderValue ) ).toBe( true );
		} );
		it( 'has a constructor, ( value ), which takes a string representation and parses it', function () {
			var value:HTTP.HeaderValue;

			value = new HTTP.HeaderValue( 'include="http://example.org"; return=representation' );
			expect( value.mainKey ).toEqual( 'include' );
			expect( value.mainValue ).toEqual( 'http://example.org' );
			expect( value.secondaryKey ).toEqual( 'return' );
			expect( value.secondaryValue ).toEqual( 'representation' );

			value = new HTTP.HeaderValue( '"http://example.org"; representation' );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( 'http://example.org' );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toEqual( 'representation' );

			value = new HTTP.HeaderValue( 'something' );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( 'something' );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toBeNull();
		} );
		it( 'has a constructor, ( mainKey, mainValue, secondaryKey, secondaryValue ), which takes the header parts', function () {
			var value:HTTP.HeaderValue;

			value = new HTTP.HeaderValue( 'include', 'http://example.org', 'return', 'representation' );
			expect( value.mainKey ).toEqual( 'include' );
			expect( value.mainValue ).toEqual( 'http://example.org' );
			expect( value.secondaryKey ).toEqual( 'return' );
			expect( value.secondaryValue ).toEqual( 'representation' );

			value = new HTTP.HeaderValue( null, 'http://example.org', null, 'representation' );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( 'http://example.org' );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toEqual( 'representation' );

			value = new HTTP.HeaderValue( null, 'something', null, null );
			expect( value.mainKey ).toBeNull();
			expect( value.mainValue ).toEqual( 'something' );
			expect( value.secondaryKey ).toBeNull();
			expect( value.secondaryValue ).toBeNull();
		} );
		it( 'has method, toString(), which constructs the string representation', function () {
			// TODO: Test
		} );
	} );

	describe( 'has class, Response, which', function () {
		it( 'is defined', function () {
			expect( HTTP.Response ).toBeDefined();
		} );
	} );
} );