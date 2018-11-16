import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { TooManyRequestsError } from "./TooManyRequestsError";


describe( "TooManyRequestsError", () => {

	it( "should exists", () => {
		expect( TooManyRequestsError ).toBeDefined();
		expect( TooManyRequestsError ).toEqual( jasmine.any( Function ) );
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
		const error:TooManyRequestsError = new TooManyRequestsError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have TooManyRequestsError as name", () => {
		const error:TooManyRequestsError = new TooManyRequestsError( "The message", response );
		expect( error.name ).toEqual( "TooManyRequestsError" );
	} );

	it( "should have statusCode as `429`", () => {
		expect( TooManyRequestsError.statusCode ).toBe( 429 );
	} );

} );
