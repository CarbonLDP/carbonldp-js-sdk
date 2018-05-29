import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { CarbonLDP } from "../CarbonLDP";
import { Document } from "../Document";
import * as Errors from "../Errors";
import { IllegalArgumentError } from "../Errors";
import { Response } from "../HTTP";
import { HTTPError } from "../HTTP/Errors";
import { Pointer } from "../Pointer";
import {
	clazz,
	constructor,
	extendsClass,
	hasSignature,
	INSTANCE,
	method,
	module
} from "../test/JasmineExtender";
import {
	C,
	XSD
} from "../Vocabularies";
import { DocumentsRegistry } from "./DocumentsRegistry";
import { RegistryService } from "./RegistryService";


describe( module( "carbonldp/Registry" ), () => {

	describe( clazz(
		"CarbonLDP.DocumentsRegistry",
		"Registry that stores Document object."
	), () => {

		it( extendsClass( "CarbonLDP.RegistryService" ), () => {
			const target:RegistryService<any, any> = new DocumentsRegistry();
			expect( target ).toEqual( jasmine.any( RegistryService ) );
		} );


		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "context", type: "CarbonLDP", optional: true },
				]
			), () => {} );

			it( "should be instantiable", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();
				expect( registry ).toEqual( jasmine.any( DocumentsRegistry ) );
			} );

			it( "should accept context", () => {
				const context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				const registry:DocumentsRegistry = new DocumentsRegistry( context );

				expect( registry ).toEqual( jasmine.any( DocumentsRegistry ) );
			} );

		} );


		describe( "DocumentsRegistry._registry", () => {

			it( "should return a Document object", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = registry._register( { id: "https://example.com/" } );
				expect( resource ).toEqual( anyThatMatches( Document.is, "idDocument" ) as any );
			} );


			it( "should add context to resource when registry has one", () => {
				const context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				const registry:DocumentsRegistry = new DocumentsRegistry( context );

				const resource:Document = registry._register( { id: "https://example.com/" } );
				expect( resource._context ).toBe( context );
			} );

			it( "should not add context to resource when registry doesn't has one", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = registry._register( { id: "https://example.com/" } );
				expect( resource._context ).toBeUndefined();
			} );

		} );

		describe( method( INSTANCE, "registry" ), () => {

			it( hasSignature(
				[
					{ name: "id", type: "string", description: "ID of the document tobe registered in the registry." },
				],
				{ type: "CarbonLDP.Document" }
			), () => {} );

			it( "should exists", ():void => {
				expect( DocumentsRegistry.prototype.register ).toBeDefined();
				expect( DocumentsRegistry.prototype.register ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ._registry", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();

				const spy:jasmine.Spy = spyOn( registry, "_register" );

				registry.register( "https://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( { id: "https://example.com/resource/" } );
			} );

		} );


		describe( "DocumentsRegistry._getLocalID", () => {

			it( "should throw error when bNode label", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();

				expect( () => {
					registry._getLocalID( "_:bNode-label" );
				} ).toThrowError( IllegalArgumentError, `"_:bNode-label" is out of scope.` );
			} );

			it( "should throw error when URI with fragment", () => {
				const registry:DocumentsRegistry = new DocumentsRegistry();

				expect( () => {
					registry._getLocalID( "#fragment" );
				} ).toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
			} );

		} );

		describe( method( INSTANCE, "_requestURLFor" ), () => {

			it( hasSignature(
				"Obtains the URL for the pointer and the relative uri provided.\n" +
				"When no URI specified, the ID for the pointer would be used.",
				[
					{ name: "pointer", type: "CarbonLDP.Pointer", description: "Base pointer for resolve the relative uri provided." },
					{ name: "uri", type: "string", optional: true, description: "relative uri to be resolved using the pointer specified." },
				]
			), () => {} );

			it( "should exists", ():void => {
				expect( DocumentsRegistry.prototype._requestURLFor ).toBeDefined();
				expect( DocumentsRegistry.prototype._requestURLFor ).toEqual( jasmine.any( Function ) );
			} );


			describe( "When has a context", () => {

				let context:CarbonLDP;
				let registry:DocumentsRegistry;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					registry = new DocumentsRegistry( context );
				} );


				it( "should return pointer ID with absolute URI when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer );

					expect( returned ).toBe( "https://example.com/" );
				} );

				it( "should return absolute URI when provided", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer, "https://example.com/resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve relative URI with the pointer ID", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer, "resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve prefixed named provided", () => {
					context.extendObjectSchema( { ex: "https://example.com/" } );
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer, "ex:resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );


				it( "should throw error pointer ID out of scope when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "http://example.org/" } );

					expect( () => {
						registry._requestURLFor( pointer );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/" is out of scope.` );
				} );

				it( "should throw error when URI is out of scope", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						registry._requestURLFor( pointer, "http://example.org/resource/" );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/resource/" is out of scope.` );
				} );

				it( "should throw error when prefixed named cannot be resolved", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						registry._requestURLFor( pointer, "ex:resource/" );
					} ).toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
				} );

				it( "should throw error pointer ID out of scope when relative URI", () => {
					const pointer:Pointer = Pointer.create( { id: "http://example.org/" } );

					expect( () => {
						registry._requestURLFor( pointer, "resource/" );
					} ).toThrowError( IllegalArgumentError, `"http://example.org/resource/" is out of scope.` );
				} );

			} );

			describe( "When has NO context", () => {

				let registry:DocumentsRegistry;
				beforeEach( ():void => {
					registry = new DocumentsRegistry();
				} );


				it( "should return pointer ID with absolute URI when no URI", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer );

					expect( returned ).toBe( "https://example.com/" );
				} );

				it( "should return absolute URI when provided", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer, "https://example.com/resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );

				it( "should resolve relative URI with the pointer ID", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					const returned:string = registry._requestURLFor( pointer, "resource/" );

					expect( returned ).toBe( "https://example.com/resource/" );
				} );


				it( "should throw error when prefixed named cannot be resolved", () => {
					const pointer:Pointer = Pointer.create( { id: "https://example.com/" } );

					expect( () => {
						registry._requestURLFor( pointer, "ex:resource/" );
					} ).toThrowError( IllegalArgumentError, `"ex:resource/" cannot be resolved.` );
				} );

			} );

		} );


		describe( method( INSTANCE, "_parseErrorResponse" ), ():void => {


			describe( "When has a context", ():void => {

				let registry:DocumentsRegistry;
				beforeEach( () => {
					const context:CarbonLDP = new CarbonLDP( "https://example.com/" );
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

					await registry._parseErrorResponse( response )
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

					await registry._parseErrorResponse( response )
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

					await registry._parseErrorResponse( response )
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

					await registry._parseErrorResponse( response )
						.then( () => fail( "Should not resolve" ) )
						.catch( ( error:HTTPError ) => {
							expect( error ).toEqual( jasmine.any( HTTPError ) );
							expect( error.message ).toBe( "An error message." );
						} )
					;
				} );

			} );

			describe( "When Documents does not have a context", ():void => {

				let registry:DocumentsRegistry;
				beforeEach( () => {
					registry = new DocumentsRegistry();
				} );

				it( "should generate an HTTP error with un-compacted ErrorResponse properties", async () => {
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

					await registry._parseErrorResponse( response )
						.then( () => fail( "Should not resolve" ) )
						.catch( ( error:HTTPError ) => {
							expect( error ).toBeDefined();
							expect( error ).toEqual( jasmine.any( HTTPError ) );

							expect( error.message ).toBe( "Message 01, Message 02" );
							expect( error.statusCode ).toBe( 500 );

							expect( error[ C.error ] ).toBeDefined();
							expect( error[ C.error ].length ).toBe( 2 );

							expect( error[ C.error ][ 0 ][ C.errorCode ] ).toBe( `code-01` );
							expect( error[ C.error ][ 0 ][ C.errorMessage ] ).toBe( `Message 01` );
							expect( error[ C.error ][ 0 ][ C.errorParameters ][ C.entry ] ).toEqual( {
								[ C.entryKey ]: "document",
								[ C.entryValue ]: jasmine.objectContaining( {
									id: "https://example.com/target-document/",
								} ) as any,
							} );

							expect( error[ C.error ][ 1 ][ C.errorCode ] ).toBe( `code-02` );
							expect( error[ C.error ][ 1 ][ C.errorMessage ] ).toBe( `Message 02` );
							expect( error[ C.error ][ 1 ][ C.errorParameters ][ C.entry ] ).toEqual( {
								[ C.entryKey ]: "document",
								[ C.entryValue ]: jasmine.objectContaining( {
									id: "https://example.com/target-document/",
								} ) as any,
							} );
						} );
				} );

			} );

		} );

	} );

} );
