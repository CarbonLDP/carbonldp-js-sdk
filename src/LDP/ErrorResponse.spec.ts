import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "../test/JasmineExtender";

import * as ErrorResponse from "./ErrorResponse";
import * as NS from "./../NS";
import * as Utils from "./../Utils";
import IllegalArgumentError from "../Errors/IllegalArgumentError";

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

	describe( clazz(
		"Carbon.LDP.ErrorResponse.Parser",
		"Parser class for `Carbon.LDP.ErrorResponse.Class` objects."
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
			"Parse the string data provided and create an `Carbon.LDP.ResponseError.Class` object.", [
				{name: "data", type: "string", description: "The json-ld string, which represents an error response from a Carbon server."},
				{name: "object", type: "Object", description: "The object to use as a base when parsing the ErrorResponse object", default: "{}"},
			],
			{type: "Promise<Carbon.LDP.ErrorResponse.Class>"}
		), ( done:{ ():void, fail:() => void } ):void => {
			expect( parser.parse ).toBeDefined();
			expect( Utils.isFunction( parser.parse ) ).toBe( true );

			let data:string;
			let promise:Promise<any>;
			let promises:Promise<any>[] = [];
			let spies = {
				success: ( errorResponse:ErrorResponse.Class ) => {
					expect( errorResponse ).toBeDefined();
					expect( errorResponse.statusCode ).toBe( 1234567890 );
					expect( errorResponse.errors ).toBeDefined();
					expect( errorResponse.errors.length ).toBe( 2 );
					expect( errorResponse.errors[ 0 ].carbonCode ).toBe( "code-01" );
					expect( errorResponse.errors[ 1 ].carbonCode ).toBe( "code-02" );
				},
				fail: ( error:Error ) => {
					expect( error instanceof Error ).toBe( true );
				},
				failData: ( error:Error ) => {
					expect( error instanceof IllegalArgumentError ).toBe( true );
				}
			};
			let spySuccess = spyOn( spies, "success" ).and.callThrough();
			let spyFail = spyOn( spies, "fail" ).and.callThrough();

			data = `[
				{
			        "@id": "_:1",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#ErrorResponse"
			        ],
			        "https://carbonldp.com/ns/v1/platform#error": [
			            {
			                "@id": "_:2"
			            },
			            {
			                "@id": "_:3"
			            }
			        ],
			        "https://carbonldp.com/ns/v1/platform#httpStatusCode": [
			            {
			                "@type": "http://www.w3.org/2001/XMLSchema#int",
			                "@value": "1234567890"
			            }
			        ]
			    },
			    {
			        "@id": "_:2",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#Error"
			        ],
			        "https://carbonldp.com/ns/v1/platform#carbonCode": [
			            {
			                "@value": "code-01"
			            }
			        ],
			        "https://carbonldp.com/ns/v1/platform#message": [
			            {
			                "@value": "Message 01"
			            }
			        ]
			    },
			    {
			        "@id": "_:3",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#Error"
			        ],
			        "https://carbonldp.com/ns/v1/platform#carbonCode": [
			            {
			                "@value": "code-02"
			            }
			        ],
			        "https://carbonldp.com/ns/v1/platform#message": [
			            {
			                "@value": "Message 02"
			            }
			        ]
			    }
			]`;

			promise = parser.parse( data );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.then( spies.success ) );

			promise = parser.parse( "" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			promise = parser.parse( "!@#$%^&*(" );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.fail ) );

			data = `[
			    {
			        "@id": "_:1",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#ErrorResponse"
			        ],
			        "https://carbonldp.com/ns/v1/platform#error": [
			        ],
			        "https://carbonldp.com/ns/v1/platform#httpStatusCode": [
			            {
			                "@type": "http://www.w3.org/2001/XMLSchema#int",
			                "@value": "1234567890"
			            }
			        ]
			    },{
			        "@id": "_:2",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#ErrorResponse"
			        ],
			        "https://carbonldp.com/ns/v1/platform#error": [
			        ],
			        "https://carbonldp.com/ns/v1/platform#httpStatusCode": [
			            {
			                "@type": "http://www.w3.org/2001/XMLSchema#int",
			                "@value": "0987654321"
			            }
			        ]
			    }
			]`;
			promise = parser.parse( data );
			expect( promise instanceof Promise ).toBe( true );
			promises.push( promise.catch( spies.failData ) );

			data = `[
			    {
			        "@id": "_:3",
			        "@type": [
			            "https://carbonldp.com/ns/v1/platform#Error"
			        ],
			        "https://carbonldp.com/ns/v1/platform#carbonCode": [
			            {
			                "@value": "code-02"
			            }
			        ],
			        "https://carbonldp.com/ns/v1/platform#message": [
			            {
			                "@value": "Message 02"
			            }
			        ]
			    }
			]`;
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
				{name: "errorResponse", type: "Carbon.LDP.ErrorResponse.Class", description: "The ErrorResponse object to obtain the message from."}
			],
			{type: "string"}
		), ():void => {
			expect( ErrorResponse.Util.getMessage ).toBeDefined();
			expect( Utils.isFunction( ErrorResponse.Util.getMessage ) ).toBe( true );

			let errorResponse:ErrorResponse.Class;
			let message:string;

			errorResponse = <any> {
				statusCode: 1234567890,
				errors: [
					{
						carbonCode: "code-01",
						message: "Message 01"
					}
				]
			};
			message = ErrorResponse.Util.getMessage( errorResponse );
			expect( Utils.isString( message ) ).toBe( true );
			expect( message ).toBe( "Message 01" );

			errorResponse = <any> {
				statusCode: 1234567890,
				errors: [
					{
						carbonCode: "code-01",
						message: "Message 01"
					},
					{
						carbonCode: "code-02",
						message: "Message 02"
					}
				]
			};
			message = ErrorResponse.Util.getMessage( errorResponse );
			expect( Utils.isString( message ) ).toBe( true );
			expect( message ).toBe( "Message 01, Message 02" );
		} );

	} );

} );
