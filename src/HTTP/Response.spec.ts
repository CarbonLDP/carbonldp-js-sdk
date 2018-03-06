import {
	ClientRequest,
	IncomingMessage
} from "http";

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
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";
import { Header } from "./Header";

import DefaultExport, { Response } from "./Response";

describe( module( "CarbonLDP/HTTP/Response" ), ():void => {

	let rawResponse:JasmineAjaxRequestStubReturnOptions = {
		"status": 200,
		"responseText": "A body response",
		responseHeaders: {
			"Content-Type": "text/plain",
			"Server": "Apache/2.4.1 (Unix)",
			"ETag": 'W/"123456789"',
		},
	};
	let inXMLHttpRequest:boolean = ( typeof XMLHttpRequest !== "undefined" );

	describe( clazz(
		"CarbonLDP.HTTP.Response.Response",
		"Class that represents an HTTP Response."
	), ():void => {

		beforeAll( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( rawResponse );
		} );

		afterAll( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Response ).toBeDefined();
			expect( Utils.isFunction( Response ) ).toBe( true );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Signature that only works in a web browser.", [
					{ name: "request", type: "XMLHttpRequest" },
				]
			), ( done:DoneFn ):void => {

				createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
					expect( response ).toBeDefined();
					expect( response instanceof Response ).toBe( true );

					done();
				} ).catch( done.fail );

			} );

			it( hasSignature(
				"Signature that only works in Node.js.", [
					{ name: "request", type: "ClientRequest" },
					{ name: "data", type: "string" },
					{ name: "response", type: "IncomingMessage" },
				]
			), ( done:DoneFn ):void => {

				createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
					expect( response ).toBeDefined();
					expect( response instanceof Response ).toBe( true );

					done();
				} ).catch( done.fail );

			} );

		} );


		it( hasProperty(
			INSTANCE,
			"status",
			"number",
			"The status code returned by the request."
		), ( done:DoneFn ):void => {

			createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.status ).toBeDefined();
				expect( Utils.isNumber( response.status ) ).toBe( true );

				expect( response.status ).toBe( rawResponse.status );

				done();
			} ).catch( done.fail );

		} );

		it( hasProperty(
			INSTANCE,
			"data",
			"string",
			"The raw body returned by the request."
		), ( done:DoneFn ):void => {

			createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.data ).toBeDefined();
				expect( Utils.isString( response.data ) ).toBe( true );

				expect( response.data ).toBe( rawResponse.responseText );

				done();
			} ).catch( done.fail );
		} );

		it( hasProperty(
			INSTANCE,
			"headers",
			"Map<string, CarbonLDP.HTTP.Header.Header>",
			"A map object containing the headers returned by the request."
		), ( done:DoneFn ):void => {

			createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.headers ).toBeDefined();
				expect( Utils.isMap( response.headers ) ).toBe( true );

				let objectKeys:Array<string> = Object.keys( rawResponse.responseHeaders );
				expect( response.headers.size ).toBe( objectKeys.length );
				for( let header of objectKeys ) {
					expect( response.getHeader( header ) ).toEqual( new Header( rawResponse.responseHeaders[ header ] ) );
				}

				done();
			} ).catch( done.fail );

		} );

		it( hasProperty(
			INSTANCE,
			"request",
			"XMLHttpRequest | ClientRequest",
			"The XMLHttpRequest object that was provided in the constructor when working in a Browser, or the ClientRequest object when working with Node.js."
		), ( done:DoneFn ):void => {

			createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.request ).toBeDefined();

				if( inXMLHttpRequest ) {
					expect( response.request instanceof XMLHttpRequest ).toBe( true );
				} else {
					expect( response.request instanceof require( "http" ).ClientRequest ).toBe( true );
				}

				expect( response.request ).toBe( request );

				done();
			} ).catch( done.fail );

		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"getHeader",
			"Return the Header object referred by the name specified.", [
				{ name: "name", type: "string" },
			],
			{ type: "CarbonLDP.HTTP.Header.Header" }
		), ( done:DoneFn ):void => {

			createResponse().then( ( [ response, request ]:[ Response, XMLHttpRequest | ClientRequest ] ) => {

				expect( response.getHeader ).toBeDefined();
				expect( Utils.isFunction( response.getHeader ) ).toBe( true );

				let header:Header = response.getHeader( "Content-Type" );
				expect( header instanceof Header ).toBe( true );

				done();
			} ).catch( done.fail );

		} );

		// TODO: Separate in different tests
		it( hasMethod(
			INSTANCE,
			"getETag",
			"Return the ETag header of a `CarbonLDP.HTTP.Response.Response` object. Returns null if no ETag exists.",
			{ type: "string" }
		), ( done:DoneFn ):void => {
			createResponse()
				.then( ( [ response ] ) => {
					expect( response.getETag ).toBeDefined();
					expect( response.getETag ).toEqual( jasmine.any( Function ) );

					expect( response.getETag() ).toBe( "W/\"123456789\"" );

					done();
				} )
				.catch( done.fail )
			;
		} );

	} );

	function createResponse( type:string = "" ):Promise<[ Response, XMLHttpRequest | ClientRequest ]> {
		return new Promise<any>( ( resolve, reject ) => {
			if( inXMLHttpRequest ) {
				let request:XMLHttpRequest = new XMLHttpRequest();
				request.open( "GET", "http://example.com/request/" + type );
				request.onerror = fail;

				request.onload = () => {
					let response:Response = new Response( <XMLHttpRequest> request );
					resolve( [ response, request ] );
				};

				request.send();

			} else {
				let http:any = require( "http" );
				let request:ClientRequest = http.request( {
					method: "GET",
					protocol: "http:",
					host: "example.com",
					path: "/request/" + type,
				}, ( res:IncomingMessage ) => {
					let data:string = "";
					res.setEncoding( "utf8" );
					res.on( "data", ( chunk:string | Buffer ) => {
						if( Buffer.isBuffer( chunk ) ) chunk = chunk.toString( "utf8" );
						data = chunk;
					} );
					res.on( "end", () => {
						let response:Response = new Response( <ClientRequest> request, data, res );
						resolve( [ response, request ] );
					} );
				} );

				request.on( "error", reject );
				request.end();
			}
		} );
	}

	it( hasDefaultExport(
		"CarbonLDP.HTTP.Response.Response"
	), ():void => {
		expect( DefaultExport ).toBe( Response );
	} );

} );
