import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
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
	AddMemberAction,
	BaseAddMemberAction
} from "./AddMemberAction";

describe( module( "carbonldp/Members/AddMemberAction" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Members.BaseAddMemberAction",
		"Interface that represents an object to be sent in a request that add members to a container."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"CarbonLDP.Pointer[]",
			"The target members to add in a `addMember` request."
		), ():void => {
		} );

	} );


	describe( interfaze(
		"CarbonLDP.Members.AddMemberAction",
		"Interface that represents an object to be sent in a request that add members to a container."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"CarbonLDP.Pointer[]",
			"Array with the members to be added to the container."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.Members.AddMemberActionFactory",
		"Interface with the factory, decorate and utils methods of `CarbonLDP.Members.AddMemberAction` objects"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object is considered a `CarbonLDP.Members.AddMemberAction` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Members.AddMemberAction" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( AddMemberAction.is ).toBeDefined();
				expect( AddMemberAction.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<TransientResource>;
			beforeEach( ():void => {
				isTransientResource = spyOn( TransientResource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					hasType: true,
				} );
			} );


			it( "should be a TransientResource", () => {
				AddMemberAction.is( mockObject );
				expect( isTransientResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:AddMemberAction", () => {
				AddMemberAction.is( mockObject );
				expect( mockObject.hasType ).toHaveBeenCalledWith( C.AddMemberAction );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = AddMemberAction.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates `CarbonLDP.Members.AddMemberAction` resource for the specified targetMembers.", [
					{ name: "data", type: "T & CarbonLDP.Members.BaseAddMemberAction", description: "Data to be used in the creation of an add member action." },
				],
				{ type: "CarbonLDP.Members.AddMemberAction" }
			), ():void => {} );

			it( "should exists", ():void => {
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

		describe( method( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates `CarbonLDP.Members.AddMemberAction` resource for the specified targetMembers.", [
					{ name: "object", type: "T & CarbonLDP.Members.BaseAddMemberAction", description: "Object to be converted into an add member action." },
				],
				{ type: "CarbonLDP.Members.AddMemberAction" }
			), ():void => {} );

			it( "should exists", ():void => {
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

	describe( property(
		STATIC,
		"AddMemberAction",
		"CarbonLDP.Members.AddMemberActionFactory",
		"Constant that implements the `CarbonLDP.Members.AddMemberActionFactory` instance."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AddMemberAction ).toBeDefined();
			expect( AddMemberAction ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "AddMemberAction.TYPE", ():void => {
			expect( AddMemberAction.TYPE ).toBeDefined();
			expect( Utils.isString( AddMemberAction.TYPE ) ).toBe( true );

			expect( AddMemberAction.TYPE ).toBe( C.AddMemberAction );
		} );

		// TODO: Separate in different tests
		it( "AddMemberAction.SCHEMA", ():void => {
			expect( AddMemberAction.SCHEMA ).toBeDefined();
			expect( Utils.isObject( AddMemberAction.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( AddMemberAction.SCHEMA, "targetMembers" ) ).toBe( true );
			expect( AddMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
				"@id": C.targetMember,
				"@container": "@set",
				"@type": "@id",
			} );

		} );

	} );

} );
