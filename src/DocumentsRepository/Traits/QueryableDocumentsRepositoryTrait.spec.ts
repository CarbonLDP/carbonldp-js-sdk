import {
	ConstructToken,
	FilterToken,
	GraphToken,
	IRIRefToken,
	LimitToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	PrefixedNameToken,
	PrefixToken,
	PropertyToken,
	QueryToken,
	RDFLiteralToken,
	SubjectToken,
	SubSelectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";

import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";
import { createMockDigestedSchemaProperty, createMockQueryableMetadata } from "../../../test/helpers/mocks";
import { createSubMockQueryableMetadata } from "../../../test/helpers/mocks/querying/QueriableMetadata";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import { IllegalStateError } from "../../Errors/IllegalStateError";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { Header } from "../../HTTP/Header";

import { ErrorResponse } from "../../LDP/ErrorResponse";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { PointerType } from "../../ObjectSchema/PointerType";
import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryPropertyType } from "../../QueryDocuments/QueryPropertyType";

import { BaseResource } from "../../Resource/BaseResource";

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
import { UUIDUtils } from "../../Utils";

import { C } from "../../Vocabularies/C";
import { LDP } from "../../Vocabularies/LDP";
import { XSD } from "../../Vocabularies/XSD";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";
import {
	QueryableDocumentsRepositoryTrait,
	QueryableDocumentsRepositoryTraitFactory
} from "./QueryableDocumentsRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait" ), () => {

	let context:DocumentsContext;
	beforeEach( ():void => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTrait",
		"Documents repository with the implementation for sparql queries."
	), () => {

		it( extendsClass( "CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:GeneralRepository<Document> = {} as QueryableDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:QueryableDocumentsRepositoryTrait[ "context" ] = {} as DocumentsContext;
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


		let repository:QueryableDocumentsRepositoryTrait;
		let document:Document;
		let UUIDSpy:jasmine.Spy;
		beforeEach( () => {
			repository = QueryableDocumentsRepositoryTrait.decorate( { context } );

			document = Document.decorate( {
				$id: "https://example.com/",
				$repository: context.repository,
				$registry: context.registry,
				$_queryableMetadata: createMockQueryableMetadata(),
			} );


			UUIDSpy = spyOn( UUIDUtils, "generate" )
				.and.callThrough();
		} );

		function createMockDocument<T extends {}>( data:T & Partial<Document> ):T & Document {
			const mockDocument:T & Document = Document.decorate( Object.assign( {
				$registry: context.registry,
				$repository: context.repository,
			}, data ) );

			mockDocument.$_normalize();

			if( data.$_queryableMetadata ) {
				data.$_queryableMetadata.subProperties.forEach( ( metadataProperty, propertyName ) => {
					if( ! metadataProperty.subProperties.size ) return;

					const value:any = mockDocument[ propertyName ];
					if( ! QueryablePointer.is( value ) ) return;

					value.$_queryableMetadata = metadataProperty;
				} );
			}

			return mockDocument;
		}

		const variableHelper:( name:string ) => VariableToken = name => {
			return jasmine.objectContaining( {
				token: "variable",
				name,
			} ) as any;
		};


		describe( method( OBLIGATORY, "$get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire specified document.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.get ).toBeDefined();
				expect( repository.get ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.get( "https://example.com/resource/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
				expect( request.method ).toBe( "POST" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.get( "relative/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
				expect( request.method ).toBe( "POST" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.get( "ex:resource/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
				expect( request.method ).toBe( "POST" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.get( "https://example.org/resource/", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.get( "_:1", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.get( "#fragment", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.get( "ex:resource/", _ => _ )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.get( "/", _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.get( "resource/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				}, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send CONSTRUCT query", async () => {
				stubRequest( "https://example.com/resource/" );

				context
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


				await repository.get( "https://example.com/resource/", _ => _
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} {" +
					" VALUES ?document { <https://example.com/resource/> }" +

					" GRAPH ?document___graph {" +
					"" + " ?document a" +
					"" + "" + " <https://example.com/ns#Resource>," +
					"" + "" + " ?document__types" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +
					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );


			it( "should return queried document", async () => {
				stubRequest( "https://example.com/resource/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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
				const returned:MyDocument = await repository.get<MyDocument>( "resource/", _ => _
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
							"@id": "cldp-sdk://metadata-1",
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

				context
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
				const returned:MyDocument = await repository.get<MyDocument>( "/", _ => _
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
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
								},
							],
						},
					],
				} );

				const returned:Document = await repository.get( "/", _ => _
					.properties( {} )
				);

				expect( returned ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"1-12345\"",
					$_resolved: true,
				} ) );
			} );

			it( "should add persisted data at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
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
								[ C.checksum ]: [ {
									"@value": "\"2-12345\"",
								} ],
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

				context
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


				type MyDocument = { property1:string, property2:Document };
				const returned:MyDocument = await repository.get<MyDocument>( "/", _ => _
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

				expect( returned.property2 ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"2-12345\"",
					$_resolved: true,
				} ) );
			} );

			it( "should add partial metadata data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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

				type MyResource = Document & { property2:QueryablePointer };
				const returned:MyResource = await repository.get<{ property2:QueryablePointer }>( "/", _ => _
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

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$subProperties": {
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
						},
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );
			} );

			it( "should add partial metadata at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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


				type MyResource = Document & { property2:QueryablePointer };
				const returned:MyResource = await repository.get<{ property2:QueryablePointer }>( "/", _ => _
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


				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/another-resource/",
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
							"@id": "cldp-sdk://metadata-1",
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

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
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
					$id: "https://example.com/",

					property4: true,
					property1: "value",
					property2: {
						$_queryableMetadata: createMockQueryableMetadata( {
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
						$id: "_:1",

						property3: "sub-value",
						property5: new Date( "2000-01-01" ),
						property2: 12345,
					},
				} );

				context.registry
					.__resourcesMap.set( "", document );
				context
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

				const returned:Document & MyDocument = await repository.get<MyDocument>( "/", _ => _
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
				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
								"@vocab": "https://example.com/ns#",
								"property3": {
									"@id": "https://schema.org/property-3",
									"@type": XSD.string,
								},
								"property2": {
									"@id": "property-2",
									"@type": XSD.integer,
								},
							},
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );

				context.registry._addPointer( document );
				context
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
							"@id": "cldp-sdk://metadata-1",
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

				const returned:Document & { property2:QueryablePointer } = await repository.get<{ property2:QueryablePointer }>( "/", _ => _
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

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property4": {
						"@id": "https://example.com/ns#property-4",
						"@type": XSD.boolean,
					},
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$subProperties": {
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
						},
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );
			} );


			it( "should call LDPDocumentsRepositoryTrait when URI", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.get( "resource/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", {} );
					} )
				;
			} );

			it( "should call LDPDocumentsRepositoryTrait when URI and options", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.get( "resource/", { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", { timeout: 5050 } );
					} )
				;
			} );


			it( "should ensure latest when is partial and no builder function", async () => {
				context.registry._addPointer( createMockDocument( {
					$id: "resource/",
					$_queryableMetadata: createMockQueryableMetadata( {} ),
				} ) );


				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.get( "resource/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "resource/", { ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when URI is partial and no builder function, with options", async () => {
				context.registry._addPointer( createMockDocument( {
					$id: "resource/",
					$_queryableMetadata: createMockQueryableMetadata( {} ),
				} ) );


				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.get( "resource/", { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "resource/", { timeout: 5050, ensureLatest: true } );
					} );
			} );


			it( "should parse ErrorResponse into error", async () => {
				await repository
					.get( "500/", _ => _ )
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


			it( "should send CONSTRUCT query with virtual property", async () => {
				stubRequest( "https://example.com/resource/" );

				context
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


				await repository.get( "https://example.com/resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"path": __ => __.inverse( "property2" ).then( "property2.2" ),
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} {" +
					" VALUES ?document { <https://example.com/resource/> }" +

					" GRAPH ?document___graph {" +
					"" + " ?document a" +
					"" + "" + " <https://example.com/ns#Resource>," +
					"" + "" + " ?document__types" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " ?document ^<https://example.com/ns#property2>/<https://example.com/ns#property2.2> ?document__property2." +
					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should return queried document with local virtual property", async () => {
				stubRequest( "https://example.com/resource/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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


				type MyDocument = { property1:string, property2?:{ property2:number, property3:string } };
				const returned:MyDocument = await repository.get<MyDocument>( "resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"path": __ => __.inverse( "property2" ).then( "property2.2" ),
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
				} );

				expect( returned.propertyIsEnumerable( "property2" ) ).toBe( false );
				expect( returned.property2 ).toEqual( {
					"property2": 12345,
					"property3": "another value",
				} );
			} );

			it( "should return queried document with external virtual property", async () => {
				stubRequest( "https://example.com/resource/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [
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

				context
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


				type MyDocument = { property1:string, property2?:{ property2:number, property3:string } };
				const returned:MyDocument = await repository.get<MyDocument>( "resource/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"path": __ => __.inverse( "property2" ).then( "property2.2" ),
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned ).toEqual( {
					property1: "value",
				} );

				expect( returned.propertyIsEnumerable( "property2" ) ).toBe( false );
				expect( returned.property2 ).toEqual( {
					"property2": 12345,
					"property3": "another value",
				} );
			} );

			it( "should add partial metadata data with local virtual property", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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

				type MyResource = Document & { property2:QueryablePointer };
				const pathBuilderFn:any = __ => __.inverse( "property2" ).then( "property2.2" );

				const returned:MyResource = await repository.get<{ property2:QueryablePointer }>( "/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"path": pathBuilderFn,
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$pathBuilderFn": pathBuilderFn,
						"$subProperties": {
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
						},
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );
			} );

			it( "should add partial metadata data with external virtual property", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
							],
						},
						{
							"@id": "https://example.com/another-resource/",
							"@graph": [
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

				context
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

				type MyResource = Document & { property2:QueryablePointer };
				const pathBuilderFn:any = __ => __.inverse( "property2" ).then( "property2.2" );

				const returned:MyResource = await repository.get<{ property2:QueryablePointer }>( "/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"path": pathBuilderFn,
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
							} ),
						},
					} )
				);

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$pathBuilderFn": pathBuilderFn,
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( createSubMockQueryableMetadata( {
					definition: createMockDigestedSchemaProperty( {
						uri: null,
						literal: false,
						pointerType: PointerType.ID,
					} ),
					optional: true,
					propertyType: QueryPropertyType.PARTIAL,
					"$subProperties": {
						"property2": {
							"@id": "https://example.com/ns#property-2",
							"@type": XSD.integer,
						},
						"property3": {
							"@id": "https://schema.org/property-3",
							"@type": XSD.string,
						},
					},
				} ) );
			} );

		} );

		describe( method( OBLIGATORY, "$resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the entire specified document.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.resolve ).toBeDefined();
				expect( repository.resolve ).toEqual( jasmine.any( Function ) );
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


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.resolve( document, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.resolve( document, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				}, _ => _ );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.resolve( document, _ => _
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} {" +
					" VALUES ?document { <https://example.com/> }" +

					" GRAPH ?document___graph {" +
					"" + " ?document a" +
					"" + "" + " <https://example.com/ns#Resource>," +
					"" + "" + " ?document__types" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +
					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should add TYPES at CONSTRUCT when available", async () => {
				stubRequest( "https://example.com/" );

				context.registry._addPointer( document );
				document.types = [ "https://example.com/ns#A-Type", "https://example.com/ns#Another-Type" ];

				context
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


				await repository.resolve( document, _ => _
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-1> ?document__property1;" +
					"" + " schema:property-2 ?document__property2." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2;" +
					"" + " schema:property-3 ?document__property2__property3 " +

					"} {" +
					" VALUES ?document { <https://example.com/> }" +

					" GRAPH ?document___graph {" +
					"" + " ?document a" +
					"" + "" + " <https://example.com/ns#A-Type>," +
					"" + "" + " <https://example.com/ns#Another-Type>," +
					"" + "" + " <https://example.com/ns#Resource>," +
					"" + "" + " ?document__types" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +
					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );


			it( "should return queried document", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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
				const returned:MyDocument = await repository.resolve<MyDocument>( document, _ => _
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
							"@id": "cldp-sdk://metadata-1",
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

				context
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
				const returned:MyDocument = await repository.resolve<MyDocument>( document, _ => _
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
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
								},
							],
						},
					],
				} );

				const returned:Document = await repository.resolve( document, _ => _
					.properties( {} )
				);

				expect( returned ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"1-12345\"",
					$_resolved: true,
				} ) );
			} );

			it( "should add persisted data at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
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
								[ C.checksum ]: [ {
									"@value": "\"2-12345\"",
								} ],
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

				context
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


				type MyDocument = { property1:string, property2:Document };
				const returned:MyDocument = await repository.resolve<MyDocument>( document, _ => _
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

				expect( returned.property2 ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"2-12345\"",
					$_resolved: true,
				} ) );
			} );

			it( "should add partial metadata data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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

				type MyResource = Document & { property2:QueryablePointer };
				const returned:MyResource = await repository.resolve<{ property2:QueryablePointer }>( document, _ => _
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

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$subProperties": {
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
						},
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );

			} );

			it( "should add partial metadata at the partial relations", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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

				context
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


				type MyResource = Document & { property2:QueryablePointer };
				const returned:MyResource = await repository.resolve<{ property2:QueryablePointer }>( document, _ => _
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


				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/another-resource/",
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
							"@id": "cldp-sdk://metadata-1",
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

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
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
					$id: "https://example.com/",

					property4: true,
					property1: "value",
					property2: {
						$_queryableMetadata: createMockQueryableMetadata( {
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
						$id: "_:1",

						property3: "sub-value",
						property5: new Date( "2000-01-01" ),
						property2: 12345,
					},
				} );

				context.registry._addPointer( document );
				context
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

				const returned:Document & MyDocument = await repository.resolve<MyDocument>( document, _ => _
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
				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
								"@vocab": "https://example.com/ns#",
								"property3": {
									"@id": "https://schema.org/property-3",
									"@type": XSD.string,
								},
								"property2": {
									"@id": "property-2",
									"@type": XSD.integer,
								},
							},
						},
						"property1": {
							"@id": "property-1",
							"@type": XSD.string,
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );

				context.registry._addPointer( document );
				context
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
							"@id": "cldp-sdk://metadata-1",
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

				const returned:Document & { property2:QueryablePointer } = await repository.resolve<{ property2:QueryablePointer }>( document, _ => _
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

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property4": {
						"@id": "https://example.com/ns#property-4",
						"@type": XSD.boolean,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$subProperties": {
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
						},
					},
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );
			} );


			it( "should call LDPDocumentsRepositoryTrait when nothing", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.resolve( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document.$id, {} );
					} )
				;
			} );

			it( "should call LDPDocumentsRepositoryTrait when options", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.resolve( document, { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document.$id, { timeout: 5050 } );
					} )
				;
			} );


			it( "should ensure latest when current is partial and no builder function", async () => {
				context.registry._addPointer( document );

				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.resolve( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( document.$id, { ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when current is partial and no builder function, with options", async () => {
				context.registry._addPointer( document );

				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await repository.resolve( document, { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( document.$id, { timeout: 5050, ensureLatest: true } );
					} );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.resolve( document, _ => _ )
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


		describe( method( OBLIGATORY, "$saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document and retrieves the updated data from the server.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be saved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.saveAndRefresh ).toBeDefined();
				expect( repository.saveAndRefresh ).toEqual( jasmine.any( Function ) );
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


			it( "should throw error when self ID is outside context scope", async () => {
				document.$id = "https://example.org/resource/";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is BNode label", async () => {
				document.$id = "_:1";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is Named Fragment label", async () => {
				document.$id = "https://example.com/#fragment";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.com/#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when self ID is unresolved prefixed name", async () => {
				document.$id = "ex:resource/";

				await repository
					.saveAndRefresh( document )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should only refresh when NO dirty", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( false );

				await repository.saveAndRefresh( document );

				expect( jasmine.Ajax.requests.count() ).toBe( 1 );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "POST" );
			} );

			it( "should send PATCH to self when dirty", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( true );

				await repository.saveAndRefresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.first();
				expect( request.url ).toBe( "https://example.com/" );
				expect( request.method ).toBe( "PATCH" );
			} );

			it( "should throw error when locally outdated", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( true );
				document.$eTag = null;

				await repository
					.saveAndRefresh( document )
					.then( () => fail( "should not resolve" ) )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalStateError, `The document "https://example.com/" is locally outdated and cannot be saved.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				document.$eTag = "\"1-12345\"";
				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( true );

				await repository.saveAndRefresh( document );

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
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers in single self child", async () => {
				stubRequest( "https://example.com/" );

				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( true );


				await repository.saveAndRefresh( document, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send LD-PATCH", async () => {
				stubRequest( "https://example.com/" );


				type MyDoc = {
					list:(string | number)[];
					pointer:BaseResource & {
						string:string[];
						pointers:(BaseResource & {
							string:string[];
							number:number;
						})[];
					};
				};

				let object:MyDoc;
				object = Object.assign( document, {
					types: [ "https://example.com/ns#Document" ],
					list: [ 1, 2, 3, 4, 5 ],
					pointer: {
						$id: "#fragment",
						types: [ "https://example.con/ns#Fragment" ],
						string: [ "string 1", "string 2" ],
						pointers: [
							{
								$id: "_:blank-node",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string 1" ],
								number: 100,
							},
							{
								$id: "_:to-delete",
								types: [ "https://example.con/ns#Fragment", "https://example.com/ns#BlankNode" ],
								string: [ "string --" ],
								number: - 100,
							},
						],
					},
				} );

				document.$_normalize();
				document.$_syncSnapshot();

				context
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


				document.$addType( "NewType" );
				object.list = [ 4, 1, 2, "s-1", "s-2", "s-3", 3 ];
				object.pointer.string = [ "string 2", "string 3" ];
				object.pointer.pointers[ 0 ].string = [ "string 1", "string -1" ];
				object.pointer.pointers[ 0 ].number = 100.001;
				object.pointer.pointers.splice( 1, 1 );

				await repository.saveAndRefresh( document );

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

			it( "should send refresh CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
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
							},
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				await repository.saveAndRefresh( document );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +


					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " schema:property-3 ?document__property2__property3;" +
					"" + " schema:property-5 ?document__property2__property5;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2 " +

					"} {" +
					" VALUES ?document { <https://example.com/> }" +

					" OPTIONAL { GRAPH ?document___graph { ?document a ?document__types } }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-4> ?document__property4 }" +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +
					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-5 ?document__property2__property5 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property5 ) = <http://www.w3.org/2001/XMLSchema#dateTime> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should update resolvable data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
								},
							],
						},
					],
				} );

				document.$eTag = "\"0-12345\"";

				const returned:Document = await repository.saveAndRefresh( document );
				expect( returned ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"1-12345\"",
					$_resolved: true,
				} ) );
			} );


			it( "should call LDPDocumentsRepositoryTrait when full", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.saveAndRefresh( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document, void 0 );
					} )
				;
			} );

			it( "should call LDPDocumentsRepositoryTrait when full and options", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.saveAndRefresh( document, { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document, { timeout: 5050 } );
					} )
				;
			} );


			it( "should parse ErrorResponse into error", async () => {
				spyOnDecorated( document, "$isDirty" )
					.and.returnValue( true );
				document.$id = "500/";

				await repository
					.saveAndRefresh( document )
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

		describe( method( OBLIGATORY, "$refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Refresh the full or partial document.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be refreshed." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.refresh ).toBeDefined();
				expect( repository.refresh ).toEqual( jasmine.any( Function ) );
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

			it( "should request document ID", async () => {
				stubRequest( "https://example.com/" );

				await repository.refresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/" );
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.refresh( document );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.refresh( document, {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send refresh CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
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
							},
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				await repository.refresh( document );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " schema:property-3 ?document__property2__property3;" +
					"" + " schema:property-5 ?document__property2__property5;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2 " +

					"} {" +
					" VALUES ?document { <https://example.com/> }" +
					" OPTIONAL { GRAPH ?document___graph { ?document a ?document__types } }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-4> ?document__property4 }" +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +

					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-5 ?document__property2__property5 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property5 ) = <http://www.w3.org/2001/XMLSchema#dateTime> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send refresh CONSTRUCT query when document is .ALL", async () => {
				stubRequest( "https://example.com/" );

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.ALL,
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				await repository.refresh( document );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2" +
					"" + " ?document__property2___predicate ?document__property2___object;" +
					"" + ` <${ C.document }> ?document__property2___graph` +

					" " +
					"} {" +
					" VALUES ?document { <https://example.com/> }" +

					" OPTIONAL { GRAPH ?document___graph { ?document a ?document__types } }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-4> ?document__property4 }" +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document schema:property-2 ?document__property2 }" +

					"" + " GRAPH ?document__property2___graph {" +
					"" + "" + " ?document__property2 ?document__property2___predicate ?document__property2___object" +
					"" + " }" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should refresh from returned data", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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


				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"@vocab": "https://example.com/ns#",
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": XSD.string,
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
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
							},
						},
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": XSD.boolean,
						},
					} ),
					$id: "https://example.com/",

					property1: "value",
					property3: "non query-value",
					property4: true,

					property2: {
						$id: "_:1",
						$_queryableMetadata: createMockQueryableMetadata( {
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

				document.$_syncSavedFragments();
				context.registry._addPointer( document );

				context
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
					property2:QueryablePointer & {
						property2:number;
						property3:string;
						property5:Date;
					};
					property3:string;
					property4:boolean;
				}

				const returned:MyDocument = await repository.refresh<MyDocument>( document );

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
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
								},
							],
						},
					],
				} );

				document.$eTag = "\"0-12345\"";
				const returned:Document = await repository.refresh( document );

				expect( returned ).toEqual( jasmine.objectContaining<Document>( {
					$eTag: "\"1-12345\"",
					$_resolved: true,
				} ) );
			} );

			it( "should assign new eTag when locally outdated", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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
									[ C.checksum ]: [ {
										"@value": "\"1-12345\"",
									} ],
								},
							],
						},
					],
				} );

				document.$eTag = null;
				context.registry._addPointer( document );

				const returned:Document = await repository.refresh( document );

				expect( returned ).toEqual( jasmine.objectContaining( {
					$eTag: "\"1-12345\"",
				} ) );
			} );


			it( "should call LDPDocumentsRepositoryTrait when full", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.refresh( document )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document, void 0 );
					} )
				;
			} );

			it( "should call LDPDocumentsRepositoryTrait when full and options", async () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentsRepositoryTrait.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				document.$_queryableMetadata = void 0;
				await repository.refresh( document, { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( document, { timeout: 5050 } );
					} )
				;
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.refresh( document )
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


			it( "should send CONSTRUCT query with virtual property", async () => {
				stubRequest( "https://example.com/" );

				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$pathBuilderFn": __ => __.inverse( "property2" ).then( "property2.2" ),
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
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
							},
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;


				await repository.refresh( document );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?document.` +

					" ?document a ?document__types;" +
					"" + ` <${ C.document }> ?document___graph;` +
					"" + " <https://example.com/ns#property-4> ?document__property4;" +
					"" + " schema:property-2 ?document__property2;" +
					"" + " <https://example.com/ns#property-1> ?document__property1." +

					" ?document__property2 a ?document__property2__types;" +
					"" + ` <${ C.document }> ?document__property2___graph;` +
					"" + " schema:property-3 ?document__property2__property3;" +
					"" + " schema:property-5 ?document__property2__property5;" +
					"" + " <https://example.com/ns#property-2> ?document__property2__property2 " +

					"} {" +
					" VALUES ?document { <https://example.com/> }" +

					" OPTIONAL { GRAPH ?document___graph { ?document a ?document__types } }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-4> ?document__property4 }" +
					"" + " FILTER( datatype( ?document__property4 ) = <http://www.w3.org/2001/XMLSchema#boolean> )" +
					" }" +

					" OPTIONAL {" +
					"" + " ?document ^<https://example.com/ns#property2>/<https://example.com/ns#property2.2> ?document__property2." +

					"" + " OPTIONAL { GRAPH ?document__property2___graph { ?document__property2 a ?document__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-3 ?document__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 schema:property-5 ?document__property2__property5 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property5 ) = <http://www.w3.org/2001/XMLSchema#dateTime> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?document__property2___graph { ?document__property2 <https://example.com/ns#property-2> ?document__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?document__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?document___graph { ?document <https://example.com/ns#property-1> ?document__property1 }" +
					"" + " FILTER( datatype( ?document__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should return queried document with virtual property", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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


				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property4": {
							"@id": "https://example.com/ns#property-4",
							"@type": "boolean",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$pathBuilderFn": __ => __.inverse( "property2" ).then( "property2.2" ),
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
								"property2": {
									"@id": "https://example.com/ns#property-2",
									"@type": XSD.integer,
								},
								"property3": {
									"@id": "https://schema.org/property-3",
									"@type": XSD.string,
								},
							},
						},
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;

				type MyDocument = { property1:string, property2?:{ property2:number, property3:string } };
				const returned:MyDocument = await repository.refresh<MyDocument>( document );

				expect( returned ).toEqual( {
					property1: "value",
				} );

				expect( returned.propertyIsEnumerable( "property2" ) ).toBe( false );
				expect( returned.property2 ).toEqual( {
					"property2": 12345,
					"property3": "another value",
				} );
			} );

			it( "should maintain partial metadata data with local virtual property", async () => {
				stubRequest( "https://example.com/", {
					resources: [
						{
							"@id": "cldp-sdk://metadata-1",
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


				const pathBuilderFn:any = __ => __.inverse( "property2" ).then( "property2.2" );
				document = createMockDocument( {
					$_queryableMetadata: createMockQueryableMetadata( {
						"$id": "https://example.com/",
						"@vocab": "https://example.com/ns#",
						"property1": {
							"@id": "https://example.com/ns#property-1",
							"@type": "string",
						},
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"$pathBuilderFn": pathBuilderFn,
							"$propertyType": QueryPropertyType.PARTIAL,
							"$subProperties": {
								"property2": {
									"@id": "https://example.com/ns#property-2",
									"@type": XSD.integer,
								},
								"property3": {
									"@id": "https://schema.org/property-3",
									"@type": XSD.string,
								},
							},
						},
					} ),
					$id: "https://example.com/",

					property2: {
						$id: "_:1",
					},
				} );
				document.$_syncSavedFragments();

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
					} )
				;

				type MyResource = Document & { property2:QueryablePointer };
				const returned:MyResource = await repository.refresh<MyResource>( document );

				expect( returned.$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/",
					"property1": {
						"@id": "https://example.com/ns#property-1",
						"@type": XSD.string,
					},
					"property2": {
						"@id": "https://schema.org/property-2",
						"@type": "@id",
						"$propertyType": QueryPropertyType.PARTIAL,
						"$pathBuilderFn": pathBuilderFn,
						"$subProperties": {
							"property2": {
								"@id": "https://example.com/ns#property-2",
								"@type": XSD.integer,
							},
							"property3": {
								"@id": "https://schema.org/property-3",
								"@type": XSD.string,
							},
						},
					},
				} ) );

				expect( returned.property2.$_queryableMetadata ).toEqual( returned.$_queryableMetadata.getProperty( "property2" ) );
			} );

		} );


		describe( method( OBLIGATORY, "$getChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.getChildren ).toBeDefined();
				expect( repository.getChildren ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.getChildren( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.getChildren( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.getChildren( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.getChildren( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.getChildren( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.getChildren( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.getChildren( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.getChildren( "/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.getChildren( "/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": "@id",
						},
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


				await repository.getChildren( "/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
								"property4": __.inherit,
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types;" +
					"" + ` <${ C.document }> ?child___graph;` +
					"" + " <https://example.com/ns#property-1> ?child__property1;" +
					"" + " schema:property-2 ?child__property2." +

					" ?child__property2 a ?child__property2__types;" +
					"" + ` <${ C.document }> ?child__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?child__property2__property2;" +
					"" + " schema:property-3 ?child__property2__property3;" +
					"" + " schema:property-4 ?child__property2__property4 " +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?child {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#contains> ?child." +

					"" + "" + " ?child a <https://example.com/ns#Resource>." +

					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +

					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }" +

					" GRAPH ?child___graph { ?child a ?child__types }" +

					" OPTIONAL {" +
					"" + " GRAPH ?child___graph { ?child <https://example.com/ns#property-1> ?child__property1 }" +
					"" + " FILTER( datatype( ?child__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?child___graph { ?child schema:property-2 ?child__property2 }" +

					"" + " OPTIONAL { GRAPH ?child__property2___graph { ?child__property2 a ?child__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?child__property2___graph { ?child__property2 <https://example.com/ns#property-2> ?child__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?child__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?child__property2___graph { ?child__property2 schema:property-3 ?child__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?child__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?child__property2___graph { ?child__property2 schema:property-4 ?child__property2__property4 }" +
					"" + "" + " FILTER( ! isLiteral( ?child__property2__property4 ) )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send full CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.getChildren( "/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child___subject" +
					"" + " ?child___predicate ?child___object;" +
					"" + ` <${ C.document }> ?child` +

					" " +
					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?child {" +
					"" + "" + " <https://example.com/> <http://www.w3.org/ns/ldp#contains> ?child" +
					"" + " }" +
					" }" +

					" GRAPH ?child {" +
					"" + " ?child___subject ?child___predicate ?child___object" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query", async () => {
				stubRequest( "https://example.com/resource/" );

				context
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


				await repository.getChildren( "resource/", _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child" +
					"" + " ?child___predicate ?child___object;" +
					"" + ` <${ C.document }> ?child___graph` +

					" " +
					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?child {" +
					"" + "" + " <https://example.com/resource/> <http://www.w3.org/ns/ldp#contains> ?child." +
					"" + "" + " OPTIONAL { ?child schema:property-2 ?child__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?child__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }" +

					" GRAPH ?child___graph { ?child ?child___predicate ?child___object }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered without optional CONSTRUCT", async () => {
				stubRequest( "https://example.com/" );

				context
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


				const spy:jasmine.Spy = spyOn( QueryToken.prototype, "toString" )
					.and.callThrough();

				await repository.getChildren( "/", _ => _
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

				const query:QueryToken = spy.calls.mostRecent().object;
				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( new IRIRefToken( `cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }` ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( new IRIRefToken( C.VolatileResource ) )
								.addObject( new IRIRefToken( C.QueryMetadata ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.target ) )
								.addObject( variableHelper( "child" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child" ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( variableHelper( "child__types" ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.document ) )
								.addObject( variableHelper( "child___graph" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "child__property1" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "child__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "child__property2" ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( variableHelper( "child__property2__types" ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.document ) )
								.addObject( variableHelper( "child__property2___graph" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "child__property2__property2" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "child__property2__property3" ) )
							)
						)

						.addPattern( new SubSelectToken( "DISTINCT" )
							.addVariable( variableHelper( "child" ) )
							.addPattern( new SubjectToken( new IRIRefToken( "https://example.com/" ) )
								.addProperty( new PropertyToken( new IRIRefToken( LDP.contains ) )
									.addObject( variableHelper( "child" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "child" ) )
								.addProperty( new PropertyToken( "a" )
									.addObject( new PrefixedNameToken( "ex:Resource" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "child" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
									.addObject( variableHelper( "child__property2" ) )
								)
							)
							.addModifier( new OrderToken( variableHelper( "child__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern( new GraphToken( variableHelper( "child___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "child" ) )
								.addProperty( new PropertyToken( "a" )
									.addObject( variableHelper( "child__types" ) )
								)
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new GraphToken( variableHelper( "child___graph" ) )
									.addPattern( new SubjectToken( variableHelper( "child" ) )
										.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-1" ) )
											.addObject( variableHelper( "child__property1" ) )
										)
									)
								)
								.addPattern( new FilterToken( "datatype( ?child__property1 ) = xsd:string" ) )
						)
						.addPattern( new GraphToken( variableHelper( "child___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "child" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
									.addObject( variableHelper( "child__property2" ) )
								)
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new GraphToken( variableHelper( "child__property2___graph" ) )
								.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
									.addProperty( new PropertyToken( "a" )
										.addObject( variableHelper( "child__property2__types" ) )
									)
								)
							)
						)
						.addPattern( new ValuesToken()
							.addVariables(
								variableHelper( "child__property2__property2" )
							)
							.addValues(
								new RDFLiteralToken( "12345", new PrefixedNameToken( "xsd:integer" ) )
							)
						)
						.addPattern( new GraphToken( variableHelper( "child__property2___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-2" ) )
									.addObject( variableHelper( "child__property2__property2" ) )
								)
							)
						)
						.addPattern( new FilterToken( "datatype( ?child__property2__property2 ) = xsd:integer" ) )
						.addPattern( new OptionalToken()
							.addPattern( new GraphToken( variableHelper( "child__property2___graph" ) )
								.addPattern( new SubjectToken( variableHelper( "child__property2" ) )
									.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-3" ) )
										.addObject( variableHelper( "child__property2__property3" ) )
									)
								)
							)
							.addPattern( new FilterToken( "datatype( ?child__property2__property3 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?child__property2__property2 = "12345"^^xsd:integer` ) )
					)

						.addPrologues( new PrefixToken( "schema", new IRIRefToken( "https://schema.org/" ) ) )
						.addPrologues( new PrefixToken( "ex", new IRIRefToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIRefToken( XSD.namespace ) ) )
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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

				context
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


				repository.getChildren<MyDocument>( "https://example.com/resource/", _ => _
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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

				context
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

				repository.getChildren<MyDocument>( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );


					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ].$isQueried() ).toBe( false );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any,
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ].$isQueried() ).toBe( false );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							} ]
						} ]`,
				} );


				context
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

				repository.getChildren<MyDocument>( "https://example.com/resource/", _ => _.properties( _.all ) )
					.then( ( myDocuments ) => {
						expect( myDocuments ).toEqual( jasmine.any( Array ) );
						expect( myDocuments.length ).toBe( 2 );


						expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
						expect( myDocuments[ 0 ].$isQueried() ).toBe( true );
						expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
							"$eTag": "\"1-12345\"",
							"property1": "value 1",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any );

						expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
						expect( myDocuments[ 1 ].$isQueried() ).toBe( true );
						expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
							"$eTag": "\"2-12345\"",
							"property1": "value 2",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 1 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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


				context
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

				repository.getChildren<MyDocument>( "https://example.com/resource/", _ => _
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

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"3-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"4-12345\\""
								} ],
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


				context
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

				repository.getChildren<MyDocument>( "https://example.com/resource/", _ => _
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

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"$eTag": "\"3-12345\"",
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );


					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"$eTag": "\"4-12345\"",
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );

					done();
				} ).catch( done.fail );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.getChildren( "500/" )
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

		describe( method( OBLIGATORY, "$getMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.getMembers ).toBeDefined();
				expect( repository.getMembers ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.getMembers( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.getMembers( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.getMembers( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.getMembers( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.getMembers( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.getMembers( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.getMembers( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.getMembers( "/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.DocumentChecksums }"`,
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.getMembers( "/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
					.extendObjectSchema( {
						"@vocab": "https://example.com/ns#",
						"schema": "https://schema.org/",
						"property4": {
							"@id": "https://schema.org/property-4",
							"@type": "@id",
						},
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


				await repository.getMembers( "/", _ => _
					.withType( "Resource" )
					.properties( {
						"property1": _.inherit,
						"property2": {
							"@id": "https://schema.org/property-2",
							"@type": "@id",
							"query": __ => __.properties( {
								"property2": __.inherit,
								"property3": __.inherit,
								"property4": __.inherit,
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
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types;" +
					"" + ` <${ C.document }> ?member___graph;` +
					"" + " <https://example.com/ns#property-1> ?member__property1;" +
					"" + " schema:property-2 ?member__property2." +

					" ?member__property2 a ?member__property2__types;" +
					"" + ` <${ C.document }> ?member__property2___graph;` +
					"" + " <https://example.com/ns#property-2> ?member__property2__property2;" +
					"" + " schema:property-3 ?member__property2__property3;" +
					"" + " schema:property-4 ?member__property2__property4 " +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?member {" +
					"" + "" + " {" +
					"" + "" + "" + " SELECT ?membershipResource ?hasMemberRelation {" +
					"" + "" + "" + "" + " <https://example.com/>" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation" +
					"" + "" + "" + " }" +
					"" + "" + " }" +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +

					"" + "" + " ?member a <https://example.com/ns#Resource>." +

					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }" +

					" GRAPH ?member___graph { ?member a ?member__types }" +

					" OPTIONAL {" +
					"" + " GRAPH ?member___graph { ?member <https://example.com/ns#property-1> ?member__property1 }" +
					"" + " FILTER( datatype( ?member__property1 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					" }" +

					" OPTIONAL {" +
					"" + " GRAPH ?member___graph { ?member schema:property-2 ?member__property2 }" +

					"" + " OPTIONAL { GRAPH ?member__property2___graph { ?member__property2 a ?member__property2__types } }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?member__property2___graph { ?member__property2 <https://example.com/ns#property-2> ?member__property2__property2 }" +
					"" + "" + " FILTER( datatype( ?member__property2__property2 ) = <http://www.w3.org/2001/XMLSchema#integer> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?member__property2___graph { ?member__property2 schema:property-3 ?member__property2__property3 }" +
					"" + "" + " FILTER( datatype( ?member__property2__property3 ) = <http://www.w3.org/2001/XMLSchema#string> )" +
					"" + " }" +

					"" + " OPTIONAL {" +
					"" + "" + " GRAPH ?member__property2___graph { ?member__property2 schema:property-4 ?member__property2__property4 }" +
					"" + "" + " FILTER( ! isLiteral( ?member__property2__property4 ) )" +
					"" + " }" +
					" }" +

					" " +
					"}"
				);
			} );

			it( "should send full CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.getMembers( "/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member___subject" +
					"" + " ?member___predicate ?member___object;" +
					"" + ` <${ C.document }> ?member ` +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?member {" +
					"" + "" + " {" +
					"" + "" + "" + " SELECT ?membershipResource ?hasMemberRelation {" +
					"" + "" + "" + "" + " <https://example.com/>" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation" +
					"" + "" + "" + " }" +
					"" + "" + " }" +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }" +

					" GRAPH ?member {" +
					"" + " ?member___subject ?member___predicate ?member___object" +
					" } " +

					"}"
				);
			} );

			it( "should send filtered .ALL CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.getMembers( "/", _ => _
					.properties( _.all )
					.orderBy( "property2" )
					.limit( 10 )
					.offset( 5 )
				);


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"PREFIX schema: <https://schema.org/> " +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member" +
					"" + " ?member___predicate ?member___object;" +
					"" + ` <${ C.document }> ?member___graph ` +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?member {" +
					"" + "" + " {" +
					"" + "" + "" + " SELECT ?membershipResource ?hasMemberRelation {" +
					"" + "" + "" + "" + " <https://example.com/>" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation" +
					"" + "" + "" + " }" +
					"" + "" + " }" +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member." +
					"" + "" + " OPTIONAL { ?member schema:property-2 ?member__property2 }" +
					"" + " }" +
					"" + " ORDER BY ?member__property2" +
					"" + " LIMIT 10" +
					"" + " OFFSET 5" +
					" }" +

					" GRAPH ?member___graph { ?member ?member___predicate ?member___object }" +

					" " +
					"}"
				);
			} );

			it( "should send filtered without optional CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				const spy:jasmine.Spy = spyOn( QueryToken.prototype, "toString" )
					.and.callThrough();

				await repository.getMembers( "/", _ => _
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

				const query:QueryToken = spy.calls.mostRecent().object;
				expect( query ).toEqual( new QueryToken(
					new ConstructToken()
						.addTriple( new SubjectToken( new IRIRefToken( `cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }` ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( new IRIRefToken( C.VolatileResource ) )
								.addObject( new IRIRefToken( C.QueryMetadata ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.target ) )
								.addObject( variableHelper( "member" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member" ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( variableHelper( "member__types" ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.document ) )
								.addObject( variableHelper( "member___graph" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-1" ) )
								.addObject( variableHelper( "member__property1" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
								.addObject( variableHelper( "member__property2" ) )
							)
						)
						.addTriple( new SubjectToken( variableHelper( "member__property2" ) )
							.addProperty( new PropertyToken( "a" )
								.addObject( variableHelper( "member__property2__types" ) )
							)
							.addProperty( new PropertyToken( new IRIRefToken( C.document ) )
								.addObject( variableHelper( "member__property2___graph" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-2" ) )
								.addObject( variableHelper( "member__property2__property2" ) )
							)
							.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-3" ) )
								.addObject( variableHelper( "member__property2__property3" ) )
							)
						)

						.addPattern( new SubSelectToken( "DISTINCT" )
							.addVariable( variableHelper( "member" ) )
							.addPattern( new SubSelectToken()
								.addVariable( variableHelper( "membershipResource" ), variableHelper( "hasMemberRelation" ) )
								.addPattern( new SubjectToken( new IRIRefToken( "https://example.com/" ) )
									.addProperty( new PropertyToken( new IRIRefToken( LDP.membershipResource ) )
										.addObject( variableHelper( "membershipResource" ) )
									)
									.addProperty( new PropertyToken( new IRIRefToken( LDP.hasMemberRelation ) )
										.addObject( variableHelper( "hasMemberRelation" ) )
									)
								)
							)
							.addPattern( new SubjectToken( variableHelper( "membershipResource" ) )
								.addProperty( new PropertyToken( variableHelper( "hasMemberRelation" ) )
									.addObject( variableHelper( "member" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "member" ) )
								.addProperty( new PropertyToken( "a" )
									.addObject( new PrefixedNameToken( "ex:Resource" ) )
								)
							)
							.addPattern( new SubjectToken( variableHelper( "member" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
									.addObject( variableHelper( "member__property2" ) )
								)
							)
							.addModifier( new OrderToken( variableHelper( "member__property2" ) ) )
							.addModifier( new LimitToken( 10 ) )
							.addModifier( new OffsetToken( 5 ) )
						)
						.addPattern( new GraphToken( variableHelper( "member___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "member" ) )
								.addProperty( new PropertyToken( "a" )
									.addObject( variableHelper( "member__types" ) )
								)
							)
						)
						.addPattern(
							new OptionalToken()
								.addPattern( new GraphToken( variableHelper( "member___graph" ) )
									.addPattern( new SubjectToken( variableHelper( "member" ) )
										.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-1" ) )
											.addObject( variableHelper( "member__property1" ) )
										)
									)
								)
								.addPattern( new FilterToken( "datatype( ?member__property1 ) = xsd:string" ) )
						)
						.addPattern( new GraphToken( variableHelper( "member___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "member" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-2" ) )
									.addObject( variableHelper( "member__property2" ) )
								)
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new GraphToken( variableHelper( "member__property2___graph" ) )
								.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
									.addProperty( new PropertyToken( "a" )
										.addObject( variableHelper( "member__property2__types" ) )
									)
								)
							)
						)
						.addPattern( new ValuesToken()
							.addVariables(
								variableHelper( "member__property2__property2" )
							)
							.addValues(
								new RDFLiteralToken( "12345", new PrefixedNameToken( "xsd:integer" ) )
							)
						)
						.addPattern( new GraphToken( variableHelper( "member__property2___graph" ) )
							.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
								.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property-2" ) )
									.addObject( variableHelper( "member__property2__property2" ) )
								)
							)
						)
						.addPattern( new FilterToken( "datatype( ?member__property2__property2 ) = xsd:integer" ) )
						.addPattern( new OptionalToken()
							.addPattern( new GraphToken( variableHelper( "member__property2___graph" ) )
								.addPattern( new SubjectToken( variableHelper( "member__property2" ) )
									.addProperty( new PropertyToken( new PrefixedNameToken( "schema:property-3" ) )
										.addObject( variableHelper( "member__property2__property3" ) )
									)
								)
							)
							.addPattern( new FilterToken( "datatype( ?member__property2__property3 ) = xsd:string" ) )
						)
						.addPattern( new FilterToken( `?member__property2__property2 = "12345"^^xsd:integer` ) )
					)

						.addPrologues( new PrefixToken( "schema", new IRIRefToken( "https://schema.org/" ) ) )
						.addPrologues( new PrefixToken( "ex", new IRIRefToken( "https://example.com/ns#" ) ) )
						.addPrologues( new PrefixToken( "xsd", new IRIRefToken( XSD.namespace ) ) )
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
							"@id": "https://example.com/resource/child1/",
							"@graph": [ {
								"@id": "https://example.com/resource/child1/",
								"@type": [
									"${ C.Document }",
									"https://example.com/ns#Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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

				context
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


				repository.getMembers<MyDocument>( "https://example.com/resource/", _ => _
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

			it( "should return full members", ( done:DoneFn ):void => {
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
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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

				context
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

				repository.getMembers<MyDocument>( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );
					for( const doc of myDocuments ) {
						expect( Document.is( doc ) ).toBe( true );
						expect( doc.$isQueried() ).toBe( false );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any,
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property3": "another value 2",
							"property4": 67890,
						} ) as any,
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return .ALL members", ( done:DoneFn ):void => {
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
									"https://schema.org/Resource",
									"${ LDP.BasicContainer }",
									"${ LDP.RDFSource }"
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
								"https://schema.org/property-1": [ {
									"@value": "value 2"
								} ],
								"https://schema.org/property-2": [ {
									"@id": "_:2"
								} ]
							} ]
						} ]`,
				} );


				context
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

				repository.getMembers<MyDocument>( "https://example.com/resource/", _ => _.properties( _.all ) )
					.then( ( myDocuments ) => {
						expect( myDocuments ).toEqual( jasmine.any( Array ) );
						expect( myDocuments.length ).toBe( 2 );
						for( const doc of myDocuments ) {
							expect( Document.is( doc ) ).toBe( true );
							expect( doc.$isQueried() ).toBe( true );
						}

						expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
							"$eTag": "\"1-12345\"",
							"property1": "value 1",
							"property2": jasmine.any( Object ) as any,
						} ) );
						expect( myDocuments[ 0 ][ "property2" ] ).not.toEqual( jasmine.objectContaining( {
							"property3": "another value 1",
							"property4": 12345,
						} ) as any );

						expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
							"$eTag": "\"2-12345\"",
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

			it( "should return partial members", ( done:DoneFn ):void => {
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
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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


				context
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

				repository.getMembers<MyDocument>( "https://example.com/resource/", _ => _
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
					for( const doc of myDocuments ) {
						expect( Document.is( doc ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );

			it( "should return partial members with partial relations", ( done:DoneFn ):void => {
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
								],
								"${ C.checksum }": [ {
									"@value": "\\"1-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"3-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"2-12345\\""
								} ],
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
								"${ C.checksum }": [ {
									"@value": "\\"4-12345\\""
								} ],
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


				context
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

				repository.getMembers<MyDocument>( "https://example.com/resource/", _ => _
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
					for( const doc of myDocuments ) {
						expect( Document.is( doc ) ).toBe( true );
					}

					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"1-12345\"",
						"property1": "value 1",
						"property2": jasmine.objectContaining( {
							"$eTag": "\"3-12345\"",
							"property2": 12345,
							"property3": "another value 1",
						} ),
					} ) );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining( {
						"$eTag": "\"2-12345\"",
						"property1": "value 2",
						"property2": jasmine.objectContaining( {
							"$eTag": "\"4-12345\"",
							"property2": 67890,
							"property3": "another value 2",
						} ),
					} ) );
					done();
				} ).catch( done.fail );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.getMembers( "500/" )
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


		describe( method( OBLIGATORY, "$listChildren" ), () => {

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
				expect( repository.listChildren ).toBeDefined();
				expect( repository.listChildren ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.listChildren( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.listChildren( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.listChildren( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.listChildren( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.listChildren( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.listChildren( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.listChildren( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.listChildren( "/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.listChildren( "/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.listChildren( "/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?child.` +

					" ?child a ?child__types " +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?child {" +
					"" + "" + ` <https://example.com/> <${ LDP.contains }> ?child` +
					"" + " }" +
					" }" +

					" OPTIONAL { ?child a ?child__types }" +

					" " +
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


				repository.listChildren( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining<Document>( {
						$eTag: void 0,
						$_resolved: false,
						types: [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining<Document>( {
						$eTag: void 0,
						$_resolved: false,
						types: [
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


				repository.listChildren( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ].$isQueried() ).toBe( false );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ].$isQueried() ).toBe( false );

					done();
				} ).catch( done.fail );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.listChildren( "500/" )
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

		describe( method( OBLIGATORY, "$listMembers" ), () => {

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
				expect( repository.listMembers ).toBeDefined();
				expect( repository.listMembers ).toEqual( jasmine.any( Function ) );
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


			it( "should request the URI provided", async () => {
				stubRequest( "https://example.com/resource/" );

				await repository.listMembers( "https://example.com/resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should request relative URI provided", async () => {
				stubRequest( "https://example.com/relative/" );

				await repository.listMembers( "relative/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/relative/" );
			} );

			it( "should request resolved prefixed name provided", async () => {
				stubRequest( "https://example.com/resource/" );

				context.extendObjectSchema( { "ex": "https://example.com/" } );

				await repository.listMembers( "ex:resource/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.url ).toBe( "https://example.com/resource/" );
			} );

			it( "should throw error when from URI outside context scope", async () => {
				await repository
					.listMembers( "https://example.org/resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"https://example.org/resource/" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is BNode label", async () => {
				await repository
					.listMembers( "_:1" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"_:1" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when from URI is Named Fragment label", async () => {
				await repository
					.listMembers( "#fragment" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"#fragment" is out of scope.` );
					} )
				;
			} );

			it( "should throw error when unresolved prefixed name", async () => {
				await repository
					.listMembers( "ex:resource/" )
					.catch( error => {
						expect( () => { throw error; } )
							.toThrowError( IllegalArgumentError, `"ex:resource/" is out of scope.` );
					} )
				;
			} );


			it( "should send basic request headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.listMembers( "/" );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( {
					"accept": "application/ld+json",
					"content-type": "application/sparql-query",
					"prefer": [
						`include="${ C.PreferResultsContext }"`,
					].join( ", " ),
				} );
			} );

			it( "should add custom headers", async () => {
				stubRequest( "https://example.com/" );

				await repository.listMembers( "/", {
					headers: new Map()
						.set( "custom", new Header( "custom value" ) )
					,
				} );

				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.requestHeaders ).toEqual( jasmine.objectContaining( {
					"custom": "custom value",
				} ) );
			} );


			it( "should send partial CONSTRUCT query", async () => {
				stubRequest( "https://example.com/" );

				context
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


				await repository.listMembers( "/" );


				const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
				expect( request.params ).toEqual( "" +
					"CONSTRUCT {" +
					` <cldp-sdk://metadata-${ UUIDSpy.calls.all()[ 0 ].returnValue }>` +
					"" + ` a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
					"" + ` <${ C.target }> ?member.` +

					" ?member a ?member__types " +

					"} {" +
					" {" +
					"" + " SELECT DISTINCT ?member {" +
					"" + "" + " {" +
					"" + "" + "" + " SELECT ?membershipResource ?hasMemberRelation {" +
					"" + "" + "" + "" + " <https://example.com/>" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#membershipResource> ?membershipResource;" +
					"" + "" + "" + "" + "" + " <http://www.w3.org/ns/ldp#hasMemberRelation> ?hasMemberRelation" +
					"" + "" + "" + " }" +
					"" + "" + " }" +
					"" + "" + " ?membershipResource ?hasMemberRelation ?member" +
					"" + " }" +
					" }" +

					" OPTIONAL { ?member a ?member__types }" +

					" " +
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


				repository.listMembers( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ] ).toEqual( jasmine.objectContaining<Document>( {
						$eTag: void 0,
						$_resolved: false,
						types: [
							`${ C.Document }`,
							`https://example.com/ns#Resource`,
							`${ LDP.BasicContainer }`,
							`${ LDP.RDFSource }`,
						],
					} ) );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ] ).toEqual( jasmine.objectContaining<Document>( {
						$eTag: void 0,
						$_resolved: false,
						types: [
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


				repository.listMembers( "https://example.com/resource/" ).then( ( myDocuments ) => {
					expect( myDocuments ).toEqual( jasmine.any( Array ) );
					expect( myDocuments.length ).toBe( 2 );

					expect( Document.is( myDocuments[ 0 ] ) ).toBe( true );
					expect( myDocuments[ 0 ].$isQueried() ).toBe( false );

					expect( Document.is( myDocuments[ 1 ] ) ).toBe( true );
					expect( myDocuments[ 1 ].$isQueried() ).toBe( false );

					done();
				} ).catch( done.fail );
			} );


			it( "should parse ErrorResponse into error", async () => {
				document.$id = "500/";

				await repository
					.listMembers( "500/" )
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


	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTrait, CarbonLDP.DocumentsRepository.Traits.LDPDocumentsRepositoryTrait, \"get\" | \"resolve\" | \"refresh\" | \"saveAndRefresh\">" ), () => {
			const target:ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, "get" | "resolve" | "refresh" | "saveAndRefresh"> = {} as QueryableDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTrait<any>, CarbonLDP.BaseDocumentsRepository>" ), () => {
			const target:ModelDecorator<QueryableDocumentsRepositoryTrait, BaseDocumentsRepository> = {} as QueryableDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "QueryableDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( QueryableDocumentsRepositoryTrait.isDecorated ).toBeDefined();
				expect( QueryableDocumentsRepositoryTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				QueryableDocumentsRepositoryTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "QueryableDocumentsRepositoryTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( QueryableDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( QueryableDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				QueryableDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( QueryableDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				QueryableDocumentsRepositoryTrait.decorate( { context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				QueryableDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"QueryableDocumentsRepositoryTrait",
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentsRepositoryTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( QueryableDocumentsRepositoryTrait ).toBeDefined();
			expect( QueryableDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
