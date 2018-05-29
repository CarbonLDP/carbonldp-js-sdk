import { createMockContext } from "../../test/helpers/mocks";
import { AbstractContext } from "../AbstractContext";
import { ModelDecorator } from "../core";
import { IllegalArgumentError } from "../Errors";
import { JSONLDConverter } from "../JSONLD";
import { Pointer } from "../Pointer";
import { Serializer } from "../RDF";
import {
	clazz,
	INSTANCE,
	module,
	property
} from "../test/JasmineExtender";
import { Registry } from "./Registry";
import { RegistryService } from "./RegistryService";

describe( module( "carbonldp/Registry" ), () => {

	describe( clazz(
		"CarbonLDP.RegistryService",
		[
			"M extends CarbonLDP.Pointer",
			"C extends CarbonLDP.AbstractContext<M, any> = undefined",
		],
		"Base registry as a service that can be related to an specific context.",
		[
			"CarbonLDP.Registry<M>",
			"CarbonLDP.ObjectSchemaResolver",
		]
	), () => {

		it( "should be instantiable", () => {
			const registry:RegistryService<any> = new RegistryService( null as any, void 0 );
			expect( registry ).toEqual( jasmine.any( RegistryService ) );
		} );

	} );

	describe( property(
		INSTANCE,
		"_registry",
		"CarbonLDP.Registry<any> | undefined"
	), () => {

		it( "should return undefined when no context", () => {
			const registry:RegistryService<any> = new RegistryService( Pointer, void 0 );
			expect( registry._registry ).toBeUndefined();
		} );

		it( "should return undefined when context has no parent", () => {
			const context:AbstractContext<Pointer> = createMockContext();
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry._registry ).toBeUndefined();
		} );

		it( "should return the registry of the context parent", () => {
			const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
			const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

			const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry._registry ).toBe( parentRegistry );
		} );

	} );

	describe( property(
		INSTANCE,
		"_resourcesMap",
		"Map<string, M>"
	), () => {

		it( "should initialize a empty map", () => {
			const registry:RegistryService<Pointer> = new RegistryService<Pointer>( Pointer );
			expect( registry._resourcesMap ).toEqual( new Map() );
		} );

	} );

	describe( property(
		INSTANCE,
		"documentDecorators",
		"Map<string, ( object:object ) => object>",
		"A map that specifies a type and a function decorator used for add functionality to retrieved documents."
	), () => {

		it( "should return empty when no context", () => {
			const registry:RegistryService<any> = new RegistryService( Pointer, void 0 );
			expect( registry.documentDecorators ).toEqual( new Map() );
		} );

		it( "should return empty when context has no parent", () => {
			const context:AbstractContext<Pointer> = createMockContext();
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.documentDecorators ).toEqual( new Map() );
		} );

		it( "should return empty when parent context registry empty", () => {
			const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
			const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

			const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.documentDecorators ).toEqual( new Map() );
		} );

		it( "should return parent decorators when parent context registry has decorators", () => {
			const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
			const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

			const decorator1:() => any = () => {};
			const decorator2:() => any = () => {};
			parentRegistry.documentDecorators
				.set( "decorator1", decorator1 )
				.set( "decorator2", decorator2 )
			;


			const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.documentDecorators ).toEqual( new Map( [
				[ "decorator1", decorator1 ],
				[ "decorator2", decorator2 ],
			] ) );
		} );

	} );

	describe( property(
		INSTANCE,
		"jsonldConverter",
		"CarbonLDP.JSONLD.JSONLDConverter",
		"Instance of `CarbonLDP.JSONLD.JSONLDConverter` that is used to compact retrieved documents and to expand documents to persist."
	), () => {

		it( "should return empty when no context", () => {
			const registry:RegistryService<any> = new RegistryService( Pointer, void 0 );
			expect( registry.jsonldConverter ).toEqual( new JSONLDConverter() );
		} );

		it( "should return empty when context has no parent", () => {
			const context:AbstractContext<Pointer> = createMockContext();
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.jsonldConverter ).toEqual( new JSONLDConverter() );
		} );

		it( "should return empty when parent context registry empty", () => {
			const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
			const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

			const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.jsonldConverter ).toEqual( new JSONLDConverter() );
		} );

		it( "should return parent serializers when parent context registry has serializers", () => {
			const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
			const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

			const serializer1:Serializer = { serialize: () => "1" };
			const serializer2:Serializer = { serialize: () => "2" };
			parentRegistry.jsonldConverter
				.literalSerializers
				.clear();
			parentRegistry.jsonldConverter
				.literalSerializers
				.set( "serializer1", serializer1 )
				.set( "serializer2", serializer2 );


			const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
			const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

			expect( registry.jsonldConverter.literalSerializers ).toEqual( new Map( [
				[ "serializer1", serializer1 ],
				[ "serializer2", serializer2 ],
			] ) );
		} );

	} );


	describe( "RegistryService._getLocalID", () => {

		it( "should return iri provided when no context", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );

			const returned:string = registry._getLocalID( "https://example.com/" );
			expect( returned ).toBe( "https://example.com/" );
		} );

		it( "should return relative iri provided when no context", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );

			const returned:string = registry._getLocalID( "resource/" );
			expect( returned ).toBe( "resource/" );
		} );

		it( "should return bNode provided when no context", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );

			const returned:string = registry._getLocalID( "_:bNode" );
			expect( returned ).toBe( "_:bNode" );
		} );

		it( "should return fragment provided when no context", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );

			const returned:string = registry._getLocalID( "https://example.com/#fragment" );
			expect( returned ).toBe( "https://example.com/#fragment" );
		} );

		it( "should return relative fragment provided when no context", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );

			const returned:string = registry._getLocalID( "#fragment" );
			expect( returned ).toBe( "#fragment" );
		} );


		it( "should return relative iri from context base when context", () => {
			const context:AbstractContext<Pointer> = createMockContext( { uri: "https://example.com/" } );
			const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

			const returned:string = registry._getLocalID( "https://example.com/resource/" );
			expect( returned ).toBe( "resource/" );
		} );

		it( "should throw error when iri not in context base when context", () => {
			const context:AbstractContext<Pointer> = createMockContext( { uri: "https://example.com/" } );
			const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

			expect( () => {
				registry._getLocalID( "https://example.org/another-domain/" );
			} ).toThrowError( IllegalArgumentError, `"https://example.org/another-domain/" is out of scope.` );
		} );

		it( "should return relative iri provided when no context", () => {
			const context:AbstractContext<Pointer> = createMockContext( { uri: "https://example.com/" } );
			const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

			const returned:string = registry._getLocalID( "resource/" );
			expect( returned ).toBe( "resource/" );
		} );

		it( "should return relative from prefixed named provided resolved under context base when context", () => {
			const context:AbstractContext<Pointer> = createMockContext( { uri: "https://example.com/" } );
			context.extendObjectSchema( { "ex": "https://example.com/" } );

			const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

			const returned:string = registry._getLocalID( "ex:resource/" );
			expect( returned ).toBe( "resource/" );
		} );

	} );

	describe( "RegistryService._register", () => {

		it( "should call registry prototype ._register", () => {
			const registry:RegistryService<Pointer> = new RegistryService( Pointer );
			const spy:jasmine.Spy = spyOn( Registry.PROTOTYPE, "_register" )
				.and.returnValue( { id: "the resource from super" } );

			registry._register( { id: "the resource" } );
			expect( spy ).toHaveBeenCalledWith( { id: "the resource" } );
		} );

		it( "should return decorated from model when no context", () => {
			const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
				decorate: { id: "https://example.com/the-object-decorated/" },
			} );
			const registry:RegistryService<any> = new RegistryService( Model );

			const returned:object = registry._register( { id: "resource/" } );
			expect( returned ).toEqual( { id: "https://example.com/the-object-decorated/" } );
		} );

		it( "should return decorated from model when context", () => {
			const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
				decorate: { id: "https://example.com/the-object-decorated/" },
			} );
			const context:AbstractContext<any> = createMockContext();
			const registry:RegistryService<any, any> = new RegistryService( Model, context );

			const returned:object = registry._register( { id: "resource/" } );
			expect( returned ).toEqual( { id: "https://example.com/the-object-decorated/" } );
		} );

		it( "should resolve ID from context base when relative", () => {
			const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
				decorate: { id: "resource/" },
			} );
			const context:AbstractContext<any> = createMockContext();
			const registry:RegistryService<any, any> = new RegistryService( Model, context );

			const returned:object = registry._register( { id: "resource/" } );
			expect( returned ).toEqual( { id: "https://example.com/resource/" } );
		} );

	} );


	// TODO: Test .getGeneralSchema
	// TODO: Test .hasSchemaFor
	// TODO: Test .getSchemaFor


	// TODO: Test ._parseFreeNodes

} );
