import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { ModelDecorator } from "../core";
import {
	IDAlreadyInUseError,
	IllegalArgumentError
} from "../Errors";
import { Pointer } from "../Pointer";
import {
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
} from "../test/JasmineExtender";
import { PickSelfProps } from "../Utils";
import {
	Registry,
	RegistryFactory
} from "./Registry";


function createMock<T extends object>( data?:T & Partial<Registry<Pointer>> ):T & Registry<Pointer> {
	return Registry.decorate( Object.assign( {}, data ) );
}

describe( module( "carbonldp/Registry" ), () => {

	describe( interfaze(
		"CarbonLDP.Registry",
		[ "M extends Pointer" ],
		"Interface with the base methods of a general registry, that stores and manages an specific type of resources."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"_registry",
			"CarbonLDP.Registry | undefined",
			"Possible parent registry of the registry."
		), () => {
			const target:Registry<any>[ "$registry" ] = {} as Registry<any>;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_resourcesMap",
			"Map<string, M>",
			"Map where the resources of the registry are stored."
		), () => {
			const target:Registry<any>[ "__resourcesMap" ] = {} as Map<string, any>;
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
				const registry:Registry<Pointer> = createMock();

				expect( registry.__getLocalID ).toBeDefined();
				expect( registry.__getLocalID ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error with any value", () => {
				const registry:Registry<Pointer> = createMock( {} );

				expect( () => registry.__getLocalID( "" ) ).toThrowError( IllegalArgumentError, `"" is out of scope.` );
				expect( () => registry.__getLocalID( "resource/" ) ).toThrowError( IllegalArgumentError, `"resource/" is out of scope.` );
			} );

		} );

		describe( method( OBLIGATORY, "_register" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Adds the provided object as a resource of the registry.",
				[
					{ name: "base", type: "T & { id:string }", description: "The base object to be added as a resource of the registry." },
				],
				{ type: "T & M" }
			), () => {} );


			it( "should throw error if no ID in the base object", () => {
				const registry:Registry<Pointer> = createMock();

				expect( () => {
					registry._addPointer( {} as any );
				} ).toThrowError( IllegalArgumentError, "The resource ID is required." );
			} );

			it( "should throw error when ID out of scope", () => {
				const registry:Registry<Pointer> = createMock();

				expect( () => {
					registry._addPointer( { $id: "id" } );
				} ).toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should throw error when ID already taken", () => {
				const registry:Registry<Pointer> = createMock();

				registry.__resourcesMap.set( "local", Pointer.create() );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				expect( () => {
					registry._addPointer( { $id: "id" } );
				} ).toThrowError( IDAlreadyInUseError, `"id" is already being used.` );
			} );


			it( "should return the same object reference", () => {
				const registry:Registry<Pointer> = createMock();
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const object:{ id:string } = { id: "id" };
				const returned:Pointer = registry._addPointer( object );

				expect( object ).toBe( returned );
			} );

			it( "should return the resource type", () => {
				const registry:Registry<Pointer> = createMock();
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry._addPointer( { $id: "id" } );
				expect( returned ).toEqual( anyThatMatches( Pointer.is, "isPointer" ) as any );
			} );

			it( "should assign resource._registry as itself", () => {
				const registry:Registry<Pointer> = createMock();
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry._addPointer( { $id: "id" } );
				expect( returned._registry ).toBe( registry );
			} );

			it( "should store resource in the _resourcesMap", () => {
				const registry:Registry<Pointer> = createMock();
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry._addPointer( { $id: "id" } );

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
				const registry:Registry<Pointer> = createMock();

				expect( registry.inScope ).toBeDefined();
				expect( registry.inScope ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call _getLocalID when string", () => {
				const registry:Registry<Pointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				registry.inScope( "id" );
				expect( spy ).toHaveBeenCalledWith( "id" );
			} );

			it( "should call _getLocalID when Pointer", () => {
				const registry:Registry<Pointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				registry.inScope( Pointer.create( { $id: "id" } ) );
				expect( spy ).toHaveBeenCalledWith( "id" );
			} );


			it( "should return true if string can be converted to local", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( true );

			} );

			it( "should return true if Pointer.id can be converted to local", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( Pointer.create( { $id: "id" } ) );
				expect( returned ).toBe( true );
			} );

			it( "should return true if string can be converted by parent registry", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true if Pointer.id can be converted by parent registry", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( Pointer.create( { $id: "id" } ) );
				expect( returned ).toBe( true );
			} );


			it( "should return false if string can't be converted & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false if Pointer.id can't be converted & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( Pointer.create( { $id: "id" } ) );
				expect( returned ).toBe( false );
			} );

			it( "should return false if string can't be converted by parent", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false if Pointer.id can't be converted by parent", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				const returned:boolean = registry.inScope( Pointer.create( { $id: "id" } ) );
				expect( returned ).toBe( false );
			} );

			it( "should return false if string can be converted by parent registry but local flag set", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false if Pointer.id can be converted by parent registry but local flag set", () => {
				const parent:Registry<Pointer> = createMock();
				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw Error( "no local" ); } );

				spyOnDecorated( parent, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.inScope( Pointer.create( { $id: "id" } ), true );
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
				const registry:Registry<Pointer> = createMock();

				expect( registry.hasPointer ).toBeDefined();
				expect( registry.hasPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return verify in local scope", () => {
				const registry:Registry<Pointer> = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "inScope" );

				registry.hasPointer( "id" );
				expect( spy ).toHaveBeenCalledWith( "id", true );
			} );


			it( "should return false when not in scope & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( true );
			} );


			it( "should return false when not in scope & not in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when not in scope & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when not in scope & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );


			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and not exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true when in scope and exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.hasPointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.hasPointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
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
				{ type: "CarbonLDP.Pointer" }
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
				const registry:Registry<Pointer> = createMock();

				expect( registry.getPointer ).toBeDefined();
				expect( registry.getPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when not in scope & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id" ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should return new resource when in scope but not exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry.getPointer( "id" );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				const localPointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry.getPointer( "id" );
				expect( returned ).toBe( localPointer );
			} );

			it( "should throw error when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should return new resource when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				const localPointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );


				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toBe( localPointer );
			} );


			it( "should throw error when not in scope & not in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.callFake( () => { throw new Error( "not parent" ); } );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id" ) )
					.toThrowError( Error, `not parent` );
			} );

			it( "should return parent resource when not in scope & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:Pointer = registry.getPointer( "id" );
				expect( returned ).toBe( parentPointer );
			} );

			it( "should throw error when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );

			it( "should throw error when not in scope & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				const pointer:Pointer = Pointer.create( { $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( pointer );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				expect( () => registry.getPointer( "id", true ) )
					.toThrowError( IllegalArgumentError, `"id" is out of scope.` );
			} );


			it( "should return new local resource when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "id",
				} ) );
			} );

			it( "should return parent resource when in scope and not exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent" } );
				spyOnDecorated( parent, "hasPointer" )
					.and.returnValue( true );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:Pointer = registry.getPointer( "id" );
				expect( returned ).toBe( parentPointer );
			} );

			it( "should return local resource when in scope and exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const localPointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry.getPointer( "id" );
				expect( returned ).toBe( localPointer );
			} );

			it( "should return new resource in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.callFake( () => { throw new Error( "not in parent" ); } );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "id",
				} ) );
			} );

			it( "should return new resource when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent" } );
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( parentPointer );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "id",
				} ) );
			} );

			it( "should return local resource when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointer" )
					.and.returnValue( true );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const localPointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", localPointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:Pointer = registry.getPointer( "id", true );
				expect( returned ).toBe( localPointer );
			} );

		} );

		describe( method( OBLIGATORY, "getPointers" ), () => {

			it( hasSignature(
				"Returns all the pointers stored the registry hierarchy.",
				{ type: "CarbonLDP.Pointer[]" }
			), () => {} );

			it( hasSignature(
				"Returns all the pointers stored in the current registry.",
				[
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only return pointers from the current registry." },
				],
				{ type: "M[]" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<Pointer> = createMock();

				expect( registry.getPointers ).toBeDefined();
				expect( registry.getPointers ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return local resources when locals & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				const localPointer1:Pointer = Pointer.create( { $id: "in local", index: "local 1" } );
				const localPointer2:Pointer = Pointer.create( { $id: "in local", index: "local 2" } );
				registry.__resourcesMap.set( "local-1", localPointer1 );
				registry.__resourcesMap.set( "local-2", localPointer2 );

				const returned:Pointer[] = registry.getPointers();
				expect( returned ).toEqual( [
					localPointer1,
					localPointer2,
				] );
			} );

			it( "should return empty resources no locals & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return local resources when locals & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				const localPointer1:Pointer = Pointer.create( { $id: "in local", index: "local 1" } );
				const localPointer2:Pointer = Pointer.create( { $id: "in local", index: "local 2" } );
				registry.__resourcesMap.set( "local-1", localPointer1 );
				registry.__resourcesMap.set( "local-2", localPointer2 );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [
					localPointer1,
					localPointer2,
				] );
			} );


			it( "should return parent resources when no locals & in parent", () => {
				const parent:Registry<Pointer> = createMock();

				const parentPointer:Pointer = Pointer.create( { $id: "parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const returned:Pointer[] = registry.getPointers();
				expect( returned ).toEqual( [ parentPointer ] );
			} );

			it( "should return empty when no locals & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [] );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return empty when no locals & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );


			it( "should return local and parent resources when locals & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const localPointer:Pointer = Pointer.create( { $id: "the resource", index: "local" } );
				registry.__resourcesMap.set( "local", localPointer );


				const returned:Pointer[] = registry.getPointers();
				expect( returned ).toEqual( [
					parentPointer,
					localPointer,
				] );
			} );

			it( "should return empty resources when no locals & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [] );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return empty resources when no locals & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [] );
			} );

			it( "should return local resources when locals & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				const parentPointer:Pointer = Pointer.create( { $id: "in parent", index: "parent" } );
				spyOnDecorated( parent, "getPointers" )
					.and.returnValue( [ parentPointer ] );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const localPointer:Pointer = Pointer.create( { $id: "the resource", index: "local" } );
				registry.__resourcesMap.set( "local", localPointer );

				const returned:Pointer[] = registry.getPointers( true );
				expect( returned ).toEqual( [ localPointer ] );
			} );

		} );

		describe( method( OBLIGATORY, "removePointer" ), () => {

			it( hasSignature(
				"Removes the resource identified by the provided string ID or Pointer.id, from the first occurrence in the registry hierarchy.\n" +
				"Returns true if the resource could be removed, false otherwise.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "ID or Pointer to be removed." },
				],
				{ type: "boolean" }
			), () => {} );

			it( hasSignature(
				"Removes the resource identified by the provided string ID or Pointer.id, from the current registry.\n" +
				"Returns true if the resource could be removed, false otherwise.",
				[
					{ name: "idOrPointer", type: "string | CarbonLDP.Pointer", description: "ID or Pointer to be removed." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only remove from the current registry." },
				],
				{ type: "boolean" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Registry<Pointer> = createMock();

				expect( registry.removePointer ).toBeDefined();
				expect( registry.removePointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when not in scope & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent", () => {
				const registry:Registry<Pointer> = createMock();

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should return false when not in scope & has no parent & local flag is set", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope but not exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & has no parent & local flag is set ", () => {
				const registry:Registry<Pointer> = createMock();

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );


				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );


			it( "should return false when not in scope & not in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( false );
			} );

			it( "should return true when not in scope & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return false when not in scope & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when not in scope & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.callFake( () => { throw new Error( "not local" ); } );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );


			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and not exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );
			} );

			it( "should return true when in scope and exists & in parent", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "local" );

				const returned:boolean = registry.removePointer( "id" );
				expect( returned ).toBe( true );

				expect( registry.__resourcesMap ).toEqual( new Map() );
			} );

			it( "should return false when in scope and not exists & not in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( false );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return false when in scope and not exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );

				const registry:Registry<Pointer> = createMock( { $registry: parent } );
				spyOnDecorated( registry, "__getLocalID" )
					.and.returnValue( "parent" );

				const returned:boolean = registry.removePointer( "id", true );
				expect( returned ).toBe( false );
			} );

			it( "should return true when in scope and exists & in parent & local flag is set", () => {
				const parent:Registry<Pointer> = createMock();
				spyOnDecorated( parent, "removePointer" )
					.and.returnValue( true );


				const registry:Registry<Pointer> = createMock( { $registry: parent } );

				const pointer:Pointer = Pointer.create( { $id: "the resource" } );
				registry.__resourcesMap.set( "local", pointer );

				spyOnDecorated( registry, "__getLocalID" )
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

		it( hasProperty(
			OBLIGATORY,
			"PROTOTYPE",
			"CarbonLDP.PickSelfProps<CarbonLDP.Registry<CarbonLDP.Pointer>, {}>"
		), ():void => {
			const target:RegistryFactory[ "PROTOTYPE" ] = {} as PickSelfProps<Registry<Pointer>, {}>;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				[
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.Registry<any>" }
			), ():void => {} );

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

		describe( method( OBLIGATORY, "decorate" ), () => {

			it( hasSignature(
				[
					{ name: "object", type: "T" },
				],
				{ type: "T & CarbonLDP.Registry<any>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Registry.decorate ).toBeDefined();
				expect( Registry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );

				Registry.decorate( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( Registry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( Registry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				Registry.decorate( {} );

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
