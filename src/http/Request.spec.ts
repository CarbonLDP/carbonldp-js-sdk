/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

//@formatter:off
import {
	NotFoundException
} from './Exceptions';
import * as Request from './Request';
import * as Header from './Header';
import Response from './Response';

import {
	INSTANCE,
	STATIC,
	submodule,
	isDefined,
	hasMethod,
	hasProperty
} from './../test/JasmineExtender';
//@formatter:on

describe( 'HTTP.Request', function () {

	it( isDefined(), function () {
		expect( Request ).toBeDefined();
	} );

	describe( submodule( STATIC, 'Service' ), function () {

		beforeEach( function () {
			jasmine.Ajax.install();
		} );

		afterEach( function () {
			jasmine.Ajax.uninstall();
		} );

		it( hasMethod( STATIC, 'send', [
			{name: 'url', type: 'string'},
			{name: 'body', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'head', [
			{name: 'url', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'options', [
			{name: 'url', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'get', [
			{name: 'url', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function ( done ) {
			expect( Request.Service.get ).toBeDefined();

			var failTest = function () {
				expect( true ).toBe( false );
			};
			var testPromise = function ( promise:any ) {
				expect( promise ).toBeDefined();
				expect( promise instanceof Promise ).toBeTruthy();
			};
			var testHTTPResponse = function ( response:Response ) {
				expect( response ).not.toBeNull();
				expect( response instanceof Response ).toBeTruthy();
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

			promise = Request.Service.get( '/200' );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ) {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );

				var headers:Map<string, Header.Class> = response.headers;
				expect( headers.has( 'X-Custom-Header-1' ) ).toBeTruthy();
				expect( headers.get( 'X-Custom-Header-1' ).values.length ).toEqual( 1 );
				expect( headers.has( 'X-Custom-Header-2' ) ).toBeTruthy();
				expect( headers.get( 'X-Custom-Header-2' ).values.length ).toEqual( 1 );
				expect( headers.has( 'X-Custom-Header-3' ) ).toBeTruthy();
				expect( headers.get( 'X-Custom-Header-3' ).values.length ).toEqual( 1 );
				expect( headers.has( 'X-Custom-Header-Multi' ) ).toBeTruthy();
				expect( headers.get( 'X-Custom-Header-Multi' ).values.length ).toEqual( 8 );
			}, done.fail ) );

			promise = Request.Service.get( '/404' );
			testPromise( promise );
			promise = promise.catch( function ( exception ) {
				expect( exception instanceof NotFoundException ).toBe( true );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done, done );
		} );

		it( hasMethod( STATIC, 'post', [
			{name: 'url', type: 'string'},
			{name: 'body', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'put', [
			{name: 'url', type: 'string'},
			{name: 'body', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'patch', [
			{name: 'url', type: 'string'},
			{name: 'body', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

		it( hasMethod( STATIC, 'delete', [
			{name: 'url', type: 'string'},
			{name: 'options', type: 'object'}
		], {type: 'Promise<HTTP.Response>'} ), function () {
			// TODO: Test
		} );

	} );
} );