import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { RequestHeaderFieldsTooLargeError } from "./RequestHeaderFieldsTooLargeError";


describe( "RequestHeaderFieldsTooLargeError", () => {

	it( "should exists", () => {
		expect( RequestHeaderFieldsTooLargeError ).toBeDefined();
		expect( RequestHeaderFieldsTooLargeError ).toEqual( jasmine.any( Function ) );
	} );

	let response:Response;
	beforeAll( ( done ) => {
		jasmine.Ajax.install();
		jasmine.Ajax.stubRequest( "http://example.com/request/" ).andReturn( {
			"status": 200,
			"responseText": "A response",
		} );

		RequestService
			.send( "GET", "http://example.com/request/" )
			.then( ( _response ) => {
				response = _response;
				done();
			} )
			.catch( done.fail );
	} );

	afterAll( () => {
		jasmine.Ajax.uninstall();
	} );


	it( "should extend from HTTError", () => {
		const error:RequestHeaderFieldsTooLargeError = new RequestHeaderFieldsTooLargeError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have RequestHeaderFieldsTooLargeError as name", () => {
		const error:RequestHeaderFieldsTooLargeError = new RequestHeaderFieldsTooLargeError( "The message", response );
		expect( error.name ).toEqual( "RequestHeaderFieldsTooLargeError" );
	} );

	it( "should have statusCode as `431`", () => {
		expect( RequestHeaderFieldsTooLargeError.statusCode ).toBe( 431 );
	} );

} );
