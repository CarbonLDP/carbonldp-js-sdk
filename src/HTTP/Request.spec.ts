/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import {
	NotFoundError,
	InternalServerErrorError,
	ForbiddenError,
	UnauthorizedError
} from "./Errors";
import * as Request from "./Request";
import * as Header from "./Header";
import Response from "./Response";

import {
	INSTANCE,
	STATIC,
	clazz,
	module,
	submodule,
	isDefined,
	hasMethod,
	hasProperty,
	hasInterface,
	MethodArgument,
	interfaze
} from "./../test/JasmineExtender";

describe( module( "Carbon/HTTP/Request" ), function ():void {

	it( isDefined(), function ():void {
		expect( Request ).toBeDefined();
	} );

	describe( clazz( "Carbon.HTTP.Request.Service", "" ), function ():void {

		beforeEach( function ():void {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "/200", null, "HEAD" ).andReturn( {
				status: 200,
				responseHeaders: [
					{name: "X-Custom-Header-1", value: "Value 1"},
					{name: "X-Custom-Header-2", value: "Value 2"},
					{name: "X-Custom-Header-3", value: "Value 3"},
					{name: "X-Custom-Header-Multi", value: "1, 2, 3, 4, 5, 6, 7, 8"}
				]
			} );
			jasmine.Ajax.stubRequest( "/200", null, "GET" ).andReturn( {
				status: 200,
				responseHeaders: [
					{name: "X-Custom-Header-1", value: "Value 1"},
					{name: "X-Custom-Header-2", value: "Value 2"},
					{name: "X-Custom-Header-3", value: "Value 3"},
					{name: "X-Custom-Header-Multi", value: "1, 2, 3, 4, 5, 6, 7, 8"}
				],
				response: [
					{value: "value", type: "type"}
				],
				responseText: "OK"
			} );
			jasmine.Ajax.stubRequest( "/200", null, "POST" ).andReturn( {
				status: 200,
				responseHeaders: [
					{name: "X-Custom-Header-1", value: "Value 1"},
					{name: "X-Custom-Header-2", value: "Value 2"},
					{name: "X-Custom-Header-3", value: "Value 3"},
					{name: "X-Custom-Header-Multi", value: "1, 2, 3, 4, 5, 6, 7, 8"}
				],
				response: [
					{value: "value", type: "type"}
				],
				responseText: "OK"
			} );
			jasmine.Ajax.stubRequest( "/401", null ).andReturn( {
				status: 401
			} );
			jasmine.Ajax.stubRequest( "/403", null ).andReturn( {
				status: 403
			} );
			jasmine.Ajax.stubRequest( "/404", null ).andReturn( {
				status: 404
			} );
			jasmine.Ajax.stubRequest( "/500", null ).andReturn( {
				status: 500
			} );
		} );

		afterEach( function ():void {
			jasmine.Ajax.uninstall();
		} );

		it( hasMethod( STATIC, "send", [
			{name: "url", type: "string"},
			{name: "body", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function ():void {
			// TODO: Test
		} );

		it( hasMethod( STATIC, "head", [
			{name: "url", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function ( done:(() => void) & { fail:() => void } ):void {
			expect( Request.Service.head ).toBeDefined();


			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = Request.Service.head( "/200" );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );

				let headers:Map<string, Header.Class> = response.headers;
				expect( headers.has( "X-Custom-Header-1" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-1" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-2" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-2" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-3" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-3" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-Multi" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-Multi" ).values.length ).toEqual( 8 );
			}, done.fail ) );

			let options:Request.Options = {
				timeout: 5000,
				sendCredentialsOnCORS: false
			};
			promise = Request.Service.head( "/200", options );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );

				let headers:Map<string, Header.Class> = response.headers;
				expect( headers.has( "X-Custom-Header-1" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-1" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-2" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-2" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-3" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-3" ).values.length ).toEqual( 1 );
				expect( headers.has( "X-Custom-Header-Multi" ) ).toBeTruthy();
				expect( headers.get( "X-Custom-Header-Multi" ).values.length ).toEqual( 8 );
			}, done.fail ) );

			promise = Request.Service.head( "/404" );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof NotFoundError ).toBe( true );
			} );
			promises.push( promise );

			promise = Request.Service.head( "/500" );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof InternalServerErrorError ).toBe( true );
			} );
			promises.push( promise );


			Promise.all( promises ).then( done, done );
		} );

		it( hasMethod( STATIC, "options", [
			{name: "url", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function ():void {
			// TODO: Test
		} );

		/**
		 * @describe This method tests the GET method by invoking all its signatures including optional and non optional parameters.
		 */
		it( hasMethod( STATIC, "get", [
			{name: "url", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function( done:(() => void) & { fail:() => void } ):void {
			expect( Request.Service.get ).toBeDefined();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = Request.Service.get( "/200" );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				expect( response.status ).toEqual( 200 );
				testHTTPResponse( response );
				testHTTPResponseHeaders( response );
			}, done.fail ) );

			let options:Request.Options = {
				timeout: 5000,
				sendCredentialsOnCORS: false
			};
			promise = Request.Service.get( "/200", options );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				expect( response.status ).toEqual( 200 );
				testHTTPResponse( response );
				testHTTPResponseHeaders( response );
			}, done.fail ) );


			promise = Request.Service.get( "/404" );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				testHTTError( "404", exception );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done, done );
		} );


		/**
		 * @describe This method tests the POST method by invoking all its signatures including optional and non optional parameters.
		 */
		it( hasMethod( STATIC, "post", [
			{name: "url", type: "string"},
			{name: "body", type: "string"},
			{name: "options", type: '<a related-object-id="interface_Options">Options<a>', optional: true}
		], {type: "Promise<HTTP.Response>"} ), function ( done:(() => void) & { fail:() => void } ):void {
			expect( Request.Service.post ).toBeDefined();

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = Request.Service.post( "/200", "body" );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				expect( response.status ).toEqual( 200 );
				testHTTPResponse( response );
				testHTTPResponseHeaders( response );
				testHTTPResponseData( response );
				testHTTPResponseDataText( response );
			}, done.fail ) );


			let options:Request.Options = {
				timeout: 5000,
				sendCredentialsOnCORS: false
			};
			promise = Request.Service.post( "/200", "body", options );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				expect( response.status ).toEqual( 200 );
				testHTTPResponse( response );
				testHTTPResponseHeaders( response );
				testHTTPResponseData( response );
				testHTTPResponseDataText( response );
			}, done.fail ) );

			Promise.all( promises ).then( done, done );
		} );

		it( hasMethod( STATIC, "put", [
			{name: "url", type: "string"},
			{name: "body", type: "string"},
			{name: "options", type: '<a href="#Options">Options<a>', optional: true}
		], {type: "Promise<HTTP.Response>"} ), function ():void {
			// TODO: Test
		} );

		it( hasMethod( STATIC, "patch", [
			{name: "url", type: "string"},
			{name: "body", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function ():void {
			// TODO: Test
		} );

		it( hasMethod( STATIC, "delete", [
			{name: "url", type: "string"},
			{name: "options", type: "object"}
		], {type: "Promise<HTTP.Response>"} ), function ():void {
			// TODO: Test
		} );


		/*it( hasInterface( STATIC, "Options", ObjectDescriptor.Options.name,
			ObjectDescriptor.Options.parameters ), function ():void {
			// TODO: Test
		} );*/

		/*it( hasInterface( STATIC, "Header", Request.ObjectDescriptor.Header.name,
			Request.ObjectDescriptor.Header.parameters ), function ():void {
			// TODO: Test
		} );

		it( hasInterface( STATIC, "Value", Request.ObjectDescriptor.Value.name,
			Request.ObjectDescriptor.Value.parameters ), function ():void {
			expect( Header ).toBeDefined();
		} );*/

		function testPromise( promise:any ):void {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBeTruthy();
		}

		function testHTTPResponse( response:any ):void {
			expect( response ).not.toBeNull();
			expect( response instanceof Response ).toBeTruthy();
		}

		function testHTTPResponseHeaders( response:any ):void {
			let headers:Map<string, Header.Class> = response.headers;
			expect( headers.has( "X-Custom-Header-1" ) ).toBeTruthy();
			expect( headers.get( "X-Custom-Header-1" ).values.length ).toEqual( 1 );
			expect( headers.has( "X-Custom-Header-2" ) ).toBeTruthy();
			expect( headers.get( "X-Custom-Header-2" ).values.length ).toEqual( 1 );
			expect( headers.has( "X-Custom-Header-3" ) ).toBeTruthy();
			expect( headers.get( "X-Custom-Header-3" ).values.length ).toEqual( 1 );
			expect( headers.has( "X-Custom-Header-Multi" ) ).toBeTruthy();
			expect( headers.get( "X-Custom-Header-Multi" ).values.length ).toEqual( 8 );
		}

		function testHTTPResponseData( response:any ):void {
			expect( response.request.response.length ).toEqual( 1 );
			expect( Object.keys( response.request.response[ 0 ] ) ).toContain( "value" );
			expect( Object.keys( response.request.response[ 0 ] ) ).toContain( "type" );
		}

		function testHTTPResponseDataText( response:any ):void {
			expect( response.data ).toEqual( "OK" );
		}

		function testHTTError( code:string, exception:Error ):void {
			switch ( code ) {
				case "401":
					expect( exception instanceof UnauthorizedError ).toBe( true );
					break;
				case "403":
					expect( exception instanceof ForbiddenError ).toBe( true );
					break;
				case "404":
					expect( exception instanceof NotFoundError ).toBe( true );
					break;
				case "500":
					expect( exception instanceof InternalServerErrorError ).toBe( true );
					break;
				default:
					break;
			}
		}
	} );
} );
