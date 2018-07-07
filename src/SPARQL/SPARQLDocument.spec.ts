import {
	FinishClause,
	QueryClause
} from "sparqler/clauses";
import { CarbonLDP } from "../CarbonLDP";
import { IllegalArgumentError } from "../Errors";
import { RequestOptions } from "../HTTP";
import { DocumentsRegistry } from "../Registry";
import { Resource } from "../Resource";
import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import { FinishSPARQLSelect } from "./Builder";
import { SPARQLService } from "./Service";
import { SPARQLDocumentTrait } from "./SPARQLDocumentTrait";


function createMock<T extends object>( data?:T & Partial<SPARQLDocumentTrait> ):T & SPARQLDocumentTrait {
	return SPARQLDocumentTrait.decorate( Object.assign( {
		id: "https://example.com/",
	}, data ) );
}


describe( module( "carbonldp/SPARQL/SPARQLDocument" ), () => {

	describe( interfaze(
		"CarbonLDP.SPARQL.SPARQLDocument",
		"Document that contains methods to apply SPARQL queries."
	), () => {

		it( extendsClass( "CarbonLDP.TransientResource" ), () => {
			const target:Resource = {} as SPARQLDocumentTrait;
			expect( target ).toBeDefined();
		} );


		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		describe( method( OBLIGATORY, "executeRawASKQuery" ), () => {

			it( hasSignature(
				"Executes an ASK query on a document and returns a raw application/sparql-results+json object.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
			), () => {} );

			it( hasSignature(
				"Executes an ASK query on the current document and returns a raw application/sparql-results+json object.", [
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeRawASKQuery ).toBeDefined();
				expect( resource.executeRawASKQuery ).toEqual( jasmine.any( Function ) );
			} );


			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "https://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve prefixed name", async () => {
					context
						.extendObjectSchema( { ex: "https://example.com/" } );

					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "ex:document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeRawASKQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeRawASKQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeRawASKQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawASKQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "https://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeRawASKQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawASKQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawASKQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "executeASKQuery" ), () => {

			it( hasSignature(
				"Executes an ASK query on a document and returns the response of the query in form of a boolean.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<boolean>" }
			), () => {} );

			it( hasSignature(
				"Executes an ASK query on the current document and returns the response of the query in form of a boolean.", [
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<boolean>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeASKQuery ).toBeDefined();
				expect( resource.executeASKQuery ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "https://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
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

					await resource
						.executeASKQuery( "ex:document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeASKQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeASKQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeASKQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeASKQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "https://example.com/document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeASKQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "document/", "ASK { ?subject, ?predicate, ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "ASK { ?subject, ?predicate, ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeASKQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeASKQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeASKQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "executeRawSELECTQuery" ), () => {

			it( hasSignature(
				"Executes a SELECT query on a document and returns a raw application/sparql-results+json object.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
			), () => {} );

			it( hasSignature(
				"Executes a SELECT query on the current document and returns a raw application/sparql-results+json object.", [
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeRawSELECTQuery ).toBeDefined();
				expect( resource.executeRawSELECTQuery ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve prefixed name", async () => {
					context
						.extendObjectSchema( { ex: "https://example.com/" } );

					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "ex:document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeRawSELECTQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeRawSELECTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeRawSELECTQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeRawSELECTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawSELECTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawSELECTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

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

			it( hasSignature(
				[ "T extends object" ],
				"Executes a SELECT query on the current document and returns a parsed response object.", [
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeSELECTQuery ).toBeDefined();
				expect( resource.executeSELECTQuery ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
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

					await resource
						.executeSELECTQuery( "ex:document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeSELECTQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeSELECTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );

				it( "should send query when URI specified", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 3 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 3 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeSELECTQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeSELECTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "https://example.com/document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeSELECTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );

				it( "should send query when URI specified", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "document/", "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "SELECT ?book ?title WHERE { <https://example.com/some-document/> ?book ?title }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 3 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeSELECTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeSELECTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 3 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeSELECTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "executeRawCONSTRUCTQuery" ), () => {

			it( hasSignature(
				"Executes a CONSTRUCT query on a document and returns a string with the resulting model.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "constructQuery", type: "string", description: "CONSTRUCT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<string>" }
			), () => {} );

			it( hasSignature(
				"Executes a CONSTRUCT query on the current document and returns a string with the resulting model.", [
					{ name: "constructQuery", type: "string", description: "CONSTRUCT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<string>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeRawCONSTRUCTQuery ).toBeDefined();
				expect( resource.executeRawCONSTRUCTQuery ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "https://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve prefixed name", async () => {
					context
						.extendObjectSchema( { ex: "https://example.com/" } );

					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "ex:document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeRawCONSTRUCTQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeRawCONSTRUCTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeRawCONSTRUCTQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawCONSTRUCTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "https://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeRawCONSTRUCTQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawCONSTRUCTQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawCONSTRUCTQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawCONSTRUCTQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

		} );

		describe( method( OBLIGATORY, "executeRawDESCRIBEQuery" ), () => {

			it( hasSignature(
				"Executes a DESCRIBE query on a document and returns a string with the resulting model.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "describeQuery", type: "string", description: "DESCRIBE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<string>" }
			), () => {} );

			it( hasSignature(
				"Executes a DESCRIBE query on hte current document and returns a string with the resulting model.", [
					{ name: "describeQuery", type: "string", description: "DESCRIBE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<string>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeRawDESCRIBEQuery ).toBeDefined();
				expect( resource.executeRawDESCRIBEQuery ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "https://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve prefixed name", async () => {
					context
						.extendObjectSchema( { ex: "https://example.com/" } );

					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "ex:document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeRawDESCRIBEQuery( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeRawDESCRIBEQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeRawDESCRIBEQuery( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawDESCRIBEQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "https://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeRawDESCRIBEQuery( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send query when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );

				it( "should send query when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeRawDESCRIBEQuery" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeRawDESCRIBEQuery( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeRawDESCRIBEQuery( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

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

			it( hasSignature(
				"Executes a DESCRIBE query on the current document and returns a string with the resulting model.", [
					{ name: "update", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<void>" }
			), () => {} );

			it( "should exists", () => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.executeUPDATE ).toBeDefined();
				expect( resource.executeUPDATE ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					context = new CarbonLDP( "https://example.com/" );

					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "https://example.com/document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
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

					await resource
						.executeUPDATE( "ex:document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject promise if URI is not in the context base", async () => {
					await resource
						.executeUPDATE( "http://not-example.com", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"http://not-example.com" is out of scope.` );
						} )
					;
				} );

				it( "should reject promise if prefixed URI cannot be resolved", async () => {
					await resource
						.executeUPDATE( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" is out of scope.` );
						} )
					;
				} );


				it( "should send update when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );
				} );

				it( "should send update when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should add authentication header", async () => {
					spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					const spy:jasmine.Spy = spyOn( context.auth, "addAuthentication" );

					await resource.executeUPDATE( "query" );
					expect( spy ).toHaveBeenCalled();
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeUPDATE( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( () => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should request from resource ID", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/" );
				} );

				it( "should request from URI provided", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "https://example.com/document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 0 ];
					expect( target ).toBe( "https://example.com/document/" );
				} );

				it( "should reject if URI is prefixed", async () => {
					await resource
						.executeUPDATE( "prefix:the-uri", "query" )
						.then( () => fail( "Should not resolve." ) )
						.catch( error => {
							expect( () => { throw error; } )
								.toThrowError( IllegalArgumentError, `"prefix:the-uri" cannot be used as URL for the request.` );
						} )
					;
				} );


				it( "should send update when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );
				} );

				it( "should send update when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "document/", `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );

					const target:string = spy.calls
						.mostRecent()
						.args[ 1 ];
					expect( target ).toBe( `INSERT DATA { GRAPH <https://example.com/some-document/> { <https://example.com/some-document/> <https://example.com/ns#propertyString> "Property Value" } }` );
				} );


				it( "should send options when no URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );

				it( "should send options when specified URI", async () => {
					const spy:jasmine.Spy = spyOn( SPARQLService, "executeUPDATE" )
						.and.returnValue( Promise.resolve( [] ) );

					await resource
						.executeUPDATE( "document/", "query", { timeout: 5050 } );

					const target:RequestOptions = spy.calls
						.mostRecent()
						.args[ 2 ];
					expect( target ).toEqual( { timeout: 5050 } );
				} );


				it( "should call _parseErrorResponse when request error", async () => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
					} );

					const spy:jasmine.Spy = spyOn( resource._registry, "_parseFailedResponse" )
						.and.callFake( () => Promise.reject( null ) );

					await resource
						.executeUPDATE( "https://example.com/", "" )
						.then( () => fail( "Should not resolve" ) )
						.catch( error => {
							if( error ) fail( error );

							expect( spy ).toHaveBeenCalled();
						} )
					;
				} );

			} );

		} );


		describe( method( OBLIGATORY, "sparql" ), () => {

			it( hasSignature(
				"Method that creates an instance of SPARQLER for the specified document, or the current document if no URI is provided.",
				[
					{ name: "uri", type: "string", optional: true, description: "URI of the document where to execute the SPARQL query." },
				],
				{ type: "SPARQLER/Clauses/QueryClause<CarbonLDP.SPARQL.Builder.FinishSPARQLSelect>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:SPARQLDocumentTrait = createMock();

				expect( resource.sparql ).toBeDefined();
				expect( resource.sparql ).toEqual( jasmine.any( Function ) );
			} );

			describe( "When has a defined context", () => {

				let context:CarbonLDP;
				let resource:SPARQLDocumentTrait;
				beforeEach( ():void => {
					context = new CarbonLDP( "https://example.com/" );
					resource = createMock( {
						_registry: context.registry,
						$id: "https://example.com/",
					} );
				} );

				it( "should return a QueryClause", () => {
					const queryClause:QueryClause = resource
						.sparql( "https://example.com/resource/" )
					;

					expect( queryClause ).toEqual( jasmine.objectContaining( {
						base: jasmine.any( Function ) as any,
						vocab: jasmine.any( Function ) as any,
						prefix: jasmine.any( Function ) as any,
					} ) );
				} );

				it( "should add schema base", async () => {
					const queryBuilder:FinishSPARQLSelect = resource
						.sparql()
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

					const queryBuilder:FinishClause = resource
						.sparql()
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
					const queryBuilder:FinishSPARQLSelect = resource
						.sparql()
						.select( "o" )
						.where( () => [] );

					expect( queryBuilder ).toEqual( jasmine.objectContaining( {
						execute: jasmine.any( Function ),
						executeRaw: jasmine.any( Function ),
					} ) );
				} );

			} );

			describe( "When does not have a context", () => {

				let resource:SPARQLDocumentTrait;
				beforeEach( ():void => {
					resource = createMock( {
						_registry: new DocumentsRegistry(),
						$id: "https://example.com/",
					} );
				} );

				it( "should return a QueryClause", () => {
					const queryClause:QueryClause = resource
						.sparql( "https://example.com/resource/" )
					;

					expect( queryClause ).toEqual( jasmine.objectContaining( {
						base: jasmine.any( Function ) as any,
						vocab: jasmine.any( Function ) as any,
						prefix: jasmine.any( Function ) as any,
					} ) );
				} );

				it( "should return object to execute SELECT", () => {
					const queryBuilder:FinishSPARQLSelect = resource
						.sparql()
						.select( "o" )
						.where( () => [] );

					expect( queryBuilder ).toEqual( jasmine.objectContaining( {
						execute: jasmine.any( Function ),
						executeRaw: jasmine.any( Function ),
					} ) );
				} );

			} );

		} );

	} );

} );
