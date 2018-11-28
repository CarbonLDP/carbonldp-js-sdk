import { C } from "../Vocabularies/C";
import { LDP } from "../Vocabularies/LDP";

import { HTTPError } from "./Errors/HTTPError";
import { InternalServerErrorError } from "./Errors/ServerErrors/InternalServerErrorError";

import { Header } from "./Header";
import { JSONParser } from "./JSONParser";
import { RequestOptions, RequestService, RequestUtils } from "./Request";
import { Response } from "./Response";


describe( "Request", () => {

	describe( "RequestService", () => {

		it( "should exist", () => {
			expect( RequestService ).toBeDefined();
			expect( RequestService ).toEqual( jasmine.any( Function ) );
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

		beforeEach( () => {
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

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		// TODO: Test `RequestService.send`
		describe( "RequestService.send", () => {

			it( "should exist", () => {
				expect( RequestService.send ).toBeDefined();
				expect( RequestService.send ).toEqual( jasmine.any( Function ) );
			} );

		} );


		describe( "RequestService.head", () => {

			it( "should exist", () => {
				expect( RequestService.head ).toBeDefined();
				expect( RequestService.head ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a HEAD request", async () => {
				await RequestService
					.head( "http://example.com/200" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );
						expect( response.data ).toEqual( "" );

						testHTTPResponseHeaders( response, responseHeaders.responseHeaders );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.head( "http://example.com/500", options )
					.catch( function( error:HTTPError ):void {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.options", () => {

			it( "should exist", () => {
				expect( RequestService.options ).toBeDefined();
				expect( RequestService.options ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a OPTIONS request", async () => {
				await RequestService
					.options( "http://example.com/200" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseData( response, responseOptions.responseText );
						testHTTPResponseHeaders( response, responseOptions.responseHeaders );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.options( "http://example.com/500", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.get", () => {

			it( "should exist", () => {
				expect( RequestService.get ).toBeDefined();
				expect( RequestService.get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a GET request", async () => {
				await RequestService
					.get( "http://example.com/200" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a GET request with parser", async () => {
				await RequestService
					.get( "http://example.com/200", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.get( "http://example.com/500", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.post", () => {

			it( "should exist", () => {
				expect( RequestService.post ).toBeDefined();
				expect( RequestService.post ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a POST request", async () => {
				await RequestService
					.post( "http://example.com/200", "some body" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a POST request with parser", async () => {
				await RequestService
					.post( "http://example.com/200", "some body", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.post( "http://example.com/500", "some boy", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.put", () => {

			it( "should exist", () => {
				expect( RequestService.put ).toBeDefined();
				expect( RequestService.put ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a PUT request", async () => {
				await RequestService
					.put( "http://example.com/200", "some body" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a PUT request with parser", async () => {
				await RequestService
					.put( "http://example.com/200", "some body", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.put( "http://example.com/500", "some boy", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.patch", () => {

			it( "should exist", () => {
				expect( RequestService.patch ).toBeDefined();
				expect( RequestService.patch ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a PATCH request", async () => {
				await RequestService
					.patch( "http://example.com/200", "some body" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a PATCH request with parser", async () => {
				await RequestService
					.patch( "http://example.com/200", "some body", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.patch( "http://example.com/500", "some boy", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );

		describe( "RequestService.delete", () => {

			it( "should exist", () => {
				expect( RequestService.delete ).toBeDefined();
				expect( RequestService.delete ).toEqual( jasmine.any( Function ) );
			} );


			it( "should make a PATCH request", async () => {
				await RequestService
					.delete( "http://example.com/200" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a PATCH request with parser", async () => {
				await RequestService
					.delete( "http://example.com/200", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should make a PATCH request with data", async () => {
				await RequestService
					.delete( "http://example.com/200", "some body" )
					.then( ( response:Response ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );
					} );
			} );

			it( "should make a PATCH request with data and parser", async () => {
				await RequestService
					.delete( "http://example.com/200", "some body", null, parser )
					.then( ( [ object, response ]:[ Object, Response ] ) => {
						testHTTPResponse( response );

						expect( response.status ).toEqual( 200 );

						testHTTPResponseHeaders( response, responseFull.responseHeaders );
						testHTTPResponseData( response, responseFull.responseText );

						return parser
							.parse( responseFull.responseText )
							.then( ( parsedObject:object ) => {
								testDataParsed( object, parsedObject );
							} );
					} );
			} );

			it( "should reject promise", async () => {
				await RequestService
					.delete( "http://example.com/500", "some boy", options )
					.catch( ( error:HTTPError ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error ).toEqual( jasmine.any( InternalServerErrorError ) );

						expect( error.response.data ).toEqual( "" );

						testHTTPResponse( error.response );
						testHTTPResponseHeaders( error.response, {} );
					} );
			} );

		} );


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

	describe( "RequestUtils", () => {

		let options:RequestOptions;
		let optionsWithHeaders:RequestOptions;
		beforeEach( () => {
			options = newOptionsObject();
			optionsWithHeaders = {
				headers: new Map()
					.set( "authorization", new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) )
					.set( "location", new Header( "http://example.com/resource/" ) ),
				timeout: 5000,
				sendCredentialsOnCORS: false,
			};
		} );

		function newOptionsObject():RequestOptions {
			return {
				timeout: 5000,
				sendCredentialsOnCORS: false,
			};
		}


		it( "should exist", () => {
			expect( RequestUtils ).toBeDefined();
			expect( RequestUtils ).toEqual( jasmine.any( Function ) );
		} );


		describe( "RequestUtils.getHeader", () => {

			it( "should exist", () => {
				expect( RequestUtils.getHeader ).toBeDefined();
				expect( RequestUtils.getHeader ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return undefined when no headers", () => {
				expect( RequestUtils.getHeader( "Authorization", options ) ).toBeUndefined();
			} );

			it( "should return Header when headers", () => {
				expect( RequestUtils.getHeader( "Authorization", optionsWithHeaders ) )
					.toEqual( new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) );
			} );


			it( "should return init when no headers", () => {
				expect( RequestUtils.getHeader( "Authorization", options, true ) )
					.toEqual( new Header() );
			} );

			it( "should return Header when headers and init", () => {
				expect( RequestUtils.getHeader( "Authorization", optionsWithHeaders, true ) )
					.toEqual( new Header( "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==" ) );
			} );

		} );

		describe( "RequestUtils.setAcceptHeader", () => {

			it( "should exist", () => {
				expect( RequestUtils.setAcceptHeader ).toBeDefined();
				expect( RequestUtils.setAcceptHeader ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setAcceptHeader( "application/json", options );
				expect( RequestUtils.getHeader( "Accept", options ) ).toEqual( new Header( "application/json" ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setAcceptHeader( "application/json", optionsWithHeaders );
				expect( RequestUtils.getHeader( "Accept", optionsWithHeaders ) ).toEqual( new Header( "application/json" ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setContentTypeHeader", () => {

			it( "should exist", () => {
				expect( RequestUtils.setContentTypeHeader ).toBeDefined();
				expect( RequestUtils.setContentTypeHeader ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setContentTypeHeader( "application/json", options );
				expect( RequestUtils.getHeader( "Content-Type", options ) ).toEqual( new Header( "application/json" ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setContentTypeHeader( "application/json", optionsWithHeaders );
				expect( RequestUtils.getHeader( "Content-Type", optionsWithHeaders ) ).toEqual( new Header( "application/json" ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setIfMatchHeader", () => {

			it( "should exist", () => {
				expect( RequestUtils.setIfMatchHeader ).toBeDefined();
				expect( RequestUtils.setIfMatchHeader ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setIfMatchHeader( 'W/"123456789"', options );
				expect( RequestUtils.getHeader( "If-Match", options ) ).toEqual( new Header( 'W/"123456789"' ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setIfMatchHeader( 'W/"123456789"', optionsWithHeaders );
				expect( RequestUtils.getHeader( "If-Match", optionsWithHeaders ) ).toEqual( new Header( 'W/"123456789"' ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setIfNoneMatchHeader", () => {

			it( "should exist", () => {
				expect( RequestUtils.setIfNoneMatchHeader ).toBeDefined();
				expect( RequestUtils.setIfNoneMatchHeader ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setIfNoneMatchHeader( 'W/"123456789"', options );
				expect( RequestUtils.getHeader( "If-None-Match", options ) ).toEqual( new Header( 'W/"123456789"' ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setIfNoneMatchHeader( 'W/"123456789"', optionsWithHeaders );
				expect( RequestUtils.getHeader( "If-None-Match", optionsWithHeaders ) ).toEqual( new Header( 'W/"123456789"' ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setPreferredInteractionModel", () => {

			it( "should exist", () => {
				expect( RequestUtils.setPreferredInteractionModel ).toBeDefined();
				expect( RequestUtils.setPreferredInteractionModel ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", options );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setPreferredInteractionModel( "http://www.w3.org/ns/ldp#RDFSource", optionsWithHeaders );
				expect( RequestUtils.getHeader( "Prefer", optionsWithHeaders ) ).toEqual( new Header( "http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model" ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setPreferredRetrieval", () => {

			it( "should exist", () => {
				expect( RequestUtils.setPreferredRetrieval ).toBeDefined();
				expect( RequestUtils.setPreferredRetrieval ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = newOptionsObject();
				options = RequestUtils.setPreferredRetrieval( "representation", options );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header( "return=representation" ) );
			} );

			it( "should add header with options with headers", () => {
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

		} );

		describe( "RequestUtils.setSlug", () => {

			it( "should exist", () => {
				expect( RequestUtils.setSlug ).toBeDefined();
				expect( RequestUtils.setSlug ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setSlug( "a-slug-name", options );
				expect( RequestUtils.getHeader( "Slug", options ) ).toEqual( new Header( "a-slug-name" ) );
			} );

			it( "should add header with options with headers", () => {
				optionsWithHeaders = RequestUtils.setSlug( "a-slug-name", optionsWithHeaders );
				expect( RequestUtils.getHeader( "Slug", optionsWithHeaders ) ).toEqual( new Header( "a-slug-name" ) );
				expect( RequestUtils.getHeader( "Location", optionsWithHeaders ) ).toEqual( new Header( "http://example.com/resource/" ) );
			} );

		} );

		describe( "RequestUtils.setRetrievalPreferences", () => {

			it( "should exist", () => {
				expect( RequestUtils.setRetrievalPreferences ).toBeDefined();
				expect( RequestUtils.setRetrievalPreferences ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add header with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( {}, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );
			} );

			it( "should add header when empty include with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( { include: [] }, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );
			} );

			it( "should add header when empty omit with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( { omit: [] }, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );
			} );

			it( "should add header when empty include & omit with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( { include: [], omit: [] }, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ) ).toEqual( new Header() );
			} );


			it( "should add header when includes with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( {
					include: [
						LDP.PreferMinimalContainer,
						LDP.PreferMembership,
					],
				}, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ).toString() ).toEqual( `include="${LDP.PreferMinimalContainer} ${LDP.PreferMembership}"` );
			} );

			it( "should add header when omits with empty options", () => {
				options = RequestUtils.setRetrievalPreferences( {
					omit: [
						LDP.PreferContainment,
						C.PreferContainmentResources,
						C.PreferMembershipResources,
					],
				}, newOptionsObject() );
				expect( RequestUtils.getHeader( "Prefer", options ).toString() ).toEqual( `omit="${LDP.PreferContainment} ${C.PreferContainmentResources} ${C.PreferMembershipResources}"` );
			} );

			it( "should add header when includes & omits with empty options", () => {
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

		} );


		describe( "RequestUtils.isOptions", () => {

			it( "should exist", () => {
				expect( RequestUtils.isOptions ).toBeDefined();
				expect( RequestUtils.isOptions ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when all properties", () => {
				const anotherOptions:RequestOptions = {
					headers: null,
					sendCredentialsOnCORS: null,
					timeout: null,
					request: null,
				};
				expect( RequestUtils.isOptions( anotherOptions ) ).toBe( true );
			} );

			it( "should return true when any property", () => {
				expect( RequestUtils.isOptions( { headers: null } ) ).toBe( true );
				expect( RequestUtils.isOptions( { sendCredentialsOnCORS: null } ) ).toBe( true );
				expect( RequestUtils.isOptions( { timeout: null } ) ).toBe( true );
				expect( RequestUtils.isOptions( { request: null } ) ).toBe( true );
			} );

			it( "should return false when empty object", () => {
				expect( RequestUtils.isOptions( {} ) ).toBe( false );
			} );

			it( "should return false when undefined", () => {
				expect( RequestUtils.isOptions( null ) ).toBe( false );
				expect( RequestUtils.isOptions( undefined ) ).toBe( false );
			} );

		} );

	} );

} );
