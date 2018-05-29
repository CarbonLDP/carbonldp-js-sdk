import {
	BindToken,
	ConstructToken,
	FilterToken,
	IRIToken,
	LimitToken,
	LiteralToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	PredicateToken,
	PrefixedNameToken,
	PrefixToken,
	SelectToken,
	SubjectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";
import * as TokensModule from "sparqler/tokens";
import { QueryToken } from "sparqler/tokens";
import {
	createPartialMetadata,
	defineNonEnumerableProps
} from "../../test/helpers/mocks";
import { CarbonLDP } from "../CarbonLDP";
import {
	IllegalActionError,
	IllegalArgumentError,
	IllegalStateError
} from "../Errors";
import { BaseFragment } from "../Fragment";
import { Header } from "../HTTP";
import * as ObjectSchema from "../ObjectSchema";
import { ObjectSchemaDigester } from "../ObjectSchema";
import { DocumentsRegistry } from "../Registry";
import {
	BaseResource,
	PersistedResource
} from "../Resource";
import { PartialMetadata } from "../SPARQL/QueryDocument";
import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY
} from "../test/JasmineExtender";
import {
	C,
	LDP,
	XSD
} from "../Vocabularies";
import { Document } from "./index";
import { PersistedDocument } from "./PersistedDocument";
import { QueryDocumentDocument } from "./QueryDocumentDocument";


function createMock<T extends object>( data?:T & Partial<QueryDocumentDocument> ):T & QueryDocumentDocument {
	const _context:CarbonLDP | undefined = data && "_context" in data ?
		data._context : new CarbonLDP( "https://example.com/" );

	const _registry:DocumentsRegistry = _context ?
		_context.registry : new DocumentsRegistry();

	const mock:T & QueryDocumentDocument = QueryDocumentDocument.decorate( Object.assign( {
		_registry,
		_context,
		_partialMetadata: createPartialMetadata( {} ),
		id: "https://example.com/",
	}, data ) );

	defineNonEnumerableProps( mock );
	mock._normalize();

	return mock;
}

const variableHelper:( name:string ) => VariableToken = name => {
	return jasmine.objectContaining( {
		token: "variable",
		name,
	} ) as any;
};


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.QueryDocumentDocument",
		"Document that contains the methods supported by the querying features."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedDocument" ), ():void => {
			const target:PersistedDocument = {} as QueryDocumentDocument;
			expect( target ).toBeDefined();
		} );

		beforeEach( () => {
			jasmine.Ajax.install();
		} );

		afterEach( () => {
			jasmine.Ajax.uninstall();
		} );


		describe( method( OBLIGATORY, "get" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.get ).toBeDefined();
				expect( resource.get ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.get( _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self when no URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.get( _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.get( "https://example.com/resource/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.get( "relative/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:QueryDocumentDocument = createMock( { _context } );

				resource.get( "ex:resource/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.get( "https://example.org/resource/", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.get( "_:1", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.get( "#fragment", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.get( "ex:resource/", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.get( _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.get( _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.get( _ => _ );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.get( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				}, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.get( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				}, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.get( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +
					" ?document a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should send CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.get( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/resource/> }." +
					" OPTIONAL { ?document a ?document__types }." +
					" ?document a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );


			it( "should return queried document when no URI", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://example.com/ns#property-2": [ {
										"@value": "12345",
										"@type": XSD.integer,
									} ],
									"https://schema.org/property-3": [ {
										"@value": "another value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:{ property2:number, property3:string } };
				const returned:MyDocument = await resource.get<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
					property2: {
						"property2": 12345,
						"property3": "another value",
					},
				} );
			} );

			it( "should return queried document when specific URI", async () => {
				stubRequest( "https://example.com/resource/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/resource/",
							} ],
						},
						{
							"@id": "https://example.com/resource/",
							"@graph": [
								{
									"@id": "https://example.com/resource/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://example.com/ns#property-2": [ {
										"@value": "12345",
										"@type": XSD.integer,
									} ],
									"https://schema.org/property-3": [ {
										"@value": "another value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:{ property2:number, property3:string } };
				const returned:MyDocument = await resource.get<MyDocument>( "resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
					property2: {
						"property2": 12345,
						"property3": "another value",
					},
				} );
			} );

			it( "should return queried document with partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:{ property2:number, property3:string } };
				const returned:MyDocument = await resource.get<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
					property2: {
						"property2": 12345,
						"property3": "another value",
					},
				} );
			} );


			it( "should add persisted document data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );
				const returned:QueryDocumentDocument = await resource.get( _ => _
					.properties( {} )
				);

				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should add persisted data at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							}, {
								"@id": "_:4",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:4",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"2-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/another-resource/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:QueryDocumentDocument };
				const returned:MyDocument = await resource.get<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned.property2 ).toEqual( jasmine.objectContaining( {
					_eTag: "\"2-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should add partial metadata data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://example.com/ns#property-2": [ {
										"@value": "12345",
										"@type": XSD.integer,
									} ],
									"https://schema.org/property-3": [ {
										"@value": "another value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;

				type MyResource = QueryDocumentDocument & { property2:PersistedResource };
				const returned:MyResource = await resource.get<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
				} ) );
			} );

			it( "should add partial metadata at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyResource = QueryDocumentDocument & { property2:PersistedResource };
				const returned:MyResource = await resource.get<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
				} ) );
			} );

			it( "should merge query results", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-4": [ {
										"@value": "false",
										"@type": XSD.boolean,
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://schema.org/property-3": [ {
										"@value": "updated sub-value",
									} ],
									"https://schema.org/property-5": [ {
										"@value": "2010-01-01",
										"@type": XSD.dateTime,
									} ],
								},
							],
						},
					],
				} );


				interface MyDocument {
					property4:boolean;
					property1:string;
					property2:BaseResource;
				}

				const resource:QueryDocumentDocument & MyDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
					} ),
					id: "https://example.com/",

					property4: true,
					property1: "value",
					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property5": {
								"@id": "https://schema.org/property-5",
								"@type": XSD.dateTime,
							},
							"property2": {
								"@id": "property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",

						property3: "sub-value",
						property5: new Date( "2000-01-01" ),
						property2: 12345,
					},
				} );

				resource._registry
					._resourcesMap.set( "", resource as any );
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property5": {
							"@id": "https://schema.org/property-5",
							"@type": XSD.dateTime,
						},
					} )
				;

				const returned:QueryDocumentDocument & MyDocument = await resource.get<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property4": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property3": __.inherit,
								"property5": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( jasmine.objectContaining( {
					property4: false,
					property1: "value",
					property2: jasmine.objectContaining( {
						property2: 12345,
						property3: "updated sub-value",
						property5: new Date( "2010-01-01" ),
					} ) as any,
				} ) );
			} );

			it( "should merge partial metadata", async () => {
				const resource:QueryDocumentDocument & { property2:BaseResource } = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
					} ),
					id: "https://example.com/",

					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property2": {
								"@id": "property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",
					},
				} );

				resource._registry
					._resourcesMap.set( "", resource as any );
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property5": {
							"@id": "https://schema.org/property-5",
							"@type": XSD.dateTime,
						},
					} )
				;


				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"@type": [],
								},
							],
						},
					],
				} );

				const returned:QueryDocumentDocument & { property2:PersistedResource } = await resource.get<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property4": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property3": __.inherit,
								"property5": __.inherit,
							} ),
						},
					} )
				);

				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchema.ObjectSchemaDigester.digestSchema( {
					"property4": {
						"@id": "https://example.com/ns#property-4",
						"@type": XSD.boolean,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchema.ObjectSchemaDigester.digestSchema( {
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
					"property5": {
						"@id": "https://schema.org/property-5",
						"@type": XSD.dateTime,
					},
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.resolve ).toBeDefined();
				expect( resource.resolve ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.resolve( _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self ID", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.resolve( _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.resolve( _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.resolve( _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.resolve( _ => _ );

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.resolve( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				}, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send CONSTRUCT query", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.resolve( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +
					" ?document a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should add TYPES at CONSTRUCT when available", () => {
				const resource:QueryDocumentDocument = createMock( {
					types: [ "https://example.com/ns#A-Type", "https://example.com/ns#Another-Type" ],
				} );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.resolve( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +
					" ?document a" +
					"" + " <https://example.com/ns#A-Type>," +
					"" + " <https://example.com/ns#Another-Type>," +
					"" + " <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );


			it( "should return queried document", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://example.com/ns#property-2": [ {
										"@value": "12345",
										"@type": XSD.integer,
									} ],
									"https://schema.org/property-3": [ {
										"@value": "another value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:{ property2:number, property3:string } };
				const returned:MyDocument = await resource.resolve<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
					property2: {
						"property2": 12345,
						"property3": "another value",
					},
				} );
			} );

			it( "should return queried document with partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:{ property2:number, property3:string } };
				const returned:MyDocument = await resource.resolve<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
					property2: {
						"property2": 12345,
						"property3": "another value",
					},
				} );
			} );


			it( "should add persisted document data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );
				const returned:QueryDocumentDocument = await resource.resolve( _ => _
					.properties( {} )
				);

				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should add persisted data at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							}, {
								"@id": "_:4",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:4",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"2-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/another-resource/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyDocument = { property1:string, property2:QueryDocumentDocument };
				const returned:MyDocument = await resource.resolve<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned.property2 ).toEqual( jasmine.objectContaining( {
					_eTag: "\"2-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should add partial metadata data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://example.com/ns#property-2": [ {
										"@value": "12345",
										"@type": XSD.integer,
									} ],
									"https://schema.org/property-3": [ {
										"@value": "another value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;

				type MyResource = QueryDocumentDocument & { property2:PersistedResource };
				const returned:MyResource = await resource.resolve<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
				} ) );
			} );

			it( "should add partial metadata at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "https://example.com/another-resource/",
									} ],
								},
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [ {
								"@id": "https://example.com/another-resource/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": XSD.integer,
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value",
								} ],
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				type MyResource = QueryDocumentDocument & { property2:PersistedResource };
				const returned:MyResource = await resource.resolve<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);


				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
				} ) );
			} );

			it( "should merge query results", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-4": [ {
										"@value": "false",
										"@type": XSD.boolean,
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"https://schema.org/property-3": [ {
										"@value": "updated sub-value",
									} ],
									"https://schema.org/property-5": [ {
										"@value": "2010-01-01",
										"@type": XSD.dateTime,
									} ],
								},
							],
						},
					],
				} );


				interface MyDocument {
					property4:boolean;
					property1:string;
					property2:BaseResource;
				}

				const resource:QueryDocumentDocument & MyDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
					} ),
					id: "https://example.com/",

					property4: true,
					property1: "value",
					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property5": {
								"@id": "https://schema.org/property-5",
								"@type": XSD.dateTime,
							},
							"property2": {
								"@id": "property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",

						property3: "sub-value",
						property5: new Date( "2000-01-01" ),
						property2: 12345,
					},
				} );

				resource._registry
					._resourcesMap.set( "", resource as any );
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property5": {
							"@id": "https://schema.org/property-5",
							"@type": XSD.dateTime,
						},
					} )
				;

				const returned:QueryDocumentDocument & MyDocument = await resource.resolve<MyDocument>( _ => _
					.withType( "Resource" )
					.properties( {
						"property4": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property3": __.inherit,
								"property5": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( jasmine.objectContaining( {
					property4: false,
					property1: "value",
					property2: jasmine.objectContaining( {
						property2: 12345,
						property3: "updated sub-value",
						property5: new Date( "2010-01-01" ),
					} ) as any,
				} ) );
			} );

			it( "should merge partial metadata", async () => {
				const resource:QueryDocumentDocument & { property2:BaseResource } = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
					} ),
					id: "https://example.com/",

					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property2": {
								"@id": "property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",
					},
				} );

				resource._registry
					._resourcesMap.set( "", resource as any );
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "property-4",
							"@type": XSD.boolean,
						},
						"property5": {
							"@id": "https://schema.org/property-5",
							"@type": XSD.dateTime,
						},
					} )
				;


				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
								},
								{
									"@id": "_:1",
									"@type": [],
								},
							],
						},
					],
				} );

				const returned:QueryDocumentDocument & { property2:PersistedResource } = await resource.resolve<{ property2:PersistedResource }>( _ => _
					.withType( "Resource" )
					.properties( {
						"property4": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property3": __.inherit,
								"property5": __.inherit,
							} ),
						},
					} )
				);

				expect( returned._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned._partialMetadata.schema ).toEqual( ObjectSchema.ObjectSchemaDigester.digestSchema( {
					"property4": {
						"@id": "https://example.com/ns#property-4",
						"@type": XSD.boolean,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
				} ) );

				expect( returned.property2._partialMetadata ).toEqual( jasmine.any( PartialMetadata ) );
				expect( returned.property2._partialMetadata.schema ).toEqual( ObjectSchema.ObjectSchemaDigester.digestSchema( {
					"property3": {
						"@id": "https://schema.org/property-3",
						"@type": XSD.string,
					},
					"property5": {
						"@id": "https://schema.org/property-5",
						"@type": XSD.dateTime,
					},
					"property2": {
						"@id": "https://example.com/ns#property-2",
						"@type": XSD.integer,
					},
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Refresh the partial document using the partial queries that has been applied to the document, directly or indirectly.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.refresh ).toBeDefined();
				expect( resource.refresh ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.refresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );

			it( "should throw error when NOT a partial", async () => {
				const resource:QueryDocumentDocument = createMock( {
					_partialMetadata: void 0,
					id: "https://example.com/",
				} );

				await resource
					.refresh()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/" isn't a partial resource.` );
					} )
				;
			} );


			it( "should request self ID", async () => {
				const resource:QueryDocumentDocument = createMock( {
					id: "https://example.com/",
				} );

				resource.refresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( {
					id: "https://example.com/",
				} );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.refresh()
					.then( () => fail( "Should not refresh" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock( {} );

				resource.refresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock( {} );

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.refresh();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers", async () => {
				const resource:QueryDocumentDocument = createMock( {} );

				resource.refresh( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send refresh CONSTRUCT query", () => {
				const resource:QueryDocumentDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					id: "https://example.com/",

					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property5": {
								"@id": "https://schema.org/property-5",
								"@type": XSD.dateTime,
							},
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",
					},
				} );
				resource._syncSavedFragments();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				resource.refresh();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " schema:property-3 ?document__property2__property3;" +
					"" + " schema:property-5 ?document__property2__property5;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-4> ?document__property4." +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-5 ?document__property2__property5." +
					"" + "" + " FILTER( datatype( ?document__property2__property5 ) = <http://www.w3.org/2001/XMLSchema#dateTime> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" }"
				);
			} );

			it( "should send refresh CONSTRUCT query when document is .ALL", () => {
				const resource:QueryDocumentDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					id: "https://example.com/",

					property2: {
						_partialMetadata: new PartialMetadata( PartialMetadata.ALL ),
						id: "_:1",
					},
				} );
				resource._syncSavedFragments();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				resource.refresh();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 ?document__property2___predicate ?document__property2___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-4> ?document__property4." +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " ?document__property2 ?document__property2___predicate ?document__property2___object" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" }"
				);
			} );

			it( "should refresh from returned data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "updated value",
									} ],
									"https://schema.org/property-2": [ {
										"@id": "_:1",
									} ],
									"https://example.com/ns#property-4": [ {
										"@value": "false",
										"@type": XSD.boolean,
									} ],
								},
								{
									"@id": "_:1",
									"https://schema.org/property-3": [ {
										"@value": "updated sub-value",
									} ],
									"https://schema.org/property-5": [ {
										"@value": "2010-01-01",
										"@type": XSD.dateTime,
									} ],
								},
							],
						},
					],
				} );


				const resource:QueryDocumentDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": XSD.boolean,
						},
					} ),
					id: "https://example.com/",

					property1: "value",
					property3: "non query-value",
					property4: true,

					property2: {
						id: "_:1",
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property5": {
								"@id": "https://schema.org/property-5",
								"@type": XSD.dateTime,
							},
						} ),

						property3: "sub-value",
						property5: new Date( "2000-01-01" ),
						property2: 12345,
					},
				} );

				resource._syncSavedFragments();
				resource._registry._resourcesMap.set( "", resource as any );

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:PersistedResource & {
						property2:number;
						property3:string;
						property5:Date;
					};
					property3:string;
					property4:boolean;
				}

				const returned:MyDocument = await resource.refresh<MyDocument>();

				// Data updates
				expect( returned ).toEqual( jasmine.objectContaining( {
					property4: false,
					property1: "updated value",
					property2: jasmine.objectContaining( {
						property3: "updated sub-value",
						property5: new Date( "2010-01-01" ),
					} ) as any,
				} ) );

				// Non query data
				expect( returned ).toEqual( jasmine.objectContaining( {
					property3: "non query-value",
				} ) );

				// Data removed
				expect( returned.property2 ).not.toEqual( jasmine.objectContaining( {
					property2: 12345,
				} ) );
			} );


			it( "should update persisted document data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( {
					_eTag: "\"0-12345\"",
					id: "https://example.com/",
				} );
				const returned:QueryDocumentDocument = await resource.refresh();

				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

			it( "should not process if same eTag", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
									"https://example.com/ns#property-1": [ {
										"@value": "updated value",
									} ],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",

					property1: "value",
				} );

				resource._registry
					._resourcesMap.set( "", resource as any );
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;

				type MyResource = QueryDocumentDocument & { property1:string };
				const returned:MyResource = await resource.refresh<{ property1:string }>();

				expect( returned ).toEqual( jasmine.objectContaining( {
					property1: "value",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document to the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.save ).toBeDefined();
				expect( resource.save ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, frees?:object[], } = {} ):void {
				const status:number = options.status !== void 0 ?
					options.status :
					options.frees && options.frees.length ?
						200 :
						204
				;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};


				const data:string | undefined = options.frees ?
					JSON.stringify( [
						...options.frees,
					] ) :
					void 0
				;

				jasmine.Ajax
					.stubRequest( url, null, "PATCH" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: data,
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );
					await resource.save();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
				}
			} );


			it( "should throw error when self ID is outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.org/resource/" } );

				await resource
					.save()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );


			it( "should return immediately when no dirty", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( false );

				const returned:QueryDocumentDocument = await resource.save();
				expect( returned ).toBe( resource );
			} );

			it( "should throw error when outdated", async () => {
				const resource:QueryDocumentDocument = createMock( {
					_eTag: null,
					id: "https://example.com/",
				} );

				await resource
					.save()
					.then( () => fail( "should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalStateError, `"https://example.com/" is outdated and cannot be saved.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.save();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",
				} );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=minimal",
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.save();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				const resource:QueryDocumentDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				resource.save( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send update patch", async () => {
				stubRequest( "https://example.com/" );

				type MyDoc = {
					list:(string | number)[];
					pointer:BaseFragment & {
						string:string[];
						pointers:(BaseFragment & {
							string:string[];
							number:number;
						})[];
					};
				};
				const resource:QueryDocumentDocument & MyDoc = createMock( {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );


				resource._normalize();
				resource._syncSnapshot();
				resource._syncSavedFragments();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "https://example.com/ns#Document", {
						"list": {
							"@container": "@list",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#Fragment", {
						"string": {
							"@type": XSD.string,
							"@container": "@set",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#BlankNode", {
						"number": {
							"@type": XSD.integer,
						},
					} );


				resource.addType( "NewType" );
				resource.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				resource.pointer.string = [ "string 2", "string 3" ];
				resource.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				resource.pointer.pointers[ 0 ].number = 100.001;
				resource.pointer.pointers.splice( 1, 1 );

				await resource.save();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toBe( "" +
					`@prefix xsd: <${ XSD.namespace }>. ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..5 (). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 0..0 ( "4"^^xsd:float ). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..3 ( "s-1" "s-2" "s-3" ). ` +
					`Add { ` +
					`` + `<https://example.com/> a <https://example.com/ns#NewType>. ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 3". ` +
					`` + `_:blank-node <https://example.com/ns#string> "string -1". ` +
					`}. ` +
					`Delete { ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 1"; ` +
					`` + `` + `<https://example.com/ns#pointers> _:to-delete. ` +
					`` + `_:to-delete a <https://example.con/ns#Fragment>, <https://example.com/ns#BlankNode>; ` +
					`` + `` + `<https://example.com/ns#string> "string --"; ` +
					`` + `` + `<https://example.com/ns#number> "-100"^^xsd:integer. ` +
					`}.` +
					``
				);
			} );

			it( "should update blank nodes when response metadata returned", async () => {
				stubRequest( "https://example.com/", {
					frees: [
						{
							"@id": "_:responseMetadata",
							"@type": [ C.VolatileResource, C.ResponseMetadata ],
							[ C.documentMetadata ]: [ {
								"@id": "_:documentMetadata",
							} ],
						},
						{
							"@id": "_:documentMetadata",
							"@type": [ C.VolatileResource, C.DocumentMetadata ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
							[ C.bNodesMap ]: [ {
								"@id": "_:map",
							} ],
						},
						{
							"@id": "_:map",
							"@type": [ C.Map ],
							[ C.entry ]: [
								{ "@id": "_:entry-1" },
								{ "@id": "_:entry-2" },
							],
						},
						{
							"@id": "_:entry-1",
							[ C.entryKey ]: [ {
								"@id": "_:1",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-1",
							} ],
						},
						{
							"@id": "_:entry-2",
							[ C.entryKey ]: [ {
								"@id": "_:2",
							} ],
							[ C.entryValue ]: [ {
								"@id": "_:new-2",
							} ],
						},
					],
				} );

				const resource:QueryDocumentDocument & MyDoc = createMock( {
					blankNode1: {
						id: "_:1",
						string: "blank node 1",
					},
					blankNode2: {
						id: "_:2",
						string: "blank node 2",
					},
				} );
				resource._registry._resourcesMap.set( "", resource as any );

				type BNode = { id:string, string:string };
				type MyDoc = { blankNode1:BNode, blankNode2:BNode };

				const returned:QueryDocumentDocument & MyDoc = await resource.save();

				expect( returned.hasPointer( "_:1" ) ).toBe( false );
				expect( returned.blankNode1 ).toEqual( jasmine.objectContaining( {
					id: "_:new-1",
					string: "blank node 1",
				} ) );

				expect( returned.hasPointer( "_:2" ) ).toBe( false );
				expect( returned.blankNode2 ).toEqual( jasmine.objectContaining( {
					id: "_:new-2",
					string: "blank node 2",
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document and retrieves the updated data from the server.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.saveAndRefresh ).toBeDefined();
				expect( resource.saveAndRefresh ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "PATCH" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
					} );

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}


			it( "should throw error when _registry undefined", async () => {
				try {
					const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );
					await resource.saveAndRefresh();
				} catch( e ) {
					expect( () => { throw e; } )
						.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
				}
			} );


			it( "should throw error when self ID is outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.org/resource/" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "_:1" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/#fragment" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "ex:resource/" } );

				await resource
					.saveAndRefresh()
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should only refresh when NO dirty", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( false );

				await resource.saveAndRefresh();

				expect( jasmine.Ajax.requests.count() ).toBe( 1 );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "POST" );
			} );

			it( "should send PATCH to self when dirty", async () => {
				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				resource.saveAndRefresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );

			it( "should throw error when outdated", async () => {
				const resource:QueryDocumentDocument = createMock( {
					$$isDirty: true,
					_eTag: null,
					id: "https://example.com/",
				} );

				await resource
					.saveAndRefresh()
					.then( () => fail( "should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalStateError, `"https://example.com/" is outdated and cannot be saved.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				try {
					await resource.saveAndRefresh();
					fail( "Should not resolve" );
				} catch( error ) {
					if( error ) fail( error );

					expect( spy ).toHaveBeenCalled();
				}
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock( {
					_eTag: "\"1-12345\"",
					id: "https://example.com/",
				} );

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );

				await resource.saveAndRefresh();

				const request1:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
				expect( request1.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "text/ldpatch",
					"if-match": "\"1-12345\"",
					"prefer": "return=minimal",
				} );

				const request2:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
				expect( request2.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.saveAndRefresh();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers in single self child", async () => {
				const resource:QueryDocumentDocument = createMock();

				Object.defineProperty( resource, "isDirty", { writable: true } );
				spyOn( resource, "isDirty" ).and.returnValue( true );


				resource.saveAndRefresh( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send patch", async () => {
				stubRequest( "https://example.com/" );


				type MyDoc = {
					list:(string | number)[];
					pointer:BaseFragment & {
						string:string[];
						pointers:(BaseFragment & {
							string:string[];
							number:number;
						})[];
					};
				};

				const resource:QueryDocumentDocument & MyDoc = createMock( {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );


				resource._normalize();
				resource._syncSnapshot();
				resource._syncSavedFragments();
				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "https://example.com/ns#Document", {
						"list": {
							"@container": "@list",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#Fragment", {
						"string": {
							"@type": XSD.string,
							"@container": "@set",
						},
						"pointer": {
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "https://example.com/ns#BlankNode", {
						"number": {
							"@type": XSD.integer,
						},
					} );


				resource.addType( "NewType" );
				resource.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				resource.pointer.string = [ "string 2", "string 3" ];
				resource.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				resource.pointer.pointers[ 0 ].number = 100.001;
				resource.pointer.pointers.splice( 1, 1 );

				await resource.saveAndRefresh();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.first();
				expect( request.params ).toBe( "" +
					`@prefix xsd: <${ XSD.namespace }>. ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..5 (). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 0..0 ( "4"^^xsd:float ). ` +
					`UpdateList <https://example.com/> <https://example.com/ns#list> 3..3 ( "s-1" "s-2" "s-3" ). ` +
					`Add { ` +
					`` + `<https://example.com/> a <https://example.com/ns#NewType>. ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 3". ` +
					`` + `_:blank-node <https://example.com/ns#string> "string -1". ` +
					`}. ` +
					`Delete { ` +
					`` + `<https://example.com/#fragment> <https://example.com/ns#string> "string 1"; ` +
					`` + `` + `<https://example.com/ns#pointers> _:to-delete. ` +
					`` + `_:to-delete a <https://example.con/ns#Fragment>, <https://example.com/ns#BlankNode>; ` +
					`` + `` + `<https://example.com/ns#string> "string --"; ` +
					`` + `` + `<https://example.com/ns#number> "-100"^^xsd:integer. ` +
					`}.` +
					``
				);
			} );

			it( "should send refresh CONSTRUCT query", () => {
				const resource:QueryDocumentDocument = createMock( {
					_partialMetadata: createPartialMetadata( {
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					id: "https://example.com/",

					property2: {
						_partialMetadata: createPartialMetadata( {
							"@vocab": "https://example.com/ns#",
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
							"property5": {
								"@id": "https://schema.org/property-5",
								"@type": XSD.dateTime,
							},
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
						} ),
						id: "_:1",
					},
				} );
				resource._syncSavedFragments();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				resource.refresh();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 a ?document__property2__types;" +
					"" + " schema:property-3 ?document__property2__property3;" +
					"" + " schema:property-5 ?document__property2__property5;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" VALUES ?document { <https://example.com/> }." +
					" OPTIONAL { ?document a ?document__types }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-4> ?document__property4." +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document schema:property-2 ?document__property2." +
					"" + " FILTER( ! isLiteral( ?document__property2 ) )." +
					"" + " OPTIONAL { ?document__property2 a ?document__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-3 ?document__property2__property3." +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 schema:property-5 ?document__property2__property5." +
					"" + "" + " FILTER( datatype( ?document__property2__property5 ) = <http://www.w3.org/2001/XMLSchema#dateTime> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2." +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +
					" }." +

					" OPTIONAL {" +
					"" + " ?document <https://example.com/ns#property-1> ?document__property1." +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" }"
				);
			} );

			it( "should update PersistedDocument data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "_:1",
							"@type": [
								C.VolatileResource,
								C.QueryMetadata,
							],
							[ C.target ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "_:2",
							"@type": [
								C.ResponseMetadata,
								C.VolatileResource,
							],
							[ C.documentMetadata ]: [ {
								"@id": "_:3",
							} ],
						},
						{
							"@id": "_:3",
							"@type": [
								C.DocumentMetadata,
								C.VolatileResource,
							],
							[ C.eTag ]: [ {
								"@value": "\"1-12345\"",
							} ],
							[ C.relatedDocument ]: [ {
								"@id": "https://example.com/",
							} ],
						},
						{
							"@id": "https://example.com/",
							"@graph": [
								{
									"@id": "https://example.com/",
									"@type": [
										LDP.RDFSource,
										LDP.BasicContainer,
										C.Document,
										"https://example.com/ns#Resource",
									],
								},
							],
						},
					],
				} );

				const resource:QueryDocumentDocument = createMock( {
					eTag: "\"0-12345\"",
					string: "document",
				} );


				const returned:QueryDocumentDocument = await resource.saveAndRefresh();
				expect( returned ).toEqual( jasmine.objectContaining( {
					_eTag: "\"1-12345\"",
					_resolved: true,
				} ) );
			} );

		} );


		describe( method( OBLIGATORY, "getChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.getChildren ).toBeDefined();
				expect( resource.getChildren ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}

			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.getChildren()
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self when no URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getChildren();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getChildren( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getChildren( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:QueryDocumentDocument = createMock( { _context } );

				resource.getChildren( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getChildren( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getChildren( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getChildren( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getChildren( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.getChildren()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getChildren();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.getChildren();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.getChildren( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getChildren( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getChildren( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types;" +
					"" + " <https://example.com/ns#property-1> ?child__property1;" +
					"" + " schema:property-2 ?child__property2." +

					" ?child__property2 a ?child__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?child__property2__property2;" +
					"" + " schema:property-3 ?child__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#contains> ?child." +
					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" OPTIONAL { ?child a ?child__types }." +
					" ?child a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?child <https://example.com/ns#property-1> ?child__property1." +
					"" + " FILTER( datatype( ?child__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?child schema:property-2 ?child__property2." +
					"" + " FILTER( ! isLiteral( ?child__property2 ) )." +
					"" + " OPTIONAL { ?child__property2 a ?child__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?child__property2 <https://example.com/ns#property-2> ?child__property2__property2." +
					"" + "" + " FILTER( datatype( ?child__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?child__property2 schema:property-3 ?child__property2__property3." +
					"" + "" + " FILTER( datatype( ?child__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should send partial CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getChildren( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types;" +
					"" + " <https://example.com/ns#property-1> ?child__property1;" +
					"" + " schema:property-2 ?child__property2." +

					" ?child__property2 a ?child__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?child__property2__property2;" +
					"" + " schema:property-3 ?child__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#contains> ?child." +
					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" OPTIONAL { ?child a ?child__types }." +
					" ?child a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?child <https://example.com/ns#property-1> ?child__property1." +
					"" + " FILTER( datatype( ?child__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?child schema:property-2 ?child__property2." +
					"" + " FILTER( ! isLiteral( ?child__property2 ) )." +
					"" + " OPTIONAL { ?child__property2 a ?child__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?child__property2 <https://example.com/ns#property-2> ?child__property2__property2." +
					"" + "" + " FILTER( datatype( ?child__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?child__property2 schema:property-3 ?child__property2__property3." +
					"" + "" + " FILTER( datatype( ?child__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should send full CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getChildren();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child___subject ?child___predicate ?child___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#contains> ?child" +
					"" + " }" +
					" }." +

					" GRAPH ?child {" +
					"" + " ?child___subject ?child___predicate ?child___object" +
					" } " +

					"}"
				);
			} );

			it( "should send full CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getChildren( "resource/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child___subject ?child___predicate ?child___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#contains> ?child" +
					"" + " }" +
					" }." +

					" GRAPH ?child {" +
					"" + " ?child___subject ?child___predicate ?child___object" +
					" } " +

					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": XSD.integer,
						},
					} )
				;


				resource.getChildren( _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child ?child___predicate ?child___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#contains> ?child." +
					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" ?child ?child___predicate ?child___object." +

					" OPTIONAL {" +
					"" + " ?child schema:property-2 ?child__property2." +
					"" + " FILTER( datatype( ?child__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": XSD.integer,
						},
					} )
				;


				resource.getChildren( "resource/", _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child ?child___predicate ?child___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#contains> ?child." +
					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" ?child ?child___predicate ?child___object." +

					" OPTIONAL {" +
					"" + " ?child schema:property-2 ?child__property2." +
					"" + " FILTER( datatype( ?child__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered without optional CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"ex": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				const queryTokenClass:{ new( ...args:any[] ) } = QueryToken;
				let query:QueryToken = void 0;
				spyOn( TokensModule, "QueryToken" ).and.callFake( ( ...args:any[] ) => {
					return query = new queryTokenClass( ...args );
				} );

				resource.getChildren( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __
								.properties( {
									"property2": {
										"query": ___ => ___
											.values( ___.value( 12345 ).withType( "integer" ) )
										,
									},
									"property3": __.inherit,
								} )
								.filter( `${ __.property( "property2" ) } = ${ __.value( 12345 ).withType( "integer" ) }` )
							,
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);

				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( variableHelper( "metadata" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new IRIToken( C.VolatileResource ) )
								.addObject( new IRIToken( C.QueryMetadata ) )
							)
							.addPredicate( new PredicateToken( new IRIToken( C.target ) )
								.addObject( variableHelper( "child" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "child__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "child__property1" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "child__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child__property2" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "child__property2__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "child__property2__property2" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "child__property2__property3" ) )
							)
						)

						.addPattern( new BindToken( "BNODE()", variableHelper( "metadata" ) ) )
						.addPattern( new SelectToken( "DISTINCT" )
							.addVariable( variableHelper( "child" ) )
							.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
								.addPredicate( new PredicateToken( new IRIToken( LDP.contains ) )
									.addObject( variableHelper( "child" ) )
								)
							)
							.addPattern( new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
										.addObject( variableHelper( "child__property2" ) )
									)
								)
							)
							.addModifier( new OrderToken( variableHelper( "child__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( "a" )
										.addObject( variableHelper( "child__types" ) )
									)
								)
						)
						.addPattern( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new PrefixedNameToken( "ex:Resource" ) )
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
										.addObject( variableHelper( "child__property1" ) )
									)
								)
								.addPattern( new FilterToken( "datatype( ?child__property1 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?child__property2__property2 = "12345"^^xsd:integer` ) )
						.addPattern( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "child__property2" ) )
							)
						)
						.addPattern( new FilterToken( "! isLiteral( ?child__property2 )" ) )
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
								.addPredicate( new PredicateToken( "a" )
									.addObject( variableHelper( "child__property2__types" ) )
								)
							)
						)
						.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "child__property2__property2" ) )
							)
						)
						.addPattern( new FilterToken( "datatype( ?child__property2__property2 ) = xsd:integer" ) )
						.addPattern( new ValuesToken()
							.addValues(
								variableHelper( "child__property2__property2" ),
								new LiteralToken( 12345 ).setType( "xsd:integer" )
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
								.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
									.addObject( variableHelper( "child__property2__property3" ) )
								)
							)
							.addPattern( new FilterToken( "datatype( ?child__property2__property3 ) = xsd:string" ) )
						)
					)

						.addPrologues( new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) )
						.addPrologues( new PrefixToken( "schema", new IRIToken( "https://schema.org/" ) ) )
				);
			} );

			it( "should send filtered without optional CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"ex": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				const queryTokenClass:{ new( ...args:any[] ) } = QueryToken;
				let query:QueryToken = void 0;
				spyOn( TokensModule, "QueryToken" ).and.callFake( ( ...args:any[] ) => {
					return query = new queryTokenClass( ...args );
				} );

				resource.getChildren( "resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __
								.properties( {
									"property2": {
										"query": ___ => ___
											.values( ___.value( 12345 ).withType( "integer" ) )
										,
									},
									"property3": __.inherit,
								} )
								.filter( `${ __.property( "property2" ) } = ${ __.value( 12345 ).withType( "integer" ) }` )
							,
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);

				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( variableHelper( "metadata" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new IRIToken( C.VolatileResource ) )
								.addObject( new IRIToken( C.QueryMetadata ) )
							)
							.addPredicate( new PredicateToken( new IRIToken( C.target ) )
								.addObject( variableHelper( "child" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "child__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "child__property1" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "child__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child__property2" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "child__property2__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "child__property2__property2" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "child__property2__property3" ) )
							)
						)

						.addPattern( new BindToken( "BNODE()", variableHelper( "metadata" ) ) )
						.addPattern( new SelectToken( "DISTINCT" )
							.addVariable( variableHelper( "child" ) )
							.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
								.addPredicate( new PredicateToken( new IRIToken( LDP.contains ) )
									.addObject( variableHelper( "child" ) )
								)
							)
							.addPattern( new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
										.addObject( variableHelper( "child__property2" ) )
									)
								)
							)
							.addModifier( new OrderToken( variableHelper( "child__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( "a" )
										.addObject( variableHelper( "child__types" ) )
									)
								)
						)
						.addPattern( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new PrefixedNameToken( "ex:Resource" ) )
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "child" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
										.addObject( variableHelper( "child__property1" ) )
									)
								)
								.addPattern( new FilterToken( "datatype( ?child__property1 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?child__property2__property2 = "12345"^^xsd:integer` ) )
						.addPattern( new SubjectToken( variableHelper( "child" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "child__property2" ) )
							)
						)
						.addPattern( new FilterToken( "! isLiteral( ?child__property2 )" ) )
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
								.addPredicate( new PredicateToken( "a" )
									.addObject( variableHelper( "child__property2__types" ) )
								)
							)
						)
						.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "child__property2__property2" ) )
							)
						)
						.addPattern( new FilterToken( "datatype( ?child__property2__property2 ) = xsd:integer" ) )
						.addPattern( new ValuesToken()
							.addValues(
								variableHelper( "child__property2__property2" ),
								new LiteralToken( 12345 ).setType( "xsd:integer" )
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
								.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
									.addObject( variableHelper( "child__property2__property3" ) )
								)
							)
							.addPattern( new FilterToken( "datatype( ?child__property2__property3 ) = xsd:string" ) )
						)
					)

						.addPrologues( new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) )
						.addPrologues( new PrefixToken( "schema", new IRIToken( "https://schema.org/" ) ) )
				);
			} );


			it( "should order returned children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;

				interface MyDocument {
					property1:string;
					property2:{
						property2:number;
						property3:string;
					};
				}


				resource.getChildren<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2.property2", "DESC" )
				).then( ( myDocuments ) => {
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"property2": jasmine.objectContaining( {
							"property2": 67890,
						} ) as any,
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"property2": jasmine.objectContaining( {
							"property2": 12345,
						} ) as any,
					} ) );

					done();
				} ).catch( done.fail );
			} );

			it( "should return full children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"@type": [
									"https://schema.org/Fragment"
								],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ],
								"https://schema.org/property-4": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"@type": [
									"https://schema.org/Fragment"
								],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ],
								"https://schema.org/property-4": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "schema:Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "schema:Fragment", {
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": XSD.integer,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{
						property3:string;
						property4:number;
					};
				}

				resource.getChildren<MyDocument>( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
						expect( document.isPartial() ).toBe( false );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any,
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property3": "another value 2",
							"property4": 67890,
						} ) as any,
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return .ALL children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "schema:Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "schema:Fragment", {
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": XSD.integer,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{
						property3:string;
						property4:number;
					};
				}

				resource.getChildren<MyDocument>( "https://example.com/resource/", _ => _.properties( _.all ) )
					.then( ( myDocuments ) => {
						expect( myDocuments ).toEqual( jasmine.any( Array ) );
						expect( myDocuments.length ).toBe( 2 );
						for( const document of myDocuments ) {
							expect( Document.is( document ) ).toBe( true );
							expect( document.isPartial() ).toBe( true );
						}

						expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
							"_eTag": "\"1-12345\"",
							"property1": "value 1",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any );

						expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
							"_eTag": "\"2-12345\"",
							"property1": "value 2",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 2",
							"property4": 67890,
						} ) as any );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return partial children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{};
				}

				resource.getChildren<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return partial children with partial relations", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							}, {
								"@id": "_:6"
							}, {
								"@id": "_:7"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:6",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"3-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/sub-documents/sub-document1/"
							} ]
						}, {
							"@id": "_:7",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"4-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/sub-documents/sub-document2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "https://example.com/sub-documents/sub-document1/"
								} ]
							} ]
						}, {
							"@id": "https://example.com/sub-documents/sub-document1/",
							"@graph": [ {
								"@id": "https://example.com/sub-documents/sub-document1/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "https://example.com/sub-documents/sub-document2/"
								} ]
							} ]
						}, {
							"@id": "https://example.com/sub-documents/sub-document2/",
							"@graph": [ {
								"@id": "https://example.com/sub-documents/sub-document2/",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{};
				}

				resource.getChildren<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"_eTag": "\"3-12345\"",
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"_eTag": "\"4-12345\"",
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );

		} );

		describe( method( OBLIGATORY, "getMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.getMembers ).toBeDefined();
				expect( resource.getMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}

			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.getMembers()
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self when no URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getMembers();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getMembers( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getMembers( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:QueryDocumentDocument = createMock( { _context } );

				resource.getMembers( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getMembers( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getMembers( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getMembers( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.getMembers( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.getMembers()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getMembers();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferDocumentETags }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.getMembers();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.getMembers( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.getMembers( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getMembers( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types;" +
					"" + " <https://example.com/ns#property-1> ?member__property1;" +
					"" + " schema:property-2 ?member__property2." +

					" ?member__property2 a ?member__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?member__property2__property2;" +
					"" + " schema:property-3 ?member__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +
					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" OPTIONAL { ?member a ?member__types }." +
					" ?member a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?member <https://example.com/ns#property-1> ?member__property1." +
					"" + " FILTER( datatype( ?member__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?member schema:property-2 ?member__property2." +
					"" + " FILTER( ! isLiteral( ?member__property2 ) )." +
					"" + " OPTIONAL { ?member__property2 a ?member__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?member__property2 <https://example.com/ns#property-2> ?member__property2__property2." +
					"" + "" + " FILTER( datatype( ?member__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?member__property2 schema:property-3 ?member__property2__property3." +
					"" + "" + " FILTER( datatype( ?member__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should send partial CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getMembers( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types;" +
					"" + " <https://example.com/ns#property-1> ?member__property1;" +
					"" + " schema:property-2 ?member__property2." +

					" ?member__property2 a ?member__property2__types;" +
					"" + " <https://example.com/ns#property-2> ?member__property2__property2;" +
					"" + " schema:property-3 ?member__property2__property3 " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +
					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" OPTIONAL { ?member a ?member__types }." +
					" ?member a <https://example.com/ns#Resource>." +

					" OPTIONAL {" +
					"" + " ?member <https://example.com/ns#property-1> ?member__property1." +
					"" + " FILTER( datatype( ?member__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }." +

					" OPTIONAL {" +
					"" + " ?member schema:property-2 ?member__property2." +
					"" + " FILTER( ! isLiteral( ?member__property2 ) )." +
					"" + " OPTIONAL { ?member__property2 a ?member__property2__types }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?member__property2 <https://example.com/ns#property-2> ?member__property2__property2." +
					"" + "" + " FILTER( datatype( ?member__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }." +

					"" + " OPTIONAL {" +
					"" + "" + " ?member__property2 schema:property-3 ?member__property2__property3." +
					"" + "" + " FILTER( datatype( ?member__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" } " +
					"}"
				);
			} );

			it( "should send full CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getMembers();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member___subject ?member___predicate ?member___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }." +

					" GRAPH ?member {" +
					"" + " ?member___subject ?member___predicate ?member___object" +
					" } " +

					"}"
				);
			} );

			it( "should send full CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.getMembers( "resource/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member___subject ?member___predicate ?member___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }." +

					" GRAPH ?member {" +
					"" + " ?member___subject ?member___predicate ?member___object" +
					" } " +

					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": XSD.integer,
						},
					} )
				;


				resource.getMembers( _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member ?member___predicate ?member___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +
					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" ?member ?member___predicate ?member___object." +

					" OPTIONAL {" +
					"" + " ?member schema:property-2 ?member__property2." +
					"" + " FILTER( datatype( ?member__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": XSD.integer,
						},
					} )
				;


				resource.getMembers( "resource/", _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member ?member___predicate ?member___object " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +
					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }." +

					" ?member ?member___predicate ?member___object." +

					" OPTIONAL {" +
					"" + " ?member schema:property-2 ?member__property2." +
					"" + " FILTER( datatype( ?member__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered without optional CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"ex": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				const queryTokenClass:{ new( ...args:any[] ) } = QueryToken;
				let query:QueryToken = void 0;
				spyOn( TokensModule, "QueryToken" ).and.callFake( ( ...args:any[] ) => {
					return query = new queryTokenClass( ...args );
				} );

				resource.getMembers( _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __
								.properties( {
									"property2": {
										"query": ___ => ___
											.values( ___.value( 12345 ).withType( "integer" ) )
										,
									},
									"property3": __.inherit,
								} )
								.filter( `${ __.property( "property2" ) } = ${ __.value( 12345 ).withType( "integer" ) }` )
							,
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);

				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( variableHelper( "metadata" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new IRIToken( C.VolatileResource ) )
								.addObject( new IRIToken( C.QueryMetadata ) )
							)
							.addPredicate( new PredicateToken( new IRIToken( C.target ) )
								.addObject( variableHelper( "member" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "member__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "member__property1" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "member__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member__property2" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "member__property2__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "member__property2__property2" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "member__property2__property3" ) )
							)
						)

						.addPattern( new BindToken( "BNODE()", variableHelper( "metadata" ) ) )
						.addPattern( new SelectToken( "DISTINCT" )
							.addVariable( variableHelper( "member" ) )
							.addPattern( new SubjectToken( new IRIToken( "https://example.com/" ) )
								.addPredicate( new PredicateToken( new IRIToken( LDP.membershipResource ) )
									.addObject( variableHelper( "membershipResource" ) )
								)
								.addPredicate( new PredicateToken( new IRIToken( LDP.hasMemberRelation ) )
									.addObject( variableHelper( "hasMemberRelation" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "membershipResource" ) )
								.addPredicate( new PredicateToken( variableHelper( "hasMemberRelation" ) )
									.addObject( variableHelper( "member" ) )
								)
							)
							.addPattern( new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
										.addObject( variableHelper( "member__property2" ) )
									)
								)
							)
							.addModifier( new OrderToken( variableHelper( "member__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( "a" )
										.addObject( variableHelper( "member__types" ) )
									)
								)
						)
						.addPattern( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new PrefixedNameToken( "ex:Resource" ) )
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
										.addObject( variableHelper( "member__property1" ) )
									)
								)
								.addPattern( new FilterToken( "datatype( ?member__property1 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?member__property2__property2 = "12345"^^xsd:integer` ) )
						.addPattern( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "member__property2" ) )
							)
						)
						.addPattern( new FilterToken( "! isLiteral( ?member__property2 )" ) )
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
								.addPredicate( new PredicateToken( "a" )
									.addObject( variableHelper( "member__property2__types" ) )
								)
							)
						)
						.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "member__property2__property2" ) )
							)
						)
						.addPattern( new FilterToken( "datatype( ?member__property2__property2 ) = xsd:integer" ) )
						.addPattern( new ValuesToken()
							.addValues(
								variableHelper( "member__property2__property2" ),
								new LiteralToken( 12345 ).setType( "xsd:integer" )
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
								.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
									.addObject( variableHelper( "member__property2__property3" ) )
								)
							)
							.addPattern( new FilterToken( "datatype( ?member__property2__property3 ) = xsd:string" ) )
						)
					)

						.addPrologues( new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) )
						.addPrologues( new PrefixToken( "schema", new IRIToken( "https://schema.org/" ) ) )
				);
			} );

			it( "should send filtered without optional CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"ex": "https://example.com/ns#",
						"xsd": XSD.namespace,
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				const queryTokenClass:{ new( ...args:any[] ) } = QueryToken;
				let query:QueryToken = void 0;
				spyOn( TokensModule, "QueryToken" ).and.callFake( ( ...args:any[] ) => {
					return query = new queryTokenClass( ...args );
				} );

				resource.getMembers( "resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __
								.properties( {
									"property2": {
										"query": ___ => ___
											.values( ___.value( 12345 ).withType( "integer" ) )
										,
									},
									"property3": __.inherit,
								} )
								.filter( `${ __.property( "property2" ) } = ${ __.value( 12345 ).withType( "integer" ) }` )
							,
						},
					} )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);

				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( variableHelper( "metadata" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new IRIToken( C.VolatileResource ) )
								.addObject( new IRIToken( C.QueryMetadata ) )
							)
							.addPredicate( new PredicateToken( new IRIToken( C.target ) )
								.addObject( variableHelper( "member" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "member__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "member__property1" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "member__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member__property2" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( variableHelper( "member__property2__types" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "member__property2__property2" ) )
							)
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "member__property2__property3" ) )
							)
						)

						.addPattern( new BindToken( "BNODE()", variableHelper( "metadata" ) ) )
						.addPattern( new SelectToken( "DISTINCT" )
							.addVariable( variableHelper( "member" ) )
							.addPattern( new SubjectToken( new IRIToken( "https://example.com/resource/" ) )
								.addPredicate( new PredicateToken( new IRIToken( LDP.membershipResource ) )
									.addObject( variableHelper( "membershipResource" ) )
								)
								.addPredicate( new PredicateToken( new IRIToken( LDP.hasMemberRelation ) )
									.addObject( variableHelper( "hasMemberRelation" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "membershipResource" ) )
								.addPredicate( new PredicateToken( variableHelper( "hasMemberRelation" ) )
									.addObject( variableHelper( "member" ) )
								)
							)
							.addPattern( new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
										.addObject( variableHelper( "member__property2" ) )
									)
								)
							)
							.addModifier( new OrderToken( variableHelper( "member__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( "a" )
										.addObject( variableHelper( "member__types" ) )
									)
								)
						)
						.addPattern( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( "a" )
								.addObject( new PrefixedNameToken( "ex:Resource" ) )
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new SubjectToken( variableHelper( "member" ) )
									.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-1" ) )
										.addObject( variableHelper( "member__property1" ) )
									)
								)
								.addPattern( new FilterToken( "datatype( ?member__property1 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?member__property2__property2 = "12345"^^xsd:integer` ) )
						.addPattern( new SubjectToken( variableHelper( "member" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "member__property2" ) )
							)
						)
						.addPattern( new FilterToken( "! isLiteral( ?member__property2 )" ) )
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
								.addPredicate( new PredicateToken( "a" )
									.addObject( variableHelper( "member__property2__types" ) )
								)
							)
						)
						.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "member__property2__property2" ) )
							)
						)
						.addPattern( new FilterToken( "datatype( ?member__property2__property2 ) = xsd:integer" ) )
						.addPattern( new ValuesToken()
							.addValues(
								variableHelper( "member__property2__property2" ),
								new LiteralToken( 12345 ).setType( "xsd:integer" )
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
								.addPredicate( new PredicateToken( new PrefixedNameToken( "schema:property-3" ) )
									.addObject( variableHelper( "member__property2__property3" ) )
								)
							)
							.addPattern( new FilterToken( "datatype( ?member__property2__property3 ) = xsd:string" ) )
						)
					)

						.addPrologues( new PrefixToken( "ex", new IRIToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIToken( XSD.namespace ) ) )
						.addPrologues( new PrefixToken( "schema", new IRIToken( "https://schema.org/" ) ) )
				);
			} );


			it( "should order returned members", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;

				interface MyDocument {
					property1:string;
					property2:{
						property2:number;
						property3:string;
					};
				}


				resource.getMembers<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
					.orderBy( "property2.property2", "DESC" )
				).then( ( myDocuments ) => {
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"property2": jasmine.objectContaining( {
							"property2": 67890,
						} ) as any,
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"property2": jasmine.objectContaining( {
							"property2": 12345,
						} ) as any,
					} ) );

					done();
				} ).catch( done.fail );
			} );

			it( "should return full children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"@type": [
									"https://schema.org/Fragment"
								],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ],
								"https://schema.org/property-4": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"@type": [
									"https://schema.org/Fragment"
								],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ],
								"https://schema.org/property-4": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "schema:Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "schema:Fragment", {
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": XSD.integer,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{
						property3:string;
						property4:number;
					};
				}

				resource.getMembers<MyDocument>( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
						expect( document.isPartial() ).toBe( false );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any,
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property3": "another value 2",
							"property4": 67890,
						} ) as any,
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return .ALL children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "schema:Resource", {
						"property1": {
							"@id": "https://schema.org/property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
						},
					} )
					.extendObjectSchema( "schema:Fragment", {
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": XSD.integer,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{
						property3:string;
						property4:number;
					};
				}

				resource.getMembers<MyDocument>( "https://example.com/resource/", _ => _.properties( _.all ) )
					.then( ( myDocuments ) => {
						expect( myDocuments ).toEqual( jasmine.any( Array ) );
						expect( myDocuments.length ).toBe( 2 );
						for( const document of myDocuments ) {
							expect( Document.is( document ) ).toBe( true );
							expect( document.isPartial() ).toBe( true );
						}

						expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
							"_eTag": "\"1-12345\"",
							"property1": "value 1",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any );

						expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
							"_eTag": "\"2-12345\"",
							"property1": "value 2",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 2",
							"property4": 67890,
						} ) as any );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return partial children", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:1"
								} ]
							}, {
								"@id": "_:1",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							}, {
								"@id": "_:2",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{};
				}

				resource.getMembers<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return partial children with partial relations", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:4"
							}, {
								"@id": "_:5"
							}, {
								"@id": "_:6"
							}, {
								"@id": "_:7"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child1/"
							} ]
						}, {
							"@id": "_:5",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "_:6",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"3-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/sub-documents/sub-document1/"
							} ]
						}, {
							"@id": "_:7",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"4-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/sub-documents/sub-document2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 1"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "https://example.com/sub-documents/sub-document1/"
								} ]
							} ]
						}, {
							"@id": "https://example.com/sub-documents/sub-document1/",
							"@graph": [ {
								"@id": "https://example.com/sub-documents/sub-document1/",
								"https://example.com/ns#property-2": [ {
									"@value": "12345",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 1"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"https://example.com/ns#property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "https://example.com/sub-documents/sub-document2/"
								} ]
							} ]
						}, {
							"@id": "https://example.com/sub-documents/sub-document2/",
							"@graph": [ {
								"@id": "https://example.com/sub-documents/sub-document2/",
								"https://example.com/ns#property-2": [ {
									"@value": "67890",
									"@type": "${ XSD.integer }"
								} ],
								"https://schema.org/property-3": [ {
									"@value": "another value 2"
								} ]
							} ]
						} ]`,
				} );


				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					} )
				;


				interface MyDocument {
					property1:string;
					property2:{};
				}

				resource.getMembers<MyDocument>( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const document of myDocuments ) {
						expect( Document.is( document ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"_eTag": "\"3-12345\"",
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"_eTag": "\"4-12345\"",
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );

		} );


		describe( method( OBLIGATORY, "listChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of the current document",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of the specified URI.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.listChildren ).toBeDefined();
				expect( resource.listChildren ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}

			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.listChildren()
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self when no URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listChildren();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listChildren( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listChildren( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:QueryDocumentDocument = createMock( { _context } );

				resource.listChildren( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listChildren( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listChildren( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listChildren( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listChildren( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.listChildren()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listChildren();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.listChildren();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.listChildren( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listChildren( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.listChildren();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + ` <https://example.com/> <${ LDP.contains }> ?child` +
					"" + " }" +
					" }." +

					" OPTIONAL { ?child a ?child__types } " +

					"}"
				);
			} );

			it( "should send partial CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.listChildren( "https://example.com/resource/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?child WHERE {" +
					"" + "" + ` <https://example.com/resource/> <${ LDP.contains }> ?child` +
					"" + " }" +
					" }." +

					" OPTIONAL { ?child a ?child__types } " +

					"}"
				);
			} );


			it( "should return documents", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();


				resource.listChildren( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": void 0,
						"_resolved": false,
						"types": [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": void 0,
						"_resolved": false,
						"types": [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					done();
				} ).catch( done.fail );
			} );

			it( "should NOT return partial documents", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();


				resource.listChildren( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ].isPartial() ).toBe( false );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ].isPartial() ).toBe( false );

					done();
				} ).catch( done.fail );
			} );

		} );

		describe( method( OBLIGATORY, "listMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of the current document",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of the specified URI.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryDocumentDocument = createMock();

				expect( resource.listMembers ).toBeDefined();
				expect( resource.listMembers ).toEqual( jasmine.any( Function ) );
			} );


			function stubRequest( url:string, options:{ status?:number, headers?:{ [ key:string ]:string }, resources?:object[] } = {} ):void {
				const status:number = options.status ?
					options.status : 200;

				// noinspection JSMismatchedCollectionQueryUpdate
				const headers:{ [ key:string ]:string } = options.headers ?
					options.headers : {};

				const resources:object[] = options.resources ?
					options.resources : [];

				jasmine.Ajax
					.stubRequest( url, null, "POST" )
					.andReturn( {
						status,
						responseHeaders: {
							...headers,
						},
						responseText: JSON.stringify( resources ),
					} );
			}

			it( "should throw error when _registry undefined", async () => {
				const resource:QueryDocumentDocument = createMock( { _registry: void 0 } );

				await resource
					.listMembers()
					.then( () => fail( "Should not resolve." ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalActionError, `"https://example.com/" doesn't support Querying requests.` );
					} )
				;
			} );


			it( "should request self when no URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listMembers();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );

			it( "should request the URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listMembers( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listMembers( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				const _context:CarbonLDP = new CarbonLDP( "https://example.com/" );
				_context.extendObjectSchema( { "ex": "https://example.com/" } );

				const resource:QueryDocumentDocument = createMock( { _context } );

				resource.listMembers( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listMembers( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listMembers( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listMembers( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				const resource:QueryDocumentDocument = createMock();

				await resource
					.listMembers( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );

			it( "should parse error response", async () => {
				stubRequest( "https://example.com/", { status: 500 } );

				const resource:QueryDocumentDocument = createMock( { id: "https://example.com/" } );

				const spy:jasmine.Spy = spyOn( resource._registry, "_parseErrorResponse" )
					.and.callFake( () => Promise.reject( null ) );

				await resource
					.listMembers()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalled();
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listMembers();

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add authentication header", async () => {
				const resource:QueryDocumentDocument = createMock();

				const spy:jasmine.Spy = spyOn( resource._context.auth, "addAuthentication" );

				resource.listMembers();

				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add custom headers when no URI", async () => {
				stubRequest( "https://example.com/" );

				const resource:QueryDocumentDocument = createMock();

				resource.listMembers( {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );

			it( "should add custom headers when specific URI", async () => {
				const resource:QueryDocumentDocument = createMock();

				resource.listMembers( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query when no URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.listMembers();


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }." +

					" OPTIONAL { ?member a ?member__types } " +

					"}"
				);
			} );

			it( "should send partial CONSTRUCT query when specific URI", () => {
				const resource:QueryDocumentDocument = createMock();

				resource._context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
					.extendObjectSchema( "Resource", {
						"property1": {
							"@id": "property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "property-2",
							"@type": "integer",
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": "string",
						},
					} )
				;


				resource.listMembers( "https://example.com/resource/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types " +

					"} WHERE {" +
					" BIND(BNODE() AS ?metadata)." +

					" {" +
					"" + " SELECT DISTINCT ?member WHERE {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation." +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }." +

					" OPTIONAL { ?member a ?member__types } " +

					"}"
				);
			} );


			it( "should return documents", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();


				resource.listMembers( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": void 0,
						"_resolved": false,
						"types": [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"_eTag": void 0,
						"_resolved": false,
						"types": [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					done();
				} ).catch( done.fail );
			} );

			it( "should NOT return partial documents", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child1/"
							} ]
						}, {
							"@id":"_:2",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/child2/"
							} ]
						}, {
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						}, {
							"@id": "https://example.com/resource/child2/",
							"@graph": [ {
								"@id": "https://example.com/resource/child2/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								]
							} ]
						} ]`,
				} );

				const resource:QueryDocumentDocument = createMock();


				resource.listMembers( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ].isPartial() ).toBe( false );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ].isPartial() ).toBe( false );

					done();
				} ).catch( done.fail );
			} );

		} );

	} );

} );
