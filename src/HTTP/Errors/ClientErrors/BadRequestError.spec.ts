import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { BadRequestError } from "./BadRequestError";


describe( "BadRequestError", () => {

	it( "should exist", () => {
		expect( BadRequestError ).toBeDefined();
		expect( BadRequestError ).toEqual( jasmine.any( Function ) );
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
		const error:BadRequestError = new BadRequestError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have BadRequestError as name", () => {
		const error:BadRequestError = new BadRequestError( "The message", response );
		expect( error.name ).toEqual( "BadRequestError" );
	} );

	it( "should have statusCode as `400`", () => {
		expect( BadRequestError.statusCode ).toBe( 400 );
	} );

} );
