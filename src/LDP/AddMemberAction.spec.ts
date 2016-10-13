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
import * as Document from "./../Document";
import * as Fragment from "./../Fragment";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

import * as AddMemberAction from "./AddMemberAction";
import DefaultExport from "./AddMemberAction";

describe( module( "Carbon/LDP/AddMemberAction" ), ():void => {

	it( isDefined(), ():void => {
		expect( AddMemberAction ).toBeDefined();
		expect( Utils.isObject( AddMemberAction ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( AddMemberAction.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( AddMemberAction.RDF_CLASS ) ).toBe( true );

		expect( AddMemberAction.RDF_CLASS ).toBe( NS.C.Class.AddMemberAction );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( AddMemberAction.SCHEMA ).toBeDefined();
		expect( Utils.isObject( AddMemberAction.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( AddMemberAction.SCHEMA, "targetMembers" ) ).toBe( true );
		expect( AddMemberAction.SCHEMA[ "targetMembers" ] ).toEqual( {
			"@id": NS.C.Predicate.targetMember,
			"@container": "@set",
			"@type": "@id",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.AddMemberAction.Class",
		"Interface that represents an object to be sent in a request that add members to a container."
	), ():void => {

		it( extendsClass( "Carbon.Fragment.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"targetMembers",
			"Carbon.Pointer.Class[]",
			"Array with the members to be added to the container."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.AddMemberAction.Factory",
		"Factory class for `Carbon.LDP.AddMemberAction.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AddMemberAction.Factory ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties of a `Carbon.LDP.AddMemberAction.Class` object.", [
				{ name: "resource", type: "Carbon.RDF.Node.Class" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( AddMemberAction.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( AddMemberAction.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				targetMembers: null,
			};
			expect( AddMemberAction.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.targetMembers;
			expect( AddMemberAction.Factory.hasClassProperties( object ) ).toBe( false );
			object.targetMembers = null;
		} );

		it( hasMethod(
			STATIC,
			"createDocument",
			"Creates and returns a `Carbon.Document.Class` object with a `Carbon.LDP.AddMemberAction.Class` fragment for the specified targetMembers.", [
				{ name: "targetMembers", type: "Carbon.Pointer.Class[]", description: "The target members to add in a `addMember` request." },
			],
			{ type: "Carbon.Document.Class" }
		), ():void => {
			expect( AddMemberAction.Factory.createDocument ).toBeDefined();
			expect( Utils.isFunction( AddMemberAction.Factory.createDocument ) ).toBe( true );

			let pointers:Pointer.Class[] = [];
			pointers.push( Pointer.Factory.create( "the-pointer/" ) );
			let document:Document.Class = AddMemberAction.Factory.createDocument( pointers );

			expect( Document.Factory.is( document ) ).toBe( true );

			let fragments:Fragment.Class[] = document.getFragments();
			expect( fragments.length ).toBe( 1 );

			let addMemberAction:AddMemberAction.Class = <AddMemberAction.Class> fragments[ 0 ];
			expect( AddMemberAction.Factory.hasClassProperties( addMemberAction ) ).toBe( true );
			expect( addMemberAction.targetMembers ).toEqual( pointers );
			expect( addMemberAction.types ).toContain( AddMemberAction.RDF_CLASS );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.AddMemberAction.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:AddMemberAction.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
