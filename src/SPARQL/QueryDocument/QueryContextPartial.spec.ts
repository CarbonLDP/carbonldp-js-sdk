import {
	createMockContext,
	createMockDocument,
	createMockPartialMetadata
} from "../../../test/helpers/mocks";
import { AbstractContext } from "../../AbstractContext";
import { Document } from "../../Document";
import { Pointer } from "../../Pointer";
import { PersistedResource } from "../../Resource";
import {
	clazz,
	constructor,
	extendsClass,
	hasSignature,
	INSTANCE,
	method,
	module
} from "../../test/JasmineExtender";
import { QueryContext } from "./QueryContext";

import * as Module from "./QueryContextPartial";
import { QueryContextPartial } from "./QueryContextPartial";

describe( module( "carbonldp/SPARQL/QueryDocument/QueryContextPartial" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.SPARQL.QueryDocument.QueryContextPartial", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContextPartial ).toBeDefined();
			expect( QueryContextPartial ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<Pointer, any>;
		let persistedDocument:Document;
		beforeEach( ():void => {
			context = createMockContext();

			persistedDocument = createMockDocument( {
				_registry: context.registry,
				_partialMetadata: createMockPartialMetadata( {
					"documentProperty": {
						"@id": "https://example.com/ns#document-property",
					},
				} ),
				id: "https://example.com/resource/",
			} );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "document", type: "CarbonLDP.Document", description: "partial document from whom the query context is created for." },
					{ name: "context", type: "CarbonLDP.Context", optional: true, description: "The carbon context from where the query belongs to." },
				]
			), ():void => {
			} );

			it( "should be instantiable", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( persistedDocument, context );
				expect( queryContext ).toBeDefined();
				expect( queryContext ).toEqual( jasmine.any( QueryContextPartial ) );
			} );

		} );

		it( extendsClass( "CarbonLDP.SPARQL.QueryDocument.QueryContext" ), ():void => {
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
				{ type: "CarbonLDP.DigestedObjectSchema" }
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
				const fragment:PersistedResource = persistedDocument._register( PersistedResource.decorate( {
					_partialMetadata: createMockPartialMetadata( {
						"fragmentProperty": {
							"@id": "https://example.com/ns#fragment-property",
						},
					} ),
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

				const spy:jasmine.Spy = spyOn( context.registry, "getSchemaFor" )
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
