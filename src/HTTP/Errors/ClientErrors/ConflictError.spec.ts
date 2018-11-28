import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { ConflictError } from "./ConflictError";


describe( "ConflictError", () => {

	it( "should exist", () => {
		expect( ConflictError ).toBeDefined();
		expect( ConflictError ).toEqual( jasmine.any( Function ) );
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
		const error:ConflictError = new ConflictError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have ConflictError as name", () => {
		const error:ConflictError = new ConflictError( "The message", response );
		expect( error.name ).toEqual( "ConflictError" );
	} );

	it( "should have statusCode as `409`", () => {
		expect( ConflictError.statusCode ).toBe( 409 );
	} );

} );
