import { CarbonLDP } from "../CarbonLDP";
import { IllegalArgumentError } from "../Errors";
import { Pointer } from "../Pointer";
import { DocumentsRegistry } from "../Registry/DocumentsRegistry";
import { INSTANCE } from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { LDP } from "../Vocabularies/LDP";
import {
	clazz,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OPTIONAL,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import { Header } from "./Header";
import { JSONParser } from "./JSONParser";

import {
	RequestOptions,
	RequestService,
	RequestUtils,
	RetrievalPreferences,
} from "./Request";
import { Response } from "./Response";

describe( module( "carbonldp/HTTP/Request" ), function():void {

	describe( interfaze(
		"CarbonLDP.HTTP.RequestOptions",
		"Customizable options that can change the behaviour of the request."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"headers",
			"Map<string, CarbonLDP.HTTP.Header>",
			"Map that contains the references to the headers to include in the request."
		), ():void => {
			let headers:Map<string, Header> = new Map();
			let options:RequestOptions = {};

			options.headers = headers;
			expect( options.headers ).toEqual( jasmine.any( Map ) );
		} );

		it( hasProperty(
			OPTIONAL,
			"sendCredentialsOnCORS",
			"boolean",
			"Flag that enables Cross-Origin Resource Sharing (CORS)."
		), ():void => {
			let enableCORS:boolean = true;
			let options:RequestOptions = {};

			options.sendCredentialsOnCORS = enableCORS;
			expect( options.sendCredentialsOnCORS ).toEqual( jasmine.any( Boolean ) );
		} );

	} );

	describe( interfaze(
		"CarbonLDP.HTTP.RetrievalPreferences",
		"Object used at `CarbonLDP.HTTP.RequestUtils#setRetrievalPreferences()` method, which specifies the behaviour of the of the requested document as a ldp:container."
	), ():void => {

		it( hasProperty(
			OPTIONAL,
			"include",
			"string[]",
			"Prefer URIs that indicates some specific information should be returned in the request's response."
		), ():void => {
			let include:string[] = [ "http://example.com/ns#Some-Prefer" ];
			let preferences:RetrievalPreferences = {};

			preferences.include = include;
			expect( preferences.include ).toEqual( jasmine.any( Array ) );
			expect( preferences.include[ 0 ] ).toEqual( jasmine.any( String ) );
		} );

		it( hasProperty(
			OPTIONAL,
			"omit",
			"string[]",
			"Prefer URIs that indicates some specific information should NOT be included in the request's response."
		), ():void => {
			let omit:string[] = [ "http://example.com/ns#Some-Prefer" ];
			let preferences:RetrievalPreferences = {};

			preferences.omit = omit;
			expect( preferences.omit ).toEqual( jasmine.any( Array ) );
			expect( preferences.omit[ 0 ] ).toEqual( jasmine.any( String ) );
		} );

	} );

	describe( clazz(
		"CarbonLDP.HTTP.RequestService",
		"Class with functions to easily manage HTTP requests."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RequestService ).toBeDefined();
			expect( Utils.isFunction( RequestService ) ).toBe( true );
		} );

		let responseHeaders:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"X-Custom-Header-1": "Value 1",
				"X-Custom-Header-2": "Value 2",
				"X-Custom-Header-3": "Value 3",
				"X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8",
			},
		};
		let responseFull:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"X-Custom-Header-1": "Value 1",
				"X-Custom-Header-2": "Value 2",
				"X-Custom-Header-3": "Value 3",
				"X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8",
			},
			contentType: "application/json",
			responseText: `[ { "value": "value", "type": "type" } ]`,
		};
		let responseOptions:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"Server": "Apache/2.4.1 (Unix) OpenSSL/1.0.0g",
				"Allow": "GET,HEAD,POST,OPTIONS,TRACE",
				"Content-Type": "httpd/unix-directory",
			},
			responseText: "May contains text that says something about the API",
		};

		let headersMap:Map<string, Header> = new Map()
			.set( "Content-Type", new Header( "application/json" ) )
			.set( "Accept", new Header( "application/json" ) );
		let options:RequestOptions = {
			headers: headersMap,
			timeout: 5000,
			sendCredentialsOnCORS: false,
		};
		let parser:JSONParser = new JSONParser();

		beforeEach( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "OPTIONS" ).andReturn( responseOptions );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "HEAD" ).andReturn( responseHeaders );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "GET" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "POST" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "PUT" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "PATCH" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "http://example.com/200", null, "DELETE" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "http://example.com/404", null ).andReturn( { status: 404 } );
			jasmine.Ajax.stubRequest( "http://example.com/500", null ).andReturn( { status: 500 } );
		} );

		afterEach( function():void {
			jasmine.Ajax.uninstall();
		} );

		// TODO: Test `Request.send`
		describe( method(
			STATIC,
			"send"
		), ():void => {

			it( hasSignature(
				"Generic send method, to be used by the others methods in the class.",
				[
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RequestService.send ).toBeDefined();
				expect( RequestService.send ).toEqual( jasmine.any( Function ) );
			} );

		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"head", [
				{ name: "url", type: "string" },
				{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
			],
			{ type: "Promise<CarbonLDP.HTTP.Response>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( RequestService.head ).toBeDefined();
			expect( Utils.isFunction( RequestService.head ) ).toBe( true );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = RequestService.head( "http://example.com/200" );
			testPromise( promise );
			promises.push( promise.then( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, responseHeaders.responseHeaders );
			} ) );

			promise = RequestService.head( "http://example.com/200", options );
			testPromise( promise );
			promises.push( promise.then( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, responseHeaders.responseHeaders );
			} ) );

			promise = RequestService.head( "http://example.com/404" );
			testPromise( promise );
			promise = promise.catch( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 404 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, {} );
			} );
			promises.push( promise );

			promise = RequestService.head( "http://example.com/500", options );
			testPromise( promise );
			promise = promise.catch( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 500 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, {} );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"options", [
				{ name: "url", type: "string" },
				{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
			],
			{ type: "Promise<CarbonLDP.HTTP.Response>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( RequestService.head ).toBeDefined();
			expect( Utils.isFunction( RequestService.head ) ).toBe( true );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = RequestService.options( "http://example.com/200" );
			testPromise( promise );
			promises.push( promise.then( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				testHTTPResponseData( response, responseOptions.responseText );
				testHTTPResponseHeaders( response, responseOptions.responseHeaders );
			} ) );

			promise = RequestService.options( "http://example.com/200", options );
			testPromise( promise );
			promises.push( promise.then( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				testHTTPResponseData( response, responseOptions.responseText );
				testHTTPResponseHeaders( response, responseOptions.responseHeaders );
			} ) );

			promise = RequestService.options( "http://example.com/404" );
			testPromise( promise );
			promise = promise.catch( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 404 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, {} );
			} );
			promises.push( promise );

			promise = RequestService.options( "http://example.com/500", options );
			testPromise( promise );
			promise = promise.catch( function( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 500 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, {} );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		describe( method(
			STATIC,
			"get"
		), ():void => {

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple get request.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.get ).toBeDefined();
				expect( Utils.isFunction( RequestService.get ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.get( "http://example.com/200" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.get( "http://example.com/200", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.get( "http://example.com/404" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.get( "http://example.com/500", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Get request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<[Object, CarbonLDP.HTTP.Response]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.get ).toBeDefined();
				expect( Utils.isFunction( RequestService.get ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.get( "http://example.com/200", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.get( "http://example.com/200", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.get( "http://example.com/404", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.get( "http://example.com/500", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		describe( method(
			STATIC,
			"post"
		), ():void => {

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple post request.", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.post ).toBeDefined();
				expect( Utils.isFunction( RequestService.post ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.post( "http://example.com/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.post( "http://example.com/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.post( "http://example.com/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.post( "http://example.com/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Post request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.post ).toBeDefined();
				expect( Utils.isFunction( RequestService.post ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.post( "http://example.com/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.post( "http://example.com/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.post( "http://example.com/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.post( "http://example.com/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		describe( method(
			STATIC,
			"put"
		), ():void => {

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple put request.", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.put ).toBeDefined();
				expect( Utils.isFunction( RequestService.put ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.put( "http://example.com/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.put( "http://example.com/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.put( "http://example.com/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.put( "http://example.com/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Put request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.put ).toBeDefined();
				expect( Utils.isFunction( RequestService.put ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.put( "http://example.com/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.put( "http://example.com/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.put( "http://example.com/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.put( "http://example.com/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		describe( method(
			STATIC,
			"patch"
		), ():void => {

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple patch request.", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.patch ).toBeDefined();
				expect( Utils.isFunction( RequestService.patch ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.patch( "http://example.com/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.patch( "http://example.com/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.patch( "http://example.com/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.patch( "http://example.com/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Patch request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.patch ).toBeDefined();
				expect( Utils.isFunction( RequestService.patch ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.patch( "http://example.com/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.patch( "http://example.com/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.patch( "http://example.com/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.patch( "http://example.com/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		describe( method(
			STATIC,
			"delete"
		), ():void => {

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple delete request.", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.delete ).toBeDefined();
				expect( Utils.isFunction( RequestService.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.delete( "http://example.com/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.delete( "http://example.com/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.delete( "http://example.com/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.delete( "http://example.com/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Delete request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.delete ).toBeDefined();
				expect( Utils.isFunction( RequestService.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.delete( "http://example.com/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.delete( "http://example.com/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.delete( "http://example.com/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.delete( "http://example.com/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Simple delete request.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.delete ).toBeDefined();
				expect( Utils.isFunction( RequestService.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.delete( "http://example.com/200" );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );

				promise = RequestService.delete( "http://example.com/200", options );
				testPromise( promise );
				promises.push( promise.then( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				} ) );


				promise = RequestService.delete( "http://example.com/404" );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.delete( "http://example.com/500", options );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			// TODO: Separate in different tests
			it( hasSignature(
				"Delete request with specified response parser.", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, defaultValue: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "CarbonLDP.HTTP.Parser<T>", optional: true },
				],
				{ type: "Promise<CarbonLDP.HTTP.Response>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( RequestService.delete ).toBeDefined();
				expect( Utils.isFunction( RequestService.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = RequestService.delete( "http://example.com/200", null, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );

				promise = RequestService.delete( "http://example.com/200", options, parser );
				testPromise( promise );
				promises.push( promise.then( function( [ object, response ]:[ Object, Response ] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					} );
				} ) );


				promise = RequestService.delete( "http://example.com/404", null, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 404 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				promise = RequestService.delete( "http://example.com/500", options, parser );
				testPromise( promise );
				promise = promise.catch( function( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 500 );
					expect( response.data ).toEqual( "" );
					testHTTPResponseHeaders( response, {} );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

		function testPromise( promise:any ):void {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBeTruthy();
		}

		function testHTTPResponse( response:any ):void {
			expect( response ).not.toBeNull();
			expect( response instanceof Response ).toBeTruthy();
		}

		function testHTTPResponseHeaders( response:Response, originalHeaders:{ [ key:string ]:string } ):void {
			let headers:Map<string, Header> = response.headers;
			for( let header of Object.keys( originalHeaders ) ) {
				expect( headers.has( header.toLowerCase() ) ).toBe( true );
				expect( headers.get( header.toLowerCase() ) ).toEqual( new Header( originalHeaders[ header ] ) );
			}
		}

		function testHTTPResponseData( response:Response, originalData:string ):void {
			expect( response.data ).toBeDefined();
			expect( response.data ).toBe( originalData );
		}

		function testDataParsed( object:any, originalObject:Object ):void {
			expect( object ).toBeDefined();
			expect( object instanceof Object ).toBe( true );
			expect( object ).toEqual( originalObject );
		}

	} );

	describe( clazz(
		"CarbonLDP.HTTP.RequestUtils",
		"Class with useful functions to manage the options object of a request."
	), ():void => {
		let options:RequestOptions,
			optionsWithHeaders:RequestOptions;

		beforeEach( ():void => {
			options = newOptionsObject();
			optionsWithHeaders = {
				headers: new Map()
					.set( "authorization", new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) )
					.set( "location", new Header( "http://example.com/resource/" ) ),
				timeout: 5000,
				sendCredentialsOnCORS: false,
			};
		} );

		it( isDefined(), ():void => {
			expect( RequestUtils ).toBeDefined();
			expect( Utils.isFunction( RequestUtils ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"getHeader",
			"Returns the header object of a header-name inside an options object request. Returns `undefined` if the header doesn't exists. If `initialize` flag is provided with true, an empty header will be created even if it already exits.", [
				{ name: "headerName", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
				{ name: "initialize", type: "boolean", optional: true, defaultValue: "false" },
			],
			{ type: "CarbonLDP.HTTP.Header" }
		), ():void => {
			expect( RequestUtils.getHeader ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.getHeader ) ).toBe( true );

			expect( RequestUtils.getHeader( "Authorization", optionsWithHeaders ) ).toEqual( new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );

			expect( RequestUtils.getHeader( "Other-header", optionsWithHeaders ) ).toBeUndefined();
			expect( RequestUtils.getHeader( "Authorization", options ) ).toBeUndefined();

			expect( RequestUtils.getHeader( "Other-header", optionsWithHeaders, true ) ).toEqual( new Header() );
			expect( RequestUtils.getHeader( "Authorization", options, true ) ).toEqual( new Header() );
			expect( RequestUtils.getHeader( "Authorization", optionsWithHeaders, true ) ).toEqual( new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setAcceptHeader",
			"Set an Accept header in an options object request.", [
				{ name: "accept", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setAcceptHeader ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setAcceptHeader ) ).toBe( true );

			options = RequestUtils.setAcceptHeader( "application/json", options );
			expect( RequestUtils.getHeader( "Accept", options ) ).toEqual( new Header( "application/json" ) );

			optionsWithHeaders = RequestUtils.setAcceptHeader( "application/json", optionsWithHeaders );
			expect( RequestUtils.getHeader( "Accept", optionsWithHeaders ) ).toEqual( new Header( "application/json" ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setContentTypeHeader",
			"Set a Content-Type header in an options object request.", [
				{ name: "contentType", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setContentTypeHeader ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setContentTypeHeader ) ).toBe( true );

			options = RequestUtils.setContentTypeHeader( "application/json", options );
			expect( RequestUtils.getHeader( "Content-Type", options ) ).toEqual( new Header( "application/json" ) );

			optionsWithHeaders = RequestUtils.setContentTypeHeader( "application/json", optionsWithHeaders );
			expect( RequestUtils.getHeader( "Content-Type", optionsWithHeaders ) ).toEqual( new Header( "application/json" ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setIfMatchHeader",
			"Set an If-Match header in an options object request.", [
				{ name: "eTag", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setIfMatchHeader ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setIfMatchHeader ) ).toBe( true );

			options = RequestUtils.setIfMatchHeader( 'W/"123456789"', options );
			expect( RequestUtils.getHeader( "If-Match", options ) ).toEqual( new Header( 'W/"123456789"' ) );

			optionsWithHeaders = RequestUtils.setIfMatchHeader( 'W/"123456789"', optionsWithHeaders );
			expect( RequestUtils.getHeader( "If-Match", optionsWithHeaders ) ).toEqual( new Header( 'W/"123456789"' ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setIfNoneMatchHeader",
			"Set an If-None-Match header in an options object request.", [
				{ name: "eTag", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "Object" }
		), ():void => {
			expect( RequestUtils.setIfNoneMatchHeader ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setIfNoneMatchHeader ) ).toBe( true );

			options = RequestUtils.setIfNoneMatchHeader( 'W/"123456789"', options );
			expect( RequestUtils.getHeader( "If-None-Match", options ) ).toEqual( new Header( 'W/"123456789"' ) );

			optionsWithHeaders = RequestUtils.setIfNoneMatchHeader( 'W/"123456789"', optionsWithHeaders );
			expect( RequestUtils.getHeader( "If-None-Match", optionsWithHeaders ) ).toEqual( new Header( 'W/"123456789"' ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setPreferredInteractionModel",
			"Set a Prefer header with `rel=interaction-model` in an options object request.", [
				{ name: "interactionModelURI", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setPreferredInteractionModel ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setPreferredInteractionModel ) ).toBe( true );

			options = RequestUtils.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", options );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );

			optionsWithHeaders = RequestUtils.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", optionsWithHeaders );
			expect( RequestUtils.getHeader( "Prefer", optionsWithHeaders ) ).toEqual( new Header( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setPreferredRetrieval",
			"Set a Prefer header which indicates to the platform to type of retrieval to make.", [
				{ name: "retrievalType", type: `"representation" | "minimal"`, description: `If "representation" is chosen the platform must retrieve the entire resource; otherwise when "minimal" is sent the minimal data will be returned generally an empty one.` },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setPreferredRetrieval ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setPreferredRetrieval ) ).toBe( true );

			options = newOptionsObject();
			options = RequestUtils.setPreferredRetrieval( "representation", options );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header( "return=representation" ) );

			options = newOptionsObject();
			options = RequestUtils.setPreferredRetrieval( "minimal", options );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header( "return=minimal" ) );

			options = {
				headers: new Map()
					.set( "prefer", new Header( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) ),
			};
			options = RequestUtils.setPreferredRetrieval( "representation", options );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual(
				new Header(
					"http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model," +
					"return=representation"
				)
			);
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setSlug",
			"Set a Slug header in an options object request.", [
				{ name: "slug", type: "string" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setSlug ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setSlug ) ).toBe( true );

			options = RequestUtils.setSlug( "a-slug-name", options );
			expect( RequestUtils.getHeader( "Slug", options ) ).toEqual( new Header( "a-slug-name" ) );

			optionsWithHeaders = RequestUtils.setSlug( "a-slug-name", optionsWithHeaders );
			expect( RequestUtils.getHeader( "Slug", optionsWithHeaders ) ).toEqual( new Header( "a-slug-name" ) );
			expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"setRetrievalPreferences",
			"Set a Prefer header with `return=representation` in an options object request.", [
				{ name: "preference", type: "CarbonLDP.HTTP.RetrievalPreferences" },
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions" },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions" }
		), ():void => {
			expect( RequestUtils.setRetrievalPreferences ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.setRetrievalPreferences ) ).toBe( true );

			options = RequestUtils.setRetrievalPreferences( {}, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );

			options = RequestUtils.setRetrievalPreferences( { include: [] }, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );

			options = RequestUtils.setRetrievalPreferences( { omit: [] }, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );

			options = RequestUtils.setRetrievalPreferences( { include: [], omit: [] }, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );


			options = RequestUtils.setRetrievalPreferences( {
				include: [
					LDP.PreferMinimalContainer,
					LDP.PreferMembership,
				],
			}, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ).toString() ).toEqual( `include="${LDP.PreferMinimalContainer} ${LDP.PreferMembership}"` );

			options = RequestUtils.setRetrievalPreferences( {
				omit: [
					LDP.PreferContainment,
					C.PreferContainmentResources,
					C.PreferMembershipResources,
				],
			}, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ).toString() ).toEqual( `omit="${LDP.PreferContainment} ${C.PreferContainmentResources} ${C.PreferMembershipResources}"` );

			options = RequestUtils.setRetrievalPreferences( {
				include: [
					LDP.PreferMinimalContainer,
					LDP.PreferMembership,
				],
				omit: [
					LDP.PreferContainment,
					C.PreferContainmentResources,
					C.PreferMembershipResources,
				],
			}, newOptionsObject() );
			expect( RequestUtils.getHeader( "Prefer", options ).toString() ).toEqual( `include="${LDP.PreferMinimalContainer} ${LDP.PreferMembership}", omit="${LDP.PreferContainment} ${C.PreferContainmentResources} ${C.PreferMembershipResources}"` );
		} );

		// TODO: Separate in different tests
		it( hasMethod(
			STATIC,
			"isOptions",
			"Returns `true` if the object provided has at least a property of a `CarbonLDP.HTTP.Request.Option` object.", [
				{ name: "object", type: "Object", description: "The object to evaluate." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RequestUtils.isOptions ).toBeDefined();
			expect( Utils.isFunction( RequestUtils.isOptions ) ).toBe( true );

			let anotherOptions:RequestOptions = {
				headers: null,
				sendCredentialsOnCORS: null,
				timeout: null,
				request: null,
			};
			expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );

			delete anotherOptions.headers;
			expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );
			anotherOptions.headers = null;

			delete anotherOptions.sendCredentialsOnCORS;
			expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );
			anotherOptions.sendCredentialsOnCORS = null;

			delete anotherOptions.timeout;
			expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );
			anotherOptions.timeout = null;

			delete anotherOptions.request;
			expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );
			anotherOptions.request = null;

			expect( RequestUtils.isOptions( {} ) ).toBe( false );
			expect( RequestUtils.isOptions( null ) ).toBe( false );
			expect( RequestUtils.isOptions( undefined ) ).toBe( false );
		} );

		function newOptionsObject():RequestOptions {
			return {
				timeout: 5000,
				sendCredentialsOnCORS: false,
			};
		}


		describe( method( STATIC, "requestURLFor" ), () => {

			it( hasSignature(
				"Generates the URL for the pointer and the relative uri provided.\n" +
				"When no URI specified, the ID for the pointer would be used as the URI.",
				[
					{ name: "registry", type: "CarbonLDP.RegistryService<CarbonLDP.Pointer, CarbonLDP.AbstractContext<CarbonLDP.Pointer, any> | undefined>", description: "The registry use to validate or resolve relative/prefixed URI if needed." },
					{ name: "pointer", type: "CarbonLDP.Pointer", description: "Base pointer for resolve the relative uri provided." },
					{ name: "uri", type: "string", optional: true, description: "relative uri to be resolved using the pointer specified." },
				]
			), () => {} );

			it( "should exists", ():void => {
				expect( RequestUtils.getRequestURLFor ).toBeDefined();
				expect( RequestUtils.getRequestURLFor ).toEqual( jasmine.any( Function ) );
			} );


			describe( "When registry has a context", () => {

				let context:CarbonLDP;
				let registry:DocumentsRegistry;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					registry = new DocumentsRegistry( context );
				} );


				it( "should return pointer ID with absolute URI when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer );

					expect( returned ).toBe( "https://example.com/" );
				} );

				it( "should return absolute URI when provided", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer, "https://example.com/resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve relative URI with the pointer ID", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer, "resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve prefixed named provided", () => {
					context.extendObjectSchema( { ex: "https://example.com/" } );
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer, "ex:resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );


				it( "should throw error pointer ID out of scope when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "http://example.org/" } );

					expect( () => {
						RequestUtils.getRequestURLFor( registry, pointer );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/" is out of scope.` );
				} );

				it( "should throw error when URI is out of scope", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						RequestUtils.getRequestURLFor( registry, pointer, "http://example.org/resource/" );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/resource/" is out of scope.` );
				} );

				it( "should throw error when prefixed named cannot be resolved", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						RequestUtils.getRequestURLFor( registry, pointer, "ex:resource/" );
					} ).toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
				} );

				it( "should throw error pointer ID out of scope when relative URI", () => {
					const pointer:Pointer = Pointer.create( { id: "http://example.org/" } );

					expect( () => {
						RequestUtils.getRequestURLFor( registry, pointer, "resource/" );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/resource/" is out of scope.` );
				} );

			} );

			describe( "When registry has NO context", () => {

				let registry:DocumentsRegistry;
				beforeEach( ():void => {
					registry = new DocumentsRegistry();
				} );


				it( "should return pointer ID with absolute URI when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer );

					expect( returned ).toBe( "https://example.com/" );
				} );

				it( "should return absolute URI when provided", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer, "https://example.com/resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve relative URI with the pointer ID", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = RequestUtils.getRequestURLFor( registry, pointer, "resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );


				it( "should throw error when prefixed named cannot be resolved", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						RequestUtils.getRequestURLFor( registry, pointer, "ex:resource/" );
					} ).toThrowError( IllegalArgumentError, `"ex:resource/" cannot be used as URL for the request.` );
				} );

			} );

		} );

	} );

} );
