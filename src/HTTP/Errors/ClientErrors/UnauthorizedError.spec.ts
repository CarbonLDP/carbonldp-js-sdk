import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { UnauthorizedError } from "./UnauthorizedError";


describe( "UnauthorizedError", () => {

	it( "should exists", () => {
		expect( UnauthorizedError ).toBeDefined();
		expect( UnauthorizedError ).toEqual( jasmine.any( Function ) );
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
		const error:UnauthorizedError = new UnauthorizedError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have UnauthorizedError as name", () => {
		const error:UnauthorizedError = new UnauthorizedError( "The message", response );
		expect( error.name ).toEqual( "UnauthorizedError" );
	} );

	it( "should have statusCode as `401`", () => {
		expect( UnauthorizedError.statusCode ).toBe( 401 );
	} );

} );
