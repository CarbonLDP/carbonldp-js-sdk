import { TransientFragment } from "../TransientFragment";
import { Pointer } from "../Pointer";
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
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import { TransientACE } from "./TransientACE";

describe( module( "carbonldp/Auth/TransientACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( TransientACE ).toBeDefined();
		expect( Utils.isObject( TransientACE ) ).toBe( true );
	} );

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
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Auth.TransientACE` object"
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
			"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
				{ name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions." },
				{ name: "subjects", type: "CarbonLDP.Pointer[]", description: "Subjects that will have the permissions specified." },
				{ name: "subjectClass", type: "CarbonLDP.Pointer", description: "The type of the subjects provided." },
				{ name: "permissions", type: "CarbonLDP.Pointer[]", description: "The permissions that will be granted or denied." },
			],
			{ type: "CarbonLDP.Auth.TransientACE" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.Auth.TransientACE` object with the parameters specified.", [
				{ name: "object", type: "T", description: "The object that will be converted into a `CarbonLDP.Auth.TransientACE`" },
				{ name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions." },
				{ name: "subjects", type: "CarbonLDP.Pointer[]", description: "Subjects that will have the permissions specified." },
				{ name: "subjectClass", type: "CarbonLDP.Pointer", description: "The type of the subjects provided." },
				{ name: "permissions", type: "CarbonLDP.Pointer[]", description: "The permissions that will be granted or denied." },
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
		it( "TransientACE.SCHEMA", ():void => {
			expect( TransientACE.SCHEMA ).toBeDefined();
			expect( Utils.isObject( TransientACE.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( TransientACE.SCHEMA, "granting" ) ).toBe( true );
			expect( TransientACE.SCHEMA[ "granting" ] ).toEqual( {
				"@id": CS.granting,
				"@type": XSD.boolean,
			} );

			expect( Utils.hasProperty( TransientACE.SCHEMA, "permissions" ) ).toBe( true );
			expect( TransientACE.SCHEMA[ "permissions" ] ).toEqual( {
				"@id": CS.permission,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( TransientACE.SCHEMA, "subjects" ) ).toBe( true );
			expect( TransientACE.SCHEMA[ "subjects" ] ).toEqual( {
				"@id": CS.subject,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( TransientACE.SCHEMA, "subjectsClass" ) ).toBe( true );
			expect( TransientACE.SCHEMA[ "subjectsClass" ] ).toEqual( {
				"@id": CS.subjectClass,
				"@type": "@id",
			} );
		} );

		// TODO: Separate in different tests
		it( "TransientACE.is", ():void => {
			expect( TransientACE.is ).toBeDefined();
			expect( Utils.isFunction( TransientACE.is ) ).toBe( true );

			let object:any;
			expect( TransientACE.is( object ) ).toBe( false );

			object = TransientFragment.createFrom( {
				granting: null,
				permissions: null,
				subjects: null,
				subjectsClass: null,
			}, null );
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

			object = {};
			ace = TransientACE.createFrom( object, true, [ Pointer.create( "1" ) ], Pointer.create( "2" ), [ Pointer.create( "3" ) ] );
			expect( ace.types ).toContain( TransientACE.TYPE );
			expect( ace.granting ).toBe( true );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "1" );
			expect( ace.subjectsClass.id ).toContain( "2" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "3" );
			expect( ace[ "some" ] ).toBeUndefined();

			object = { some: "some" };
			ace = TransientACE.createFrom( object, false, [ Pointer.create( "4" ) ], Pointer.create( "5" ), [ Pointer.create( "6" ) ] );
			expect( ace.types ).toContain( TransientACE.TYPE );
			expect( ace.granting ).toBe( false );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "4" );
			expect( ace.subjectsClass.id ).toContain( "5" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "6" );
			expect( ace[ "some" ] ).toBe( "some" );
		} );

	} );

} );
