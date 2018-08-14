import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { extendsClass, hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { BaseGeneralRepository } from "./BaseGeneralRepository";
import { GeneralRepository, GeneralRepositoryFactory } from "./GeneralRepository";


describe( module( "carbonldp/GeneralRepository" ), () => {

	let context:Context<ResolvablePointer & RegisteredPointer>;
	beforeEach( ():void => {
		context = createMockContext();
	} );


	describe( interfaze(
		"CarbonLDP.GeneralRepository",
		[ "MODEL extends ResolvablePointer = ResolvablePointer" ],
		"Repository used by a context."
	), () => {

		it( extendsClass( "CarbonLDP.Repository<MODEL>" ), () => {
			const target:Repository<ResolvablePointer> = {} as GeneralRepository<ResolvablePointer>;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"context",
			"CarbonLDP.Context<MODEL & CarbonLDP.RegisteredPointer, MODEL>"
		), ():void => {
			const target:GeneralRepository<ResolvablePointer>[ "context" ] = {} as Context<ResolvablePointer & RegisteredPointer>;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.GeneralRepositoryFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.GeneralRepository` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.GeneralRepository, CarbonLDP.Repository & CarbonLDP.ObjectSchemaResolver>" ), () => {
			const target:ModelPrototype<GeneralRepository, Repository & ObjectSchemaResolver> = {} as GeneralRepositoryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.GeneralRepository<any>, CarbonLDP.BaseGeneralRepository>" ), () => {
			const target:ModelDecorator<GeneralRepository, BaseGeneralRepository> = {} as GeneralRepositoryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.GeneralRepository<any>, CarbonLDP.BaseGeneralRepository>" ), () => {
			const target:ModelFactory<GeneralRepository, BaseGeneralRepository> = {} as GeneralRepositoryFactory;
			expect( target ).toBeDefined();
		} );


		describe( "GeneralRepository.isDecorated", () => {

			it( "should exists", ():void => {
				expect( GeneralRepository.isDecorated ).toBeDefined();
				expect( GeneralRepository.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				GeneralRepository.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( GeneralRepository.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "GeneralRepository.decorate", () => {

			it( "should exists", ():void => {
				expect( GeneralRepository.decorate ).toBeDefined();
				expect( GeneralRepository.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				GeneralRepository.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( GeneralRepository.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( GeneralRepository, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				GeneralRepository.decorate( { context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with Repository", () => {
				const spy:jasmine.Spy = spyOn( Repository, "decorate" )
					.and.callThrough();

				GeneralRepository.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should throw error if no context", () => {
				expect( () => {
					GeneralRepository.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "context" is required.` );
			} );

		} );


		describe( "GeneralRepository.create", () => {

			it( "should exists", ():void => {
				expect( GeneralRepository.create ).toBeDefined();
				expect( GeneralRepository.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "createFrom" )
					.and.callThrough();

				GeneralRepository.create( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should not return same object", () => {
				const object:BaseGeneralRepository & { the:string } = { context: context, the: "object" };
				const returned:object = GeneralRepository.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "GeneralRepository.createFrom", () => {

			it( "should exists", ():void => {
				expect( GeneralRepository.createFrom ).toBeDefined();
				expect( GeneralRepository.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .decorate", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				GeneralRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return same object", () => {
				const object:BaseGeneralRepository & { the:string } = { context: context, the: "object" };
				const returned:object = GeneralRepository.createFrom( object );

				expect( returned ).toBe( object );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"GeneralRepository",
		"CarbonLDP.GeneralRepositoryFactory"
	), () => {

		it( "should exists", ():void => {
			expect( GeneralRepository ).toBeDefined();
			expect( GeneralRepository ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
