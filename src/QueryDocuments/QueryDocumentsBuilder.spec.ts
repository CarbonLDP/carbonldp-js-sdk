import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { clazz, extendsClass, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { QueryContainerProperty } from "./QueryContainerProperty";
import { QueryContainerPropertyType } from "./QueryContainerPropertyType";
import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QueryContainer } from "./QueryContainer";
import { QueryDocumentsBuilder } from "./QueryDocumentsBuilder";
import { QueryDocumentsOrder } from "./QueryDocumentsOrder";


describe( module( "carbonldp/QueryDocuments/QueryDocumentsBuilder" ), ():void => {

	describe( clazz(
		"CarbonLDP.QueryDocuments.QueryDocumentsBuilder",
		"Class with the helpers and properties for construct a query document"
	), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentsBuilder ).toBeDefined();
			expect( QueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContainer:QueryContainer;
		let baseProperty:QueryContainerProperty;
		beforeEach( ():void => {
			context = createMockContext( {
				uri: "http://example.com",
				settings: { vocabulary: "http://example.com/vocab#" },
			} );
			context.extendObjectSchema( {
				"ex": "http://example.com/ns#",
			} );

			queryContainer = new QueryContainer( context, { uri: "root/", containerPropertyType: QueryContainerPropertyType.CHILD } );
			baseProperty = queryContainer._queryProperty as QueryContainerProperty;
		} );

		describe( "QueryDocumentsBuilder.constructor", ():void => {

			it( "should be instantiable", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentsBuilder ) );
			} );

		} );

		it( extendsClass( "CarbonLDP.QueryDocuments.SubQueryDocumentsBuilder" ), ():void => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toEqual( jasmine.any( SubQueryDocumentsBuilder ) );
		} );


		describe( method( INSTANCE, "orderBy" ), ():void => {

			it( hasSignature(
				"Makes the target documents of the query to return ordered by the property specified.\n" +
				"If no order flow is specified, the default behaviour of SPARQL ordering is used (ascending order).",
				[
					{ name: "property", type: "string", description: "The property name from which the results will be ordered." },
					{ name: "flow", type: `"ASC" | "DESC" | "ascending" | "descending"`, description: "The specific order flow of the query." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.orderBy ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.orderBy ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				const returnedValue:QueryDocumentsBuilder = builder.orderBy( "property" );
				expect( returnedValue ).toBe( builder );
			} );

			it( "should add the path to base property", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				builder.orderBy( "property" );
				expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
					path: "property",
				} ) );
			} );

			it( "should add flow to base property when ASC", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				builder.orderBy( "property", "ASC" );
				expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
					flow: "ASC",
				} ) );
			} );

			it( "should add flow to base property when ascending", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				builder.orderBy( "property", "ascending" );
				expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
					flow: "ASC",
				} ) );
			} );

			it( "should add flow to base property when DESC", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				builder.orderBy( "property", "DESC" );
				expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
					flow: "DESC",
				} ) );
			} );

			it( "should add flow to base property when descending", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				builder.orderBy( "property", "descending" );
				expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
					flow: "DESC",
				} ) );
			} );

		} );

		describe( method( INSTANCE, "limit" ), ():void => {

			it( hasSignature(
				"Limit the target results to be returned by the number specified.",
				[
					{ name: "limit", type: "number", description: "The maximum number of targeted results." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.limit ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.limit ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				const returnedValue:QueryDocumentsBuilder = builder.limit( 10 );
				expect( returnedValue ).toBe( builder );
			} );

			it( "should store limit in base property", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				const spy:jasmine.Spy = spyOn( baseProperty, "setLimit" )
					.and.callThrough();

				builder.limit( 100 );
				expect( spy ).toHaveBeenCalledWith( 100 );
			} );

		} );

		describe( method( INSTANCE, "offset" ), ():void => {

			it( hasSignature(
				"Set an offset in the target results to be returned.",
				[
					{ name: "offset", type: "number", description: "The offset number to be applied to the targeted results." },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.offset ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.offset ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				const returnedValue:QueryDocumentsBuilder = builder.offset( 10 );
				expect( returnedValue ).toBe( builder );
			} );

			it( "should store offset in base property", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

				const spy:jasmine.Spy = spyOn( baseProperty, "setOffset" )
					.and.callThrough();

				builder.offset( 100 );
				expect( spy ).toHaveBeenCalledWith( 100 );
			} );

		} );

	} );

} );
