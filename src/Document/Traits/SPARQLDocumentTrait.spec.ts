import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { SPARQLDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { TransientDocument } from "../TransientDocument";

import { SPARQLDocumentTrait } from "./SPARQLDocumentTrait";


describe( "SPARQLDocumentTrait", () => {

	it( "should exists", () => {
		expect( SPARQLDocumentTrait ).toBeDefined();
		expect( SPARQLDocumentTrait ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	let $repository:SPARQLDocumentsRepositoryTrait;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = SPARQLDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( "[[interface impl]]", () => {

		let resource:SPARQLDocumentTrait;
		beforeEach( () => {
			resource = SPARQLDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );


		describe( "SPARQLDocumentTrait.$executeASKQuery", () => {

			it( "should exists", () => {
				expect( resource.$executeASKQuery ).toBeDefined();
				expect( resource.$executeASKQuery ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "executeASKQuery" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeASKQuery( "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeASKQuery( "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeASKQuery( "https://example.com/another-resource/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeASKQuery( "https://example.com/another-resource/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeASKQuery( "relative/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeASKQuery( "relative/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", { timeout: 5050 } );
			} );

		} );

		describe( "SPARQLDocumentTrait.$executeSELECTQuery", () => {

			it( "should exists", () => {
				expect( resource.$executeSELECTQuery ).toBeDefined();
				expect( resource.$executeSELECTQuery ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeSELECTQuery( "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeSELECTQuery( "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeSELECTQuery( "https://example.com/another-resource/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeSELECTQuery( "https://example.com/another-resource/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeSELECTQuery( "relative/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeSELECTQuery( "relative/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", { timeout: 5050 } );
			} );

		} );

		describe( "SPARQLDocumentTrait.$executeUPDATE", () => {

			it( "should exists", () => {
				expect( resource.$executeUPDATE ).toBeDefined();
				expect( resource.$executeUPDATE ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "executeUPDATE" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeUPDATE( "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "update", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeUPDATE( "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "update", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeUPDATE( "https://example.com/another-resource/", "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "update", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeUPDATE( "https://example.com/another-resource/", "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "update", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeUPDATE( "relative/", "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "update", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeUPDATE( "relative/", "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "update", { timeout: 5050 } );
			} );


		} );


		describe( "SPARQLDocumentTrait.$sparql", () => {

			it( "should exists", () => {
				expect( resource.$sparql ).toBeDefined();
				expect( resource.$sparql ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "sparql" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI", async () => {
				await resource.$sparql();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );


			it( "should call repository with absolute URI", async () => {
				await resource.$sparql( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );


			it( "should call repository with resolved relative URI", async () => {
				await resource.$sparql( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );


		} );

	} );

	describe( "[[factory]]", () => {

		describe( "SPARQLDocumentTrait.isDecorated", () => {

			it( "should exists", () => {
				expect( SPARQLDocumentTrait.isDecorated ).toBeDefined();
				expect( SPARQLDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				SPARQLDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "SPARQLDocumentTrait.decorate", () => {

			it( "should exists", () => {
				expect( SPARQLDocumentTrait.decorate ).toBeDefined();
				expect( SPARQLDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( SPARQLDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				SPARQLDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with TransientDocument", () => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );
