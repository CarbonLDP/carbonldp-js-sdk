import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { createMockContext, createMockQueryableMetadata } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";
import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { clazz, constructor, extendsClass, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";
import { QueryablePointer } from "./QueryablePointer";

import { QueryContext } from "./QueryContext";

import * as Module from "./QueryContextPartial";
import { QueryContextPartial } from "./QueryContextPartial";

describe( module( "carbonldp/QueryDocuments/QueryContextPartial" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.QueryDocuments.QueryContextPartial", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContextPartial ).toBeDefined();
			expect( QueryContextPartial ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<RegisteredPointer, any>;
		let resource:QueryablePointer;
		beforeEach( ():void => {
			context = createMockContext();

			resource = QueryablePointer.decorate<Partial<QueryablePointer>>( {
				$repository: context.repository,

				$id: "https://example.com/resource/",
				_queryableMetadata: createMockQueryableMetadata( {
					"documentProperty": {
						"@id": "https://example.com/ns#document-property",
					},
				} ),
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
				const queryContext:QueryContextPartial = new QueryContextPartial( resource, context );
				expect( queryContext ).toBeDefined();
				expect( queryContext ).toEqual( jasmine.any( QueryContextPartial ) );
			} );

		} );

		it( extendsClass( "CarbonLDP.QueryDocuments.QueryContext" ), ():void => {
			const queryContext:QueryContextPartial = new QueryContextPartial( resource, context );
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
				const queryContext:QueryContextPartial = new QueryContextPartial( resource, context );

				const helper:( name:string ) => void = name => {
					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( returnedValue ).toBe( resource._queryableMetadata.schema );
				};

				helper( "document" );
				helper( "member" );
				helper( "property" );
			} );

			it( "should return the schema of a document property", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( resource, context );
				const fragment:QueryablePointer = QueryablePointer.decorate<Partial<QueryablePointer>>( {
					$repository: context.repository,
					_queryableMetadata: createMockQueryableMetadata( {
						"fragmentProperty": {
							"@id": "https://example.com/ns#fragment-property",
						},
					} ),
				} );


				resource[ "property" ] = fragment;
				resource[ "propertyArray" ] = [ fragment ];
				resource[ "propertyArray2" ] = [ null, null, fragment ];

				const helper:( name:string ) => void = name => {
					const returnedValue:any = queryContext.getSchemaFor( {}, name );
					expect( returnedValue ).toBe( fragment._queryableMetadata.schema );
				};

				helper( "document.property" );
				helper( "member.property" );
				helper( "property.property" );

				helper( "document.propertyArray" );
				helper( "document.propertyArray2" );
			} );

			it( "should call document `getSchemaFor` when invalid property", ():void => {
				const queryContext:QueryContextPartial = new QueryContextPartial( resource, context );
				resource[ "property1" ] = void 0;
				resource[ "property2" ] = null;
				resource[ "property3" ] = "string";
				resource[ "property4" ] = 1;
				resource[ "property6" ] = {};
				resource[ "property5" ] = [];
				resource[ "property6" ] = [ {} ];

				const spy:jasmine.Spy = spyOnDecorated( context.registry, "getSchemaFor" )
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
