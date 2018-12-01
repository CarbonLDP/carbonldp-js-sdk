import { AbstractError } from "../../Errors";

import { RequestService } from "../Request";
import { Response } from "../Response";

import { HTTPError } from "./HTTPError";

describe( "HTTPError", () => {

	it( "should exist", () => {
		expect( HTTPError ).toBeDefined();
		expect( HTTPError ).toEqual( jasmine.any( Function ) );
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


	it( "should extend from AbstractError", () => {
		const error:HTTPError = new HTTPError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should be instantiable", () => {
		const error:HTTPError = new HTTPError( "Message of the error", response );
		expect( error ).toEqual( jasmine.any( HTTPError ) );
	} );

	it( "should have HTTPError as name", () => {
		const error:HTTPError = new HTTPError( "This is the message", response );
		expect( error.name ).toEqual( "HTTPError" );
	} );

	it( "should have statusCode as `null`", () => {
		expect( HTTPError.statusCode ).toBeNull();
	} );

	it( "should initialize response with provided", () => {
		const error:HTTPError = new HTTPError( "Message of the error", response );
		expect( error.response ).toBe( response );
	} );

} );
