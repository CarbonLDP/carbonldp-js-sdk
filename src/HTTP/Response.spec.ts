import { ClientRequest, IncomingMessage } from "http";

import { Header } from "./Header";
import { Response } from "./Response";


describe( "Response", () => {

	const rawResponse:JasmineAjaxRequestStubReturnOptions = {
		"status": 200,
		"responseText": "A body response",
		responseHeaders: {
			"Content-Type": "text/plain",
			"Server": "Apache/2.4.1 (Unix)",
			"ETag": 'W/"123456789"',
		},
	};
	beforeAll( () => {
		jasmine.Ajax.install();
		jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( rawResponse );
	} );

	afterAll( () => {
		jasmine.Ajax.uninstall();
	} );

	it( "should exist", () => {
		expect( Response ).toBeDefined();
		expect( Response ).toEqual( jasmine.any( Function ) );
	} );


	const inXMLHttpRequest:boolean = (typeof XMLHttpRequest !== "undefined");

	function createResponse( type:string = "" ):Promise<[ Response, XMLHttpRequest | ClientRequest ]> {
		return new Promise<any>( ( resolve, reject ) => {
			if( inXMLHttpRequest ) {
				let request:XMLHttpRequest = new XMLHttpRequest();
				request.open( "GET", "http://example.com/request/" + type );
				request.onerror = fail;

				request.onload = () => {
					let response:Response = new Response( <XMLHttpRequest>request );
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
						let response:Response = new Response( <ClientRequest>request, data, res );
						resolve( [ response, request ] );
					} );
				} );

				request.on( "error", reject );
				request.end();
			}
		} );
	}


	describe( "Response.constructor", () => {

		it( "should instantiate from respective environment", async () => {
			const [ response ] = await createResponse();

			expect( response ).toBeDefined();
			expect( response ).toEqual( jasmine.any( Response ) );
		} );


		it( "should assign status", async () => {
			const [ response ] = await createResponse();

			expect( response.status ).toBeDefined();
			expect( response.status ).toBe( rawResponse.status! );
		} );

		it( "should assign data", async () => {
			const [ response ] = await createResponse();

			expect( response.data ).toBeDefined();
			expect( response.data ).toBe( rawResponse.responseText! );
		} );

		it( "should assign headers", async () => {
			const [ response ] = await createResponse();

			expect( response.headers ).toBeDefined();
			for( const header of Object.keys( rawResponse.responseHeaders! ) ) {
				expect( response.getHeader( header ) ).toEqual( new Header( rawResponse.responseHeaders![ header ] ) );
			}
		} );

		it( "should assign request", async () => {
			const [ response, request ] = await createResponse();

			expect( response.request ).toBeDefined();
			expect( response.request ).toEqual( jasmine.any( inXMLHttpRequest ? XMLHttpRequest : ClientRequest ) );

			expect( response.request ).toBe( request );
		} );

	} );


	describe( "Response.getHeader", () => {

		it( "should exist", () => {
			expect( Response.prototype.getHeader ).toBeDefined();
			expect( Response.prototype.getHeader ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return specified header", async () => {
			const [ response ] = await createResponse();

			const header:Header | null = response.getHeader( "Content-Type" );
			expect( header ).toEqual( jasmine.any( Header ) );
		} );

	} );

	describe( "Response.getETag", () => {

		it( "should exist", () => {
			expect( Response.prototype.getETag ).toBeDefined();
			expect( Response.prototype.getETag ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return specified eTag", async () => {
			const [ response ] = await createResponse();

			const eTag:string = response.getETag();
			expect( eTag ).toBe( "W/\"123456789\"" );
		} );

	} );

} );
