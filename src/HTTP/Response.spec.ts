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
	hasSignature
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Header from "./Header";

import * as Response from "./Response";
import DefaultExport from "./Response";
import construct = Reflect.construct;
import {ClientRequest, IncomingMessage} from "http";
import {resolve} from "url";

describe( module(
	"Carbon/HTTP/Response"
), ():void => {

	let rawResponse:JasmineAjaxRequestStubReturnOptions = {
		"status": 200,
		"responseText": "A body response",
		responseHeaders: {
			"Content-Type": "text/plain",
			"Server": "Apache/2.4.1 (Unix)",
			"ETag": 'W/"123456789"'
		}
	};
	let inXMLHttpRequest:boolean = ( typeof XMLHttpRequest !== "undefined" );

	it( isDefined(), ():void => {
		expect( Utils.isObject( Response ) ).toBe( true );
		expect( Response ).toBeDefined();
	} );

	describe( clazz(
		"Carbon.HTTP.Response.Class",
		"Class that represents an HTTP Response"
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
				"Signature that only works when working in a Browser.", [
					{name: "request", type: "XMLHttpRequest"}
				] ), ( done:{ ():void, fail:() => void } ):void => {

				createResponse( ( response:Response.Class ) => {

					expect( response ).toBeDefined();
					expect( response instanceof Response.Class ).toBe( true );

					done();
				}, done.fail );

			} );

			it( hasSignature(
				"Signature that only works when working in Node.js.", [
					{name: "request", type: "ClientRequest"},
					{name: "data", type: "string"},
					{name: "response", type: "IncomingMessage"}
				] ), ( done:{ ():void, fail:() => void } ):void => {

				createResponse( ( response:Response.Class ) => {

					expect( response ).toBeDefined();
					expect( response instanceof Response.Class ).toBe( true );

					done();
				}, done.fail );

			} );

		} );


		it( hasProperty(
			INSTANCE,
			"status",
			"number",
			"The status code returned by the request"
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse( ( response:Response.Class ) => {

				expect( response.status ).toBeDefined();
				expect( Utils.isNumber( response.status ) ).toBe( true );

				expect( response.status ).toBe( rawResponse.status );

				done();
			}, done.fail );

		} );

		it( hasProperty(
			INSTANCE,
			"data",
			"string",
			"The body returned by the request"
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse( ( response:Response.Class ) => {

				expect( response.data ).toBeDefined();
				expect( Utils.isString( response.data ) ).toBe( true );

				expect( response.data ).toBe( rawResponse.responseText );

				done();
			}, done.fail );
		} );

		it( hasProperty(
			INSTANCE,
			"headers",
			"Map<string, Carbon.HTTP.Header.Class>",
			"A map object containing the headers returned by the request"
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse( ( response:Response.Class ) => {

				expect( response.headers ).toBeDefined();
				expect( Utils.isMap( response.headers ) ).toBe( true );

				let objectKeys:Array<string> = Object.keys( rawResponse.responseHeaders );
				expect( response.headers.size ).toBe( objectKeys.length );
				for( let header of objectKeys ) {
					expect( response.getHeader( header ) ).toEqual( new Header.Class( rawResponse.responseHeaders[ header ] ) );
				}

				done();
			}, done.fail );

		} );

		it( hasProperty(
			INSTANCE,
			"request",
			"XMLHttpRequest | ClientRequest",
			"The XMLHttpRequest object that was provided in the constructor when working in a Browser, or The ClientRequest object when working with Node.js."
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse( ( response:Response.Class, request:XMLHttpRequest | ClientRequest ) => {

				expect( response.request ).toBeDefined();

				if( inXMLHttpRequest )
					expect( response.request instanceof XMLHttpRequest ).toBe( true );
				else
					expect( response.request instanceof require( "http" ).ClientRequest ).toBe( true );

				expect( response.request ).toBe( request );

				done();
			}, done.fail );

		} );

		it( hasMethod(
			INSTANCE,
			"getHeader",
			"Return the Header object referred by the name provided.", [
				{name: "name", type: "string"}
			],
			{type: "Carbon.HTTP.Header.Class"}
		), ( done:{ ():void, fail:() => void } ):void => {

			createResponse( ( response:Response.Class ) => {

				expect( response.getHeader ).toBeDefined();
				expect( Utils.isFunction( response.getHeader ) ).toBe( true );

				let header:Header.Class = response.getHeader( "Content-Type" );
				expect( header instanceof Header.Class ).toBe( true );

				done();
			}, done.fail );

		} );

		function createResponse( callback:( response:Response.Class, request?:XMLHttpRequest | ClientRequest ) => void, fail:( any?:any ) =>  void ) {
			if( inXMLHttpRequest ) {
				let request:XMLHttpRequest = new XMLHttpRequest();
				request.open( "GET", "http://example.com/request/" );
				request.onerror = fail;

				request.onload = () => {
					let response = new Response.Class( <XMLHttpRequest> request );
					callback( response, request );
				};

				request.send();

			} else {
				let http:any = require( "http" );
				let request:ClientRequest = http.request( {
					method: "GET",
					protocol: "http:",
					host: "example.com",
					path: "/request/"
				}, ( res:IncomingMessage ) => {
					res.setEncoding( "utf8" );
					res.on( "data", ( data ) => {
						let response = new Response.Class( <ClientRequest> request, data, res );
						callback( response, request )
					} );
				} );

				request.on( "error", fail );
				request.end();
			}
		}

	} );

	describe( clazz(
		"Carbon.HTTP.Response.Util",
		"Class with useful methods to use with a `Carbon.HTTP.Response.Class` object"
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
			"Return the ETag string header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists", [
				{name: "response", type: "Carbon.HTTP.Response.Class"}
			],
			{type: "string"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( Response.Util.getETag ).toBeDefined();
			expect( Utils.isFunction( Response.Util.getETag ) ).toBe( true );

			let promises:Promise<void>[] = [];

			promises.push( createResponse( "full/", ( response:Response.Class ):void => {
				expect( Response.Util.getETag( response ) ).toBe( rawResponse.responseHeaders[ "ETag" ] );
			} ) );

			promises.push( createResponse( "empty/", ( response:Response.Class ):void => {
				expect( Response.Util.getETag( response ) ).toBeNull();
			} ) );

			Promise.all( promises ).then( done ).catch( done.fail );
		} );

		function createResponse( type:string, callback:( response:Response.Class ) => void ):Promise<void> {
			return new Promise<void>( ( resolve, reject ) => {
				if( inXMLHttpRequest ) {
					let request:XMLHttpRequest = new XMLHttpRequest();
					request.open( "GET", "http://example.com/request/" + type );
					request.onerror = reject;

					request.onload = () => {
						let response = new Response.Class( <XMLHttpRequest> request );
						callback( response );
						resolve();
					};

					request.send();

				} else {
					let http:any = require( "http" );
					let request:ClientRequest = http.request( {
						method: "GET",
						protocol: "http:",
						host: "example.com",
						path: "/request/" + type
					}, ( res:IncomingMessage ) => {
						let data:string = "";
						res.setEncoding( "utf8" );
						res.on( "data", ( chunk ) => {
							data = chunk;
						} );
						res.on( "end", () => {
							let response = new Response.Class( <ClientRequest> request, data, res );
							callback( response );
							resolve();
						} );
					} );

					request.on( "error", reject );
					request.end();
				}
			} );
		}

	} );

	it( hasDefaultExport(
		"Carbon.HTTP.Response.Class"
	), ():void => {
		expect( DefaultExport ).toBe( Response.Class );
	} );

} );
