import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { spyOnDecorated } from "../../test/helpers/jasmine/spies";

import { IDAlreadyInUseError } from "../Errors/IDAlreadyInUseError";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
} from "../test/JasmineExtender";

import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry, RegistryFactory } from "./Registry";


function createMock<T extends object>( data?:T & Partial<Registry<RegisteredPointer>> ):T & Registry<RegisteredPointer> {
	return Registry.decorate( Object.assign( {
		__modelDecorator: RegisteredPointer,
	}, data ) );
}

describe( module( "carbonldp/Registry" ), () => {

	describe( interfaze(
		"CarbonLDP.Registry",
		[ "M extends RegisteredPointer = RegisteredPointer" ],
		"Interface with the base methods of a general registry, that stores and manages an specific type of resources."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.Registry<any> | undefined",
			"Possible parent registry of the registry."
		), () => {
			const target:Registry<any>[ "$registry" ] = {} as Registry<any>;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"__modelDecorator",
			"CarbonLDP.Model.ModelDecorator<M, CarbonLDP.Registry.BaseRegisteredPointer>",
			"Decorator object to personalize the pointers of the registry."
		), () => {
			const target:Registry<RegisteredPointer>[ "__modelDecorator" ] = {} as ModelDecorator<RegisteredPointer, BaseRegisteredPointer>;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"__resourcesMap",
			"Map<string, M>",
			"Map where the resources of the registry are stored."
		), () => {
			const target:Registry<RegisteredPointer>[ "__resourcesMap" ] = {} as Map<string, RegisteredPointer>;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "_getLocalID" ), () => {

			it( hasSignature(
				"Returns the local identifier for the ID provided.\n" +
				"Throws and error if the ID cannot be converted into a local one.",
				[
					{ name: "id", type: "string", description: "The ID to be converted." },
				],
				{ type: "string" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry._getLocalID ).toBeDefined();
				expect( registry._getLocalID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error with any value", () => {
				const registry:Registry<RegisteredPointer> = createMock( {} );

				expect( () => registry._getLocalID( "" ) ).toThrowError( IllegalArgumentError, `"" is out of scope.` );
				expect( () => registry._getLocalID( "resource/" ) ).toThrowError( IllegalArgumentError, `"resource/" is out of scope.` );
			} );

		} );

		describe( method( OBLIGATORY, "_addPointer" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Adds the provided object as a resource of the registry.",
				[
					{ name: "pointer", type: "T & Pointer", description: "The base object to be added as a resource of the registry." },
				],
				{ type: "T & M" }
			), () => {} );


			it( "should throw error if no ID in the base object", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( () => {
					registry._addPointer( {} as any );
				} ).toThrowError( IllegalArgumentError, "The pointer $id cannot be empty." );
			} );

			it( "should throw error when ID out of scope", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( () => {
					registry._addPointer( { $id: "id" } );
				} ).toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should throw error when ID already taken", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				registry.__resourcesMap.set( "local", RegisteredPointer.create( { $registry: registry } ) );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				expect( () => {
					registry._addPointer( { $id: "id" } );
				} ).toThrowError( IDAlreadyInUseError, `"id" is already being used.` );
			} );


			it( "should return the same object reference", () => {
				const registry:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const object:{ $id:string } = { $id: "id" };
				const returned:RegisteredPointer = registry._addPointer( object );

				expect( object ).toBe( returned );
			} );

			it( "should return the resource type", () => {
				const registry:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry._addPointer( { $id: "id" } );
				expect( returned ).toEqual( anyThatMatches( RegisteredPointer.is, "isPointer" ) as any );
			} );

			it( "should assign resource.$registry as itself", () => {
				const registry:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry._addPointer( { $id: "id" } );
				expect( returned.$registry ).toBe( registry );
			} );

			it( "should store resource in the _resourcesMap", () => {
				const registry:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry._addPointer( { $id: "id" } );

				expect( registry.__resourcesMap ).toEqual( new Map( [
					[ "local", returned ],
				] ) );
			} );

		} );


		describe( method( OBLIGATORY, "inScope" ), () => {

			it( hasSignature(
				"Return if the provided ID string or pointer can be stored in any of the registry hierarchy.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "The id or pointer to be checked." },
				],
				{ type: "boolean" }
			), () => {} );

			it( hasSignature(
				"Return if the provided ID string or pointer can be only stored in the current registry.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "The id or pointer to be checked." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only check in the current registry." },
				],
				{ type: "boolean" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry.inScope ).toBeDefined();
				expect( registry.inScope ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call _getLocalID when string", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				registry.inScope( "id" );
				expect( spy ).toHaveBeenCalledWith( "id" );
			} );

			it( "should call _getLocalID when RegisteredPointer", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ) );
				expect( spy ).toHaveBeenCalledWith( "id" );
			} );


			it( "should return true if string can be converted to local", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( true );

			} );

			it( "should return true if RegisteredPointer.$id can be converted to local", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ) );
				expect( returned ).toBe( true );
			} );

			it( "should return true if string can be converted by parent registry", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true if RegisteredPointer.$id can be converted by parent registry", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ) );
				expect( returned ).toBe( true );
			} );


			it( "should return false if string can't be converted & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false if RegisteredPointer.$id can't be converted & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ) );
				expect( returned ).toBe( false );
			} );

			it( "should return false if string can't be converted by parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false if RegisteredPointer.$id can't be converted by parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ) );
				expect( returned ).toBe( false );
			} );

			it( "should return false if string can be converted by parent registry but local flag set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false if RegisteredPointer.$id can be converted by parent registry but local flag set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( RegisteredPointer.create( { $registry: registry, $id: "id" } ), true );
				expect( returned ).toBe( false );
			} );

		} );


		describe( method( OBLIGATORY, "hasPointer" ), () => {

			it( hasSignature(
				"Returns true if a resource identified by the provided ID exists in the registry hierarchy.",
				[
					{ name: "id", type: "string", description: "ID to check its existence." },
				],
				{ type: "boolean" }
			), () => {} );

			it( hasSignature(
				"Returns true if a resource identified by the provided ID exists in the registry hierarchy.",
				[
					{ name: "id", type: "string", description: "ID to check its existence." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only check in the current registry." },
				],
				{ type: "boolean" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry.hasPointer ).toBeDefined();
				expect( registry.hasPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return verify in local scope", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "inScope" );

				registry.hasPointer( "id" );
				expect( spy ).toHaveBeenCalledWith( "id", true );
			} );


			it( "should return false when not in scope & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( true );
			} );


			it( "should return false when not in scope & not in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when not in scope & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when not in scope & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );


			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and not exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true when in scope and exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "getPointer" ), () => {

			it( hasSignature(
				"Returns the resource identified by the provided ID from the first existence in the registry hierarchy.\n" +
				"If non exists, a pointer is created in the first register where the ID in scope of.\n\n" +
				"A error is thrown when no pointer could be returned or created in any registry.",
				[
					{ name: "id", type: "string", description: "ID to return its pointer representation." },
				],
				{ type: "CarbonLDP.RegisteredPointer" }
			), () => {} );

			it( hasSignature(
				"Returns the resource identified by the provided ID from the current registry.\n" +
				"If non exists, a resource is created from the current registry model.\n\n" +
				"A error is thrown when no pointer could be returned or created.",
				[
					{ name: "id", type: "string", description: "ID to check its existence." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only return pointers from the current registry." },
				],
				{ type: "M" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry.getPointer ).toBeDefined();
				expect( registry.getPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when not in scope & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id" ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should return new resource when in scope but not exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry.getPointer( "id" );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry.getPointer( "id" );
				expect( returned ).toBe( localPointer );
			} );

			it( "should throw error when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should return new resource when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );


				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toBe( localPointer );
			} );


			it( "should throw error when not in scope & not in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.callFake( () => { throw new Error( "not parent" ); } );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id" ) )
					.toThrowError( Error, `not parent` );
			} );

			it( "should return parent resource when not in scope & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:RegisteredPointer = registry.getPointer( "id" );
				expect( returned ).toBe( parentPointer );
			} );

			it( "should throw error when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should throw error when not in scope & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( pointer );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );


			it( "should return new local resource when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$id: "id",
				} ) );
			} );

			it( "should return parent resource when in scope and not exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent" } );
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:RegisteredPointer = registry.getPointer( "id" );
				expect( returned ).toBe( parentPointer );
			} );

			it( "should return local resource when in scope and exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry.getPointer( "id" );
				expect( returned ).toBe( localPointer );
			} );

			it( "should return new resource in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.callFake( () => { throw new Error( "not in parent" ); } );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$id: "id",
				} ) );
			} );

			it( "should return new resource when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					$id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( true );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:RegisteredPointer = registry.getPointer( "id", true );
				expect( returned ).toBe( localPointer );
			} );

		} );

		describe( method( OBLIGATORY, "getPointers" ), () => {

			it( hasSignature(
				"Returns all the pointers stored the registry hierarchy.",
				{ type: "CarbonLDP.RegisteredPointer[]" }
			), () => {} );

			it( hasSignature(
				"Returns all the pointers stored in the current registry.",
				[
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only return pointers from the current registry." },
				],
				{ type: "M[]" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry.getPointers ).toBeDefined();
				expect( registry.getPointers ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return local resources when locals & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const localPointer1:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "in local", index: "local 1" } );
				const localPointer2:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "in local", index: "local 2" } );
				registry.__resourcesMap.set( "local-1", localPointer1 );
				registry.__resourcesMap.set( "local-2", localPointer2 );

				const returned:RegisteredPointer[] = registry.getPointers();
				expect( returned ).toEqual( [
					localPointer1,
					localPointer2,
				] );
			} );

			it( "should return empty resources no locals & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return local resources when locals & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const localPointer1:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "in local", index: "local 1" } );
				const localPointer2:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "in local", index: "local 2" } );
				registry.__resourcesMap.set( "local-1", localPointer1 );
				registry.__resourcesMap.set( "local-2", localPointer2 );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [
					localPointer1,
					localPointer2,
				] );
			} );


			it( "should return parent resources when no locals & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();

				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const returned:RegisteredPointer[] = registry.getPointers();
				expect( returned ).toEqual( [ parentPointer ] );
			} );

			it( "should return empty when no locals & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [] );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return empty when no locals & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );


			it( "should return local and parent resources when locals & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource", index: "local" } );
				registry.__resourcesMap.set( "local", localPointer );


				const returned:RegisteredPointer[] = registry.getPointers();
				expect( returned ).toEqual( [
					parentPointer,
					localPointer,
				] );
			} );

			it( "should return empty resources when no locals & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [] );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return empty resources when no locals & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return local resources when locals & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				const parentPointer:RegisteredPointer = RegisteredPointer.create( { $registry: parent, $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const localPointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource", index: "local" } );
				registry.__resourcesMap.set( "local", localPointer );

				const returned:RegisteredPointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [ localPointer ] );
			} );

		} );

		describe( method( OBLIGATORY, "removePointer" ), () => {

			it( hasSignature(
				"Removes the resource identified by the provided string ID or RegisteredPointer.$id, from the first occurrence in the registry hierarchy.\n" +
				"Returns true if the resource could be removed, false otherwise.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "ID or Pointer to be removed." },
				],
				{ type: "boolean" }
			), () => {} );

			it( hasSignature(
				"Removes the resource identified by the provided string ID or RegisteredPointer.$id, from the current registry.\n" +
				"Returns true if the resource could be removed, false otherwise.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "ID or Pointer to be removed." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only remove from the current registry." },
				],
				{ type: "boolean" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<RegisteredPointer> = createMock();

				expect( registry.removePointer ).toBeDefined();
				expect( registry.removePointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when not in scope & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should return false when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<RegisteredPointer> = createMock();

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );


			it( "should return false when not in scope & not in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when not in scope & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when not in scope & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );


			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and not exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true when in scope and exists & in parent", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<RegisteredPointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );


				const registry:Registry<RegisteredPointer> = createMock( { $registry: parent } );

				const pointer:RegisteredPointer = RegisteredPointer.create( { $registry: registry, $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "_getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

		} );

	} );


	describe( interfaze(
		"CarbonLDP.RegistryFactory",
		"Interface with the factory and utils for `CarbonLDP.Registry` objects."
	), () => {


		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.Registry>" ), () => {
			const target:ModelPrototype<Registry> = {} as RegistryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.Registry<any>, CarbonLDP.BaseRegistry>" ), () => {
			const target:ModelDecorator<Registry, BaseRegistry> = {} as RegistryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.Registry, CarbonLDP.BaseRegistry>" ), () => {
			const target:ModelFactory<Registry, BaseRegistry> = {} as RegistryFactory;
			expect( target ).toBeDefined();
		} );


		describe( "Registry.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Registry.isDecorated ).toBeDefined();
				expect( Registry.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				Registry.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( Registry.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "Registry.decorate", () => {

			it( "should exists", ():void => {
				expect( Registry.decorate ).toBeDefined();
				expect( Registry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				Registry.decorate( { __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( Registry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( Registry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				Registry.decorate( { __modelDecorator: null } );

				expect( spy ).not.toHaveBeenCalled();
			} );

		} );

	} );

	describe( property(
		INSTANCE,
		"Registry",
		"CarbonLDP.RegistryFactory"
	), () => {

		it( "should exists", ():void => {
			expect( Registry ).toBeDefined();
			expect( Registry ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
