import { RequestService } from "../Request";
import { Response } from "../Response";

import { HTTPError } from "./HTTPError";
import { UnknownError } from "./UnknownError";


describe( "UnknownError", () => {

	it( "should exists", () => {
		expect( UnknownError ).toBeDefined();
		expect( UnknownError ).toEqual( jasmine.any( Function ) );
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
		const error:UnknownError = new UnknownError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have UnknownError as name", () => {
		const error:UnknownError = new UnknownError( "This is the message", response );
		expect( error.name ).toEqual( "UnknownError" );
	} );

	it( "should have statusCode as `null`", () => {
		expect( UnknownError.statusCode ).toBeNull();
	} );

} );
