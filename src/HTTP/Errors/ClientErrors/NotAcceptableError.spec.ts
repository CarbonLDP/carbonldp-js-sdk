import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { NotAcceptableError } from "./NotAcceptableError";


describe( "NotAcceptableError", () => {

	it( "should exist", () => {
		expect( NotAcceptableError ).toBeDefined();
		expect( NotAcceptableError ).toEqual( jasmine.any( Function ) );
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
		const error:NotAcceptableError = new NotAcceptableError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have NotAcceptableError as name", () => {
		const error:NotAcceptableError = new NotAcceptableError( "The message", response );
		expect( error.name ).toEqual( "NotAcceptableError" );
	} );

	it( "should have statusCode as `406`", () => {
		expect( NotAcceptableError.statusCode ).toBe( 406 );
	} );

} );
