import { DocumentsContext } from "../../Context/DocumentsContext";

import { DocumentsRegistry } from "../../DocumentsRegistry/DocumentsRegistry";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { Response } from "../../HTTP/Response";

import { INSTANCE, method } from "../../test/JasmineExtender";

import { C } from "../../Vocabularies/C";
import { XSD } from "../../Vocabularies/XSD";


// FIXME
xdescribe( method( INSTANCE, "_parseFailedResponse" ), ():void => {

	describe( "When has a context", ():void => {

		let registry:DocumentsRegistry;
		beforeEach( () => {
			const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
			registry = new DocumentsRegistry( context );
		} );

		it( "should generate an HTTP error when status code is not 2xx", async () => {
			const response:Response = new Response( {} as any, `
						[ {
							"@id": "_:1",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [ {
								"@id": "_:2"
							}, {
								"@id": "_:3"
							} ],
							"${ C.httpStatusCode }": [ {
								"@type": "${ XSD.int }",
								"@value": "500"
							} ]
						}, {
							"@id": "_:2",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-01"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 01"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:3",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-02"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 02"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:6"
							} ]
						}, {
							"@id": "_:4",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:5",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						}, {
							"@id": "_:6",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:7"
							} ]
						}, {
							"@id": "_:7",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						} ]`,
				{
					statusCode: 500,
					headers: {},
				} as any
			);

			await registry._parseFailedResponse( response )
				.then( () => fail( "Should not resolve" ) )
				.catch( ( error:HTTPError ) => {
					expect( error ).toBeDefined();
					expect( error ).toEqual( jasmine.any( HTTPError ) );

					expect( error.message ).toBe( "Message 01, Message 02" );
					expect( error.statusCode ).toBe( 500 );

					expect( error.errors ).toBeDefined();
					expect( error.errors.length ).toBe( 2 );

					expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
					expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
					expect( error.errors[ 0 ].errorParameters.entries ).toEqual( [ {
						entryKey: "document",
						entryValue: jasmine.objectContaining( {
							id: "https://example.com/target-document/",
						} ) as any,
					} as any ] );

					expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
					expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
					expect( error.errors[ 1 ].errorParameters.entries ).toEqual( [ {
						entryKey: "document",
						entryValue: jasmine.objectContaining( {
							id: "https://example.com/target-document/",
						} ) as any,
					} as any ] );
				} )
			;
		} );

		it( "should generate an error when multiple c:ErrorResponse in the response", async () => {
			const response:Response = new Response( {} as any, `
						[ {
							"@id": "_:1",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [],
							"${ C.httpStatusCode }": [ {
								"@type": "http://www.w3.org/2001/XMLSchema#int",
								"@value": "1234567890"
							} ]
						}, {
							"@id": "_:2",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [],
							"${ C.httpStatusCode }": [ {
								"@type": "http://www.w3.org/2001/XMLSchema#int",
								"@value": "0987654321"
							} ]
						} ]`,
				{
					statusCode: 500,
					headers: {},
				} as any
			);

			await registry._parseFailedResponse( response )
				.then( () => fail( "Should not resolve" ) )
				.catch( ( error:HTTPError ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
					expect( error.message ).toBe( "The response string contains multiple c:ErrorResponse." );
				} )
			;
		} );

		it( "should generate an error when no c:ErrorResponse in the response", async () => {
			const response:Response = new Response( {} as any, `
						[ {
							"@id": "_:3",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-02"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 02"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:4",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:5",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						} ]`,
				{
					statusCode: 500,
					headers: {},
				} as any
			);

			await registry._parseFailedResponse( response )
				.then( () => fail( "Should not resolve" ) )
				.catch( ( error:HTTPError ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
					expect( error.message ).toBe( "The response string does not contains a c:ErrorResponse." );
				} )
			;
		} );

		it( "should generate an HTTP error with the body if no JSON-LD is provided", async () => {
			const response:Response = new Response(
				{} as any,
				`An error message.`,
				{
					statusCode: 500,
					headers: {},
				} as any
			);

			await registry._parseFailedResponse( response )
				.then( () => fail( "Should not resolve" ) )
				.catch( ( error:HTTPError ) => {
					expect( error ).toEqual( jasmine.any( HTTPError ) );
					expect( error.message ).toBe( "An error message." );
				} )
			;
		} );

	} );

} );
