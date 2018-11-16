import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { BadGatewayError } from "./BadGatewayError";


describe( "BadGatewayError", () => {

	it( "should exists", () => {
		expect( BadGatewayError ).toBeDefined();
		expect( BadGatewayError ).toEqual( jasmine.any( Function ) );
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
		const error:BadGatewayError = new BadGatewayError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have BadGatewayError as name", () => {
		const error:BadGatewayError = new BadGatewayError( "The message", response );
		expect( error.name ).toEqual( "BadGatewayError" );
	} );

	it( "should have statusCode as `502`", () => {
		expect( BadGatewayError.statusCode ).toBe( 502 );
	} );

} );
