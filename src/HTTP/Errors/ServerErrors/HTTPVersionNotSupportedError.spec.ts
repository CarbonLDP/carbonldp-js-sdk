import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { InternalServerErrorError } from "./InternalServerErrorError";


describe( "InternalServerErrorError", () => {

	it( "should exists", () => {
		expect( InternalServerErrorError ).toBeDefined();
		expect( InternalServerErrorError ).toEqual( jasmine.any( Function ) );
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
		const error:InternalServerErrorError = new InternalServerErrorError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have InternalServerErrorError as name", () => {
		const error:InternalServerErrorError = new InternalServerErrorError( "The message", response );
		expect( error.name ).toEqual( "InternalServerErrorError" );
	} );

	it( "should have statusCode as `500`", () => {
		expect( InternalServerErrorError.statusCode ).toBe( 500 );
	} );

} );
