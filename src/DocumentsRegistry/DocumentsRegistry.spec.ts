import { spyOnDecorated } from "../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../Context/DocumentsContext";

import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { TypedModelDecorator } from "../GeneralRegistry/TypedModelDecorator";

import { ModelDecorator } from "../Model/ModelDecorator";

import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";
import { DocumentsRegistry } from "./DocumentsRegistry";


describe( "DocumentsRegistry", () => {

	it( "should exist", () => {
		expect( DocumentsRegistry ).toBeDefined();
		expect( DocumentsRegistry ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		function createMock<T extends {}>( data?:T & Partial<DocumentsRegistry> ):DocumentsRegistry {
			return DocumentsRegistry.decorate( Object.assign( { context: context }, data ) );
		}


		describe( "DocumentsRegistry.registry", () => {

			it( "should exist", () => {
				const registry:DocumentsRegistry = createMock();

				expect( registry.register ).toBeDefined();
				expect( registry.register ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .getPointer with local", () => {
				const registry:DocumentsRegistry = createMock();

				const spy:jasmine.Spy = spyOnDecorated( registry, "getPointer" );

				registry.register( "https://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", true );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "DocumentsRegistry.isDecorated", () => {

			it( "should exist", () => {
				expect( DocumentsRegistry.isDecorated ).toBeDefined();
				expect( DocumentsRegistry.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				DocumentsRegistry.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( DocumentsRegistry.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "DocumentsRegistry.decorate", () => {

			it( "should exist", () => {
				expect( DocumentsRegistry.decorate ).toBeDefined();
				expect( DocumentsRegistry.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				DocumentsRegistry.decorate( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( DocumentsRegistry.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( DocumentsRegistry, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				DocumentsRegistry.decorate( { context: context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRegistry", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "decorate" )
					.and.callThrough();

				DocumentsRegistry.decorate( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should throw error if no context", () => {
				expect( () => {
					DocumentsRegistry.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, "Property context is required." );
			} );


			it( "should add __modelDecorator as Document", () => {
				const registry:DocumentsRegistry = DocumentsRegistry.decorate( { context } );
				expect( registry.__modelDecorator ).toBe( Document );
			} );

		} );


		describe( "DocumentsRegistry.create", () => {

			it( "should exist", () => {
				expect( DocumentsRegistry.create ).toBeDefined();
				expect( DocumentsRegistry.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( DocumentsRegistry, "createFrom" )
					.and.callThrough();

				DocumentsRegistry.create( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should not return same object", () => {
				const object:BaseDocumentsRegistry & { the:string } = { context: context, the: "object" };
				const returned:object = DocumentsRegistry.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "DocumentsRegistry.createFrom", () => {

			it( "should exist", () => {
				expect( DocumentsRegistry.createFrom ).toBeDefined();
				expect( DocumentsRegistry.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .decorate", () => {
				const spy:jasmine.Spy = spyOn( DocumentsRegistry, "decorate" )
					.and.callThrough();

				DocumentsRegistry.createFrom( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should call GeneralRegistry.createFrom", () => {
				const spy:jasmine.Spy = spyOn( GeneralRegistry, "createFrom" )
					.and.callThrough();

				DocumentsRegistry.createFrom( { context: context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should return same object", () => {
				const object:BaseDocumentsRegistry & { the:string } = { context: context, the: "object" };
				const returned:object = DocumentsRegistry.createFrom( object );

				expect( returned ).toBe( object );
			} );


			it( "should add add decorators from parent registry", () => {
				const decorator:TypedModelDecorator = {
					TYPE: "a-type",
					isDecorated: ( object ):object is any => !!object,
					decorate: object => object,
				};
				context.parentContext.registry.addDecorator( decorator );

				const registry:DocumentsRegistry = DocumentsRegistry
					.createFrom( { context: context } );

				expect( registry.__modelDecorators ).toEqual( new Map( [
					[ "a-type", decorator ],
				] ) );

				context.parentContext.registry.__modelDecorators.clear();
			} );

		} );

	} );

} );
