import {
	INSTANCE,
	STATIC,

	module,
	clazz,
	constructor,

	isDefined,
	hasMethod,
	hasProperty,
	hasDefaultExport,
	hasSignature,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Header from "./Header";
import { ClientRequest, IncomingMessage } from "http";

import * as Response from "./Response";
import DefaultExport from "./Response";

describe( module(
	"Carbon/HTTP/Response"
), ():void => {

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

	it( isDefined(), ():void => {
		expect( Utils.isObject( Response ) ).toBe( true );
		expect( Response ).toBeDefined();
	} );

	describe( clazz(
		"Carbon.HTTP.Response.Class",
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
			expect( Response.Class ).toBeDefined();
			expect( Utils.isFunction( Response.Class ) ).toBe( true );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Signature that only works in a web browser.", [
					{ name: "request", type: "XMLHttpRequest" },
				] ), ( done:{ ():void, fail:() => void } ):void => {

				createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
					expect( response ).toBeDefined();
					expect( response instanceof Response.Class ).toBe( true );

					done();
				} ).catch( done.fail );

			} );

			it( hasSignature(
				"Signature that only works in Node.js.", [
					{ name: "request", type: "ClientRequest" },
					{ name: "data", type: "string" },
					{ name: "response", type: "IncomingMessage" },
				] ), ( done:{ ():void, fail:() => void } ):void => {

				createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
					expect( response ).toBeDefined();
					expect( response instanceof Response.Class ).toBe( true );

					done();
				} ).catch( done.fail );

			} );

		} );


		it( hasProperty(
			INSTANCE,
			"status",
			"number",
			"The status code returned by the request."
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
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
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.data ).toBeDefined();
				expect( Utils.isString( response.data ) ).toBe( true );

				expect( response.data ).toBe( rawResponse.responseText );

				done();
			} ).catch( done.fail );
		} );

		it( hasProperty(
			INSTANCE,
			"headers",
			"Map<string, Carbon.HTTP.Header.Class>",
			"A map object containing the headers returned by the request."
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
				expect( response.headers ).toBeDefined();
				expect( Utils.isMap( response.headers ) ).toBe( true );

				let objectKeys:Array<string> = Object.keys( rawResponse.responseHeaders );
				expect( response.headers.size ).toBe( objectKeys.length );
				for ( let header of objectKeys ) {
					expect( response.getHeader( header ) ).toEqual( new Header.Class( rawResponse.responseHeaders[ header ] ) );
				}

				done();
			} ).catch( done.fail );

		} );

		it( hasProperty(
			INSTANCE,
			"request",
			"XMLHttpRequest | ClientRequest",
			"The XMLHttpRequest object that was provided in the constructor when working in a Browser, or the ClientRequest object when working with Node.js."
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
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

		it( hasMethod(
			INSTANCE,
			"getHeader",
			"Return the Header object referred by the name specified.", [
				{ name: "name", type: "string" },
			],
			{ type: "Carbon.HTTP.Header.Class" }
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse().then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {

				expect( response.getHeader ).toBeDefined();
				expect( Utils.isFunction( response.getHeader ) ).toBe( true );

				let header:Header.Class = response.getHeader( "Content-Type" );
				expect( header instanceof Header.Class ).toBe( true );

				done();
			} ).catch( done.fail );

		} );

	} );

	describe( clazz(
		"Carbon.HTTP.Response.Util",
		"Class with useful functions to manage `Carbon.HTTP.Response.Class` objects."
	), ():void => {

		beforeAll( ():void => {
			jasmine.Ajax.install();
			jasmine.Ajax.stubRequest( "http://example.com/request/full/" ).andReturn( rawResponse );
			jasmine.Ajax.stubRequest( "http://example.com/request/empty/" ).andReturn( {} );
		} );

		afterAll( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Response.Util ).toBeDefined();
			expect( Utils.isFunction( Response.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"getETag",
			"Return the ETag header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists.", [
				{ name: "response", type: "Carbon.HTTP.Response.Class" },
			],
			{ type: "string" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( Response.Util.getETag ).toBeDefined();
			expect( Utils.isFunction( Response.Util.getETag ) ).toBe( true );

			let promises:Promise<void>[] = [];

			promises.push( createResponse( "full/" ).then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
				expect( Response.Util.getETag( response ) ).toBe( rawResponse.responseHeaders[ "ETag" ] );
			} ) );

			promises.push( createResponse( "empty/" ).then( ( [ response, request ]:[ Response.Class, XMLHttpRequest | ClientRequest ] ) => {
				expect( Response.Util.getETag( response ) ).toBeNull();
			} ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

	} );

	function createResponse( type:string = "" ):Promise<[ Response.Class, XMLHttpRequest | ClientRequest ]> {
		return new Promise<any>( ( resolve, reject ) => {
			if( inXMLHttpRequest ) {
				let request:XMLHttpRequest = new XMLHttpRequest();
				request.open( "GET", "http://example.com/request/" + type );
				request.onerror = fail;

				request.onload = () => {
					let response:Response.Class = new Response.Class( <XMLHttpRequest> request );
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
						let response:Response.Class = new Response.Class( <ClientRequest> request, data, res );
						resolve( [ response, request ] );
					} );
				} );

				request.on( "error", reject );
				request.end();
			}
		} );
	}

	it( hasDefaultExport(
		"Carbon.HTTP.Response.Class"
	), ():void => {
		expect( DefaultExport ).toBe( Response.Class );
	} );

} );
