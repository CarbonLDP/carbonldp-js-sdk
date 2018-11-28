import { FinishClause, QueryClause } from "sparqler/clauses";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { RequestOptions } from "../../HTTP/Request";

import { ErrorResponse } from "../../LDP/ErrorResponse";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { FinishSPARQLSelect } from "../../SPARQL/SPARQLBuilder";
import { SPARQLService } from "../../SPARQL/SPARQLService";

import { hasSignature } from "../../test/JasmineExtender";

import { C } from "../../Vocabularies/C";
import { XSD } from "../../Vocabularies/XSD";

import { SPARQLDocumentsRepositoryTrait } from "./SPARQLDocumentsRepositoryTrait";


describe( "SPARQLDocumentsRepositoryTrait", () => {

	it( "should exist", () => {
		expect( SPARQLDocumentsRepositoryTrait ).toBeDefined();
		expect( SPARQLDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		beforeEach( () => {
			jasmine.Ajax.install();

			jasmine.Ajax.stubRequest( "https://example.com/500/" ).andReturn( {
				status: 500,
				responseText: `
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
			} );
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		let repository:SPARQLDocumentsRepositoryTrait;
		beforeEach( () => {
			repository = SPARQLDocumentsRepositoryTrait.decorate( { context } );
		} );


		describe( "SPARQLDocumentsRepositoryTrait.executeASKQuery", () => {

			it( "should exist", () => {
				expect( repository.executeASKQuery ).toBeDefined();
				expect( repository.executeASKQuery ).toEqual( jasmine.any( Function ) );
			} );


			it( "should request from URI provided", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeASKQuery( "https://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve relative URI", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve prefixed name", async () => {
				context
					.extendObjectSchema( { ex: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeASKQuery( "ex:document/", "ASK { ?subject, ?predicate, ?object }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should reject promise if URI is not in the context base", async () => {
				await repository
					.executeASKQuery( "http://not-example.com", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
					} )
				;
			} );

			it( "should reject promise if prefixed URI cannot be resolved", async () => {
				await repository
					.executeASKQuery( "prefix:the-uri", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
					} )
				;
			} );


			it( "should pass the query", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 1 ];
				expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
			} );


			it( "should pass the options", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeASKQuery( "document/", "query", { timeout: 5050 } );

				const target:RequestOptions = spy.calls
					.mostRecent()
					.args[ 2 ];
				expect( target ).toEqual( { timeout: 5050 } );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.executeASKQuery( "https://example.com/500/", "" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( "SPARQLDocumentsRepositoryTrait.executeSELECTQuery", () => {

			it( hasSignature(
				[ "T extends object" ],
				"Executes a SELECT query on a document and returns a parsed response object.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
			), () => {} );

			it( "should exist", () => {
				expect( repository.executeSELECTQuery ).toBeDefined();
				expect( repository.executeSELECTQuery ).toEqual( jasmine.any( Function ) );
			} );


			it( "should request from URI provided", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve relative URI", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve prefixed name", async () => {
				context
					.extendObjectSchema( { ex: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeSELECTQuery( "ex:document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should reject promise if URI is not in the context base", async () => {
				await repository
					.executeSELECTQuery( "http://not-example.com", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
					} )
				;
			} );

			it( "should reject promise if prefixed URI cannot be resolved", async () => {
				await repository
					.executeSELECTQuery( "prefix:the-uri", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
					} )
				;
			} );


			it( "should pass the query", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

				const target:string = spy.calls
					.mostRecent()
					.args[ 1 ];
				expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
			} );


			it( "should pass the options", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeSELECTQuery( "document/", "query", { timeout: 5050 } );

				const target:RequestOptions = spy.calls
					.mostRecent()
					.args[ 3 ];
				expect( target ).toEqual( { timeout: 5050 } );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.executeSELECTQuery( "https://example.com/500/", "" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( "SPARQLDocumentsRepositoryTrait.executeUPDATE", () => {

			it( hasSignature(
				"Executes a DESCRIBE query on a document and returns a string with the resulting model.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "update", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<void>" }
			), () => {} );

			it( "should exist", () => {
				expect( repository.executeUPDATE ).toBeDefined();
				expect( repository.executeUPDATE ).toEqual( jasmine.any( Function ) );
			} );


			it( "should request from URI provided", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeUPDATE( "https://example.com/document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve relative URI", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeUPDATE( "document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve prefixed name", async () => {
				context
					.extendObjectSchema( { ex: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeUPDATE( "ex:document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

				const target:string = spy.calls
					.mostRecent()
					.args[ 0 ];
				expect( target ).toBe( "https://example.com/document/" );
			} );

			it( "should reject promise if URI is not in the context base", async () => {
				await repository
					.executeUPDATE( "http://not-example.com", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
					} )
				;
			} );

			it( "should reject promise if prefixed URI cannot be resolved", async () => {
				await repository
					.executeUPDATE( "prefix:the-uri", "query" )
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
					} )
				;
			} );


			it( "should pass the update", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeUPDATE( "document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

				const target:string = spy.calls
					.mostRecent()
					.args[ 1 ];
				expect( target ).toBe( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );
			} );


			it( "should pass the options", async () => {
				const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
					.and.returnValue( Promise.resolve( [] ) );

				await repository
					.executeUPDATE( "document/", "query", { timeout: 5050 } );

				const target:RequestOptions = spy.calls
					.mostRecent()
					.args[ 2 ];
				expect( target ).toEqual( { timeout: 5050 } );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.executeUPDATE( "https://example.com/500/", "" )
					.then( () => fail( "Should not resolve" ) )
					.catch( ( error:HTTPError & ErrorResponse ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );

						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );

						expect( error.errors[ 0 ].errorCode ).toBe( `code-01` );
						expect( error.errors[ 0 ].errorMessage ).toBe( `Message 01` );
						expect( error.errors[ 0 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as any[] ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );


		describe( "SPARQLDocumentsRepositoryTrait.sparql", () => {

			it( hasSignature(
				"Method that creates an instance of SPARQLER for the specified document URI.",
				[
					{ name: "uri", type: "string", description: "URI of the document where to execute the SPARQL query." },
				],
				{ type: "SPARQLER/Clauses/QueryClause<CarbonLDP.SPARQL.Builder.FinishSPARQLSelect>" }
			), () => {} );

			it( "should exist", () => {
				expect( repository.sparql ).toBeDefined();
				expect( repository.sparql ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a QueryClause", () => {
				const queryClause:QueryClause<any, any> = repository
					.sparql( "https://example.com/resource/" )
				;

				expect( queryClause ).toEqual( jasmine.objectContaining( {
					base: jasmine.any( Function ) as any,
					vocab: jasmine.any( Function ) as any,
					prefix: jasmine.any( Function ) as any,
				} ) );
			} );

			it( "should add schema base", async () => {
				const queryBuilder:FinishSPARQLSelect = repository
					.sparql( "https://example.com/resource/" )
					.select( "o" )
					.where( () => [] );

				expect( queryBuilder.toPrettyString() ).toBe( "" +
					"BASE <https://example.com/>" + "\n" +
					"SELECT ?o" + "\n" +
					"WHERE {}"
				);
			} );

			it( "should add used prefixes", async () => {
				context.extendObjectSchema( {
					"ex": "https://example.com/",
				} );

				const queryBuilder:FinishClause = repository
					.sparql( "https://example.com/resource/" )
					.select( "o" )
					.where( _ => _
						.resource( "ex:resource" ).has( _.var( "p" ), _.var( "o" ) )
					);

				expect( queryBuilder.toPrettyString() ).toBe( "" +
					"BASE <https://example.com/>" + "\n" +
					"PREFIX ex: <https://example.com/>\n" +
					"SELECT ?o" + "\n" +
					"WHERE { " +
					"" + "ex:resource ?p ?o " +
					"}"
				);
			} );

			it( "should return object to execute SELECT", () => {
				const queryBuilder:FinishSPARQLSelect = repository
					.sparql( "https://example.com/resource/" )
					.select( "o" )
					.where( () => [] );

				expect( queryBuilder ).toEqual( jasmine.objectContaining( {
					execute: jasmine.any( Function ),
				} ) );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "SPARQLDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exist", () => {
				expect( SPARQLDocumentsRepositoryTrait.isDecorated ).toBeDefined();
				expect( SPARQLDocumentsRepositoryTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				SPARQLDocumentsRepositoryTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "SPARQLDocumentsRepositoryTrait.decorate", () => {

			it( "should exist", () => {
				expect( SPARQLDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( SPARQLDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				SPARQLDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( SPARQLDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				SPARQLDocumentsRepositoryTrait.decorate( { context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				SPARQLDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );

