import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { C } from "../Vocabularies";

import { RemoveMemberAction } from "./RemoveMemberAction";

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

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object is considered a `CarbonLDP.Members.RemoveMemberAction` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Members.RemoveMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"create",
			[ "T extends object" ],
			"Creates `CarbonLDP.Members.RemoveMemberAction` resource for the specified targetMembers.", [
				{ name: "data", type: "T & CarbonLDP.Members.BaseRemoveMemberAction", description: "Data to be used in the creation of an remove member action." },
			],
			{ type: "CarbonLDP.Members.RemoveMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends object" ],
			"Creates `CarbonLDP.Members.RemoveMemberAction` resource for the specified targetMembers.", [
				{ name: "object", type: "T & CarbonLDP.Members.BaseRemoveMemberAction", description: "Object to be converted into an remove member action." },
			],
			{ type: "CarbonLDP.Members.RemoveMemberAction" }
		), ():void => {} );

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

		// TODO: Test `is`

		// TODO: Separate in different tests
		it( "RemoveMemberAction.create", ():void => {
			expect( RemoveMemberAction.create ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.create ) ).toBe( true );

			const targetMembers:Pointer[] = [];
			targetMembers.push( Pointer.create( { id: "the-pointer/" } ) );

			const removeMemberAction:RemoveMemberAction = RemoveMemberAction.create( { targetMembers } );

			expect( TransientResource.is( removeMemberAction ) ).toBe( true );
			expect( RemoveMemberAction.is( removeMemberAction ) ).toBe( true );
			expect( removeMemberAction.targetMembers ).toEqual( targetMembers );
			expect( removeMemberAction.types ).toContain( RemoveMemberAction.TYPE );
		} );

		// TODO: Test `createFrom`

	} );

} );
