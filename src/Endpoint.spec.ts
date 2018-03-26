import { anyThatMatches } from "../test/helpers/jasmine-equalities";
import { Document } from "./Document";
import { Documents } from "./Documents";
import {
	Endpoint,
	EndpointModelFactory
} from "./Endpoint";
import { IllegalArgumentError } from "./Errors";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import {
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "./test/JasmineExtender";


describe( module( "carbonldp/Endpoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.EndpointModelFactory",
		"Interface that describes the expected model factory of an endpoint child/member."
	), ():void => {

		describe( method(
			OBLIGATORY,
			"get"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire document referred by the URI specified when no query function si provided.\nIf the function builder es provided the query is able to specify the properties of the document to be retrieved and the sub-documents' properties and on and on.", [
					{ name: "relativeURI", type: "string", description: "The URI of the document to retrieve/query. If relative, it will be resolved by the current document ID." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.PersistedDocument.PersistedDocument>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire document referred by the URI specified when no query function si provided.\nIf the function builder es provided the query is able to specify the properties of the document to be retrieved and the sub-documents' properties and on and on.", [
					{ name: "relativeURI", type: "string", description: "The URI of the document to retrieve. If relative, it will be resolved by the current document ID." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.PersistedDocument.PersistedDocument>" }
			), ():void => {} );

		} );

		// TODO: Add missing docs

	} );

	describe( interfaze(
		"CarbonLDP.Endpoint",
		"Interface that describes re-defined methods for document endpoints."
	), ():void => {


		// TODO: Add missing docs

	} );

	describe( interfaze(
		"CarbonLDP.EndpointFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Endpoint` objects."
	), ():void => {

		// TODO: Add missing docs

	} );

	describe( property(
		STATIC,
		"Endpoint",
		"CarbonLDP.EndPointFactory"
	), ():void => {

		let documents:Documents;
		beforeEach( ():void => {
			documents = new Documents();
		} );

		it( "should exists", ():void => {
			expect( Endpoint ).toBeDefined();
			expect( Endpoint ).toEqual( jasmine.any( Object ) );
		} );

		describe( "Endpoint.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Endpoint.isDecorated ).toBeDefined();
				expect( Endpoint.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should work with Endpoint.decorate", ():void => {
				const target:Endpoint<any, any, any> = Endpoint.decorate( {}, documents );
				expect( Endpoint.isDecorated( target ) ).toBe( true );
			} );

		} );

		describe( "Endpoint.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Endpoint.decorate ).toBeDefined();
				expect( Endpoint.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should be a PersistedProtectedDocument", ():void => {
				const target:Endpoint<any, any, any> = Endpoint.decorate( {}, documents );
				expect( target ).toEqual( anyThatMatches( PersistedProtectedDocument.is, "isPersistedProtectedDocument" ) as any );
			} );

			it( "should add self methods and properties", ():void => {
				const target:Endpoint<any, any, any> = Endpoint.decorate( {}, documents );
				expect( target ).toEqual( jasmine.objectContaining( {
					_ModelFactory: void 0,

					get: jasmine.any( Function ),

					createChild: jasmine.any( Function ),
					createChildren: jasmine.any( Function ),
					createChildAndRetrieve: jasmine.any( Function ),
					createChildrenAndRetrieve: jasmine.any( Function ),

					listChildren: jasmine.any( Function ),
					listMembers: jasmine.any( Function ),
					getChildren: jasmine.any( Function ),
					getMembers: jasmine.any( Function ),

					delete: jasmine.any( Function ),
				} ) );
			} );

		} );

		// TODO: Test `Endpoint.resolveEndpointURI`
		// TODO: Test `Endpoint.createChildren`
		// TODO: Test `Endpoint.decorateChildren`


		describe( "Decorated Endpoint", ():void => {

			let endpoint:Endpoint<object, Document, PersistedProtectedDocument>;
			beforeEach( () => {
				endpoint = Endpoint.decorate( {
					id: "https://example.com/endpoint/",
				}, documents );
			} );

			describe( "Endpoint.get", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.get ).toBeDefined();
					expect( endpoint.get ).toEqual( jasmine.any( Function ) );
				} );

				it( "should resolve relative URI", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.get( "child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/child/", void 0, void 0 );
				} );

				it( "should pass on absolute child URI", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.get( "https://example.com/endpoint/child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/child/", void 0, void 0 );
				} );

				it( "should throw error when invalid URI", async () => {
					spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					try {
						await endpoint.get( "https://example.com/another-endpoint/child/" );
					} catch( e ) {
						expect( () => { throw e; } ).toThrowError( IllegalArgumentError, `The URI "https://example.com/another-endpoint/child/" isn't a child of "https://example.com/endpoint/".` );
					}
				} );

				it( "should call Documents.get when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.get( "child/", { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( jasmine.any( String ), { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.get when options and builder function", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.get( "child/", { timeout: 5050 }, queryBuilder => queryBuilder );
					expect( spy ).toHaveBeenCalledWith( jasmine.any( String ), { timeout: 5050 }, jasmine.any( Function ) );
				} );

				it( "should call Documents.get with builder function", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.get( "child/", queryBuilder => queryBuilder );
					expect( spy ).toHaveBeenCalledWith( jasmine.any( String ), jasmine.any( Function ), void 0 );
				} );

				it( "should call model decorator with the fetched document", async () => {
					spyOn( endpoint._documents, "get" )
						.and.returnValue( Promise.resolve( { the: "fetched document" } ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.get( "child/" );

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "fetched document" }, documents );
				} );

			} );


			describe( "Endpoint.createChild", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.createChild ).toBeDefined();
					expect( endpoint.createChild ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call create child object", async () => {
					spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": {} } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChild( { the: "child" } );

					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child" } );
				} );

				it( "should throw error when invalid child", async () => {
					spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": null } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChild( { the: "child" } );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( IllegalArgumentError, `Invalid base child object for the "https://example.com/endpoint/" endpoint.` );
					}
				} );

				it( "should throw error when validation errors", async () => {
					spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:jasmine.SpyObj<EndpointModelFactory<any, any, any>> = jasmine
						.createSpyObj( { "createFrom": null } );
					factorySpy.createFrom
						.and.callFake( () => { throw new Error( "Fake validation error." ); } );

					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChild( { the: "child" } );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( Error, `Fake validation error.` );
					}
				} );

				it( "should call Documents.createChild when only child", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChild( { the: "child" } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, void 0, void 0 );
				} );

				it( "should call Documents.createChild when child & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChild( { the: "child" }, { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.createChild when child & slug", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChild( { the: "child" }, "child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, "child/", void 0 );
				} );

				it( "should call Documents.createChild when child, slug & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChild( { the: "child" }, "child/", { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, "child/", { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "createChild" )
						.and.returnValue( Promise.resolve( { the: "created document" } ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChild( { the: "child" } );

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document" }, documents );
				} );

			} );

			describe( "Endpoint.createChildren", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.createChildren ).toBeDefined();
					expect( endpoint.createChildren ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call create child object", async () => {
					spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": {} } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ] );

					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child 1" } );
					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child 2" } );
				} );

				it( "should throw error when invalid child", async () => {
					spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": null } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ] );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( IllegalArgumentError, `Invalid base child objects for the "https://example.com/endpoint/" endpoint.` );
					}
				} );

				it( "should throw error when validation errors", async () => {
					spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:jasmine.SpyObj<EndpointModelFactory<any, any, any>> = jasmine
						.createSpyObj( { "createFrom": null } );
					factorySpy.createFrom
						.and.callFake( () => { throw new Error( "Fake validation error." ); } );

					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ] );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( Error, `Fake validation error.` );
					}
				} );

				it( "should call Documents.createChildren when only child", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ] );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], void 0, void 0 );
				} );

				it( "should call Documents.createChildren when child & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ], { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.createChildren when child & slug", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ] );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], void 0 );
				} );

				it( "should call Documents.createChildren when child, slug & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "createChildren" )
						.and.returnValue( Promise.resolve( [ { the: "created document 1" }, { the: "created document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildren( [ { the: "child 1" }, { the: "child 2" } ] );

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document 2" }, documents );
				} );

			} );

			describe( "Endpoint.createChildAndRetrieve", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.createChildAndRetrieve ).toBeDefined();
					expect( endpoint.createChildAndRetrieve ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call create child object", async () => {
					spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": true } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildAndRetrieve( { the: "child" } );

					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child" } );
				} );

				it( "should throw error when invalid child", async () => {
					spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": null } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildAndRetrieve( { the: "child" } );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( IllegalArgumentError, `Invalid base child object for the "https://example.com/endpoint/" endpoint.` );
					}
				} );

				it( "should throw error when validation errors", async () => {
					spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					const factorySpy:jasmine.SpyObj<EndpointModelFactory<any, any, any>> = jasmine
						.createSpyObj( { "createFrom": null } );
					factorySpy.createFrom
						.and.callFake( () => { throw new Error( "Fake validation error." ); } );

					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildAndRetrieve( { the: "child" } );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( Error, `Fake validation error.` );
					}
				} );

				it( "should call Documents.createChildAndRetrieve when only child", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChildAndRetrieve( { the: "child" } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, void 0, void 0 );
				} );

				it( "should call Documents.createChildAndRetrieve when child & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChildAndRetrieve( { the: "child" }, { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.createChildAndRetrieve when child & slug", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChildAndRetrieve( { the: "child" }, "child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, "child/", void 0 );
				} );

				it( "should call Documents.createChildAndRetrieve when child, slug & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( {} ) );

					await endpoint.createChildAndRetrieve( { the: "child" }, "child/", { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { the: "child" }, "child/", { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "createChildAndRetrieve" )
						.and.returnValue( Promise.resolve( { the: "created document" } ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildAndRetrieve( { the: "child" } );

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document" }, documents );
				} );

			} );

			describe( "Endpoint.createChildrenAndRetrieve", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.createChildrenAndRetrieve ).toBeDefined();
					expect( endpoint.createChildrenAndRetrieve ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call create child object", async () => {
					spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": true } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ] );

					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child 1" } );
					expect( factorySpy.createFrom ).toHaveBeenCalledWith( { the: "child 2" } );
				} );

				it( "should throw error when invalid child", async () => {
					spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( { "createFrom": null } );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ] );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( IllegalArgumentError, `Invalid base child objects for the "https://example.com/endpoint/" endpoint.` );
					}
				} );

				it( "should throw error when validation errors", async () => {
					spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					const factorySpy:jasmine.SpyObj<EndpointModelFactory<any, any, any>> = jasmine
						.createSpyObj( { "createFrom": null } );
					factorySpy.createFrom
						.and.callFake( () => { throw new Error( "Fake validation error." ); } );

					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					try {
						await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ] );
					} catch( e ) {
						expect( () => { throw  e; } ).toThrowError( Error, `Fake validation error.` );
					}
				} );

				it( "should call Documents.createChildrenAndRetrieve when only child", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ] );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], void 0, void 0 );
				} );

				it( "should call Documents.createChildrenAndRetrieve when child & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ], { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.createChildrenAndRetrieve when child & slug", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ] );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], void 0 );
				} );

				it( "should call Documents.createChildrenAndRetrieve when child, slug & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", [ { the: "child 1" }, { the: "child 2" } ], [ "child-1/", "child-2/" ], { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "createChildrenAndRetrieve" )
						.and.returnValue( Promise.resolve( [ { the: "created document 1" }, { the: "created document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.createChildrenAndRetrieve( [ { the: "child 1" }, { the: "child 2" } ] );

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "created document 2" }, documents );
				} );

			} );


			describe( "Endpoint.listChildren", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.listChildren ).toBeDefined();
					expect( endpoint.listChildren ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call Documents.listChildren", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "listChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.listChildren();
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", void 0 );
				} );

				it( "should call Documents.listChildren when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "listChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.listChildren( { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "listChildren" )
						.and.returnValue( Promise.resolve( [ { the: "document 1" }, { the: "document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.listChildren();

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 2" }, documents );
				} );

			} );

			describe( "Endpoint.listMembers", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.listMembers ).toBeDefined();
					expect( endpoint.listMembers ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call Documents.listMembers", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "listMembers" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.listMembers();
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", void 0 );
				} );

				it( "should call Documents.listMembers when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "listMembers" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.listMembers( { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 } );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "listMembers" )
						.and.returnValue( Promise.resolve( [ { the: "document 1" }, { the: "document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.listMembers();

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 2" }, documents );
				} );

			} );

			describe( "Endpoint.getChildren", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.getChildren ).toBeDefined();
					expect( endpoint.getChildren ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call Documents.getChildren", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getChildren();
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", void 0, void 0 );
				} );

				it( "should call Documents.getChildren when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getChildren( { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.getChildren when options & builder fn", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getChildren" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getChildren( { timeout: 5050 }, queryBuilder => queryBuilder );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 }, jasmine.any( Function ) );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "getChildren" )
						.and.returnValue( Promise.resolve( [ { the: "document 1" }, { the: "document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.getChildren();

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 2" }, documents );
				} );

			} );

			describe( "Endpoint.getMembers", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.getMembers ).toBeDefined();
					expect( endpoint.getMembers ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call Documents.getMembers", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getMembers" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getMembers();
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", void 0, void 0 );
				} );

				it( "should call Documents.getMembers when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getMembers" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getMembers( { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 }, void 0 );
				} );

				it( "should call Documents.getMembers when options & builder fn", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "getMembers" )
						.and.returnValue( Promise.resolve( [ {} ] ) );

					await endpoint.getMembers( { timeout: 5050 }, queryBuilder => queryBuilder );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 }, jasmine.any( Function ) );
				} );

				it( "should call model decorator with the created document", async () => {
					spyOn( endpoint._documents, "getMembers" )
						.and.returnValue( Promise.resolve( [ { the: "document 1" }, { the: "document 2" } ] ) );

					const factorySpy:EndpointModelFactory<any, any, any> = jasmine
						.createSpyObj( [ "decorate" ] );
					Object.defineProperty( endpoint, "_ModelFactory", { value: factorySpy } );

					await endpoint.getMembers();

					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 1" }, documents );
					expect( factorySpy.decorate ).toHaveBeenCalledWith( { the: "document 2" }, documents );
				} );

			} );

			describe( "Endpoint.delete", ():void => {

				it( "should exists", ():void => {
					expect( endpoint.delete ).toBeDefined();
					expect( endpoint.delete ).toEqual( jasmine.any( Function ) );
				} );


				it( "should call Documents.delete", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					await endpoint.delete();
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", void 0 );
				} );

				it( "should call Documents.delete when relative URI", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					await endpoint.delete( "child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/child/", void 0 );
				} );

				it( "should call Documents.delete when absolute child URI", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					await endpoint.delete( "https://example.com/endpoint/child/" );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/child/", void 0 );
				} );

				it( "should throw error when invalid URI", async () => {
					spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					try {
						await endpoint.delete( "https://example.com/another-endpoint/child/" );
					} catch( e ) {
						expect( () => { throw e; } ).toThrowError( IllegalArgumentError, `The URI "https://example.com/another-endpoint/child/" isn't a child of "https://example.com/endpoint/".` );
					}
				} );

				it( "should call Documents.delete when options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					await endpoint.delete( { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/", { timeout: 5050 } );
				} );

				it( "should call Documents.delete when relative URI & options", async () => {
					const spy:jasmine.Spy = spyOn( endpoint._documents, "delete" )
						.and.returnValue( Promise.resolve( void 0 ) );

					await endpoint.delete( "child/", { timeout: 5050 } );
					expect( spy ).toHaveBeenCalledWith( "https://example.com/endpoint/child/", { timeout: 5050 } );
				} );

			} );

		} );

	} );

} );
