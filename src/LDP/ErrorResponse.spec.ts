import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasProperty,
	hasMethod,
	extendsClass,
	hasDefaultExport,
} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Utils from "./../Utils";
import IllegalArgumentError from "../Errors/IllegalArgumentError";

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

		expect( ErrorResponse.RDF_CLASS ).toBe( NS.C.Class.ErrorResponse );
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
			"@id": NS.C.Predicate.error,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( ErrorResponse.SCHEMA, "requestID" ) ).toBe( true );
		expect( ErrorResponse.SCHEMA[ "requestID" ] ).toEqual( {
			"@id": NS.C.Predicate.requestID,
			"@type": NS.XSD.DataType.string,
		} );

		expect( Utils.hasProperty( ErrorResponse.SCHEMA, "statusCode" ) ).toBe( true );
		expect( ErrorResponse.SCHEMA[ "statusCode" ] ).toEqual( {
			"@id": NS.C.Predicate.httpStatusCode,
			"@type": NS.XSD.DataType.int,
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
		"Carbon.LDP.ErrorResponse.Parser",
		"Parser class for `Carbon.LDP.ErrorResponse.Class` objects.", [
			"Carbon.HTTP.Parser.Class<Carbon.LDP.ErrorResponse.Class>",
		]
	), ():void => {
		let parser:ErrorResponse.Parser;

		beforeEach( ():void => {
			parser = new ErrorResponse.Parser();
		} );

		it( isDefined(), ():void => {
			expect( ErrorResponse.Parser ).toBeDefined();
			expect( Utils.isFunction( ErrorResponse.Parser ) ).toBe( true );

			expect( parser ).toBeTruthy();
			expect( parser instanceof ErrorResponse.Parser ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"parse",
			"Parse the string data provided and create a `Carbon.LDP.ErrorResponse.Class` object.", [
				{ name: "data", type: "string", description: "The json-ld string, which represents an error response from a Carbon server." },
				{ name: "object", type: "Object", description: "The object to use as a base when parsing the ErrorResponse object", defaultValue: "{}" },
			],
			{ type: "Promise<Carbon.LDP.ErrorResponse.Class>" }
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let data:string;
			let promise:Promise<any>;
			let promises:Promise<any>[] = [];
			let spies:any = {
				success: ( errorResponse:ErrorResponse.Class ):void => {
					expect( errorResponse ).toBeDefined();
					expect( errorResponse.statusCode ).toBe( 1234567890 );
					expect( errorResponse.errors ).toBeDefined();
					expect( errorResponse.errors.length ).toBe( 2 );
					errorResponse.errors.forEach( ( error, index ) => {
						expect( error.errorCode ).toBe( `code-0${ index + 1 }` );
						expect( error.errorMessage ).toBe( `Message 0${ index + 1 }` );

						expect( error.errorParameters.entries ).toBeDefined();
						error.errorParameters.entries.forEach( entry => {
							expect( entry.entryKey ).toBe( "document" );
							expect( entry.entryValue.id ).toEqual( "https://example.com/target-document/" );
						} );
					} );
				},
				fail: ( error:Error ):void => {
					expect( error ).toEqual( jasmine.any( Error ) );
				},
				failData: ( error:Error ):void => {
					expect( error ).toEqual( jasmine.any( IllegalArgumentError ) );
				},
			};
			let spySuccess:jasmine.Spy = spyOn( spies, "success" ).and.callThrough();
			let spyFail:jasmine.Spy = spyOn( spies, "fail" ).and.callThrough();

			data = `[ {
				"@id": "_:1",
				"@type": [ "${ NS.C.Class.ErrorResponse }" ],
				"${ NS.C.Predicate.error }": [ {
					"@id": "_:2"
				}, {
					"@id": "_:3"
				} ],
				"${ NS.C.Predicate.httpStatusCode }": [ {
					"@type": "${ NS.XSD.DataType.int }",
					"@value": "1234567890"
				} ]
			}, {
				"@id": "_:2",
				"@type": [ "${ NS.C.Class.Error }" ],
				"${ NS.C.Predicate.errorCode }": [ {
					"@value": "code-01"
				} ],
				"${ NS.C.Predicate.errorMessage }": [ {
					"@value": "Message 01"
				} ],
				"${ NS.C.Predicate.errorParameters }": [ {
						"@id": "_:4"
				} ]
			}, {
				"@id": "_:3",
				"@type": [ "${ NS.C.Class.Error }" ],
				"${ NS.C.Predicate.errorCode }": [ {
					"@language": "en",
					"@value": "code-02"
				} ],
				"${ NS.C.Predicate.errorMessage }": [ {
					"@language": "en",
					"@value": "Message 02"
				} ],
				"${ NS.C.Predicate.errorParameters }": [ {
						"@id": "_:6"
				} ]
			}, {
				"@id": "_:4",
				"@type": [ "${ NS.C.Class.Map }" ],
				"${ NS.C.Predicate.entry }": [ {
					"@id": "_:5"
				} ]
			}, {
				"@id": "_:5",
				"${ NS.C.Predicate.entryKey }": [ {
					"@value": "document"
				} ],
				"${ NS.C.Predicate.entryValue }": [ {
					"@id": "https://example.com/target-document/"
				} ]
			}, {
				"@id": "_:6",
				"@type": [ "${ NS.C.Class.Map }" ],
				"${ NS.C.Predicate.entry }": [ {
					"@id": "_:7"
				} ]
			}, {
				"@id": "_:7",
				"${ NS.C.Predicate.entryKey }": [ {
					"@value": "document"
				} ],
				"${ NS.C.Predicate.entryValue }": [ {
					"@id": "https://example.com/target-document/"
				} ]
			} ]`;

			promise = parser.parse( data );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			promise = parser.parse( "" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			promise = parser.parse( "!@#$%^&*(" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			data = `[ {
				"@id": "_:1",
				"@type": [ "${ NS.C.Class.ErrorResponse }" ],
				"${ NS.C.Predicate.error }": [],
				"${ NS.C.Predicate.httpStatusCode }": [ {
					"@type": "http://www.w3.org/2001/XMLSchema#int",
					"@value": "1234567890"
				} ]
			}, {
				"@id": "_:2",
				"@type": [ "${ NS.C.Class.ErrorResponse }" ],
				"${ NS.C.Predicate.error }": [],
				"${ NS.C.Predicate.httpStatusCode }": [ {
					"@type": "http://www.w3.org/2001/XMLSchema#int",
					"@value": "0987654321"
				} ]
			} ]`;
			promise = parser.parse( data );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.failData ) );

			data = `[ {
				"@id": "_:3",
				"@type": [ "${ NS.C.Class.Error }" ],
				"${ NS.C.Predicate.errorCode }": [ {
					"@value": "code-02"
				} ],
				"${ NS.C.Predicate.errorMessage }": [ {
					"@value": "Message 02"
				} ],
				"${ NS.C.Predicate.errorParameters }": [ {
					"@id": "_:4"
				} ]
			}, {
				"@id": "_:4",
				"@type": [ "${ NS.C.Class.Map }" ],
				"${ NS.C.Predicate.entry }": [ {
					"@id": "_:5"
				} ]
			}, {
				"@id": "_:5",
				"${ NS.C.Predicate.entryKey }": [ {
					"@value": "document"
				} ],
				"${ NS.C.Predicate.entryValue }": [ {
					"@id": "https://example.com/target-document/"
				} ]
			} ]`;
			promise = parser.parse( data );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.failData ) );

			Promise.all( promises ).then( () => {
				expect( spySuccess ).toHaveBeenCalledTimes( 1 );
				expect( spyFail ).toHaveBeenCalledTimes( 2 );
				done();
			} ).catch( done.fail );
		} );

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
