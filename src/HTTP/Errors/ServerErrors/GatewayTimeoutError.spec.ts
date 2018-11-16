import { RequestService } from "../../Request";
import { Response } from "../../Response";

import { HTTPError } from "../HTTPError";

import { GatewayTimeoutError } from "./GatewayTimeoutError";


describe( "GatewayTimeoutError", () => {

	it( "should exists", () => {
		expect( GatewayTimeoutError ).toBeDefined();
		expect( GatewayTimeoutError ).toEqual( jasmine.any( Function ) );
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
		const error:GatewayTimeoutError = new GatewayTimeoutError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have GatewayTimeoutError as name", () => {
		const error:GatewayTimeoutError = new GatewayTimeoutError( "The message", response );
		expect( error.name ).toEqual( "GatewayTimeoutError" );
	} );

	it( "should have statusCode as `504`", () => {
		expect( GatewayTimeoutError.statusCode ).toBe( 504 );
	} );

} );
