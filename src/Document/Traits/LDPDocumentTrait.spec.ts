import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { LDPDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/LDPDocumentsRepositoryTrait";

import { ModelDecorator } from "../../Model/ModelDecorator";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { TransientDocument } from "../TransientDocument";

import { LDPDocumentTrait } from "./LDPDocumentTrait";


describe( "LDPDocumentTrait", () => {

	it( "should exists", () => {
		expect( LDPDocumentTrait ).toBeDefined();
		expect( LDPDocumentTrait ).toEqual( jasmine.any( Object ) );
	} );


	let context:DocumentsContext;
	let $repository:LDPDocumentsRepositoryTrait;
	beforeEach( () => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = LDPDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( "[[interface impl]]", () => {

		let resource:LDPDocumentTrait;
		beforeEach( () => {
			resource = LDPDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );


		describe( "LDPDocumentTrait.$create", () => {

			it( "should exists", () => {
				expect( resource.$create ).toBeDefined();
				expect( resource.$create ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "create" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when multiple child", async () => {
				await resource.$create( [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ] );
			} );

			it( "should call repository with $id when multiple child and options", async () => {
				await resource.$create( [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when multiple child and slugs", async () => {
				await resource.$create( [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository with $id when multiple child, slugs and options", async () => {
				await resource.$create( [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when single child", async () => {
				await resource.$create( { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" } );
			} );

			it( "should call repository with $id when single child and options", async () => {
				await resource.$create( { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository with $id when single child and slug", async () => {
				await resource.$create( { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, "slug" );
			} );

			it( "should call repository with $id when single child, slug and options", async () => {
				await resource.$create( { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, "slug", { timeout: 5050 } );
			} );


			it( "should call repository absolute URI when multiple child", async () => {
				await resource.$create( "https://example.com/another-resource/", [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ] );
			} );

			it( "should call repository absolute URI when multiple child and options", async () => {
				await resource.$create( "https://example.com/another-resource/", [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when multiple child and slugs", async () => {
				await resource.$create( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository absolute URI when multiple child, slugs and options", async () => {
				await resource.$create( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when single child", async () => {
				await resource.$create( "https://example.com/another-resource/", { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" } );
			} );

			it( "should call repository absolute URI when single child and options", async () => {
				await resource.$create( "https://example.com/another-resource/", { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when single child and slug", async () => {
				await resource.$create( "https://example.com/another-resource/", { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, "slug" );
			} );

			it( "should call repository absolute URI when single child, slug and options", async () => {
				await resource.$create( "https://example.com/another-resource/", { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, "slug", { timeout: 5050 } );
			} );


			it( "should call repository resolved relative URI when multiple child", async () => {
				await resource.$create( "relative/", [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ] );
			} );

			it( "should call repository resolved relative URI when multiple child and options", async () => {
				await resource.$create( "relative/", [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when multiple child and slugs", async () => {
				await resource.$create( "relative/", [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository resolved relative URI when multiple child, slugs and options", async () => {
				await resource.$create( "relative/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when single child", async () => {
				await resource.$create( "relative/", { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" } );
			} );

			it( "should call repository resolved relative URI when single child and options", async () => {
				await resource.$create( "relative/", { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when single child and slug", async () => {
				await resource.$create( "relative/", { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, "slug" );
			} );

			it( "should call repository resolved relative URI when single child, slug and options", async () => {
				await resource.$create( "relative/", { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, "slug", { timeout: 5050 } );
			} );

		} );

		describe( "LDPDocumentTrait.$createAndRetrieve", () => {

			it( "should exists", () => {
				expect( resource.$createAndRetrieve ).toBeDefined();
				expect( resource.$createAndRetrieve ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "createAndRetrieve" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when multiple child", async () => {
				await resource.$createAndRetrieve( [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ] );
			} );

			it( "should call repository with $id when multiple child and options", async () => {
				await resource.$createAndRetrieve( [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when multiple child and slugs", async () => {
				await resource.$createAndRetrieve( [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository with $id when multiple child, slugs and options", async () => {
				await resource.$createAndRetrieve( [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when single child", async () => {
				await resource.$createAndRetrieve( { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" } );
			} );

			it( "should call repository with $id when single child and options", async () => {
				await resource.$createAndRetrieve( { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository with $id when single child and slug", async () => {
				await resource.$createAndRetrieve( { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, "slug" );
			} );

			it( "should call repository with $id when single child, slug and options", async () => {
				await resource.$createAndRetrieve( { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { a: "child" }, "slug", { timeout: 5050 } );
			} );


			it( "should call repository absolute URI when multiple child", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ] );
			} );

			it( "should call repository absolute URI when multiple child and options", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when multiple child and slugs", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository absolute URI when multiple child, slugs and options", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when single child", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" } );
			} );

			it( "should call repository absolute URI when single child and options", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository absolute URI when single child and slug", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, "slug" );
			} );

			it( "should call repository absolute URI when single child, slug and options", async () => {
				await resource.$createAndRetrieve( "https://example.com/another-resource/", { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { a: "child" }, "slug", { timeout: 5050 } );
			} );


			it( "should call repository resolved relative URI when multiple child", async () => {
				await resource.$createAndRetrieve( "relative/", [ { a: "child" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ] );
			} );

			it( "should call repository resolved relative URI when multiple child and options", async () => {
				await resource.$createAndRetrieve( "relative/", [ { a: "child" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when multiple child and slugs", async () => {
				await resource.$createAndRetrieve( "relative/", [ { a: "child" } ], [ "child-slug" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], [ "child-slug" ] );
			} );

			it( "should call repository resolved relative URI when multiple child, slugs and options", async () => {
				await resource.$createAndRetrieve( "relative/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { a: "child" } ], [ "child-slug" ], { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when single child", async () => {
				await resource.$createAndRetrieve( "relative/", { a: "child" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" } );
			} );

			it( "should call repository resolved relative URI when single child and options", async () => {
				await resource.$createAndRetrieve( "relative/", { a: "child" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, { timeout: 5050 } );
			} );

			it( "should call repository resolved relative URI when single child and slug", async () => {
				await resource.$createAndRetrieve( "relative/", { a: "child" }, "slug" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, "slug" );
			} );

			it( "should call repository resolved relative URI when single child, slug and options", async () => {
				await resource.$createAndRetrieve( "relative/", { a: "child" }, "slug", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { a: "child" }, "slug", { timeout: 5050 } );
			} );

		} );


		describe( "LDPDocumentTrait.$addMember", () => {

			it( "should exists", () => {
				expect( resource.$addMember ).toBeDefined();
				expect( resource.$addMember ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "addMember" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when string member", async () => {
				await resource.$addMember( "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "member/" );
			} );

			it( "should call repository with $id when pointer member", async () => {
				await resource.$addMember( { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { $id: "member/" } );
			} );

			it( "should call repository with $id when string member and options", async () => {
				await resource.$addMember( "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer member and options", async () => {
				await resource.$addMember( { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { $id: "member/" }, { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when string member", async () => {
				await resource.$addMember( "https://example.com/another-resource/", "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "member/" );
			} );

			it( "should call repository with absolute URI when pointer member", async () => {
				await resource.$addMember( "https://example.com/another-resource/", { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { $id: "member/" } );
			} );

			it( "should call repository with absolute URI when string member and options", async () => {
				await resource.$addMember( "https://example.com/another-resource/", "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$addMember( "https://example.com/another-resource/", { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { $id: "member/" }, { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI when string member", async () => {
				await resource.$addMember( "relative/", "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "member/" );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$addMember( "relative/", { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { $id: "member/" } );
			} );

			it( "should call repository with resolved relative URI when string member and options", async () => {
				await resource.$addMember( "relative/", "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$addMember( "relative/", { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { $id: "member/" }, { timeout: 5050 } );
			} );

		} );

		describe( "LDPDocumentTrait.$addMembers", () => {

			it( "should exists", () => {
				expect( resource.$addMembers ).toBeDefined();
				expect( resource.$addMembers ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "addMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when string member", async () => {
				await resource.$addMembers( [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ "member/" ] );
			} );

			it( "should call repository with $id when pointer member", async () => {
				await resource.$addMembers( [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with $id when pointer & string member", async () => {
				await resource.$addMembers( [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with $id when string member and options", async () => {
				await resource.$addMembers( [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer member and options", async () => {
				await resource.$addMembers( [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer & string member and options", async () => {
				await resource.$addMembers( [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when string member", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ "member/" ] );
			} );

			it( "should call repository with absolute URI when pointer member", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with absolute URI when pointer & string member", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with absolute URI when string member and options", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$addMembers( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI when string member", async () => {
				await resource.$addMembers( "relative/", [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ "member/" ] );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$addMembers( "relative/", [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$addMembers( "relative/", [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with resolved relative URI when string member and options", async () => {
				await resource.$addMembers( "relative/", [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$addMembers( "relative/", [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$addMembers( "relative/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );

		} );


		describe( "LDPDocumentTrait.$removeMember", () => {

			it( "should exists", () => {
				expect( resource.$removeMember ).toBeDefined();
				expect( resource.$removeMember ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "removeMember" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when string member", async () => {
				await resource.$removeMember( "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "member/" );
			} );

			it( "should call repository with $id when pointer member", async () => {
				await resource.$removeMember( { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { $id: "member/" } );
			} );

			it( "should call repository with $id when string member and options", async () => {
				await resource.$removeMember( "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer member and options", async () => {
				await resource.$removeMember( { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { $id: "member/" }, { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when string member", async () => {
				await resource.$removeMember( "https://example.com/another-resource/", "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "member/" );
			} );

			it( "should call repository with absolute URI when pointer member", async () => {
				await resource.$removeMember( "https://example.com/another-resource/", { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { $id: "member/" } );
			} );

			it( "should call repository with absolute URI when string member and options", async () => {
				await resource.$removeMember( "https://example.com/another-resource/", "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$removeMember( "https://example.com/another-resource/", { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { $id: "member/" }, { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI when string member", async () => {
				await resource.$removeMember( "relative/", "member/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "member/" );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$removeMember( "relative/", { $id: "member/" } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { $id: "member/" } );
			} );

			it( "should call repository with resolved relative URI when string member and options", async () => {
				await resource.$removeMember( "relative/", "member/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "member/", { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$removeMember( "relative/", { $id: "member/" }, { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { $id: "member/" }, { timeout: 5050 } );
			} );

		} );

		describe( "LDPDocumentTrait.$removeMembers", () => {

			it( "should exists", () => {
				expect( resource.$removeMembers ).toBeDefined();
				expect( resource.$removeMembers ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( () => {
				spy = spyOnDecorated( $repository, "removeMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when string member", async () => {
				await resource.$removeMembers( [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ "member/" ] );
			} );

			it( "should call repository with $id when pointer member", async () => {
				await resource.$removeMembers( [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with $id when pointer & string member", async () => {
				await resource.$removeMembers( [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with $id when string member and options", async () => {
				await resource.$removeMembers( [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer member and options", async () => {
				await resource.$removeMembers( [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when pointer & string member and options", async () => {
				await resource.$removeMembers( [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );

			it( "should call repository with $id when no member", async () => {
				await resource.$removeMembers();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.$removeMembers( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when string member", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ "member/" ] );
			} );

			it( "should call repository with absolute URI when pointer member", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with absolute URI when pointer & string member", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with absolute URI when string member and options", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when pointer member and options", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when no member", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.$removeMembers( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI when string member", async () => {
				await resource.$removeMembers( "relative/", [ "member/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ "member/" ] );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$removeMembers( "relative/", [ { $id: "member/" } ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member/" } ] );
			} );

			it( "should call repository with resolved relative URI when pointer member", async () => {
				await resource.$removeMembers( "relative/", [ { $id: "member1/" }, "member2/" ] );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member1/" }, "member2/" ] );
			} );

			it( "should call repository with resolved relative URI when string member and options", async () => {
				await resource.$removeMembers( "relative/", [ "member/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ "member/" ], { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$removeMembers( "relative/", [ { $id: "member/" } ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member/" } ], { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when pointer member and options", async () => {
				await resource.$removeMembers( "relative/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", [ { $id: "member1/" }, "member2/" ], { timeout: 5050 } );
			} );

			it( "should call repository with resolved relative URI when no member", async () => {
				await resource.$removeMembers( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resolved relative URI when options", async () => {
				await resource.$removeMembers( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "LDPDocumentTrait.isDecorated", () => {

			it( "should exists", () => {
				expect( LDPDocumentTrait.isDecorated ).toBeDefined();
				expect( LDPDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				LDPDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( LDPDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "LDPDocumentTrait.decorate", () => {

			it( "should exists", () => {
				expect( LDPDocumentTrait.decorate ).toBeDefined();
				expect( LDPDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				LDPDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( LDPDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( LDPDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				LDPDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with TransientDocument", () => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" )
					.and.callThrough();

				LDPDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" )
					.and.callThrough();

				LDPDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

} );
