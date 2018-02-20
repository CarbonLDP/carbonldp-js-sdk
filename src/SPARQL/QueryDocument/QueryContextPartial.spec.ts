import AbstractContext from "../../AbstractContext";
import { Digester } from "../../ObjectSchema";
import * as PersistedDocument from "../../PersistedDocument";
import * as PersistedFragment from "../../PersistedFragment";
import { clazz, constructor, extendsClass, hasDefaultExport, hasSignature, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as PartialMetadata from "./PartialMetadata";
import QueryContext from "./QueryContext";

import * as Module from "./QueryContextPartial";
import { Class as QueryContextPartial } from "./QueryContextPartial";

describe( module( "Carbon/SPARQL/QueryDocument/QueryContextPartial" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryContextPartial.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryContextPartial );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryContextPartial.Class", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContextPartial ).toBeDefined();
			expect( QueryContextPartial ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let persistedDocument:PersistedDocument.Class;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};

			persistedDocument = PersistedDocument.Factory.createFrom(
				context.documents.getPointer( "https://example.com/resource/" ),
				"https://example.com/resource/",
				context.documents
			);
			persistedDocument._partialMetadata = new PartialMetadata.Class( Digester.digestSchema( {
				"documentProperty": {
					"@id": "https://example.com/ns#document-property",
				},
			} ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "document", type: "Carbon.PersistedDocument.Class", description: "partial document from whom the query context is created for." },
					{ name: "context", type: "Carbon.Context.Context", optional: true, description: "The carbon context from where the query belongs to." },
				]
			), ():void => {
			} );

			it( "should be instantiable", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
				expect( queryContext ).toBeDefined();
				expect( queryContext ).toEqual( jasmine.any( QueryContextPartial ) );
			} );

			it( "should add the document", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
				expect( queryContext[ "_document" ] ).toBe( persistedDocument );
			} );

		} );

		it( extendsClass( "Carbon.SPARQL.QueryDocument.QueryContext.Class" ), ():void => {
			const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
			expect( queryContext ).toEqual( jasmine.any( QueryContext ) );
		} );

		describe( method( INSTANCE, "getSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns the partial schema of the object specified by the path.\n" +
				"If no path specified the behaviour of the parent class will be executed.",
				[
					{ name: "object", type: "object", description: "The object to look for its corresponding schema.\nNOTE: Property is ignored when a path is specified." },
					{ name: "path", type: "string", description: "An optional path that describes where the resource appears in the partial document." },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContextPartial.prototype.getSchemaFor ).toBeDefined();
				expect( QueryContextPartial.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the schema of the document", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );

				const helper:( name:string ) => void = name => {
					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( returnedValue ).toBe( persistedDocument._partialMetadata.schema );
				};

				helper( "document" );
				helper( "member" );
				helper( "property" );
			} );

			it( "should return the schema of a document property", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
				const fragment:PersistedFragment.Class = persistedDocument.createFragment();
				fragment._partialMetadata = new PartialMetadata.Class( Digester.digestSchema( {
					"fragmentProperty": {
						"@id": "https://example.com/ns#fragment-property",
					},
				} ) );

				persistedDocument[ "property" ] = fragment;
				persistedDocument[ "propertyArray" ] = [ fragment ];
				persistedDocument[ "propertyArray2" ] = [ null, null, fragment ];

				const helper:( name:string ) => void = name => {
					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( returnedValue ).toBe( fragment._partialMetadata.schema );
				};

				helper( "document.property" );
				helper( "member.property" );
				helper( "property.property" );

				helper( "document.propertyArray" );
				helper( "document.propertyArray2" );
			} );

			it( "should call document `getSchemaFor` when invalid property", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
				persistedDocument[ "property1" ] = void 0;
				persistedDocument[ "property2" ] = null;
				persistedDocument[ "property3" ] = "string";
				persistedDocument[ "property4" ] = 1;
				persistedDocument[ "property6" ] = {};
				persistedDocument[ "property5" ] = [];
				persistedDocument[ "property6" ] = [ {} ];

				const spy:jasmine.Spy = spyOn( context.documents, "getSchemaFor" )
					.and.returnValue( null );

				const helper:( name:string ) => void = name => {
					const returnedValue:any = queryContext.getSchemaFor( {}, name );

					expect( spy ).toHaveBeenCalled();
					expect( returnedValue ).toBeNull();

					spy.calls.reset();
				};

				helper( "document.property" );
				helper( "member.property" );
				helper( "property.property" );
			} );

		} );

	} );

} );
