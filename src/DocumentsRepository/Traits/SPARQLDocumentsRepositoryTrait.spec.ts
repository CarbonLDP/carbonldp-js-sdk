import { FinishClause, QueryClause } from "sparqler/clauses";

import { AnyJasmineValue } from "../../../test/helpers/types";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { RequestOptions } from "../../HTTP/Request";

import { ErrorResponse } from "../../LDP/ErrorResponse";
import { MapEntry } from "../../LDP/MapEntry";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";

import { FinishSPARQLSelect } from "../../SPARQL/Builder";
import { SPARQLService } from "../../SPARQL/SPARQLService";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";

import { C } from "../../Vocabularies/C";
import { XSD } from "../../Vocabularies/XSD";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";

import {
	SPARQLDocumentsRepositoryTrait,
	SPARQLDocumentsRepositoryTraitFactory
} from "./SPARQLDocumentsRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait" ), () => {

	let $context:DocumentsContext;
	beforeEach( ():void => {
		$context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTrait",
		"Documents repository with the implementation for sparql queries."
	), () => {

		it( extendsClass( "CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:GeneralRepository<Document> = {} as SPARQLDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:SPARQLDocumentsRepositoryTrait[ "$context" ] = {} as DocumentsContext;
			expect( target ).toBeDefined();
		} );


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
			repository = SPARQLDocumentsRepositoryTrait.decorate( { $context } );
		} );


		describe( method( OBLIGATORY, "executeASKQuery" ), () => {

			it( hasSignature(
				"Executes an ASK query on a document and returns the response of the query in form of a boolean.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<boolean>" }
			), () => {} );


			it( "should exists", () => {
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
				$context
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
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "executeSELECTQuery" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Executes a SELECT query on a document and returns a parsed response object.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
			), () => {} );

			it( "should exists", () => {
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
				$context
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
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "executeUPDATE" ), () => {

			it( hasSignature(
				"Executes a DESCRIBE query on a document and returns a string with the resulting model.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "update", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<void>" }
			), () => {} );

			it( "should exists", () => {
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
				$context
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
						expect( error.errors[ 0 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );

						expect( error.errors[ 1 ].errorCode ).toBe( `code-02` );
						expect( error.errors[ 1 ].errorMessage ).toBe( `Message 02` );
						expect( error.errors[ 1 ].errorParameters.entries as AnyJasmineValue<MapEntry<string, Pointer>[]> ).toEqual( [ {
							entryKey: "document",
							entryValue: jasmine.objectContaining( {
								$id: "https://example.com/target-document/",
							} ),
						} ] );
					} )
				;
			} );

		} );


		describe( method( OBLIGATORY, "sparql" ), () => {

			it( hasSignature(
				"Method that creates an instance of SPARQLER for the specified document URI.",
				[
					{ name: "uri", type: "string", description: "URI of the document where to execute the SPARQL query." },
				],
				{ type: "SPARQLER/Clauses/QueryClause<CarbonLDP.SPARQL.Builder.FinishSPARQLSelect>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.sparql ).toBeDefined();
				expect( repository.sparql ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a QueryClause", () => {
				const queryClause:QueryClause = repository
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
				$context.extendObjectSchema( {
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
					"PREFIX ex:<https://example.com/>\n" +
					"SELECT ?o" + "\n" +
					"WHERE {" +
					"" + "ex:resource ?p ?o" +
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

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTrait, CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:ModelPrototype<SPARQLDocumentsRepositoryTrait, GeneralRepository<Document>> = {} as SPARQLDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTrait<any>, CarbonLDP.BaseDocumentsRepository>" ), () => {
			const target:ModelDecorator<SPARQLDocumentsRepositoryTrait, BaseDocumentsRepository> = {} as SPARQLDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "SPARQLDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exists", ():void => {
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

			it( "should exists", ():void => {
				expect( SPARQLDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( SPARQLDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				SPARQLDocumentsRepositoryTrait.decorate( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( SPARQLDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				SPARQLDocumentsRepositoryTrait.decorate( { $context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				SPARQLDocumentsRepositoryTrait.decorate( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"SPARQLDocumentsRepositoryTrait",
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( SPARQLDocumentsRepositoryTrait ).toBeDefined();
			expect( SPARQLDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

