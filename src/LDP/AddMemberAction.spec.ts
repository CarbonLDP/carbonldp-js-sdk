import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
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

import { AddMemberAction } from "./AddMemberAction";

describe( module( "carbonldp/LDP/AddMemberAction" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.AddMemberAction",
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
		"CarbonLDP.LDP.AddMemberActionFactory",
		"Interface with the factory, decorate and utils methods of `CarbonLDP.LDP.AddMemberAction` objects"
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
			"isDecorated",
			"Returns true if the object has the properties of a `CarbonLDP.LDP.AddMemberAction` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.LDP.AddMemberAction" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates `CarbonLDP.LDP.AddMemberAction` resource for the specified targetMembers.", [
				{ name: "targetMembers", type: "CarbonLDP.Pointer[]", description: "The target members to add in a `addMember` request." },
			],
			{ type: "CarbonLDP.LDP.AddMemberAction" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"AddMemberAction",
		"CarbonLDP.LDP.AddMemberActionFactory",
		"Constant that implements the `CarbonLDP.LDP.AddMemberActionFactory` instance."
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


		// TODO: Separate in different tests
		it( "AddMemberAction.isDecorated", ():void => {
			expect( AddMemberAction.isDecorated ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.isDecorated ) ).toBe( true );

			let object:any = void 0;
			expect( AddMemberAction.isDecorated( object ) ).toBe( false );

			object = {
				targetMembers: null,
			};
			expect( AddMemberAction.isDecorated( object ) ).toBe( true );

			delete object.targetMembers;
			expect( AddMemberAction.isDecorated( object ) ).toBe( false );
			object.targetMembers = null;
		} );

		// TODO: Separate in different tests
		it( "AddMemberAction.create", ():void => {
			expect( AddMemberAction.create ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.create ) ).toBe( true );

			const pointers:Pointer[] = [];
			pointers.push( Pointer.create( "the-pointer/" ) );

			const addMemberAction:AddMemberAction = AddMemberAction.create( pointers );

			expect( TransientResource.is( addMemberAction ) ).toBe( true );
			expect( AddMemberAction.isDecorated( addMemberAction ) ).toBe( true );
			expect( addMemberAction.targetMembers ).toEqual( pointers );
			expect( addMemberAction.types ).toContain( AddMemberAction.TYPE );
		} );

	} );

} );
