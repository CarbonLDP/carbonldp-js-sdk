import { anyThatMatches } from "../../test/helpers/jasmine/equalities";

import { Pointer } from "../Pointer/Pointer";
import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { AddMemberAction, BaseAddMemberAction } from "./AddMemberAction";


describe( "AddMemberAction", () => {

	it( "should exist", () => {
		expect( AddMemberAction ).toBeDefined();
		expect( AddMemberAction ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "AddMemberAction.TYPE", () => {

			it( "should exist", () => {
				expect( AddMemberAction.TYPE ).toBeDefined();
				expect( AddMemberAction.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:AddMemberAction`", () => {
				expect( AddMemberAction.TYPE ).toBe( C.AddMemberAction );
			} );

		} );

		describe( "AddMemberAction.SCHEMA", () => {

			it( "should exist", () => {
				expect( AddMemberAction.SCHEMA ).toBeDefined();
				expect( AddMemberAction.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( AddMemberAction.SCHEMA ).toEqual( {
					targetMembers: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `targetMembers`", () => {
				expect( AddMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
					"@id": C.targetMember,
					"@container": "@set",
					"@type": "@id",
				} );
			} );

		} );


		describe( "AddMemberAction.is", () => {

			it( "should exist", () => {
				expect( AddMemberAction.is ).toBeDefined();
				expect( AddMemberAction.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Resource>;
			beforeEach( () => {
				isTransientResource = spyOn( Resource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );
			} );


			it( "should be a TransientResource", () => {
				AddMemberAction.is( mockObject );
				expect( isTransientResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:AddMemberAction", () => {
				AddMemberAction.is( mockObject );
				expect( mockObject.$hasType ).toHaveBeenCalledWith( C.AddMemberAction );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = AddMemberAction.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "AddMemberAction.create", () => {

			it( "should exist", () => {
				expect( AddMemberAction.create ).toBeDefined();
				expect( AddMemberAction.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an AddMemberAction", () => {
				const returned:AddMemberAction = AddMemberAction.create( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( AddMemberAction.is, "isAddMemberAction" ) as any );
			} );

			it( "should add type c:AddMemberAction", () => {
				const returned:AddMemberAction = AddMemberAction.create( { targetMembers: [] } );
				expect( returned.types ).toContain( C.AddMemberAction );
			} );

			it( "should maintain targetMembers", () => {
				const targetMembers:Pointer[] = [];
				const returned:AddMemberAction = AddMemberAction.create( { targetMembers } );


				expect( returned.targetMembers ).toBe( targetMembers );
			} );

			it( "should return different reference", () => {
				const base:BaseAddMemberAction = { targetMembers: [] };
				const returned:AddMemberAction = AddMemberAction.create( base );

				expect( base ).not.toBe( returned );
			} );

		} );

		describe( "AddMemberAction.createFrom", () => {

			it( "should exist", () => {
				expect( AddMemberAction.createFrom ).toBeDefined();
				expect( AddMemberAction.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an AddMemberAction", () => {
				const returned:AddMemberAction = AddMemberAction.createFrom( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( AddMemberAction.is, "isAddMemberAction" ) as any );
			} );

			it( "should add type c:AddMemberAction", () => {
				const returned:AddMemberAction = AddMemberAction.createFrom( { targetMembers: [] } );
				expect( returned.types ).toContain( C.AddMemberAction );
			} );

			it( "should maintain targetMembers", () => {
				const targetMembers:Pointer[] = [];
				const returned:AddMemberAction = AddMemberAction.createFrom( { targetMembers } );


				expect( returned.targetMembers ).toBe( targetMembers );
			} );

			it( "should return same reference", () => {
				const base:BaseAddMemberAction = { targetMembers: [] };
				const returned:AddMemberAction = AddMemberAction.createFrom( base );

				expect( base ).toBe( returned );
			} );

		} );

	} );

} );
