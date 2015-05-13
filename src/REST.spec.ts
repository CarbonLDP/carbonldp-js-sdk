/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../typings/es6/es6.d.ts" />
/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../typings/es6-promise-polyfill/es6-promise-polyfill.d.ts" />
import * as HTTP from './HTTP';
import * as REST from './REST';
import * as es6Promise from 'es6-promise-polyfill';

es6Promise.polyfill();

describe( 'REST', function () {
	beforeEach( function () {
		jasmine.Ajax.install();
	} );

	afterEach( function () {
		jasmine.Ajax.uninstall();
	} );

	it( 'is defined', function () {
		expect( REST ).toBeDefined();
	} );
	it( 'has method get( url, options ) which makes an AJAX GET request and returns a promise with the response', function ( done ) {
		expect( REST.get ).toBeDefined();

		var failTest = function () {
			expect( true ).toBe( false );
		};
		var testPromise = function ( promise:any ) {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBeTruthy();
		};
		var testHTTPResponse = function ( response:HTTP.Response ) {
			expect( response ).not.toBeNull();
			expect( response instanceof HTTP.Response ).toBeTruthy();
		};

		jasmine.Ajax.stubRequest( '/200', null, 'GET' ).andReturn( {
			status: 200,
			responseHeaders: [
				{name: 'X-Custom-Header-1', value: 'Value 1'},
				{name: 'X-Custom-Header-2', value: 'Value 2'},
				{name: 'X-Custom-Header-3', value: 'Value 3'},
				{name: 'X-Custom-Header-Multi', value: '1, 2, 3, 4, 5, 6, 7, 8'}
			]
		} );
		jasmine.Ajax.stubRequest( '/404', null, 'GET' ).andReturn( {
			status: 404
		} );

		var promises = [], promise;

		promise = REST.get( '/200' );
		testPromise( promise );
		promises.push( promise.then( function ( response:HTTP.Response ) {
			testHTTPResponse( response );
			expect( response.status ).toEqual( 200 );

			var headers:Map<string, HTTP.Header> = response.headers;
			expect( headers.has( 'X-Custom-Header-1' ) ).toBeTruthy();
			expect( headers.get( 'X-Custom-Header-1' ).values.length ).toEqual( 1 );
			expect( headers.has( 'X-Custom-Header-2' ) ).toBeTruthy();
			expect( headers.get( 'X-Custom-Header-2' ).values.length ).toEqual( 1 );
			expect( headers.has( 'X-Custom-Header-3' ) ).toBeTruthy();
			expect( headers.get( 'X-Custom-Header-3' ).values.length ).toEqual( 1 );
			expect( headers.has( 'X-Custom-Header-Multi' ) ).toBeTruthy();
			expect( headers.get( 'X-Custom-Header-Multi' ).values.length ).toEqual( 8 );
		}, failTest ) );

		promise = REST.get( '/404' );
		testPromise( promise );
		promises.push( promise.then( failTest, function ( response:HTTP.Response ) {
			testHTTPResponse( response );
			expect( response.status ).toEqual( 404 );

			var headers:Map<string, HTTP.Header> = response.headers;
			// TODO: Finish test

		} ) );

		Promise.all( promises ).then( done, done );
	} );
} );