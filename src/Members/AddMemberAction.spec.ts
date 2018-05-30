import { Pointer } from "../Pointer/index";
import { TransientResource } from "../Resource/index";
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
import { C } from "../Vocabularies/C";
import * as Utils from "../Utils";

import { AddMemberAction } from "./AddMemberAction";

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

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object is considered a `CarbonLDP.Members.AddMemberAction` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Members.AddMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"create",
			[ "T extends object" ],
			"Creates `CarbonLDP.Members.AddMemberAction` resource for the specified targetMembers.", [
				{ name: "data", type: "T & CarbonLDP.Members.BaseAddMemberAction", description: "Data to be used in the creation of an add member action." },
			],
			{ type: "CarbonLDP.Members.AddMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends object" ],
			"Creates `CarbonLDP.Members.AddMemberAction` resource for the specified targetMembers.", [
				{ name: "object", type: "T & CarbonLDP.Members.BaseAddMemberAction", description: "Object to be converted into an add member action." },
			],
			{ type: "CarbonLDP.Members.AddMemberAction" }
		), ():void => {} );

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


		// TODO: Test `is`

		// TODO: Separate in different tests
		it( "AddMemberAction.create", ():void => {
			expect( AddMemberAction.create ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.create ) ).toBe( true );

			const targetMembers:Pointer[] = [];
			targetMembers.push( Pointer.create( { id: "the-pointer/" } ) );

			const addMemberAction:AddMemberAction = AddMemberAction.create( { targetMembers } );

			expect( TransientResource.is( addMemberAction ) ).toBe( true );
			expect( AddMemberAction.is( addMemberAction ) ).toBe( true );
			expect( addMemberAction.targetMembers ).toEqual( targetMembers );
			expect( addMemberAction.types ).toContain( AddMemberAction.TYPE );
		} );

		// TODO: Test `createFrom`

	} );

} );
