import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty,
	hasMethod
} from "./../test/JasmineExtender";
import * as RemoveMemberAction from "./RemoveMemberAction";
import * as Document from "./../Document";
import * as Fragment from "./../Fragment";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

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

		expect( RemoveMemberAction.RDF_CLASS ).toBe( NS.C.Class.RemoveMemberAction );
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
			"@id": NS.C.Predicate.targetMember,
			"@container": "@set",
			"@type": "@id"
		} );

	} );

	describe( clazz(
		"Carbon.LDP.RemoveMemberAction.Factory",
		"Factory class for LDP RemoveMemberAction objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RemoveMemberAction.Factory ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties to be defined as a LDP RemoveMemberAction", [
				{name: "resource", type: "Carbon.RDF.Node.Class"}
			],
			{type: "boolean"}
		), ():void => {
			expect( RemoveMemberAction.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				targetMembers: null
			};
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.targetMembers;
			expect( RemoveMemberAction.Factory.hasClassProperties( object ) ).toBe( false );
			object.targetMembers = null;
		} );

		it( hasMethod(
			STATIC,
			"createDocument",
			"Create and returns a `Carbon.Document.Class` object with a RemoveMemberAction fragment for the specified targetMembers.", [
				{name: "targetMembers", type: "Carbon.Pointer.Class", description: "The target members of the remove action."}
			],
			{type: "Carbon.Document.Class"}
		), ():void => {
			expect( RemoveMemberAction.Factory.createDocument ).toBeDefined();
			expect( Utils.isFunction( RemoveMemberAction.Factory.createDocument ) ).toBe( true );

			let pointers:Pointer.Class[] = [];
			pointers.push( Pointer.Factory.create( "the-pointer/" ) );
			let document:Document.Class = RemoveMemberAction.Factory.createDocument( pointers );

			expect( Document.Factory.is( document ) ).toBe( true );

			let fragments:Fragment.Class[] = document.getFragments();
			expect( fragments.length ).toBe( 1 );

			let addMemberAction:RemoveMemberAction.Class = <RemoveMemberAction.Class> fragments[ 0 ];
			expect( RemoveMemberAction.Factory.hasClassProperties( addMemberAction ) ).toBe( true );
			expect( addMemberAction.targetMembers ).toEqual( pointers );
			expect( addMemberAction.types ).toContain( RemoveMemberAction.RDF_CLASS );
		} );

	} );

} );