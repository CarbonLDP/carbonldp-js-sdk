import { DocumentsContext } from "../Context/DocumentsContext";

import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import { ExecutableQueryDocumentsRepository } from "./ExecutableQueryDocumentsRepository";

import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { ExecutableQueryDocumentsRepositoryTrait } from "./Traits/ExecutableQueryDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";


describe( "DocumentsRepository", () => {

	it( "should exist", () => {
		expect( ExecutableQueryDocumentsRepository ).toBeDefined();
		expect( ExecutableQueryDocumentsRepository ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface impl]]", () => {

		let repository:ExecutableQueryDocumentsRepository;
		beforeEach( () => {
			repository = ExecutableQueryDocumentsRepository.create( { context } );
		} );

	} );

	describe( "[[factory]]", () => {

		describe( "DocumentsRepository.create", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRepository.create ).toBeDefined();
				expect( ExecutableQueryDocumentsRepository.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return different object", () => {
				const base:BaseDocumentsRepository = { context: context };
				const returned:object = ExecutableQueryDocumentsRepository.create( base );

				expect( returned ).not.toBe( base );
			} );

			it( "should call with .createFrom", () => {
				const spy:jasmine.Spy = spyOn( ExecutableQueryDocumentsRepository, "createFrom" )
					.and.callThrough();

				ExecutableQueryDocumentsRepository.create( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

		describe( "DocumentsRepository.createFrom", () => {

			it( "should exist", () => {
				expect( ExecutableQueryDocumentsRepository.createFrom ).toBeDefined();
				expect( ExecutableQueryDocumentsRepository.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return same object", () => {
				const base:BaseDocumentsRepository = { context: context };
				const returned:object = ExecutableQueryDocumentsRepository.createFrom( base );

				expect( returned ).toBe( base );
			} );


			it( "should create with QueryableDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( ExecutableQueryDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with SPARQLDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with EventEmitterDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				ExecutableQueryDocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );


