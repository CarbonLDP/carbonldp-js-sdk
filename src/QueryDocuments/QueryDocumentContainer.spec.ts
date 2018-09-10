import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { clazz, constructor, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { QueryDocumentContainer } from "./QueryDocumentContainer";
import { QueryRootProperty } from "./QueryRootProperty";


describe( module( "carbonldp/QueryDocuments/QueryDocumentContainer" ), ():void => {

	describe( clazz( "CarbonLDP.QueryDocuments.QueryDocumentContainer", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentContainer ).toBeDefined();
			expect( QueryDocumentContainer ).toEqual( jasmine.any( Function ) );
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
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );
				expect( queryContainer ).toBeDefined();
				expect( queryContainer ).toEqual( jasmine.any( QueryDocumentContainer ) );
			} );

			it( "should init property", () => {
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );

				expect( queryContainer._queryProperty ).toEqual( jasmine.any( QueryRootProperty ) );
				expect( queryContainer._queryProperty.name ).toBe( "root" );
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
				expect( QueryDocumentContainer.prototype.serializeLiteral ).toBeDefined();
				expect( QueryDocumentContainer.prototype.serializeLiteral ).toEqual( jasmine.any( Function ) );
			} );

			it( "should use the literal serializers of carbon", ():void => {
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );
				const spy:jasmine.Spy = spyOnProperty( context.jsonldConverter, "literalSerializers", "get" ).and.callThrough();

				queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should get the correct literal serializer", ():void => {
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );
				const spy:jasmine.Spy = spyOn( context.jsonldConverter.literalSerializers, "get" ).and.callThrough();

				queryContainer.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalledWith( "http://www.w3.org/2001/XMLSchema#string" );
			} );

		} );


		describe( method( INSTANCE, "getGeneralSchema" ), ():void => {

			it( hasSignature(
				"Returns the general schema of the carbon context.\n" +
				"If no carbon context provided at the constructor an empty schema will be returned.",
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentContainer.prototype.getGeneralSchema ).toBeDefined();
				expect( QueryDocumentContainer.prototype.getGeneralSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to the registry `getGeneralSchema` method", ():void => {
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );
				const spy:jasmine.Spy = spyOnDecorated( context.registry, "getGeneralSchema" ).and.returnValue( null );

				const returnedValue:any = queryContainer.getGeneralSchema();
				expect( spy ).toHaveBeenCalled();
				expect( returnedValue ).toBeNull();
			} );

		} );

		describe( method( INSTANCE, "getSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns the schema specified by the object using the carbon context.\n" +
				"If no carbon context provided at the constructor an empty schema will be returned.",
				[
					{ name: "object", type: "object", description: "The object to look for its corresponding schema." },
					{ name: "path", type: "string", description: "An optional path that describes where the resource appears in the query.\nNOTE: Property is ignored but used in the extensions of this class." },
				],
				{ type: "CarbonLDP.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentContainer.prototype.getSchemaFor ).toBeDefined();
				expect( QueryDocumentContainer.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call to the registry `getSchemaFor` method", ():void => {
				const queryContainer:QueryDocumentContainer = new QueryDocumentContainer( context, { name: "root", uri: "property/" } );
				const spy:jasmine.Spy = spyOnDecorated( context.registry, "getSchemaFor" ).and.returnValue( null );

				const object:object = { id: "http://example.com/", types: [ "http://example.com/Type" ] };

				const returnedValue:any = queryContainer.getSchemaFor( object );
				expect( spy ).toHaveBeenCalledWith( object );
				expect( returnedValue ).toBeNull();
			} );

		} );

	} );

} );
