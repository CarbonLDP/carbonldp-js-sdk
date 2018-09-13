import { createMockContext, createMockQueryableMetadata, MockQueryContainer } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { Document } from "../Document/Document";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { clazz, constructor, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";
import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryResultCompacter } from "./QueryResultCompacter";


describe( module( "carbonldp/JSONLD/QueryResultCompacter" ), ():void => {

	describe( clazz( "CarbonLDP.JSONLD.QueryResultCompacter", "Class for compacting a set of RDF resources in level of relations" ), ():void => {

		let registry:GeneralRegistry<Document>;
		let queryContainer:QueryContainer;
		beforeEach( ():void => {
			const context:AbstractContext<any, any, any> = createMockContext()
				.extendObjectSchema( {
					"@vocab": "https://example.com/ns#",
				} );

			registry = GeneralRegistry.create( { __modelDecorator: Document, context: context } );

			queryContainer = new MockQueryContainer( context );
		} );


		it( "should exists", ():void => {
			expect( QueryResultCompacter ).toBeDefined();
			expect( QueryResultCompacter ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "registry", type: "CarbonLDP.Registry<CarbonLDP.Document, any>" },
					{ name: "queryContainer", type: "CarbonLDP.QueryDocuments.QueryContainer" },
				]
			), ():void => {} );

			it( "should be instantiable", () => {
				const instance:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );
				expect( instance ).toEqual( jasmine.any( QueryResultCompacter ) );
			} );

		} );

		describe( method( INSTANCE, "compactDocuments" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "rdfDocuments", type: "CarbonLDP.RDF.RDFDocument[]" },
					{ name: "targetDocuments", type: "string[]" },
				],
				{ type: "(T & CarbonLDP.Document)[]" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryResultCompacter.prototype.compactDocuments ).toBeDefined();
				expect( QueryResultCompacter.prototype.compactDocuments ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add metadata of one level property", ():void => {
				queryContainer._queryProperty
					.setType( QueryPropertyType.PARTIAL );
				queryContainer._queryProperty
					.addProperty( "pointer1", {
						"@id": "pointer-1",
						"@type": "@id",
					} );
				queryContainer._queryProperty
					.addProperty( "pointer2", {
						"@id": "pointer-2",
						"@type": "@id",
					} );

				const compacter:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );
				const returned:Document[] = compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "_:1",
							} ],
						}, {
							"@id": "_:1",
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
							"https://example.com/ns#pointer-2": [ {
								"@id": "_:2",
							} ],
						}, {
							"@id": "_:2",
						} ],
					},
				] );


				expect( returned[ 0 ].$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/resource-1/",
					"pointer1": {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					},
					"pointer2": {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					},
				} ) );

				expect( returned[ 1 ].$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/resource-2/",
					"pointer1": {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					},
					"pointer2": {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					},
				} ) );
			} );

			it( "should merge metadata level schema from related to each other", ():void => {
				queryContainer._queryProperty
					.setType( QueryPropertyType.PARTIAL );
				const subProperty:QueryProperty = queryContainer._queryProperty
					.addProperty( "pointer1", {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					} );

				subProperty
					.setType( QueryPropertyType.PARTIAL );
				subProperty
					.addProperty( "pointer2", {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					} );

				const compacter:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );
				const returned:Document[] = compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "https://example.com/resource-1/",
							} ],
							"https://example.com/ns#pointer-2": [ {
								"@id": "https://example.com/resource-2/",
							} ],
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "https://example.com/resource-2/",
							} ],
							"https://example.com/ns#pointer-2": [ {
								"@id": "https://example.com/resource-1/",
							} ],
						} ],
					},
				] );


				expect( returned[ 0 ].$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/resource-1/",
					"pointer1": {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					},
					"pointer2": {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					},
				} ) );

				expect( returned[ 1 ].$_queryableMetadata ).toEqual( createMockQueryableMetadata( {
					"$id": "https://example.com/resource-2/",
					"pointer1": {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					},
					"pointer2": {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					},
				} ) );
			} );


			it( "should compact a resource with a fragment", ():void => {
				queryContainer._queryProperty
					.setType( QueryPropertyType.PARTIAL );
				const subProperty:QueryProperty = queryContainer._queryProperty
					.addProperty( "pointer", {
						"@id": "https://example.com/ns#pointer",
						"@type": "@id",
					} );

				subProperty
					.setType( QueryPropertyType.PARTIAL );
				subProperty
					.addProperty( "string", {
						"@id": "https://example.com/ns#string",
						"@type": "string",
					} );

				const compacter:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );

				interface Expected {
					pointer:{
						string:string;
					};
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & Document>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [
							{
								"@id": "https://example.com/resource-1/",
								"https://example.com/ns#pointer": [ {
									"@id": "_:1",
								} ],
							},
							{
								"@id": "_:1",
								"https://example.com/ns#string": [ {
									"@value": "string value",
								} ],
							},
						],
					},
				] );

				expect( compacted ).toEqual( [ {
					pointer: {
						string: "string value",
					},
				} ] );
			} );

			it( "should compact every level from related to each other", ():void => {
				queryContainer._queryProperty
					.setType( QueryPropertyType.PARTIAL );
				const subProperty:QueryProperty = queryContainer._queryProperty
					.addProperty( "pointer1", {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					} );

				subProperty
					.setType( QueryPropertyType.PARTIAL );
				subProperty
					.addProperty( "pointer2", {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					} );

				const compacter:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );

				interface Expected {
					pointer1:Expected;
					pointer2:Expected;
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & Document>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "https://example.com/resource-1/",
							} ],
							"https://example.com/ns#pointer-2": [ {
								"@id": "https://example.com/resource-2/",
							} ],
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "https://example.com/resource-2/",
							} ],
							"https://example.com/ns#pointer-2": [ {
								"@id": "https://example.com/resource-1/",
							} ],
						} ],
					},
				] );

				expect( compacted ).toEqual( [
					{
						pointer1: compacted[ 0 ],
						pointer2: compacted[ 1 ],
					},
					{
						pointer1: compacted[ 1 ],
						pointer2: compacted[ 0 ],
					},
				] );
			} );

			it( "should compact same related document", ():void => {
				queryContainer._queryProperty
					.setType( QueryPropertyType.PARTIAL );
				const subProperty:QueryProperty = queryContainer._queryProperty
					.addProperty( "pointer", {
						"@id": "https://example.com/ns#pointer",
						"@type": "@id",
					} );

				subProperty
					.setType( QueryPropertyType.PARTIAL );
				subProperty
					.addProperty( "string", {
						"@id": "https://example.com/ns#string",
						"@type": "string",
					} );

				const compacter:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );

				interface Expected {
					pointer:{
						string:string;
					};
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & Document>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer": [ {
								"@id": "https://example.com/shared-resource/",
							} ],
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
							"https://example.com/ns#pointer": [ {
								"@id": "https://example.com/shared-resource/",
							} ],
						} ],
					},
					{
						"@id": "https://example.com/shared-resource/",
						"@graph": [ {
							"@id": "https://example.com/shared-resource/",
							"https://example.com/ns#string": [ {
								"@value": "shared value",
							} ],
						} ],
					},
				], [
					"https://example.com/resource-1/",
					"https://example.com/resource-2/",
				] );

				expect( compacted ).toEqual( [
					{
						pointer: {
							string: "shared value",
						},
					},
					{
						pointer: {
							string: "shared value",
						},
					},
				] );

				expect( compacted[ 0 ].pointer ).toBe( compacted[ 1 ].pointer );
				expect( compacted[ 0 ].pointer as any as Document ).toEqual( jasmine.objectContaining( {
					$id: "https://example.com/shared-resource/",
				} ) );
			} );

		} );

	} );

} );
