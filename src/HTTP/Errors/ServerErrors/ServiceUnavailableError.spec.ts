import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { ServiceUnavailableError } from "./ServiceUnavailableError";


describe( "ServiceUnavailableError", () => {

	it( "should exist", () => {
		expect( ServiceUnavailableError ).toBeDefined();
		expect( ServiceUnavailableError ).toEqual( jasmine.any( Function ) );
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
		const error:ServiceUnavailableError = new ServiceUnavailableError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have ServiceUnavailableError as name", () => {
		const error:ServiceUnavailableError = new ServiceUnavailableError( "The message", response );
		expect( error.name ).toEqual( "ServiceUnavailableError" );
	} );

	it( "should have statusCode as `503`", () => {
		expect( ServiceUnavailableError.statusCode ).toBe( 503 );
	} );

} );
