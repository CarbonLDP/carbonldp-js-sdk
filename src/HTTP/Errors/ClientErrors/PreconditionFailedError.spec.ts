import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { PreconditionFailedError } from "./PreconditionFailedError";


describe( "PreconditionFailedError", () => {

	it( "should exists", () => {
		expect( PreconditionFailedError ).toBeDefined();
		expect( PreconditionFailedError ).toEqual( jasmine.any( Function ) );
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
		const error:PreconditionFailedError = new PreconditionFailedError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have PreconditionFailedError as name", () => {
		const error:PreconditionFailedError = new PreconditionFailedError( "The message", response );
		expect( error.name ).toEqual( "PreconditionFailedError" );
	} );

	it( "should have statusCode as `412`", () => {
		expect( PreconditionFailedError.statusCode ).toBe( 412 );
	} );

} );
