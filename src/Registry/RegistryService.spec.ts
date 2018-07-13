import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import {
	createMockContext,
	createMockQueryableMetadata
} from "../../test/helpers/mocks";
import { AbstractContext } from "../Context/AbstractContext";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import {
	InternalServerErrorError,
	NotFoundError,
	UnknownError
} from "../HTTP/Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { PersistedResource } from "../Resource";
import {
	clazz,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies";
import { RegistryService } from "./RegistryService";

describe( module( "carbonldp/Registry" ), () => {

	describe( clazz(
		"CarbonLDP.RegistryService",
		"Base registry as a service that can be related to an specific context."
	), () => {

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
					_partialMetadata: createMockQueryableMetadata( {
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
