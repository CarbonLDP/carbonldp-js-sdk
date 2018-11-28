import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { ForbiddenError } from "./ForbiddenError";


describe( "ForbiddenError", () => {

	it( "should exist", () => {
		expect( ForbiddenError ).toBeDefined();
		expect( ForbiddenError ).toEqual( jasmine.any( Function ) );
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
		const error:ForbiddenError = new ForbiddenError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have ForbiddenError as name", () => {
		const error:ForbiddenError = new ForbiddenError( "The message", response );
		expect( error.name ).toEqual( "ForbiddenError" );
	} );

	it( "should have statusCode as `403`", () => {
		expect( ForbiddenError.statusCode ).toBe( 403 );
	} );

} );
