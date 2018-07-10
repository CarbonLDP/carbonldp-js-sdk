import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import {
	createMockContext,
	createMockPartialMetadata
} from "../../test/helpers/mocks";
import { AbstractContext } from "../Context/AbstractContext";
import { ModelDecorator } from "../Model";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import {
	InternalServerErrorError,
	NotFoundError,
	UnknownError
} from "../HTTP/Errors";
import { JSONLDConverter } from "../JSONLD";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Serializer } from "../RDF";
import { PersistedResource } from "../Resource";
import {
	clazz,
	constructor,
	hasProperty,
	hasSignature,
	INSTANCE,
	method,
	module,
	property
} from "../test/JasmineExtender";
import { C } from "../Vocabularies";
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

		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "model", type: "CarbonLDP.ModelDecorator<M>", description: "The decorator to use when for the locally registered resources." },
					{ name: "context", type: "C", optional: true, description: "The possible context where the registry could store its resources." },
				]
			), () => {} );


			it( "should be instantiable", () => {
				const registry:RegistryService<any> = new RegistryService( null as any );
				expect( registry ).toEqual( jasmine.any( RegistryService ) );
			} );


			it( "should initialize context be undefined when no context provided", () => {
				const registry:RegistryService<any> = new RegistryService( null as any );
				expect( registry.context ).toBeUndefined();
			} );

			it( "should initialize then context when provided", () => {
				const context:AbstractContext<any> = createMockContext();
				const registry:RegistryService<any, any> = new RegistryService( null as any, context );
				expect( registry.context ).toBe( context );
			} );

			it( "should initialize resources map", () => {
				const registry:RegistryService<any> = new RegistryService( null as any );
				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

		} );

		it( hasProperty(
			INSTANCE,
			"context",
			"C",
			"The context where the registry is manages its resources."
		), () => {} );

		describe( property(
			INSTANCE,
			"_registry",
			"CarbonLDP.Registry<any> | undefined"
		), () => {

			it( "should return undefined when no context", () => {
				const registry:RegistryService<any> = new RegistryService( Pointer, void 0 );
				expect( registry.$registry ).toBeUndefined();
			} );

			it( "should return undefined when context has no parent", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

				expect( registry.$registry ).toBeUndefined();
			} );

			it( "should return the registry of the context parent", () => {
				const parentRegistry:RegistryService<Pointer> = new RegistryService( Pointer );
				const parentContext:AbstractContext<Pointer> = createMockContext( { registry: parentRegistry } );

				const context:AbstractContext<Pointer, AbstractContext<Pointer>> = createMockContext( { parentContext } );
				const registry:RegistryService<any, any> = new RegistryService( Pointer, context );

				expect( registry.$registry ).toBe( parentRegistry );
			} );

		} );

		describe( property(
			INSTANCE,
			"_resourcesMap",
			"Map<string, M>"
		), () => {

			it( "should initialize a empty map", () => {
				const registry:RegistryService<Pointer> = new RegistryService<Pointer>( Pointer );
				expect( registry.__resourcesMap ).toEqual( new Map() );
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
				const spy:jasmine.Spy = spyOn( Registry.PROTOTYPE, "_addPointer" )
					.and.returnValue( { id: "the resource from super" } );

				registry._addPointer( { id: "the resource" } );
				expect( spy ).toHaveBeenCalledWith( { id: "the resource" } );
			} );

			it( "should return decorated from model when no context", () => {
				const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
					decorate: { id: "https://example.com/the-object-decorated/" },
				} );
				const registry:RegistryService<any> = new RegistryService( Model );

				const returned:object = registry._addPointer( { id: "resource/" } );
				expect( returned ).toEqual( { id: "https://example.com/the-object-decorated/" } );
			} );

			it( "should return decorated from model when context", () => {
				const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
					decorate: { id: "https://example.com/the-object-decorated/" },
				} );
				const context:AbstractContext<any> = createMockContext();
				const registry:RegistryService<any, any> = new RegistryService( Model, context );

				const returned:object = registry._addPointer( { id: "resource/" } );
				expect( returned ).toEqual( { id: "https://example.com/the-object-decorated/" } );
			} );

			it( "should resolve ID from context base when relative", () => {
				const Model:ModelDecorator<any> = jasmine.createSpyObj( "Model", {
					decorate: { id: "resource/" },
				} );
				const context:AbstractContext<any> = createMockContext();
				const registry:RegistryService<any, any> = new RegistryService( Model, context );

				const returned:object = registry._addPointer( { id: "resource/" } );
				expect( returned ).toEqual( { id: "https://example.com/resource/" } );
			} );

		} );


		describe( "RegistryService.getGeneralSchema", () => {

			it( "should exists", ():void => {
				expect( RegistryService.prototype.getGeneralSchema ).toBeDefined();
				expect( RegistryService.prototype.getGeneralSchema ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return empty when no context", () => {
				const registry:RegistryService<Pointer> = new RegistryService<Pointer>( Pointer );

				const returned:DigestedObjectSchema = registry.getGeneralSchema();

				expect( returned ).toEqual( new DigestedObjectSchema() );
			} );

			it( "should get general schema from context", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				const schema:DigestedObjectSchema = new DigestedObjectSchema();
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.returnValue( schema );

				const returned:DigestedObjectSchema = registry.getGeneralSchema();
				expect( spy ).toHaveBeenCalledWith();
				expect( returned ).toBe( schema );
			} );

		} );

		describe( "RegistryService.hasSchemaFor", () => {

			it( "should exists", ():void => {
				expect( RegistryService.prototype.hasSchemaFor ).toBeDefined();
				expect( RegistryService.prototype.hasSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true when no path provided", () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const returned:boolean = registry.hasSchemaFor( {} );
				expect( returned ).toBe( true );
			} );

			it( "should return false when path provided", () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const returned:boolean = registry.hasSchemaFor( {}, "path" );
				expect( returned ).toBe( false );
			} );

		} );

		describe( "RegistryService.getSchemaFor", () => {

			it( "should exists", ():void => {
				expect( RegistryService.prototype.getSchemaFor ).toBeDefined();
				expect( RegistryService.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return get schemas from @type", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( "Type-1", {} );
				context.extendObjectSchema( "Type-2", {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "@type": [ "Type-1", "Type-2" ] } );
				expect( spy ).toHaveBeenCalledWith( "Type-1" );
				expect( spy ).toHaveBeenCalledWith( "Type-2" );
			} );

			it( "should return get schemas from types", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( "Type-1", {} );
				context.extendObjectSchema( "Type-2", {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "types": [ "Type-1", "Type-2" ] } );
				expect( spy ).toHaveBeenCalledWith( "Type-1" );
				expect( spy ).toHaveBeenCalledWith( "Type-2" );
			} );


			it( "should return c:Document schema when document URI in @id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "@id": "https://example.com/" } );
				expect( spy ).toHaveBeenCalledWith( C.Document );
			} );

			it( "should return c:Document schema when document URI in id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "id": "https://example.com/" } );
				expect( spy ).toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when fragment in @id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "@id": "https://example.com/#fragment" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when fragment in id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "id": "https://example.com/#fragment" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when bNode label in @id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "@id": "_:bNode" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );

			it( "should not return c:Document schema when bNode label in id", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context.extendObjectSchema( C.Document, {} );
				const spy:jasmine.Spy = spyOn( context, "getObjectSchema" )
					.and.callThrough();


				registry.getSchemaFor( { "id": "_:bNode" } );
				expect( spy ).not.toHaveBeenCalledWith( C.Document );
			} );


			it( "should return combined schemas with the general when Node", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;

				const returned:DigestedObjectSchema = registry.getSchemaFor( { "@type": [ "Type-1" ] } );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
				} ) );
			} );

			it( "should return combined schemas with the general when Resource", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;

				const returned:DigestedObjectSchema = registry.getSchemaFor( { "types": [ "Type-1" ] } );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
				} ) );
			} );

			it( "should return combined with partial schema when partial resource", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context
					.extendObjectSchema( { "inGeneral": {} } )
					.extendObjectSchema( "Type-1", { "inType": {} } )
				;


				const resource:object = PersistedResource.decorate( {
					types: [ "Type-1" ],
					_partialMetadata: createMockPartialMetadata( {
						"inPartial": {},
					} ),
				} );

				const returned:DigestedObjectSchema = registry.getSchemaFor( resource );
				expect( returned ).toEqual( ObjectSchemaDigester.digestSchema( {
					"@base": "https://example.com/",
					"inGeneral": {},
					"inType": {},
					"inPartial": {},
				} ) );
			} );

		} );


		describe( method( INSTANCE, "_parseFreeNodes" ), () => {

			it( hasSignature(
				"Convert the provided free nodes in to a FreeResources object.",
				[
					{ name: "freeNodes", type: "CarbonLDP.RDF.RDFNode[]", description: "The free nodes to be converted." },
				],
				{ type: "CarbonLDP.FreeResources" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RegistryService.prototype._parseFreeNodes ).toBeDefined();
				expect( RegistryService.prototype._parseFreeNodes ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return FreeResources object", () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const returned:FreeResources = registry._parseFreeNodes( [] );
				expect( returned ).toEqual( anyThatMatches( FreeResources.is, "isFreeResources" ) as any );
			} );

			it( "should compact nodes provided", () => {
				const context:AbstractContext<Pointer> = createMockContext();
				const registry:RegistryService<Pointer, typeof context> = new RegistryService( Pointer, context );

				context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } )
					.extendObjectSchema( "Type-1", { "property1": {} } )
					.extendObjectSchema( "Type-2", { "property2": {} } )
				;


				const returned:FreeResources = registry._parseFreeNodes( [
					{
						"@id": "_:1",
						"@type": [ "Type-1" ],
						"https://example.com/ns#property1": [ { "@value": "value 1" } ],
					},
					{
						"@id": "_:2",
						"@type": [ "Type-2" ],
						"https://example.com/ns#property2": [ { "@value": "value 2" } ],
					},
				] );

				expect<{ property1?:string }>( returned.getPointer( "_:1" ) as {} ).toEqual( {
					property1: "value 1",
				} );

				expect<{ property2?:string }>( returned.getPointer( "_:2" ) as {} ).toEqual( {
					property2: "value 2",
				} );

			} );

		} );

		describe( method( INSTANCE, "_parseFailedResponse" ), () => {

			it( hasSignature(
				"If a Response is provided, it is converted into is respective empty HTTPError",
				[
					{ name: "response", type: "CarbonLDP.HTTP.Response | Error | null" },
				],
				{ type: "Promise<never>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RegistryService.prototype._parseFailedResponse ).toBeDefined();
				expect( RegistryService.prototype._parseFailedResponse ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return null if null provided", async () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				await registry
					._parseFailedResponse( null )
					.catch( error => {
						expect( error ).toBe( null );
					} );
			} );

			it( "should return error if error provided", async () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				await registry
					._parseFailedResponse( new Error( "mock error" ) )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( Error, "mock error" );
					} );
			} );


			it( "should return the NotFoundError when response code is 404", async () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const response:Response = new Response( {} as any, "mock response", { statusCode: 404, headers: {} } as any );

				await registry
					._parseFailedResponse( response )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( NotFoundError, "mock response" );
					} );
			} );

			it( "should return the InternalServerErrorError when response code is 500", async () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const response:Response = new Response( {} as any, "mock response", { statusCode: 500, headers: {} } as any );

				await registry
					._parseFailedResponse( response )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( InternalServerErrorError, "mock response" );
					} );
			} );

			it( "should return the UnknownError when response code has unavailable error", async () => {
				const registry:RegistryService<Pointer> = new RegistryService( Pointer );

				const response:Response = new Response( {} as any, "mock response", { statusCode: - 1, headers: {} } as any );

				await registry
					._parseFailedResponse( response )
					.catch( error => {
						expect( () => { throw error; } ).toThrowError( UnknownError, "mock response" );
					} );
			} );

		} );

	} );

} );
