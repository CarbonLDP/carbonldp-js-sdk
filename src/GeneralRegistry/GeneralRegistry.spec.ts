import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";
import { Pointer } from "../Pointer/Pointer";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry, RegistryFactory } from "../Registry/Registry";

import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { BaseGeneralRegistry } from "./BaseGeneralRegistry";
import { GeneralRegistry, GeneralRegistryFactory } from "./GeneralRegistry";
import { TypedModelDecorator } from "./TypedModelDecorator";


describe( module( "carbonldp/GeneralRegistry" ), () => {

	let $context:Context;
	beforeEach( ():void => {
		$context = createMockContext();
	} );


	describe( interfaze(
		"CarbonLDP.GeneralRegistry",
		[ "M extends RegisteredPointer = RegisteredPointer" ],
		"Registry used by the context."
	), () => {

		it( extendsClass( "CarbonLDP.Registry<M>" ), () => {
			const target:Registry<RegisteredPointer> = {} as GeneralRegistry<RegisteredPointer>;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.ObjectSchemaResolver" ), () => {
			const target:ObjectSchemaResolver = {} as GeneralRegistry<RegisteredPointer>;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.Context"
		), ():void => {
			const target:GeneralRegistry[ "$context" ] = {} as Context;
			expect( target ).toBeDefined();
		} );

		describe( property(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.GeneralRegistry<any> | undefined"
		), () => {

			it( "should return registry from parent context", () => {
				$context = createMockContext( { parentContext: $context as any } );

				const registry:GeneralRegistry = createMock();
				expect( registry.$registry ).toBe( $context.parentContext.registry );
			} );

			it( "should return undefined when parent has no registry", () => {
				$context = createMockContext( { registry: void 0 } );
				$context = createMockContext( { parentContext: $context as any } );

				const registry:GeneralRegistry = createMock();
				expect( registry.$registry ).toBeUndefined();
			} );

			it( "should return undefined when no paren context", () => {
				$context = createMockContext( { parentContext: void 0 } );

				const registry:GeneralRegistry = createMock();
				expect( registry.$registry ).toBeUndefined();
			} );

		} );

		it( hasProperty(
			OBLIGATORY,
			"__modelDecorators",
			"Map<string, CarbonLDP.TypedModelDecorator>"
		), ():void => {
			const target:GeneralRegistry[ "__modelDecorators" ] = {} as Map<string, TypedModelDecorator>;
			expect( target ).toBeDefined();
		} );


		function createMock<T extends {}>( data?:T & Partial<GeneralRegistry> ):T & GeneralRegistry {
			return GeneralRegistry.createFrom( Object.assign( {
				$context,
				__modelDecorator: RegisteredPointer,
			}, data ) );
		}


		describe( method( OBLIGATORY, "addDecorator" ), () => {

			it( hasSignature(
				[
					{ name: "decorator", type: "TypedModelDecorator" },
				],
				{ type: "this" }
			), ():void => {} );

			it( "should exists", ():void => {
				const registry:GeneralRegistry = createMock();

				expect( registry.addDecorator ).toBeDefined();
				expect( registry.addDecorator ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add decorator to the map", () => {
				const registry:GeneralRegistry = createMock();

				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => ! ! object,
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
						[ "a-type", null ],
					] ),
				} );

				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => ! ! object,
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
					isDecorated: ( object ):object is any => ! ! object,
					decorate: object => object,
				};

				const returned:GeneralRegistry = registry.addDecorator( decorator );

				expect( returned ).toBe( registry );
			} );

		} );

		describe( method( OBLIGATORY, "decorate" ), () => {

			it( hasSignature(
				[
					{ name: "object", type: "{ types?:string[] }" },
				]
			), ():void => {} );

			it( "should exists", ():void => {
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
				$context = createMockContext( { repository: void 0 } );

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
				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				const registry:GeneralRegistry = createMock();

				const returned:Pointer = registry._addPointer( { $id: "ex:resource/" } );
				expect( returned.$id ).toEqual( "https://example.com/resource/" );
			} );


			it( "should add $repository property if context has one", () => {
				const registry:GeneralRegistry<ResolvablePointer & RegisteredPointer> = createMock();

				const returned:{ $repository:Repository } = registry._addPointer( { $id: "resource/" } );

				expect( returned.$repository ).toBeDefined();
				expect( returned.$repository ).toBe( $context.repository );
			} );

			it( "should not add $repository property if context does not have one", () => {
				$context = createMockContext( { repository: void 0 } );
				const registry:GeneralRegistry<ResolvablePointer & RegisteredPointer> = createMock();

				const returned:{ $repository?:Repository } = registry._addPointer( { $id: "resource/" } );

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
				$context.extendObjectSchema( { "ex": "https://example.com/" } );

				const registry:GeneralRegistry = createMock();

				const returned:string = registry._getLocalID( "ex:resource/" );
				expect( returned ).toBe( "resource/" );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.GeneralRegistryFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.GeneralRegistry` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.GeneralRegistry, CarbonLDP.Registry & CarbonLDP.ObjectSchemaResolver>" ), () => {
			const target:ModelPrototype<GeneralRegistry, Registry & ObjectSchemaResolver> = {} as GeneralRegistryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.GeneralRegistry<any>, CarbonLDP.BaseGeneralRegistry>" ), () => {
			const target:ModelDecorator<GeneralRegistry, BaseGeneralRegistry> = {} as GeneralRegistryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.GeneralRegistry<any>, CarbonLDP.BaseGeneralRegistry>" ), () => {
			const target:ModelFactory<GeneralRegistry, BaseGeneralRegistry> = {} as RegistryFactory;
			expect( target ).toBeDefined();
		} );


		describe( "GeneralRegistry.isDecorated", () => {

			it( "should exists", ():void => {
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

			it( "should exists", ():void => {
				expect( GeneralRegistry.decorate ).toBeDefined();
				expect( GeneralRegistry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				GeneralRegistry.decorate( { $context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( GeneralRegistry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( GeneralRegistry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				GeneralRegistry.decorate( { $context, __modelDecorator: RegisteredPointer } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with Registry", () => {
				const spy:jasmine.Spy = spyOn( Registry, "decorate" )
					.and.callThrough();

				GeneralRegistry.decorate( { $context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ObjectSchemaResolver", () => {
				const spy:jasmine.Spy = spyOn( ObjectSchemaResolver, "decorate" )
					.and.callThrough();

				GeneralRegistry.decorate( { $context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should throw error if no $context", () => {
				expect( () => {
					GeneralRegistry.decorate( { __modelDecorator: RegisteredPointer } as any );
				} ).toThrowError( IllegalArgumentError, "Property $context is required." );
			} );

		} );


		describe( "GeneralRegistry.create", () => {

			it( "should exists", ():void => {
				expect( GeneralRegistry.create ).toBeDefined();
				expect( GeneralRegistry.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "createFrom" )
					.and.callThrough();

				GeneralRegistry.create( { $context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should not return same object", () => {
				const object:BaseGeneralRegistry & { the:string } = { $context, __modelDecorator: RegisteredPointer, the: "object" };
				const returned:object = GeneralRegistry.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "GeneralRegistry.createFrom", () => {

			it( "should exists", ():void => {
				expect( GeneralRegistry.createFrom ).toBeDefined();
				expect( GeneralRegistry.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .decorate", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "decorate" )
					.and.callThrough();

				GeneralRegistry.createFrom( { $context, __modelDecorator: RegisteredPointer, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return same object", () => {
				const object:BaseGeneralRegistry & { the:string } = { $context, __modelDecorator: RegisteredPointer, the: "object" };
				const returned:object = GeneralRegistry.createFrom( object );

				expect( returned ).toBe( object );
			} );


			it( "should add add decorators from parent registry", () => {
				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => ! ! object,
					decorate: object => object,
				};
				$context.registry.addDecorator( decorator );

				$context = createMockContext( { parentContext: $context as any } );


				const registry:GeneralRegistry = GeneralRegistry
					.createFrom( { $context, __modelDecorator: RegisteredPointer } );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"GeneralRegistry",
		"CarbonLDP.GeneralRegistryFactory"
	), () => {

		it( "should exists", ():void => {
			expect( GeneralRegistry ).toBeDefined();
			expect( GeneralRegistry ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
