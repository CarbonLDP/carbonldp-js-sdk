import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { BaseGeneralRepository } from "./BaseGeneralRepository";
import { GeneralRepository } from "./GeneralRepository";


describe( "GeneralRepository", () => {

	it( "should exists", () => {
		expect( GeneralRepository ).toBeDefined();
		expect( GeneralRepository ).toEqual( jasmine.any( Object ) );
	} );

	let context:Context<ResolvablePointer & RegisteredPointer>;
	beforeEach( () => {
		context = createMockContext();
	} );


	describe( "[[interface]]", () => {

	} );

	describe( "[[factory]]", () => {

		describe( "GeneralRepository.isDecorated", () => {

			it( "should exists", () => {
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

			it( "should exists", () => {
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

			it( "should exists", () => {
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

			it( "should exists", () => {
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

} );
