import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { QueryContainer } from "./QueryContainer";
import { QueryRootProperty } from "./QueryRootProperty";


describe( "QueryContainer", () => {

	it( "should exist", () => {
		expect( QueryContainer ).toBeDefined();
		expect( QueryContainer ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	beforeEach( () => {
		context = createMockContext();
	} );


	describe( "QueryContainer.constructor", () => {

		it( "should be instantiable", () => {
			const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );
			expect( queryContainer ).toBeDefined();
			expect( queryContainer ).toEqual( jasmine.any( QueryContainer ) );
		} );

		it( "should init property", () => {
			const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );

			expect( queryContainer._queryProperty ).toEqual( jasmine.any( QueryRootProperty ) );
			expect( queryContainer._queryProperty.name ).toBe( "document" );
		} );

	} );

	describe( "QueryContainer.serializeLiteral", () => {

		it( "should exist", () => {
			expect( QueryContainer.prototype.serializeLiteral ).toBeDefined();
			expect( QueryContainer.prototype.serializeLiteral ).toEqual( jasmine.any( Function ) );
		} );


		it( "should use the literal serializers of carbon", () => {
			const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );
			const spy:jasmine.Spy = spyOnProperty( context.jsonldConverter, "literalSerializers", "get" ).and.callThrough();

			queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
			expect( spy ).toHaveBeenCalled();
		} );

		it( "should get the correct literal serializer", () => {
			const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );
			const spy:jasmine.Spy = spyOn( context.jsonldConverter.literalSerializers, "get" ).and.callThrough();

			queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
			expect( spy ).toHaveBeenCalledWith( "http://www.w3.org/2001/XMLSchema#string" );
		} );

	} );

} );
