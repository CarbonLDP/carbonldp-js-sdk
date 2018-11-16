import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { UnsupportedMediaTypeError } from "./UnsupportedMediaTypeError";


describe( "UnsupportedMediaTypeError", () => {

	it( "should exists", () => {
		expect( UnsupportedMediaTypeError ).toBeDefined();
		expect( UnsupportedMediaTypeError ).toEqual( jasmine.any( Function ) );
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
		const error:UnsupportedMediaTypeError = new UnsupportedMediaTypeError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have UnsupportedMediaTypeError as name", () => {
		const error:UnsupportedMediaTypeError = new UnsupportedMediaTypeError( "The message", response );
		expect( error.name ).toEqual( "UnsupportedMediaTypeError" );
	} );

	it( "should have statusCode as `415`", () => {
		expect( UnsupportedMediaTypeError.statusCode ).toBe( 415 );
	} );

} );
