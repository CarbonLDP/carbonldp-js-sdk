import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { QueryableDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";

import { LDPDocumentTrait } from "./LDPDocumentTrait";
import { QueryableDocumentTrait } from "./QueryableDocumentTrait";


describe( "QueryableDocumentTrait", () => {

	it( "should exist", () => {
		expect( QueryableDocumentTrait ).toBeDefined();
		expect( QueryableDocumentTrait ).toEqual( jasmine.any( Object ) );
	} );

	let context:DocumentsContext;
	let $repository:QueryableDocumentsRepositoryTrait;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = QueryableDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( "[[interface impl]]", () => {

		let resource:QueryableDocumentTrait;
		beforeEach( () => {
			resource = QueryableDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );


		describe( "QueryableDocumentTrait.$get", () => {

			it( "should exist", () => {
				expect( resource.$get ).toBeDefined();
				expect( resource.$get ).toEqual( jasmine.any( Function ) );
			} );


			const queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder = _ => _;
			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "get" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.$get( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$get( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when query", async () => {
				await resource.$get( "https://example.com/another-resource/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", queryBuilderFn );
			} );

			it( "should call repository with absolute URI when options and query", async () => {
				await resource.$get( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.$get( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.$get( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

			it( "should call repository with resoled relative URI when query", async () => {
				await resource.$get( "relative/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", queryBuilderFn );
			} );

			it( "should call repository with resoled relative URI when options and query", async () => {
				await resource.$get( "relative/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with multiple absolute URI", async () => {
				await resource.$get( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ] );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ] );
			} );

			it( "should call repository with multiple absolute URI when options", async () => {
				await resource.$get( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], { timeout: 5050 } );
			} );

			it( "should call repository with multiple absolute URI when query", async () => {
				await resource.$get( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], queryBuilderFn );
			} );

			it( "should call repository with multiple absolute URI when options and query", async () => {
				await resource.$get( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource-1/", "https://example.com/resource-2/" ], { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with multiple resoled relative URI when empty", async () => {
				await resource.$get( [ "relative-1/", "relative-2/" ] );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource/relative-1/", "https://example.com/resource/relative-2/" ] );
			} );

			it( "should call repository with multiple resoled relative URI when options", async () => {
				await resource.$get( [ "relative-1/", "relative-2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource/relative-1/", "https://example.com/resource/relative-2/" ], { timeout: 5050 } );
			} );

			it( "should call repository with multiple resoled relative URI when query", async () => {
				await resource.$get( [ "relative-1/", "relative-2/" ], queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource/relative-1/", "https://example.com/resource/relative-2/" ], queryBuilderFn );
			} );

			it( "should call repository with multiple resoled relative URI when options and query", async () => {
				await resource.$get( [ "relative-1/", "relative-2/" ], { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( [ "https://example.com/resource/relative-1/", "https://example.com/resource/relative-2/" ], { timeout: 5050 }, queryBuilderFn );
			} );

		} );


		describe( "QueryableDocumentTrait.$getChildren", () => {

			it( "should exist", () => {
				expect( resource.$getChildren ).toBeDefined();
				expect( resource.$getChildren ).toEqual( jasmine.any( Function ) );
			} );


			const queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder = _ => _;
			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "getChildren" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.$getChildren();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.$getChildren( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when query", async () => {
				await resource.$getChildren( queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", queryBuilderFn );
			} );

			it( "should call repository with $id when options and query", async () => {
				await resource.$getChildren( { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.$getChildren( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$getChildren( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when query", async () => {
				await resource.$getChildren( "https://example.com/another-resource/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", queryBuilderFn );
			} );

			it( "should call repository with absolute URI when options and query", async () => {
				await resource.$getChildren( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.$getChildren( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.$getChildren( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

			it( "should call repository with resoled relative URI when query", async () => {
				await resource.$getChildren( "relative/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", queryBuilderFn );
			} );

			it( "should call repository with resoled relative URI when options and query", async () => {
				await resource.$getChildren( "relative/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 }, queryBuilderFn );
			} );

		} );

		describe( "QueryableDocumentTrait.$getMembers", () => {

			it( "should exist", () => {
				expect( resource.$getMembers ).toBeDefined();
				expect( resource.$getMembers ).toEqual( jasmine.any( Function ) );
			} );


			const queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder = _ => _;
			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "getMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.$getMembers();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.$getMembers( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when query", async () => {
				await resource.$getMembers( queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", queryBuilderFn );
			} );

			it( "should call repository with $id when options and query", async () => {
				await resource.$getMembers( { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.$getMembers( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$getMembers( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when query", async () => {
				await resource.$getMembers( "https://example.com/another-resource/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", queryBuilderFn );
			} );

			it( "should call repository with absolute URI when options and query", async () => {
				await resource.$getMembers( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.$getMembers( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.$getMembers( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

			it( "should call repository with resoled relative URI when query", async () => {
				await resource.$getMembers( "relative/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", queryBuilderFn );
			} );

			it( "should call repository with resoled relative URI when options and query", async () => {
				await resource.$getMembers( "relative/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 }, queryBuilderFn );
			} );

		} );


		describe( "QueryableDocumentTrait.$listChildren", () => {

			it( "should exist", () => {
				expect( resource.$listChildren ).toBeDefined();
				expect( resource.$listChildren ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "listChildren" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.$listChildren();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.$listChildren( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.$listChildren( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$listChildren( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.$listChildren( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.$listChildren( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

		} );

		describe( "QueryableDocumentTrait.$listMembers", () => {

			it( "should exist", () => {
				expect( resource.$listMembers ).toBeDefined();
				expect( resource.$listMembers ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "listMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.$listMembers();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.$listMembers( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.$listMembers( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$listMembers( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.$listMembers( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.$listMembers( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "QueryableDocumentTrait.isDecorated", () => {

			it( "should exist", () => {
				expect( QueryableDocumentTrait.isDecorated ).toBeDefined();
				expect( QueryableDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				QueryableDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "QueryableDocumentTrait.decorate", () => {

			it( "should exist", () => {
				expect( QueryableDocumentTrait.decorate ).toBeDefined();
				expect( QueryableDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( QueryableDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				QueryableDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with LDPDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentTrait, "decorate" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with QueryablePointer", () => {
				const spy:jasmine.Spy = spyOn( QueryablePointer, "decorate" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );

