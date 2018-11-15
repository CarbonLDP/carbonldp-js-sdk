import { DocumentsContext } from "../Context/DocumentsContext";

import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import { DocumentsRepository } from "./DocumentsRepository";

import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./Traits/QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";


describe( "DocumentsRepository", () => {

	it( "should exists", () => {
		expect( DocumentsRepository ).toBeDefined();
		expect( DocumentsRepository ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( "[[interface]]", () => {

		let repository:DocumentsRepository;
		beforeEach( () => {
			repository = DocumentsRepository.create( { context } );
		} );

	} );

	describe( "[[factory]]", () => {

		describe( "DocumentsRepository.create", () => {

			it( "should exists", () => {
				expect( DocumentsRepository.create ).toBeDefined();
				expect( DocumentsRepository.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return different object", () => {
				const base:BaseDocumentsRepository = { context: context };
				const returned:object = DocumentsRepository.create( base );

				expect( returned ).not.toBe( base );
			} );

			it( "should call with .createFrom", () => {
				const spy:jasmine.Spy = spyOn( DocumentsRepository, "createFrom" )
					.and.callThrough();

				DocumentsRepository.create( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

		describe( "DocumentsRepository.createFrom", () => {

			it( "should exists", () => {
				expect( DocumentsRepository.createFrom ).toBeDefined();
				expect( DocumentsRepository.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return same object", () => {
				const base:BaseDocumentsRepository = { context: context };
				const returned:object = DocumentsRepository.createFrom( base );

				expect( returned ).toBe( base );
			} );


			it( "should create with QueryableDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( QueryableDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with SPARQLDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with EventEmitterDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );


