import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasProperty,
	hasMethod,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as NS from "../Vocabularies/index";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
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

		expect( RemoveMemberAction.RDF_CLASS ).toBe( NS.C.RemoveMemberAction );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( RemoveMemberAction.SCHEMA ).toBeDefined();
		expect( Utils.isObject( RemoveMemberAction.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( RemoveMemberAction.SCHEMA, "targetMembers" ) ).toBe( true );
		expect( RemoveMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
			"@id": NS.C.targetMember,
			"@container": "@set",
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.RemoveMemberAction.Class",
		"Interface that represents an object to be sent in a request that removes specific members to a container."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"Carbon.Pointer.Class[]",
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
				{name: "resource", type: "Carbon.RDF.Node.Class"},
			],
			{type: "boolean"}
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
				{name: "targetMembers", type: "Carbon.Pointer.Class", description: "The target members of the remove action."},
			],
			{type: "Carbon.LDP.RemoveMemberAction.Class"}
		), ():void => {
			expect( RemoveMemberAction.Factory.create ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory.create ) ).toBe( true );

			const pointers:Pointer.Class[] = [];
			pointers.push( Pointer.Factory.create( "the-pointer/" ) );

			const removeMemberAction:RemoveMemberAction.Class = RemoveMemberAction.Factory.create( pointers );

			expect( Resource.Factory.is( removeMemberAction ) ).toBe( true );
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
