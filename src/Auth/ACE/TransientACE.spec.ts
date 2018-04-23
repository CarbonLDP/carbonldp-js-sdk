import { TransientFragment } from "../../Fragment";
import { Pointer } from "../../Pointer";
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
} from "../../test/JasmineExtender";
import * as Utils from "../../Utils";
import { CS } from "../../Vocabularies";

import { TransientACE } from "./TransientACE";

describe( module( "carbonldp/Auth/ACE" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.TransientACE",
		"Interface that represents an Access Control Entry (ACE) of an Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {
			let ace:TransientACE = <any> {};
			let fragment:TransientFragment;

			fragment = ace;
			expect( fragment ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"granting",
			"boolean",
			"Flag that indicates if the entry grants or denies the permissions its permissions."
		), ():void => {
			let granting:boolean = true;
			let ace:TransientACE = <any> {};

			ace.granting = granting;
			expect( ace.granting ).toEqual( jasmine.any( Boolean ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"permissions",
			"CarbonLDP.Pointer[]",
			"An array with all the permissions to grant or deny."
		), ():void => {
			let permissions:Pointer[] = [ Pointer.create() ];
			let ace:TransientACE = <any> {};

			ace.permissions = permissions;
			expect( ace.permissions ).toEqual( jasmine.any( Array ) );
			expect( Pointer.is( ace.permissions[ 0 ] ) ).toBe( true );
		} );

		it( hasProperty(
			OBLIGATORY,
			"subjects",
			"CarbonLDP.Pointer[]",
			"An array with all the subjects to grant or deny its permissions."
		), ():void => {
			let subjects:Pointer[] = [ Pointer.create() ];
			let ace:TransientACE = <any> {};

			ace.subjects = subjects;
			expect( ace.subjects ).toEqual( jasmine.any( Array ) );
			expect( Pointer.is( ace.subjects[ 0 ] ) ).toBe( true );
		} );

		it( hasProperty(
			OBLIGATORY,
			"subjectsClass",
			"CarbonLDP.Pointer",
			"An pointer that contains the URI of the type that all the subject in the ace are.."
		), ():void => {
			let subjectsClass:Pointer = Pointer.create();
			let ace:TransientACE = <any> {};

			ace.subjectsClass = subjectsClass;
			expect( Pointer.is( ace.subjectsClass ) ).toBe( true );
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.TransientACEFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.Auth.TransientACE` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.AccessControlEntry"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is considered a `CarbonLDP.Auth.TransientACE` object.", [
				{ name: "object", type: "object", description: "The object to evaluate." },
			],
			{ type: "object is CarbonLDP.Auth.TransientACE" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
				{ name: "data", type: "T & CarbonLDP.Auth.BaseACE", description: "Data for creation an access control entry." },
			],
			{ type: "CarbonLDP.Auth.TransientACE" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
				{ name: "object", type: "T & CarbonLDP.Auth.BaseACE", description: "The object that will be converted into a `CarbonLDP.Auth.TransientACE`" },
			],
			{ type: "T & CarbonLDP.Auth.TransientACE" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientACE",
		"CarbonLDP.Auth.TransientACEFactory",
		"Constant that implements the `CarbonLDP.Auth.TransientACEFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientACE ).toBeDefined();
			expect( TransientACE ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "TransientACE.TYPE", ():void => {
			expect( TransientACE.TYPE ).toBeDefined();
			expect( Utils.isString( TransientACE.TYPE ) ).toBe( true );

			expect( TransientACE.TYPE ).toBe( CS.AccessControlEntry );
		} );

		// TODO: Separate in different tests
		it( "TransientACE.is", ():void => {
			expect( TransientACE.is ).toBeDefined();
			expect( Utils.isFunction( TransientACE.is ) ).toBe( true );

			let object:any;
			expect( TransientACE.is( object ) ).toBe( false );

			object = TransientFragment.createFrom( {
				_document: null,
				granting: null,
				permissions: null,
				subjects: null,
				subjectsClass: null,
			} );
			expect( TransientACE.is( object ) ).toBe( true );

			delete object.granting;
			expect( TransientACE.is( object ) ).toBe( false );
			object.granting = null;

			delete object.permissions;
			expect( TransientACE.is( object ) ).toBe( false );
			object.permissions = null;

			delete object.subjects;
			expect( TransientACE.is( object ) ).toBe( false );
			object.subjects = null;

			delete object.subjectsClass;
			expect( TransientACE.is( object ) ).toBe( false );
			object.subjectsClass = null;
		} );

		// TODO: Test `ACE.create`

		// TODO: Separate in different tests
		it( "TransientACE.createFrom", ():void => {
			expect( TransientACE.createFrom ).toBeDefined();
			expect( Utils.isFunction( TransientACE.createFrom ) ).toBe( true );

			let object:any;
			let ace:TransientACE;

			ace = TransientACE.createFrom( {
				granting: true,
				permissions: [ Pointer.create( { id: "3" } ) ],
				subjects: [ Pointer.create( { id: "1" } ) ],
				subjectsClass: Pointer.create( { id: "2" } ),
			} );
			expect( ace.types ).toContain( TransientACE.TYPE );
			expect( ace.granting ).toBe( true );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "1" );
			expect( ace.subjectsClass.id ).toContain( "2" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "3" );
			expect( ace[ "some" ] ).toBeUndefined();

			ace = TransientACE.createFrom( {
				some: "some",
				granting: false,
				permissions: [ Pointer.create( { id: "6" } ) ],
				subjects: [ Pointer.create( { id: "4" } ) ],
				subjectsClass: Pointer.create( { id: "5" } ),
			} );
			expect( ace.types ).toContain( TransientACE.TYPE );
			expect( ace.granting ).toBe( false );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "4" );
			expect( ace.subjectsClass.id ).toContain( "5" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "6" );
			expect( ace[ "some" ] ).toBe( "some" );
		} );

	} );

} );
