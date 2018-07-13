import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import {
	createMockContext,
} from "../../test/helpers/mocks";
import { AbstractContext } from "../Context/AbstractContext";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import {
	InternalServerErrorError,
	NotFoundError,
	UnknownError
} from "../HTTP/Errors";
import { Pointer } from "../Pointer";
import { PersistedResource } from "../Resource";
import {
	clazz,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../test/JasmineExtender";
import { RegistryService } from "./RegistryService";

describe( module( "carbonldp/Registry" ), () => {

	describe( clazz(
		"CarbonLDP.RegistryService",
		"Base registry as a service that can be related to an specific context."
	), () => {

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
