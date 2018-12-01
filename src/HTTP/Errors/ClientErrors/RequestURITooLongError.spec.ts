import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { RequestURITooLongError } from "./RequestURITooLongError";


describe( "RequestURITooLongError", () => {

	it( "should exist", () => {
		expect( RequestURITooLongError ).toBeDefined();
		expect( RequestURITooLongError ).toEqual( jasmine.any( Function ) );
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
		const error:RequestURITooLongError = new RequestURITooLongError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have RequestURITooLongError as name", () => {
		const error:RequestURITooLongError = new RequestURITooLongError( "The message", response );
		expect( error.name ).toEqual( "RequestURITooLongError" );
	} );

	it( "should have statusCode as `414`", () => {
		expect( RequestURITooLongError.statusCode ).toBe( 414 );
	} );

} );
