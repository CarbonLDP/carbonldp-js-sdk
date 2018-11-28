import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { QueryContainer } from "./QueryContainer";
import { QueryContainerProperty } from "./QueryContainerProperty";
import { QueryContainerPropertyType } from "./QueryContainerPropertyType";
import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./QueryDocumentsBuilder";
import { QueryDocumentsOrder } from "./QueryDocumentsOrder";


describe( "QueryDocumentsBuilder", () => {

	it( "should exist", () => {
		expect( QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	let baseProperty:QueryContainerProperty;
	beforeEach( () => {
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

	describe( "QueryDocumentsBuilder.constructor", () => {

		it( "should be instantiable", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toBeDefined();
			expect( builder ).toEqual( jasmine.any( QueryDocumentsBuilder ) );
		} );

		it( "should extend from SubQueryDocumentsBuilder", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );
			expect( builder ).toEqual( jasmine.any( SubQueryDocumentsBuilder ) );
		} );

	} );


	describe( "QueryDocumentsBuilder.orderBy", () => {

		it( "should exist", () => {
			expect( QueryDocumentsBuilder.prototype.orderBy ).toBeDefined();
			expect( QueryDocumentsBuilder.prototype.orderBy ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return itself", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			const returnedValue:QueryDocumentsBuilder = builder.orderBy( "property" );
			expect( returnedValue ).toBe( builder );
		} );

		it( "should add the path to base property", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			builder.orderBy( "property" );
			expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
				path: "property",
			} ) );
		} );

		it( "should add flow to base property when ASC", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			builder.orderBy( "property", "ASC" );
			expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
				flow: "ASC",
			} ) );
		} );

		it( "should add flow to base property when ascending", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			builder.orderBy( "property", "ascending" );
			expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
				flow: "ASC",
			} ) );
		} );

		it( "should add flow to base property when DESC", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			builder.orderBy( "property", "DESC" );
			expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
				flow: "DESC",
			} ) );
		} );

		it( "should add flow to base property when descending", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			builder.orderBy( "property", "descending" );
			expect( baseProperty.order ).toEqual( jasmine.objectContaining<QueryDocumentsOrder>( {
				flow: "DESC",
			} ) );
		} );

	} );

	describe( "QueryDocumentsBuilder.limit", () => {

		it( "should exist", () => {
			expect( QueryDocumentsBuilder.prototype.limit ).toBeDefined();
			expect( QueryDocumentsBuilder.prototype.limit ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return itself", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			const returnedValue:QueryDocumentsBuilder = builder.limit( 10 );
			expect( returnedValue ).toBe( builder );
		} );

		it( "should store limit in base property", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			const spy:jasmine.Spy = spyOn( baseProperty, "setLimit" )
				.and.callThrough();

			builder.limit( 100 );
			expect( spy ).toHaveBeenCalledWith( 100 );
		} );

	} );

	describe( "QueryDocumentsBuilder.offset", () => {

		it( "should exist", () => {
			expect( QueryDocumentsBuilder.prototype.offset ).toBeDefined();
			expect( QueryDocumentsBuilder.prototype.offset ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return itself", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			const returnedValue:QueryDocumentsBuilder = builder.offset( 10 );
			expect( returnedValue ).toBe( builder );
		} );

		it( "should store offset in base property", () => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContainer, baseProperty );

			const spy:jasmine.Spy = spyOn( baseProperty, "setOffset" )
				.and.callThrough();

			builder.offset( 100 );
			expect( spy ).toHaveBeenCalledWith( 100 );
		} );

	} );

} );
