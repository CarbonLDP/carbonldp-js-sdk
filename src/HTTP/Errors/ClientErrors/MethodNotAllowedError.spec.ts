import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { MethodNotAllowedError } from "./MethodNotAllowedError";


describe( "MethodNotAllowedError", () => {

	it( "should exists", () => {
		expect( MethodNotAllowedError ).toBeDefined();
		expect( MethodNotAllowedError ).toEqual( jasmine.any( Function ) );
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
		const error:MethodNotAllowedError = new MethodNotAllowedError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have MethodNotAllowedError as name", () => {
		const error:MethodNotAllowedError = new MethodNotAllowedError( "The message", response );
		expect( error.name ).toEqual( "MethodNotAllowedError" );
	} );

	it( "should have statusCode as `405`", () => {
		expect( MethodNotAllowedError.statusCode ).toBe( 405 );
	} );

} );
