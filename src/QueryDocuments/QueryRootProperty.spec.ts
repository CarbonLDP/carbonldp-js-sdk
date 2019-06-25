import { IRIRefToken } from "sparqler/tokens";

import { createMockContext, createMockDigestedSchemaProperty } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";
import { IllegalActionError } from "../Errors/IllegalActionError";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { QueryContainer } from "./QueryContainer";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryRootProperty } from "./QueryRootProperty";
import { QueryRootPropertyType } from "./QueryRootPropertyType";


describe( "QueryRootProperty", () => {

	it( "should exist", () => {
		expect( QueryRootProperty ).toBeDefined();
		expect( QueryRootProperty ).toEqual( jasmine.any( Function ) );
	} );


	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		context = createMockContext( { settings: { vocabulary: "https://example.com/vocab#" } } );
		queryContainer = new QueryContainer( context, { rootPropertyType: QueryRootPropertyType.DOCUMENT, uris: [ "root/" ] } );
	} );

	describe( "QueryRootProperty.constructor", () => {

		it( "should exist", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
			} );

			expect( queryProperty ).toEqual( jasmine.any( QueryRootProperty ) );
		} );


		it( "should store rootPropertyType as name", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
			} );

			expect( queryProperty.name ).toEqual( QueryRootPropertyType.DOCUMENT );
		} );

		it( "should set optional to false", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
			} );

			expect( queryProperty.optional ).toEqual( false );
		} );

		it( "should set type to PARTIAL", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
			} );

			expect( queryProperty.propertyType ).toEqual( QueryPropertyType.PARTIAL );
		} );

		it( "should store containerIRI", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
				containerIRI: new IRIRefToken( "https://example.com/" ),
			} );

			expect( queryProperty.containerIRI ).toEqual( new IRIRefToken( "https://example.com/" ) );
		} );

	} );


	describe( "QueryRootProperty.getSelfPattern", () => {

		it( "should exist", () => {
			expect( QueryRootProperty.prototype.getSelfPattern ).toBeDefined();
			expect( QueryRootProperty.prototype.getSelfPattern ).toEqual( jasmine.any( Function ) );
		} );


		it( "should throw error when called", () => {
			const queryProperty:QueryRootProperty = new QueryRootProperty( {
				queryContainer: queryContainer,
				rootPropertyType: QueryRootPropertyType.DOCUMENT,
			} );

			expect( () => queryProperty.getSelfPattern() )
				.toThrowError( IllegalActionError, "Cannot create pattern without a parent." );
		} );

	} );

	// TODO: Test .getSearchPatterns
	// TODO: Test .setOrder
	// TODO: Test .setOrder
	// TODO: Test .setOffset

} );
