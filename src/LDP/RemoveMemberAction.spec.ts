import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { C } from "../Vocabularies";

import {
	BaseRemoveMemberAction,
	RemoveMemberAction
} from "./RemoveMemberAction";

describe( module( "carbonldp/Members/RemoveMemberAction" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Members.BaseRemoveMemberAction",
		"Interface that represents an object to be sent in a request that add members to a container."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"CarbonLDP.Pointer[]",
			"The target members to remove in a `removeMember` request."
		), ():void => {
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Members.RemoveMemberAction",
		"Interface that represents an object to be sent in a request that removes specific members to a container."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"CarbonLDP.Pointer[]",
			"Array with the members to be removed from the container."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Members.RemoveMemberActionFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.Members.RemoveMemberAction`"
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object is considered a `CarbonLDP.Members.RemoveMemberAction` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Members.RemoveMemberAction" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( RemoveMemberAction.is ).toBeDefined();
				expect( RemoveMemberAction.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Resource>;
			beforeEach( ():void => {
				isTransientResource = spyOn( Resource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					hasType: true,
				} );
			} );


			it( "should be a TransientResource", () => {
				RemoveMemberAction.is( mockObject );
				expect( isTransientResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:RemoveMemberAction", () => {
				RemoveMemberAction.is( mockObject );
				expect( mockObject.hasType ).toHaveBeenCalledWith( C.RemoveMemberAction );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = RemoveMemberAction.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates `CarbonLDP.Members.RemoveMemberAction` resource for the specified targetMembers.", [
					{ name: "data", type: "T & CarbonLDP.Members.BaseRemoveMemberAction", description: "Data to be used in the creation of an remove member action." },
				],
				{ type: "CarbonLDP.Members.RemoveMemberAction" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RemoveMemberAction.create ).toBeDefined();
				expect( RemoveMemberAction.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.create( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( RemoveMemberAction.is, "isRemoveMemberAction" ) as any );
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

		describe( method( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates `CarbonLDP.Members.RemoveMemberAction` resource for the specified targetMembers.", [
					{ name: "object", type: "T & CarbonLDP.Members.BaseRemoveMemberAction", description: "Object to be converted into an remove member action." },
				],
				{ type: "CarbonLDP.Members.RemoveMemberAction" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( RemoveMemberAction.createFrom ).toBeDefined();
				expect( RemoveMemberAction.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return an RemoveMemberAction", () => {
				const returned:RemoveMemberAction = RemoveMemberAction.createFrom( { targetMembers: [] } );
				expect( returned ).toEqual( anyThatMatches( RemoveMemberAction.is, "isRemoveMemberAction" ) as any );
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

	describe( property(
		STATIC,
		"RemoveMemberAction",
		"CarbonLDP.Members.RemoveMemberActionFactory",
		"Constant that implements the `CarbonLDP.Members.RemoveMemberActionFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RemoveMemberAction ).toBeDefined();
			expect( RemoveMemberAction ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "RemoveMemberAction.TYPE", ():void => {
			expect( RemoveMemberAction.TYPE ).toBeDefined();
			expect( Utils.isString( RemoveMemberAction.TYPE ) ).toBe( true );

			expect( RemoveMemberAction.TYPE ).toBe( C.RemoveMemberAction );
		} );

		// TODO: Separate in different tests
		it( "RemoveMemberAction.SCHEMA", ():void => {
			expect( RemoveMemberAction.SCHEMA ).toBeDefined();
			expect( Utils.isObject( RemoveMemberAction.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( RemoveMemberAction.SCHEMA, "targetMembers" ) ).toBe( true );
			expect( RemoveMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
				"@id": C.targetMember,
				"@container": "@set",
				"@type": "@id",
			} );

		} );

	} );

} );
