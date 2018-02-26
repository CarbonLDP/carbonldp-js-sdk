import * as Documents from "../Documents";
import { ObjectSchemaDigester } from "../ObjectSchema";
import * as PersistedDocument from "../PersistedDocument";
import * as RDFNode from "../RDF/Node";
import * as QueryContextBuilder from "../SPARQL/QueryDocument/QueryContextBuilder";
import * as QueryProperty from "../SPARQL/QueryDocument/QueryProperty";
import {
	clazz,
	hasDefaultExport,
	INSTANCE,
	method,
	module
} from "../test/JasmineExtender";

import * as Compacter from "./Compacter";

describe( module( "Carbon/JSONLD/Compacter" ), ():void => {

	it( "should exists", ():void => {
		expect( Compacter ).toBeDefined();
		expect( Compacter ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.JSONLD.Compacter.Class" ), ():void => {
		expect( Compacter.default ).toBeDefined();
		expect( Compacter.default ).toBe( Compacter.Class );
	} );

	describe( clazz( "Carbon.JSONLD.Compacter.Class", "Class for compacting a set of RDF resources in level of relations" ), ():void => {

		it( "should exists", ():void => {
			expect( Compacter.Class ).toBeDefined();
			expect( Compacter.Class ).toEqual( jasmine.any( Function ) );
		} );

		describe( method( INSTANCE, "compactDocuments" ), ():void => {

			it( "should exists", ():void => {
				expect( Compacter.Class.prototype.compactDocuments ).toBeDefined();
				expect( Compacter.Class.prototype.compactDocuments ).toEqual( jasmine.any( Function ) );
			} );

			it( "should send root path when one level resources", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 2 );
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
			} );

			it( "should send root path for only main documents", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
						} ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
						} ],
					},
				], [
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 2 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					void 0
				);
			} );

			it( "should send path of second level resources when schema is available", ():void => {
				const documents:Documents.Class = new Documents.Class();
				spyOn( documents, "hasSchemaFor" ).and
					.returnValue( true );
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "_:1",
							} ],
						} as RDFNode.Class, {
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
						} as RDFNode.Class, {
							"@id": "_:2",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 4 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:1" } ),
					"target.pointer1"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:2" } ),
					"target.pointer2"
				);
			} );

			it( "should not send path of second level resources when schema is unavailable", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "_:1",
							} ],
						} as RDFNode.Class, {
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
						} as RDFNode.Class, {
							"@id": "_:2",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 4 );
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:1" } ),
					void 0
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:2" } ),
					void 0
				);
			} );

			it( "should send path of second level of main documents when schema is available", ():void => {
				const documents:Documents.Class = new Documents.Class();
				spyOn( documents, "hasSchemaFor" ).and
					.returnValue( true );
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "_:1",
							} ],
						} as RDFNode.Class, {
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
						} as RDFNode.Class, {
							"@id": "_:2",
						} ],
					},
				], [
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 4 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:2" } ),
					"target.pointer2"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					void 0
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:1" } ),
					void 0
				);
			} );

			it( "should not send path of second level of main documents when schema is unavailable", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer-1": [ {
								"@id": "_:1",
							} ],
						} as RDFNode.Class, {
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
						} as RDFNode.Class, {
							"@id": "_:2",
						} ],
					},
				], [
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
						} ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 4 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:2" } ),
					void 0
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					void 0
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "_:1" } ),
					void 0
				);
			} );

			it( "should compact a resource with a fragment with path", ():void => {
				const documents:Documents.Class = new Documents.Class();
				spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"pointer": {
							"@id": "https://example.com/ns#pointer",
							"@type": "@id",
						},
						"string": {
							"@id": "https://example.com/ns#string",
							"@type": "string",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );

				interface Expected {
					pointer:{
						string:string;
					};
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & PersistedDocument.Class>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [
							{
								"@id": "https://example.com/resource-1/",
								"https://example.com/ns#pointer": [ {
									"@id": "_:1",
								} ],
							} as RDFNode.Class,
							{
								"@id": "_:1",
								"https://example.com/ns#string": [ {
									"@value": "string value",
								} ],
							} as RDFNode.Class,
						],
					},
				] );

				expect( compacted ).toEqual( [ {
					pointer: {
						string: "string value",
					},
				} ] );
			} );

			it( "should compact a resource with a fragment with no path", ():void => {
				const documents:Documents.Class = new Documents.Class();
				spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"pointer": {
							"@id": "https://example.com/ns#pointer",
							"@type": "@id",
						},
						"string": {
							"@id": "https://example.com/ns#string",
							"@type": "string",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents );

				interface Expected {
					pointer:{
						string:string;
					};
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & PersistedDocument.Class>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [
							{
								"@id": "https://example.com/resource-1/",
								"https://example.com/ns#pointer": [ {
									"@id": "_:1",
								} ],
							} as RDFNode.Class,
							{
								"@id": "_:1",
								"https://example.com/ns#string": [ {
									"@value": "string value",
								} ],
							} as RDFNode.Class,
						],
					},
				] );

				expect( compacted ).toEqual( [ {
					pointer: {
						string: "string value",
					},
				} ] );
			} );

			it( "should send path of only fist level when related to each other when documents resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const spy:jasmine.Spy = spyOn( documents, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target" );
				compacter.compactDocuments( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 2 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
			} );

			it( "should send path of only fist level when related to each other when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				const spy:jasmine.Spy = spyOn( queryResolver, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );
				compacter.compactDocuments( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 2 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
			} );

			it( "should send path of only second level when related to each other by partial property when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;
				queryResolver
					.addProperty( "target.pointer1" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				const spy:jasmine.Spy = spyOn( queryResolver, "getSchemaFor" ).and
					.returnValue( ObjectSchemaDigester.digestSchema( {
						"@vocab": "https://example.com/ns#",
						"pointer1": {
							"@id": "pointer-1",
							"@type": "@id",
						},
						"pointer2": {
							"@id": "pointer-2",
							"@type": "@id",
						},
					} ) );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );
				compacter.compactDocuments( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
					},
				] );

				expect( spy ).toHaveBeenCalledTimes( 4 );

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target.pointer1"
				);

				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-2/" } ),
					"target"
				);
				expect( spy ).toHaveBeenCalledWith(
					jasmine.objectContaining( { "@id": "https://example.com/resource-1/" } ),
					"target.pointer1"
				);
			} );

			it( "should compact every level from related to each other by partial property when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;
				queryResolver
					.addProperty( "target.pointer1" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				spyOn( queryResolver, "getSchemaFor" ).and
					.callFake( ( _object, path ) => {
						return path === "target" ?
							ObjectSchemaDigester.digestSchema( {
								"pointer1": {
									"@id": "https://example.com/ns#pointer-1",
									"@type": "@id",
								},
							} ) :
							ObjectSchemaDigester.digestSchema( {
								"pointer2": {
									"@id": "https://example.com/ns#pointer-2",
									"@type": "@id",
								},
							} );
					} );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );

				interface Expected {
					pointer1:Expected;
					pointer2:Expected;
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & PersistedDocument.Class>( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
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

			it( "should compact every level from related to each other by partial property when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;
				queryResolver
					.addProperty( "target.pointer1" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				spyOn( queryResolver, "getSchemaFor" ).and
					.callFake( ( _object, path ) => {
						return path === "target" ?
							ObjectSchemaDigester.digestSchema( {
								"pointer1": {
									"@id": "https://example.com/ns#pointer-1",
									"@type": "@id",
								},
							} ) :
							ObjectSchemaDigester.digestSchema( {
								"pointer2": {
									"@id": "https://example.com/ns#pointer-2",
									"@type": "@id",
								},
							} );
					} );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );

				interface Expected {
					pointer1:Expected;
					pointer2:Expected;
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & PersistedDocument.Class>( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
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

			it( "should merge every level schema from related to each other by partial property when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;
				queryResolver
					.addProperty( "target.pointer1" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				spyOn( queryResolver, "getSchemaFor" ).and
					.callFake( ( _object, path ) => {
						return path === "target" ?
							ObjectSchemaDigester.digestSchema( {
								"@vocab": "https://example.com/ns#",
								"pointer1": {
									"@id": "https://example.com/ns#pointer-1",
									"@type": "@id",
								},
							} ) :
							ObjectSchemaDigester.digestSchema( {
								"@vocab": "https://example.com/ns#",
								"pointer2": {
									"@id": "https://example.com/ns#pointer-2",
									"@type": "@id",
								},
							} );
					} );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );
				const compacted:PersistedDocument.Class[] = compacter.compactDocuments( [
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
						} as RDFNode.Class ],
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
						} as RDFNode.Class ],
					},
				] );

				expect( compacted[ 0 ]._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
					"pointer1": {
						"@id": "https://example.com/ns#pointer-1",
						"@type": "@id",
					},
					"pointer2": {
						"@id": "https://example.com/ns#pointer-2",
						"@type": "@id",
					},
				} ) );

				expect( compacted[ 1 ]._partialMetadata.schema ).toEqual( ObjectSchemaDigester.digestSchema( {
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

			it( "should compact same related document by partial property when query resolver", ():void => {
				const documents:Documents.Class = new Documents.Class();
				const queryResolver:QueryContextBuilder.Class = new QueryContextBuilder.Class();
				queryResolver
					.addProperty( "target" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;
				queryResolver
					.addProperty( "target.pointer" )
					.setType( QueryProperty.PropertyType.PARTIAL )
				;

				spyOn( queryResolver, "getSchemaFor" ).and
					.callFake( ( _object, path ) => {
						return path === "target" ?
							ObjectSchemaDigester.digestSchema( {
								"pointer": {
									"@id": "https://example.com/ns#pointer",
									"@type": "@id",
								},
							} ) :
							ObjectSchemaDigester.digestSchema( {
								"string": {
									"@id": "https://example.com/ns#string",
									"@type": "string",
								},
							} );
					} );

				const compacter:Compacter.Class = new Compacter.Class( documents, "target", queryResolver );

				interface Expected {
					pointer:{
						string:string;
					};
				}

				const compacted:Expected[] = compacter.compactDocuments<Expected & PersistedDocument.Class>( [
					{
						"@id": "https://example.com/resource-1/",
						"@graph": [ {
							"@id": "https://example.com/resource-1/",
							"https://example.com/ns#pointer": [ {
								"@id": "https://example.com/shared-resource/",
							} ],
						} as RDFNode.Class ],
					},
					{
						"@id": "https://example.com/resource-2/",
						"@graph": [ {
							"@id": "https://example.com/resource-2/",
							"https://example.com/ns#pointer": [ {
								"@id": "https://example.com/shared-resource/",
							} ],
						} as RDFNode.Class ],
					},
					{
						"@id": "https://example.com/shared-resource/",
						"@graph": [ {
							"@id": "https://example.com/shared-resource/",
							"https://example.com/ns#string": [ {
								"@value": "shared value",
							} ],
						} as RDFNode.Class ],
					},
				], [
					{ "@id": "https://example.com/resource-1/" } as any,
					{ "@id": "https://example.com/resource-2/" } as any,
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
				expect( compacted[ 0 ].pointer as any as PersistedDocument.Class ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/shared-resource/",
				} ) );
			} );

		} );

	} );

} );
