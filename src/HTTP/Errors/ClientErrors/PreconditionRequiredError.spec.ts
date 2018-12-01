import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { PreconditionRequiredError } from "./PreconditionRequiredError";


describe( "PreconditionRequiredError", () => {

	it( "should exist", () => {
		expect( PreconditionRequiredError ).toBeDefined();
		expect( PreconditionRequiredError ).toEqual( jasmine.any( Function ) );
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
		const error:PreconditionRequiredError = new PreconditionRequiredError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have PreconditionRequiredError as name", () => {
		const error:PreconditionRequiredError = new PreconditionRequiredError( "The message", response );
		expect( error.name ).toEqual( "PreconditionRequiredError" );
	} );

	it( "should have statusCode as `428`", () => {
		expect( PreconditionRequiredError.statusCode ).toBe( 428 );
	} );

} );
