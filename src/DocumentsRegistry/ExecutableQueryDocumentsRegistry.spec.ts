import { spyOnDecorated } from "../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../Context/DocumentsContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { ExecutableQueryDocument } from "../ExecutableQueryDocument/ExecutableQueryDocument";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { TypedModelDecorator } from "../GeneralRegistry/TypedModelDecorator";

import { ModelDecorator } from "../Model/ModelDecorator";

import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";
import { ExecutableQueryDocumentsRegistry } from "./ExecutableQueryDocumentsRegistry";


describe( "ExecutableQueryDocumentsRegistry", () => {

	it( "should exist", () => {
		expect( ExecutableQueryDocumentsRegistry ).toBeDefined();
		expect( ExecutableQueryDocumentsRegistry ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		function createMock<T extends {}>( data?:T & Partial<ExecutableQueryDocumentsRegistry> ):ExecutableQueryDocumentsRegistry {
			return ExecutableQueryDocumentsRegistry.decorate( Object.assign( { context: context }, data ) );
		}


		describe( "ExecutableQueryDocumentsRegistry.registry", () => {

			it( "should exist", () => {
				const registry:ExecutableQueryDocumentsRegistry = createMock();

				expect( registry.register ).toBeDefined();
				expect( registry.register ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .getPointer with local", () => {
				const registry:ExecutableQueryDocumentsRegistry = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "getPointer" );

				registry.register( "https://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", true );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "ExecutableQueryDocumentsRegistry.isDecorated", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRegistry.isDecorated ).toBeDefined();
				expect( ExecutableQueryDocumentsRegistry.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				ExecutableQueryDocumentsRegistry.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( ExecutableQueryDocumentsRegistry.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "ExecutableQueryDocumentsRegistry.decorate", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRegistry.decorate ).toBeDefined();
				expect( ExecutableQueryDocumentsRegistry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				ExecutableQueryDocumentsRegistry.decorate( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( ExecutableQueryDocumentsRegistry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( ExecutableQueryDocumentsRegistry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				ExecutableQueryDocumentsRegistry.decorate( { context: context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRegistry", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "decorate" )
					.and.callThrough();

				ExecutableQueryDocumentsRegistry.decorate( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should throw error if no context", () => {
				expect( () => {
					ExecutableQueryDocumentsRegistry.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, "Property context is required." );
			} );


			it( "should add __modelDecorator as Document", () => {
				const registry:ExecutableQueryDocumentsRegistry = ExecutableQueryDocumentsRegistry.decorate( { context } );
				expect( registry.__modelDecorator ).toBe( ExecutableQueryDocument );
			} );

		} );


		describe( "ExecutableQueryDocumentsRegistry.create", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRegistry.create ).toBeDefined();
				expect( ExecutableQueryDocumentsRegistry.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( ExecutableQueryDocumentsRegistry, "createFrom" )
					.and.callThrough();

				ExecutableQueryDocumentsRegistry.create( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should not return same object", () => {
				const object:BaseDocumentsRegistry & { the:string } = { context: context, the: "object" };
				const returned:object = ExecutableQueryDocumentsRegistry.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "ExecutableQueryDocumentsRegistry.createFrom", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRegistry.createFrom ).toBeDefined();
				expect( ExecutableQueryDocumentsRegistry.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .decorate", () => {
				const spy:jasmine.Spy = spyOn( ExecutableQueryDocumentsRegistry, "decorate" )
					.and.callThrough();

				ExecutableQueryDocumentsRegistry.createFrom( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should call GeneralRegistry.createFrom", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "createFrom" )
					.and.callThrough();

				ExecutableQueryDocumentsRegistry.createFrom( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should return same object", () => {
				const object:BaseDocumentsRegistry & { the:string } = { context: context, the: "object" };
				const returned:object = ExecutableQueryDocumentsRegistry.createFrom( object );

				expect( returned ).toBe( object );
			} );


			it( "should add add decorators from parent registry", () => {
				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};
				context.parentContext.registry.addDecorator( decorator );

				const registry:ExecutableQueryDocumentsRegistry = ExecutableQueryDocumentsRegistry
					.createFrom( { context: context } );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );

				context.parentContext.registry.__modelDecorators.clear();
			} );

		} );

	} );

} );
