import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { Pointer } from "../Pointer/Pointer";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";

import { $Repository, Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { BaseGeneralRegistry } from "./BaseGeneralRegistry";
import { GeneralRegistry } from "./GeneralRegistry";
import { TypedModelDecorator } from "./TypedModelDecorator";


describe( "GeneralRegistry", () => {

	it( "should exist", () => {
		expect( GeneralRegistry ).toBeDefined();
		expect( GeneralRegistry ).toEqual( jasmine.any( Object ) );
	} );

	let context:Context;
	beforeEach( () => {
		context = createMockContext();
	} );


	describe( "[[interface impl]]", () => {

		function createMock<T extends {}>( data?:T & Partial<GeneralRegistry> ):T & GeneralRegistry {
			return GeneralRegistry.createFrom( Object.assign( {
				context,
				__modelDecorator: RegisteredPointer,
			}, data ) );
		}


		describe( "GeneralRegistry.registry", () => {

			it( "should return registry from parent context", () => {
				context = createMockContext( { parentContext: context as any } );

				const registry:GeneralRegistry = createMock();
				expect( registry.registry ).toBe( context.parentContext!.registry );
			} );

			it( "should return undefined when parent has no registry", () => {
				context = createMockContext( { registry: void 0 } );
				context = createMockContext( { parentContext: context as any } );

				const registry:GeneralRegistry = createMock();
				expect( registry.registry ).toBeUndefined();
			} );

			it( "should return undefined when no paren context", () => {
				context = createMockContext( { parentContext: void 0 } );

				const registry:GeneralRegistry = createMock();
				expect( registry.registry ).toBeUndefined();
			} );

		} );


		describe( "GeneralRegistry.addDecorator", () => {

			it( "should exist", () => {
				const registry:GeneralRegistry = createMock();

				expect( registry.addDecorator ).toBeDefined();
				expect( registry.addDecorator ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add decorator to the map", () => {
				const registry:GeneralRegistry = createMock();

				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};

				registry.addDecorator( decorator );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );
			} );

			it( "should replace decorator to the map", () => {
				const registry:GeneralRegistry = createMock( {
					__modelDecorators: new Map( [
						[ "a-type", null as any ],
					] ),
				} );

				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};

				registry.addDecorator( decorator );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );
			} );

			it( "should return self", () => {
				const registry:GeneralRegistry = createMock();

				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};

				const returned:GeneralRegistry = registry.addDecorator( decorator );

				expect( returned ).toBe( registry );
			} );

		} );

		describe( "GeneralRegistry.decorate", () => {

			it( "should exist", () => {
				const registry:GeneralRegistry = createMock();

				expect( registry.decorate ).toBeDefined();
				expect( registry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call no decorate if no types", () => {
				const registry:GeneralRegistry = createMock();

				const decorator1:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "1", decorator1 );

				const decorator2:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "2", decorator2 );

				registry.decorate( {} );
				expect( decorator1.decorate ).not.toHaveBeenCalled();
				expect( decorator2.decorate ).not.toHaveBeenCalled();
			} );

			it( "should call decorator with types", () => {
				const registry:GeneralRegistry = createMock();

				const decorator1:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "1", decorator1 );

				const decorator2:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "2", decorator2 );

				registry.decorate( { types: [ "1" ] } );
				expect( decorator1.decorate ).toHaveBeenCalledWith( { types: [ "1" ] } );
				expect( decorator2.decorate ).not.toHaveBeenCalled();
			} );

			it( "should ignore if no types with decorator", () => {
				const registry:GeneralRegistry = createMock();

				const decorator1:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "1", decorator1 );

				const decorator2:jasmine.SpyObj<TypedModelDecorator> = jasmine
					.createSpyObj( [ "decorate" ] );
				registry.__modelDecorators.set( "2", decorator2 );

				registry.decorate( { types: [ "2", "3" ] } );
				expect( decorator1.decorate ).not.toHaveBeenCalled();
				expect( decorator2.decorate ).toHaveBeenCalledWith( { types: [ "2", "3" ] } );
			} );

		} );


		describe( "GeneralRegistry._addPointer", () => {

			it( "should call registry prototype ._addPointer", () => {
				context = createMockContext( { repository: void 0 } );

				const registry:GeneralRegistry = createMock();
				const spy:jasmine.Spy = spyOn( Registry.PROTOTYPE, "_addPointer" )
					.and.returnValue( { $id: "the resource from super" } );

				registry._addPointer( { $id: "the resource" } );
				expect( spy ).toHaveBeenCalledWith( { $id: "the resource" } );
			} );

			it( "should resolve ID from context base when relative", () => {
				const registry:GeneralRegistry = createMock();

				const returned:Pointer = registry._addPointer( { $id: "resource/" } );
				expect( returned.$id ).toEqual( "https://example.com/resource/" );
			} );

			it( "should resolve prefixed:name from context base when relative", () => {
				context.extendObjectSchema( { "ex": "https://example.com/" } );

				const registry:GeneralRegistry = createMock();

				const returned:Pointer = registry._addPointer( { $id: "ex:resource/" } );
				expect( returned.$id ).toEqual( "https://example.com/resource/" );
			} );


			it( "should add repository property if context has one", () => {
				const registry:GeneralRegistry<ResolvablePointer & RegisteredPointer> = createMock();

				const returned:ResolvablePointer = registry._addPointer( { $id: "resource/" } );

				expect( returned.$repository ).toBeDefined();
				expect( returned.$repository ).toBe( context.repository );
			} );

			it( "should not add repository property if context does not have one", () => {
				context = createMockContext( { repository: void 0 } );
				const registry:GeneralRegistry<ResolvablePointer & RegisteredPointer> = createMock();

				const returned:{ $repository?:Repository | $Repository } = registry._addPointer( { $id: "resource/" } );

				expect( returned.$repository ).toBeUndefined();
			} );

		} );

		describe( "GeneralRegistry._getLocalID", () => {

			it( "should return relative uri from context base", () => {
				const registry:GeneralRegistry = createMock();

				const returned:string = registry._getLocalID( "https://example.com/resource/" );
				expect( returned ).toBe( "resource/" );
			} );

			it( "should throw error when uri not in context base", () => {
				const registry:GeneralRegistry = createMock();

				expect( () => {
					registry._getLocalID( "https://example.org/another-domain/" );
				} ).toThrowError( IllegalArgumentError, `"https://example.org/another-domain/" is out of scope.` );
			} );

			it( "should return relative from prefixed named provided resolved under context base", () => {
				context.extendObjectSchema( { "ex": "https://example.com/" } );

				const registry:GeneralRegistry = createMock();

				const returned:string = registry._getLocalID( "ex:resource/" );
				expect( returned ).toBe( "resource/" );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "GeneralRegistry.isDecorated", () => {

			it( "should exist", () => {
				expect( GeneralRegistry.isDecorated ).toBeDefined();
				expect( GeneralRegistry.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				GeneralRegistry.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( GeneralRegistry.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "GeneralRegistry.decorate", () => {

			it( "should exist", () => {
				expect( GeneralRegistry.decorate ).toBeDefined();
				expect( GeneralRegistry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				GeneralRegistry.decorate( { context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( GeneralRegistry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( GeneralRegistry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				GeneralRegistry.decorate( { context, __modelDecorator: RegisteredPointer } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with Registry", () => {
				const spy:jasmine.Spy = spyOn( Registry, "decorate" )
					.and.callThrough();

				GeneralRegistry.decorate( { context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ObjectSchemaResolver", () => {
				const spy:jasmine.Spy = spyOn( ObjectSchemaResolver, "decorate" )
					.and.callThrough();

				GeneralRegistry.decorate( { context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should throw error if no context", () => {
				expect( () => {
					GeneralRegistry.decorate( { __modelDecorator: RegisteredPointer } as any );
				} ).toThrowError( IllegalArgumentError, "Property context is required." );
			} );

		} );


		describe( "GeneralRegistry.create", () => {

			it( "should exist", () => {
				expect( GeneralRegistry.create ).toBeDefined();
				expect( GeneralRegistry.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "createFrom" )
					.and.callThrough();

				GeneralRegistry.create( { context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should not return same object", () => {
				const object:BaseGeneralRegistry & { the:string } = { context: context, __modelDecorator: RegisteredPointer, the: "object" };
				const returned:object = GeneralRegistry.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "GeneralRegistry.createFrom", () => {

			it( "should exist", () => {
				expect( GeneralRegistry.createFrom ).toBeDefined();
				expect( GeneralRegistry.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .decorate", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "decorate" )
					.and.callThrough();

				GeneralRegistry.createFrom( { context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return same object", () => {
				const object:BaseGeneralRegistry & { the:string } = { context: context, __modelDecorator: RegisteredPointer, the: "object" };
				const returned:object = GeneralRegistry.createFrom( object );

				expect( returned ).toBe( object );
			} );


			it( "should add add decorators from parent registry", () => {
				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};
				context.registry.addDecorator( decorator );

				context = createMockContext( { parentContext: context as any } );


				const registry:GeneralRegistry = GeneralRegistry
					.createFrom( { context, __modelDecorator: RegisteredPointer } );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );
			} );

		} );

	} );

} );
