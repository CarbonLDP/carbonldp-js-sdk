import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { BadResponseError } from "./BadResponseError";


describe( "BadResponseError", () => {

	it( "should exist", () => {
		expect( BadResponseError ).toBeDefined();
		expect( BadResponseError ).toEqual( jasmine.any( Function ) );
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
		const error:BadResponseError = new BadResponseError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have BadResponseError as name", () => {
		const error:BadResponseError = new BadResponseError( "The message", response );
		expect( error.name ).toEqual( "BadResponseError" );
	} );

	it( "should have statusCode as `0`", () => {
		expect( BadResponseError.statusCode ).toBe( 0 );
	} );

} );
