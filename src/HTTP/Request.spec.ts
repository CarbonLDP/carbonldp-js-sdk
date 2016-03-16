import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature
} from "./../test/JasmineExtender";
import {
	NotFoundError,
	InternalServerErrorError
} from "./Errors";
import * as Utils from "./../Utils";
import * as Header from "./Header";
import Response from "./Response";
import Parser from "./JSONParser";
import * as NS from "./../NS";

import * as Request from "./Request";
import {hasInterface} from "./../test/JasmineExtender";

describe( module( "Carbon/HTTP/Request" ), function ():void {

	it( isDefined(), ():void => {
		expect( Request ).toBeDefined();
		expect( Utils.isObject( Request ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.HTTP.Request.Service",
		"Class that have functions to manage HTTP requests"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Request.Service ).toBeDefined();
			expect( Utils.isFunction( Request.Service ) ).toBe( true );
		});

		let responseHeaders:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"X-Custom-Header-1": "Value 1",
				"X-Custom-Header-2": "Value 2",
				"X-Custom-Header-3": "Value 3",
				"X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8"
			}
		};
		let responseFull:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"X-Custom-Header-1": "Value 1",
				"X-Custom-Header-2": "Value 2",
				"X-Custom-Header-3": "Value 3",
				"X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8"
			},
			contentType: "application/json",
			responseText: '[ { "value": "value", "type": "type" } ]'
		};
		let responseOptions:JasmineAjaxRequestStubReturnOptions = {
			status: 200,
			responseHeaders: {
				"Server": "Apache/2.4.1 (Unix) OpenSSL/1.0.0g",
				"Allow": "GET,HEAD,POST,OPTIONS,TRACE",
				"Content-Type": "httpd/unix-directory"
			},
			responseText: "May contains text that says something about the API"
		};

		let headersMap = new Map()
			.set( "Content-Type",   new Header.Class( "application/json" ) )
			.set(       "Accept",   new Header.Class( "application/json" ) );
		let options:Request.Options = {
			headers: headersMap,
			timeout: 5000,
			sendCredentialsOnCORS: false
		};
		let parser:Parser = new Parser();

		beforeEach( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "/200", null, "OPTIONS" ).andReturn( responseOptions );
			jasmine.Ajax.stubRequest( "/200", null, "HEAD" ).andReturn( responseHeaders );
			jasmine.Ajax.stubRequest( "/200", null, "GET" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "/200", null, "POST" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "/200", null, "PUT" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "/200", null, "PATCH" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "/200", null, "DELETE" ).andReturn( responseFull );
			jasmine.Ajax.stubRequest( "/404", null ).andReturn( { status: 404 } );
			jasmine.Ajax.stubRequest( "/500", null ).andReturn( { status: 500 } );
		} );

		afterEach( function ():void {
			jasmine.Ajax.uninstall();
		} );

		it( hasMethod(
			STATIC,
			"send",
			"Generic send method, to be used by the others methods in the class", [
				{ name: "url", type: "string" },
				{ name: "body", type: "string" },
				{ name: "options", type: "object" }
			],
			{ type: "Promise<Carbon.HTTP.Response>" }
		), function ():void {
			expect( Request.Service.send ).toBeDefined();
			expect( Utils.isFunction( Request.Service.send ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"head", [
				{ name: "url", type: "string" },
				{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
			],
			{ type: "Promise<Carbon.HTTP.Response>" }
		), ( done:{ (): void, fail:() => void } ):void => {
			expect( Request.Service.head ).toBeDefined();
			expect( Utils.isFunction( Request.Service.head ) ).toBe( true );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = Request.Service.head( "/200" );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, responseHeaders.responseHeaders );
			}, done.fail ) );

			promise = Request.Service.head( "/200", options );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				expect( response.data ).toEqual( "" );
				testHTTPResponseHeaders( response, responseHeaders.responseHeaders );
			}, done ) );

			promise = Request.Service.head( "/404" );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof NotFoundError ).toBe( true );
			} );
			promises.push( promise );

			promise = Request.Service.head( "/500", options );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof InternalServerErrorError ).toBe( true );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done, done.fail );
		} );

		it( hasMethod(
			STATIC,
			"options", [
				{ name: "url", type: "string" },
				{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
			],
			{ type: "Promise<Carbon.HTTP.Response>" }
		), ( done ):void => {
			expect( Request.Service.head ).toBeDefined();
			expect( Utils.isFunction( Request.Service.head ) ).toBe( true );

			let promises:Promise<any>[] = [];
			let promise:Promise<any>;

			promise = Request.Service.options( "/200" );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				testHTTPResponseData( response, responseOptions.responseText );
				testHTTPResponseHeaders( response, responseOptions.responseHeaders );
			}, done.fail ) );

			promise = Request.Service.options( "/200", options );
			testPromise( promise );
			promises.push( promise.then( function ( response:Response ):void {
				testHTTPResponse( response );
				expect( response.status ).toEqual( 200 );
				testHTTPResponseData( response, responseOptions.responseText );
				testHTTPResponseHeaders( response, responseOptions.responseHeaders );
			}, done.fail ) );

			promise = Request.Service.options( "/404" );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof NotFoundError ).toBe( true );
			} );
			promises.push( promise );

			promise = Request.Service.options( "/500", options );
			testPromise( promise );
			promise = promise.catch( function ( exception:Error ):void {
				expect( exception instanceof InternalServerErrorError ).toBe( true );
			} );
			promises.push( promise );

			Promise.all( promises ).then( done, done.fail );
		} );

		describe( method(
			STATIC,
			"get"
		), ():void => {

			it( hasSignature(
				"Simple get request", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.get ).toBeDefined();
				expect( Utils.isFunction( Request.Service.get ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.get( "/200" );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );

				promise = Request.Service.get( "/200", options );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );


				promise = Request.Service.get( "/404" );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.get( "/500", options );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

			it( hasSignature(
				"Get request with specified parser", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
				],
				{ type: "Promise<[Object, Carbon.HTTP.Response]>" }
			), ( done ):void => {
				expect( Request.Service.get ).toBeDefined();
				expect( Utils.isFunction( Request.Service.get ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.get( "/200", null, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );

				promise = Request.Service.get( "/200", options, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );


				promise = Request.Service.get( "/404", null, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.get( "/500", options, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

		});

		describe( method(
			STATIC,
			"post"
		), ():void => {

			it( hasSignature(
				"Simple post request", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.post ).toBeDefined();
				expect( Utils.isFunction( Request.Service.post ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.post( "/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );

				promise = Request.Service.post( "/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );


				promise = Request.Service.post( "/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.post( "/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

			it( hasSignature(
				"Post request with specified parser", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.post ).toBeDefined();
				expect( Utils.isFunction( Request.Service.post ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.post( "/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );

				promise = Request.Service.post( "/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );


				promise = Request.Service.post( "/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.post( "/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

		});

		describe( method(
			STATIC,
			"put"
		), ():void => {

			it( hasSignature(
				"Simple put request", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.put ).toBeDefined();
				expect( Utils.isFunction( Request.Service.put ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.put( "/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );

				promise = Request.Service.put( "/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );


				promise = Request.Service.put( "/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.put( "/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

			it( hasSignature(
				"Put request with specified parser", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.put ).toBeDefined();
				expect( Utils.isFunction( Request.Service.put ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.put( "/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );

				promise = Request.Service.put( "/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );


				promise = Request.Service.put( "/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.put( "/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

		});

		describe( method(
			STATIC,
			"patch"
		), ():void => {

			it( hasSignature(
				"Simple patch request", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.patch ).toBeDefined();
				expect( Utils.isFunction( Request.Service.patch ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.patch( "/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );

				promise = Request.Service.patch( "/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );


				promise = Request.Service.patch( "/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.patch( "/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

			it( hasSignature(
				"Patch request with specified parser", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.patch ).toBeDefined();
				expect( Utils.isFunction( Request.Service.patch ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.patch( "/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );

				promise = Request.Service.patch( "/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );


				promise = Request.Service.patch( "/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.patch( "/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

		});

		describe( method(
			STATIC,
			"delete"
		), ():void => {

			it( hasSignature(
				"Simple delete request", [
					{ name: "url", type: "string" },
					{ name: "body", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.delete ).toBeDefined();
				expect( Utils.isFunction( Request.Service.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.delete( "/200", "some body data" );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );

				promise = Request.Service.delete( "/200", "some body data", options );
				testPromise( promise );
				promises.push( promise.then( function ( response:Response ):void {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
				}, done.fail ) );


				promise = Request.Service.delete( "/404", "some body data" );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.delete( "/500", "some body data", options );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

			it( hasSignature(
				"Delete request with specified parser", [
					{ name: "url", type: "string" },
					{ name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
					{ name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
				],
				{ type: "Promise<Carbon.HTTP.Response>" }
			), ( done ):void => {
				expect( Request.Service.delete ).toBeDefined();
				expect( Utils.isFunction( Request.Service.delete ) ).toBe( true );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = Request.Service.delete( "/200", "some body data", null, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );

				promise = Request.Service.delete( "/200", "some body data", options, parser );
				testPromise( promise );
				promises.push( promise.then( function ( [object, response]:[Object, Response] ):Promise<any> {
					testHTTPResponse( response );
					expect( response.status ).toEqual( 200 );
					testHTTPResponseHeaders( response, responseFull.responseHeaders );
					testHTTPResponseData( response, responseFull.responseText );
					return parser.parse( responseFull.responseText ).then( ( parsedObject:Object ) => {
						testDataParsed( object, parsedObject );
					});
				}, done.fail ) );


				promise = Request.Service.delete( "/404", "some body data", null, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof NotFoundError ).toBe( true );
				} );
				promises.push( promise );

				promise = Request.Service.delete( "/500", "some body data", options, parser );
				testPromise( promise );
				promise = promise.catch( function ( exception:Error ):void {
					expect( exception instanceof InternalServerErrorError ).toBe( true );
				} );
				promises.push( promise );

				Promise.all( promises ).then( done, done.fail );
			});

		});

		function testPromise( promise:any ):void {
			expect( promise ).toBeDefined();
			expect( promise instanceof Promise ).toBeTruthy();
		}

		function testHTTPResponse( response:any ):void {
			expect( response ).not.toBeNull();
			expect( response instanceof Response ).toBeTruthy();
		}

		function testHTTPResponseHeaders( response:Response, originalHeaders:{ [ key:string ]:string } ):void {
			let headers:Map<string, Header.Class> = response.headers;
			for ( let header of Object.keys( originalHeaders ) ) {
				expect( headers.has( header ) ).toBe( true );
				expect( headers.get( header ) ).toEqual( new Header.Class ( originalHeaders[ header ] ) );
			}
		}

		function testHTTPResponseData( response:Response, originalData:string ):void {
			expect( response.data ).toBeDefined();
			expect( response.data ).toBe( originalData );
			expect( response.request.responseText ).toBeDefined();
			expect( response.request.responseText ).toBe( originalData );
		}

		function testDataParsed( object:any, originalObject:Object ):void {
			expect( object ).toBeDefined();
			expect( object instanceof Object ).toBe( true );
			expect( object ).toEqual( originalObject );
		}

	});

	describe( clazz(
		"Carbon.HTTP.Request.Util",
		"Useful functions for manage the options object of a request"
	), ():void => {
		let options:Request.Options,
			optionsWithHeaders:Request.Options;

		beforeEach( ():void => {
			options = newOptionsObject();
			optionsWithHeaders = {
				headers: new Map()
					.set( "Authorization",   new Header.Class( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) )
					.set(      "Location",   new Header.Class( "http://example.com/resource/" ) ),
				timeout: 5000,
				sendCredentialsOnCORS: false
			};
		});

		it( isDefined(), ():void => {
			expect( Request.Util ).toBeDefined();
			expect( Utils.isFunction( Request.Util ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"getHeader",
			"Returns the header object of a header-name inside an options object request. Returns `undefined` if the header not exists. If `initialize` flag is provided with true, a empty header will be created even if it already exits", [
				{ name: "headerName", type: "string" },
				{ name: "requestOptions", type: "Object" },
				{ name: "initialize", type: "boolean", optional: true, default: "false" }
			],
			{ type: "Carbon.HTTP.Header.Class" }
		), ():void => {
			expect( Request.Util.getHeader ).toBeDefined();
			expect( Utils.isFunction( Request.Util.getHeader ) ).toBe( true );

			expect( Request.Util.getHeader( "Authorization", optionsWithHeaders ) ).toEqual( new Header.Class( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );

			expect( Request.Util.getHeader( "Other-header", optionsWithHeaders ) ).toBeUndefined();
			expect( Request.Util.getHeader( "Authorization", options ) ).toBeUndefined();

			expect( Request.Util.getHeader( "Other-header", optionsWithHeaders, true ) ).toEqual( new Header.Class() );
			expect( Request.Util.getHeader( "Authorization", options, true ) ).toEqual( new Header.Class() );
			expect( Request.Util.getHeader( "Authorization", optionsWithHeaders, true )  ).toEqual( new Header.Class() );
		});

		it( hasMethod(
		STATIC,
		"setAcceptHeader",
		"Set an Accept header in an options object request", [
		{ name: "accept", type: "string" },
		{ name: "requestOptions", type: "Object" }
		], {
		type: "Object"
	}
		), ():void => {
			expect( Request.Util.setAcceptHeader ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setAcceptHeader ) ).toBe( true );

			options = Request.Util.setAcceptHeader( "application/json", options );
			expect( Request.Util.getHeader( "Accept", options ) ).toEqual( new Header.Class( "application/json" ) );

			optionsWithHeaders = Request.Util.setAcceptHeader( "application/json", optionsWithHeaders );
			expect( Request.Util.getHeader( "Accept", optionsWithHeaders ) ).toEqual( new Header.Class( "application/json" ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );
		});

		it( hasMethod(
			STATIC,
			"setContentTypeHeader",
			"Set an Content-Type header in an options object request", [
				{ name: "contentType", type: "string" },
				{ name: "requestOptions", type: "Object" }
			], {
				type: "Object"
			}
		), ():void => {
			expect( Request.Util.setContentTypeHeader ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setContentTypeHeader ) ).toBe( true );

			options = Request.Util.setContentTypeHeader( "application/json", options );
			expect( Request.Util.getHeader( "Content-Type", options ) ).toEqual( new Header.Class( "application/json" ) );

			optionsWithHeaders = Request.Util.setContentTypeHeader( "application/json", optionsWithHeaders );
			expect( Request.Util.getHeader( "Content-Type", optionsWithHeaders ) ).toEqual( new Header.Class( "application/json" ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );
		});

		it( hasMethod(
			STATIC,
			"setIfMatchHeader",
			"Set a If-Match header in an options object request", [
				{ name: "etag", type: "string" },
				{ name: "requestOptions", type: "Object" }
			], {
				type: "Object"
			}
		), ():void => {
			expect( Request.Util.setIfMatchHeader ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setIfMatchHeader ) ).toBe( true );

			options = Request.Util.setIfMatchHeader( 'W/"123456789"', options );
			expect( Request.Util.getHeader( "If-Match", options ) ).toEqual( new Header.Class( 'W/"123456789"' ) );

			optionsWithHeaders = Request.Util.setIfMatchHeader( 'W/"123456789"', optionsWithHeaders );
			expect( Request.Util.getHeader( "If-Match", optionsWithHeaders ) ).toEqual( new Header.Class( 'W/"123456789"' ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );
		});

		it( hasMethod(
			STATIC,
			"setPreferredInteractionModel",
			"Set a Prefer header with `rel=interaction-model` in an options object request", [
				{ name: "interactionModelURI", type: "string" },
				{ name: "requestOptions", type: "Object" }
			], {
				type: "Object"
			}
		), ():void => {
			expect( Request.Util.setPreferredInteractionModel ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setPreferredInteractionModel ) ).toBe( true );

			options = Request.Util.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", options );
			expect( Request.Util.getHeader( "Prefer", options ) ).toEqual( new Header.Class( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );

			optionsWithHeaders = Request.Util.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", optionsWithHeaders );
			expect( Request.Util.getHeader( "Prefer", optionsWithHeaders ) ).toEqual( new Header.Class( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );
		});

		it( hasMethod(
			STATIC,
			"setSlug",
			"Set a Slug header in an options object request", [
				{ name: "slug", type: "string" },
				{ name: "requestOptions", type: "Object" }
			], {
				type: "Object"
			}
		), ():void => {
			expect( Request.Util.setSlug ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setSlug ) ).toBe( true );

			options = Request.Util.setSlug( "a-slug-name", options );
			expect( Request.Util.getHeader( "Slug", options ) ).toEqual( new Header.Class( "a-slug-name" ) );

			optionsWithHeaders = Request.Util.setSlug( "a-slug-name", optionsWithHeaders );
			expect( Request.Util.getHeader( "Slug", optionsWithHeaders ) ).toEqual( new Header.Class( "a-slug-name" ) );
			expect( Request.Util.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header.Class( "http://example.com/resource/" ) );
		});

		it( hasMethod(
			STATIC,
			"setContainerRetrievalPreferences",
			"Set a Prefer header with `return=representation` in an options object request", [
				{ name: "preference", type: "Carbon.HTTP.Request.ContainerRetrievalPreferences" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options" }
			], {
				type: "Object"
			}
		), ():void => {
			expect( Request.Util.setContainerRetrievalPreferences ).toBeDefined();
			expect( Utils.isFunction( Request.Util.setContainerRetrievalPreferences ) ).toBe( true );

			let preferencesEmpty: Request.ContainerRetrievalPreferences = {};
			let preferencesIncludeNormal: Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferMinimalContainer,
					NS.LDP.Class.PreferMembership,
				]
			};
			let preferencesIncludeString: string = `return=representation; include="${NS.LDP.Class.PreferMinimalContainer} ${NS.LDP.Class.PreferMembership}"`;
			let preferencesIncludeEmpty: Request.ContainerRetrievalPreferences = {
				include: []
			};
			let preferencesOmitNormal: Request.ContainerRetrievalPreferences = {
				omit: [
					NS.LDP.Class.PreferContainment,
					NS.C.Class.PreferContainmentResources,
					NS.C.Class.PreferMembershipResources,
				]
			};
			let preferencesOmitString: string = `return=representation; omit="${NS.LDP.Class.PreferContainment} ${NS.C.Class.PreferContainmentResources} ${NS.C.Class.PreferMembershipResources}"`;
			let preferencesOmitEmpty: Request.ContainerRetrievalPreferences = {
				omit: []
			};
			let preferencesFullNormal: Request.ContainerRetrievalPreferences = {
				include: [
					NS.LDP.Class.PreferMinimalContainer,
					NS.LDP.Class.PreferMembership,
				],
				omit: [
					NS.LDP.Class.PreferContainment,
					NS.C.Class.PreferContainmentResources,
					NS.C.Class.PreferMembershipResources,
				]
			};
			let preferencesFullString: string = `return=representation; include="${NS.LDP.Class.PreferMinimalContainer} ${NS.LDP.Class.PreferMembership}" omit="${NS.LDP.Class.PreferContainment} ${NS.C.Class.PreferContainmentResources} ${NS.C.Class.PreferMembershipResources}"`;
			let preferencesFullEmpty: Request.ContainerRetrievalPreferences = {
				include: [],
				omit: []
			};

			options = Request.Util.setContainerRetrievalPreferences( preferencesEmpty, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ) ).toEqual( new Header.Class() );
			options = Request.Util.setContainerRetrievalPreferences( preferencesIncludeEmpty, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ) ).toEqual( new Header.Class() );
			options = Request.Util.setContainerRetrievalPreferences( preferencesOmitEmpty, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ) ).toEqual( new Header.Class() );
			options = Request.Util.setContainerRetrievalPreferences( preferencesFullEmpty, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ) ).toEqual( new Header.Class() );

			options = Request.Util.setContainerRetrievalPreferences( preferencesIncludeNormal, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ).toString() ).toEqual( preferencesIncludeString );
			options = Request.Util.setContainerRetrievalPreferences( preferencesOmitNormal, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ).toString() ).toEqual( preferencesOmitString );
			options = Request.Util.setContainerRetrievalPreferences( preferencesFullNormal, newOptionsObject() );
			expect( Request.Util.getHeader( "Prefer", options ).toString() ).toEqual( preferencesFullString );

		});

		function newOptionsObject(): Request.Options {
			return {
				timeout: 5000,
					sendCredentialsOnCORS: false
			};
		}

	});


});
