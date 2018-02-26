import { C } from "../Vocabularies/C";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RemoveMemberAction from "./RemoveMemberAction";
import DefaultExport from "./RemoveMemberAction";

describe( module( "Carbon/LDP/RemoveMemberAction" ), ():void => {

	it( isDefined(), ():void => {
		expect( RemoveMemberAction ).toBeDefined();
		expect( Utils.isObject( RemoveMemberAction ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( RemoveMemberAction.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( RemoveMemberAction.RDF_CLASS ) ).toBe( true );

		expect( RemoveMemberAction.RDF_CLASS ).toBe( C.RemoveMemberAction );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.ObjectSchema"
	), ():void => {
		expect( RemoveMemberAction.SCHEMA ).toBeDefined();
		expect( Utils.isObject( RemoveMemberAction.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( RemoveMemberAction.SCHEMA, "targetMembers" ) ).toBe( true );
		expect( RemoveMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
			"@id": C.targetMember,
			"@container": "@set",
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.RemoveMemberAction.Class",
		"Interface that represents an object to be sent in a request that removes specific members to a container."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"Carbon.Pointer.Pointer[]",
			"Array with the members to be removed from the container."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.RemoveMemberAction.Factory",
		"Factory class for `Carbon.LDP.RemoveMemberAction.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( RemoveMemberAction.Factory ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties of a `Carbon.LDP.RemoveMemberAction.Class` object.", [
				{ name: "resource", type: "Carbon.RDF.Node.Class" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( RemoveMemberAction.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				targetMembers: null,
			};
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.targetMembers;
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( false );
			object.targetMembers = null;
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.LDP.RemoveMemberAction.Class` resource for the specified targetMembers.", [
				{ name: "targetMembers", type: "Carbon.Pointer.Pointer", description: "The target members of the remove action." },
			],
			{ type: "Carbon.LDP.RemoveMemberAction.Class" }
		), ():void => {
			expect( RemoveMemberAction.Factory.create ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory.create ) ).toBe( true );

			const pointers:Pointer[] = [];
			pointers.push( Pointer.create( "the-pointer/" ) );

			const removeMemberAction:RemoveMemberAction.Class = RemoveMemberAction.Factory.create( pointers );

			expect( Resource.is( removeMemberAction ) ).toBe( true );
			expect( RemoveMemberAction.Factory.hasClassProperties( removeMemberAction ) ).toBe( true );
			expect( removeMemberAction.targetMembers ).toEqual( pointers );
			expect( removeMemberAction.types ).toContain( RemoveMemberAction.RDF_CLASS );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.RemoveMemberAction.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:RemoveMemberAction.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
