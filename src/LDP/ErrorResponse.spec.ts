import {
	clazz,
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import { ErrorResponse } from "./ErrorResponse";

describe( module( "carbonldp/LDP/ErrorResponse" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.ErrorResponse.ErrorResponse",
		"Interface that its used to represents part of an error (or multiple of them) thrown by the server."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource.Resource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"errors",
			"CarbonLDP.LDP.Error.Error[]",
			"Array that list the error occurred in the server."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"requestID",
			"string",
			"An ID that identifies the request which cause the error."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"statusCode",
			"number",
			"The HTTP status code that represents all the errors occurred."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.ErrorResponse.ErrorResponseFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.ErrorResponse.ErrorResponse` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getMessage",
			"Returns a string with the message of all the errors in the ErrorResponse.", [
				{ name: "errorResponse", type: "CarbonLDP.LDP.ErrorResponse.ErrorResponse", description: "The ErrorResponse object to obtain the message from." },
			],
			{ type: "string" }
		), ():void => {} );

	} );

	describe( clazz(
		"CarbonLDP.LDP.ErrorResponse.ErrorResponseFactory",
		"Useful functions for managing `CarbonLDP.LDP.ErrorResponse.ErrorResponse` objects."
	), ():void => {

		it( "should exist", ():void => {
			expect( ErrorResponse ).toBeDefined();
			expect( ErrorResponse ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ErrorResponse.TYPE", ():void => {
			expect( ErrorResponse.TYPE ).toBeDefined();
			expect( Utils.isString( ErrorResponse.TYPE ) ).toBe( true );

			expect( ErrorResponse.TYPE ).toBe( C.ErrorResponse );
		} );

		// TODO: Separate in different tests
		it( "ErrorResponse.SCHEMA", ():void => {
			expect( ErrorResponse.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ErrorResponse.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( ErrorResponse.SCHEMA, "errors" ) ).toBe( true );
			expect( ErrorResponse.SCHEMA[ "errors" ] ).toEqual( {
				"@id": C.error,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( ErrorResponse.SCHEMA, "requestID" ) ).toBe( true );
			expect( ErrorResponse.SCHEMA[ "requestID" ] ).toEqual( {
				"@id": C.requestID,
				"@type": XSD.string,
			} );

			expect( Utils.hasProperty( ErrorResponse.SCHEMA, "statusCode" ) ).toBe( true );
			expect( ErrorResponse.SCHEMA[ "statusCode" ] ).toEqual( {
				"@id": C.httpStatusCode,
				"@type": XSD.int,
			} );
		} );

		// TODO: Separate in different tests
		it( "ErrorResponse.getMessage", ():void => {
			expect( ErrorResponse.getMessage ).toBeDefined();
			expect( Utils.isFunction( ErrorResponse.getMessage ) ).toBe( true );

			let errorResponse:ErrorResponse;
			let message:string;

			errorResponse = <any> {
				statusCode: 1234567890,
				errors: [
					{
						errorCode: "code-01",
						errorMessage: "Message 01",
					},
				],
			};
			message = ErrorResponse.getMessage( errorResponse );
			expect( Utils.isString( message ) ).toBe( true );
			expect( message ).toBe( "Message 01" );

			errorResponse = <any> {
				statusCode: 1234567890,
				errors: [
					{
						errorCode: "code-01",
						errorMessage: "Message 01",
					},
					{
						errorCode: "code-02",
						errorMessage: "Message 02",
					},
				],
			};
			message = ErrorResponse.getMessage( errorResponse );
			expect( Utils.isString( message ) ).toBe( true );
			expect( message ).toBe( "Message 01, Message 02" );
		} );

	} );

} );
