import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { NotImplementedError } from "./NotImplementedError";


describe( "NotImplementedError", () => {

	it( "should exist", () => {
		expect( NotImplementedError ).toBeDefined();
		expect( NotImplementedError ).toEqual( jasmine.any( Function ) );
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
		const error:NotImplementedError = new NotImplementedError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have NotImplementedError as name", () => {
		const error:NotImplementedError = new NotImplementedError( "The message", response );
		expect( error.name ).toEqual( "NotImplementedError" );
	} );

	it( "should have statusCode as `501`", () => {
		expect( NotImplementedError.statusCode ).toBe( 501 );
	} );

} );
