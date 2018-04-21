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
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";

import { RemoveMemberAction } from "./RemoveMemberAction";

describe( module( "carbonldp/LDP/RemoveMemberAction" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.RemoveMemberAction",
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
		"CarbonLDP.LDP.RemoveMemberActionFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.RemoveMemberAction`"
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
			"isDecorated",
			"Returns true if the object has the properties of a `CarbonLDP.LDP.RemoveMemberAction` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.LDP.RemoveMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `CarbonLDP.LDP.RemoveMemberAction` resource for the specified targetMembers.", [
				{ name: "targetMembers", type: "CarbonLDP.Pointer", description: "The target members of the remove action." },
			],
			{ type: "CarbonLDP.LDP.RemoveMemberAction" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"RemoveMemberAction",
		"CarbonLDP.LDP.RemoveMemberActionFactory",
		"Constant that implements the `CarbonLDP.LDP.RemoveMemberActionFactory` interface."
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

		// TODO: Separate in different tests
		it( "RemoveMemberAction.isDecorated", ():void => {
			expect( RemoveMemberAction.isDecorated ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.isDecorated ) ).toBe( true );

			let object:any = void 0;
			expect( RemoveMemberAction.isDecorated( object ) ).toBe( false );

			object = {
				targetMembers: null,
			};
			expect( RemoveMemberAction.isDecorated( object ) ).toBe( true );

			delete object.targetMembers;
			expect( RemoveMemberAction.isDecorated( object ) ).toBe( false );
			object.targetMembers = null;
		} );

		// TODO: Separate in different tests
		it( "RemoveMemberAction.create", ():void => {
			expect( RemoveMemberAction.create ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.create ) ).toBe( true );

			const pointers:Pointer[] = [];
			pointers.push( Pointer.create( { id: "the-pointer/" } ) );

			const removeMemberAction:RemoveMemberAction = RemoveMemberAction.create( pointers );

			expect( TransientResource.is( removeMemberAction ) ).toBe( true );
			expect( RemoveMemberAction.isDecorated( removeMemberAction ) ).toBe( true );
			expect( removeMemberAction.targetMembers ).toEqual( pointers );
			expect( removeMemberAction.types ).toContain( RemoveMemberAction.TYPE );
		} );

	} );

} );
