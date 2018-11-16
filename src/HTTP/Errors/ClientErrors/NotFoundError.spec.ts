import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { NotFoundError } from "./NotFoundError";


describe( "NotFoundError", () => {

	it( "should exists", () => {
		expect( NotFoundError ).toBeDefined();
		expect( NotFoundError ).toEqual( jasmine.any( Function ) );
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
		const error:NotFoundError = new NotFoundError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have NotFoundError as name", () => {
		const error:NotFoundError = new NotFoundError( "The message", response );
		expect( error.name ).toEqual( "NotFoundError" );
	} );

	it( "should have statusCode as `404`", () => {
		expect( NotFoundError.statusCode ).toBe( 404 );
	} );

} );
