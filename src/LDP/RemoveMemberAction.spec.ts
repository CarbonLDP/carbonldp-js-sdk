import { anyThatMatches } from "../../test/helpers/jasmine/equalities";

import { Pointer } from "../Pointer/Pointer";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { BaseRemoveMemberAction, RemoveMemberAction } from "./RemoveMemberAction";


describe( "RemoveMemberAction", () => {

	it( "should exists", () => {
		expect( RemoveMemberAction ).toBeDefined();
		expect( RemoveMemberAction ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "RemoveMemberAction.TYPE", () => {

			it( "should exists", () => {
				expect( RemoveMemberAction.TYPE ).toBeDefined();
				expect( RemoveMemberAction.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:RemoveMemberAction`", () => {
				expect( RemoveMemberAction.TYPE ).toBe( C.RemoveMemberAction );
			} );

		} );

		describe( "RemoveMemberAction.SCHEMA", () => {

			it( "should exists", () => {
				expect( RemoveMemberAction.SCHEMA ).toBeDefined();
				expect( RemoveMemberAction.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( RemoveMemberAction.SCHEMA ).toEqual( {
					targetMembers: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `targetMembers`", () => {
				expect( RemoveMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
					"@id": C.targetMember,
					"@container": "@set",
					"@type": "@id",
				} );
			} );

		} );


		describe( "RemoveMemberAction.is", () => {

			it( "should exists", () => {
				expect( RemoveMemberAction.is ).toBeDefined();
				expect( RemoveMemberAction.is ).toEqual( jasmine.any( Function ) );
			} );


			let isResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Resource>;
			beforeEach( () => {
				isResource = spyOn( Resource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );
			} );


			it( "should be a Resource", () => {
				RemoveMemberAction.is( mockObject );
				expect( isResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:RemoveMemberAction", () => {
				RemoveMemberAction.is( mockObject );
				expect( mockObject.$hasType ).toHaveBeenCalledWith( C.RemoveMemberAction );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = RemoveMemberAction.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "RemoveMemberAction.create", () => {

			it( "should exists", () => {
				expect( RemoveMemberAction.create ).toBeDefined();
				expect( RemoveMemberAction.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.create( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( RemoveMemberAction.is, "isAddMemberAction" ) as any );
			} );

			it( "should add type c:RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.create( { targetMembers: [] } );
				expect( returned.types ).toContain( C.RemoveMemberAction );
			} );

			it( "should maintain targetMembers", () => {
				const targetMembers:Pointer[] = [];
				const returned:RemoveMemberAction = RemoveMemberAction.create( { targetMembers } );


				expect( returned.targetMembers ).toBe( targetMembers );
			} );

			it( "should return different reference", () => {
				const base:BaseRemoveMemberAction = { targetMembers: [] };
				const returned:RemoveMemberAction = RemoveMemberAction.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "RemoveMemberAction.createFrom", () => {

			it( "should exists", () => {
				expect( RemoveMemberAction.createFrom ).toBeDefined();
				expect( RemoveMemberAction.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.createFrom( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( RemoveMemberAction.is, "isAddMemberAction" ) as any );
			} );

			it( "should add type c:RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.createFrom( { targetMembers: [] } );
				expect( returned.types ).toContain( C.RemoveMemberAction );
			} );

			it( "should maintain targetMembers", () => {
				const targetMembers:Pointer[] = [];
				const returned:RemoveMemberAction = RemoveMemberAction.createFrom( { targetMembers } );


				expect( returned.targetMembers ).toBe( targetMembers );
			} );

			it( "should return same reference", () => {
				const base:BaseRemoveMemberAction = { targetMembers: [] };
				const returned:RemoveMemberAction = RemoveMemberAction.createFrom( base );

				expect( base ).toBe( returned );
			} );

		} );

	} );

} );
