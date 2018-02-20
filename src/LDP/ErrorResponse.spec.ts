import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import * as ErrorResponse from "./ErrorResponse";
import DefaultExport from "./ErrorResponse";

describe( module( "Carbon/LDP/ErrorResponse" ), ():void => {

	it( isDefined(), ():void => {
		expect( ErrorResponse ).toBeDefined();
		expect( Utils.isObject( ErrorResponse ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ErrorResponse.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ErrorResponse.RDF_CLASS ) ).toBe( true );

		expect( ErrorResponse.RDF_CLASS ).toBe( C.ErrorResponse );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.LDP.ErrorResponse.Class",
		"Interface that its used to represents part of an error (or multiple of them) thrown by the server."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"errors",
			"Carbon.LDP.Error.Class[]",
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

	describe( clazz(
		"Carbon.LDP.ErrorResponse.Util",
		"Useful functions for managing `Carbon.LDP.ErrorResponse.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ErrorResponse.Util ).toBeDefined();
			expect( Utils.isFunction( ErrorResponse.Util ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"getMessage",
			"Returns a string with the message of all the errors in the ErrorResponse.", [
				{ name: "errorResponse", type: "Carbon.LDP.ErrorResponse.Class", description: "The ErrorResponse object to obtain the message from." },
			],
			{ type: "string" }
		), ():void => {
			expect( ErrorResponse.Util.getMessage ).toBeDefined();
			expect( Utils.isFunction( ErrorResponse.Util.getMessage ) ).toBe( true );

			let errorResponse:ErrorResponse.Class;
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
			message = ErrorResponse.Util.getMessage( errorResponse );
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
			message = ErrorResponse.Util.getMessage( errorResponse );
			expect( Utils.isString( message ) ).toBe( true );
			expect( message ).toBe( "Message 01, Message 02" );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.ErrorResponse.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:ErrorResponse.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
