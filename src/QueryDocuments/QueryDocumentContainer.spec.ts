import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { clazz, constructor, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { QueryContainer } from "./QueryContainer";
import { QueryRootProperty } from "./QueryRootProperty";


describe( module( "carbonldp/QueryDocuments/QueryDocumentContainer" ), ():void => {

	describe( clazz( "CarbonLDP.QueryDocuments.QueryContainer", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContainer ).toBeDefined();
			expect( QueryContainer ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		beforeEach( ():void => {
			context = createMockContext();
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Class that helps the builders of a query document with the shared data.",
				[
					{ name: "context", type: "CarbonLDP.AbstractContext<any, any, any>", description: "The carbon context from where the query belongs to." },
					{ name: "propertyData", type: "{ name:string, uri:string }" },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
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


		describe( method( INSTANCE, "serializeLiteral" ), ():void => {

			it( hasSignature(
				"Serialize the value with the literalSerializer specified by the type provided if exists.",
				[
					{ name: "type", type: "string", description: "The type to the literalSerializer to use." },
					{ name: "value", type: "any", description: "The value to be serialized" },
				],
				{ type: "string" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContainer.prototype.serializeLiteral ).toBeDefined();
				expect( QueryContainer.prototype.serializeLiteral ).toEqual( jasmine.any( Function ) );
			} );

			it( "should use the literal serializers of carbon", ():void => {
				const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );
				const spy:jasmine.Spy = spyOnProperty( context.jsonldConverter, "literalSerializers", "get" ).and.callThrough();

				queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should get the correct literal serializer", ():void => {
				const queryContainer:QueryContainer = new QueryContainer( context, { uri: "property/" } );
				const spy:jasmine.Spy = spyOn( context.jsonldConverter.literalSerializers, "get" ).and.callThrough();

				queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalledWith( "http://www.w3.org/2001/XMLSchema#string" );
			} );

		} );

	} );

} );