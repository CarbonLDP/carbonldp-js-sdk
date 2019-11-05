import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { ErrorResponse } from "./ErrorResponse";


describe( "ErrorResponse", () => {

	it( "should exist", () => {
		expect( ErrorResponse ).toBeDefined();
		expect( ErrorResponse ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "ErrorResponse.TYPE", () => {

			it( "should exist", () => {
				expect( ErrorResponse.TYPE ).toBeDefined();
				expect( ErrorResponse.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:ErrorResponse`", () => {
				expect( ErrorResponse.TYPE ).toBe( C.ErrorResponse );
			} );

		} );

		describe( "ErrorResponse.SCHEMA", () => {

			it( "should exist", () => {
				expect( ErrorResponse.SCHEMA ).toBeDefined();
				expect( ErrorResponse.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( ErrorResponse.SCHEMA ).toEqual( {
					errors: jasmine.any( Object ),
					requestID: jasmine.any( Object ),
					statusCode: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `errors`", () => {
				expect( ErrorResponse.SCHEMA[ "errors" ] ).toEqual( {
					"@id": C.error,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

			it( "should have specified `requestID`", () => {
				expect( ErrorResponse.SCHEMA[ "requestID" ] ).toEqual( {
					"@id": C.requestID,
					"@type": XSD.string,
				} );
			} );

			it( "should have specified `statusCode`", () => {
				expect( ErrorResponse.SCHEMA[ "statusCode" ] ).toEqual( {
					"@id": C.httpStatusCode,
					"@type": XSD.int,
				} );
			} );

		} );

		describe( "ErrorResponse.getMessage", () => {

			it( "should exist", () => {
				expect( ErrorResponse.getMessage ).toBeDefined();
				expect( ErrorResponse.getMessage ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return message from one error", () => {
				const errorResponse:ErrorResponse = <any> {
					statusCode: 1234567890,
					errors: [
						{
							errorCode: "code-01",
							errorMessage: "Message 01",
						},
					],
				};

				const message:string = ErrorResponse.getMessage( errorResponse );
				expect( message ).toBe( "Message 01" );
			} );

			it( "should return message from multiple errors", () => {
				const errorResponse:ErrorResponse = <any> {
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

				const message:string = ErrorResponse.getMessage( errorResponse );
				expect( message ).toBe( "Message 01, Message 02" );
			} );

		} );

	} );

} );
