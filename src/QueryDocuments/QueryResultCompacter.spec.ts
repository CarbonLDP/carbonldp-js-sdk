import { createMockContext, createMockQueryableMetadata } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { Document } from "../Document/Document";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryResultCompacter } from "./QueryResultCompacter";


describe( "QueryResultCompacter", () => {

	let registry:GeneralRegistry<Document>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		const context:AbstractContext<any, any, any> = createMockContext()
			.extendObjectSchema( {
				"@vocab": "https://example.com/ns#",
			} );

		registry = GeneralRegistry.create( { __modelDecorator: Document, context: context } );

		queryContainer = new QueryContainer( context, { uri: "root/" } );
	} );


	it( "should exists", () => {
		expect( QueryResultCompacter ).toBeDefined();
		expect( QueryResultCompacter ).toEqual( jasmine.any( Function ) );
	} );


	describe( "QueryResultCompacter.constructor", () => {

		it( "should be instantiable", () => {
			const instance:QueryResultCompacter = new QueryResultCompacter( registry, queryContainer );
			expect( instance ).toEqual( jasmine.any( QueryResultCompacter ) );
		} );

	} );

	describe( "QueryResultCompacter.compactDocuments", () => {

		it( "should exists", () => {
			expect( QueryResultCompacter.prototype.compactDocuments ).toBeDefined();
			expect( QueryResultCompacter.prototype.compactDocuments ).toEqual( jasmine.any( Function ) );
		} );


		it( "should add metadata of one level property", () => {
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

		it( "should merge metadata level schema from related to each other", () => {
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


		it( "should compact a resource with a fragment", () => {
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

		it( "should compact every level from related to each other", () => {
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

		it( "should compact same related document", () => {
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
