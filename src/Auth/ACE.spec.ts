import { Fragment } from "../Fragment";
import { Pointer } from "../Pointer";
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
	property,
	STATIC,
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as Utils from "./../Utils";

import { ACE } from "./ACE";
import DefaultExport from "./ACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACE ).toBeDefined();
		expect( Utils.isObject( ACE ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.ACE.ACE",
		"Interface that represents an Access Control Entry (ACE) of an Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "Carbon.Fragment.Fragment" ), ():void => {
			let ace:ACE = <any> {};
			let fragment:Fragment;

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
			let ace:ACE = <any> {};

			ace.granting = granting;
			expect( ace.granting ).toEqual( jasmine.any( Boolean ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"permissions",
			"Carbon.Pointer.Pointer[]",
			"An array with all the permissions to grant or deny."
		), ():void => {
			let permissions:Pointer[] = [ Pointer.create() ];
			let ace:ACE = <any> {};

			ace.permissions = permissions;
			expect( ace.permissions ).toEqual( jasmine.any( Array ) );
			expect( Pointer.is( ace.permissions[ 0 ] ) ).toBe( true );
		} );

		it( hasProperty(
			OBLIGATORY,
			"subjects",
			"Carbon.Pointer.Pointer[]",
			"An array with all the subjects to grant or deny its permissions."
		), ():void => {
			let subjects:Pointer[] = [ Pointer.create() ];
			let ace:ACE = <any> {};

			ace.subjects = subjects;
			expect( ace.subjects ).toEqual( jasmine.any( Array ) );
			expect( Pointer.is( ace.subjects[ 0 ] ) ).toBe( true );
		} );

		it( hasProperty(
			OBLIGATORY,
			"subjectsClass",
			"Carbon.Pointer.Pointer",
			"An pointer that contains the URI of the type that all the subject in the ace are.."
		), ():void => {
			let subjectsClass:Pointer = Pointer.create();
			let ace:ACE = <any> {};

			ace.subjectsClass = subjectsClass;
			expect( Pointer.is( ace.subjectsClass ) ).toBe( true );
		} );

	} );

	describe( interfaze(
		"Carbon.Auth.ACE.ACEConstant",
		"Interface with the factory, decorate and utils methods of a `Carbon.Auth.ACE.ACE` object"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object is considered a `Carbon.Auth.ACE.ACE` object.", [
				{ name: "object", type: "object", description: "The object to evaluate." },
			],
			{ type: "object is Carbon.Auth.ACE.ACE" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `Carbon.Auth.ACE.ACE` object with the parameters specified.", [
				{ name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions." },
				{ name: "subjects", type: "Carbon.Pointer.Pointer[]", description: "Subjects that will have the permissions specified." },
				{ name: "subjectClass", type: "Carbon.Pointer.Pointer", description: "The type of the subjects provided." },
				{ name: "permissions", type: "Carbon.Pointer.Pointer[]", description: "The permissions that will be granted or denied." },
			],
			{ type: "Carbon.Auth.ACE.ACE" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `Carbon.Auth.ACE.ACE` object with the parameters specified.", [
				{ name: "object", type: "T", description: "The object that will be converted into a `Carbon.Auth.ACE.ACE`" },
				{ name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions." },
				{ name: "subjects", type: "Carbon.Pointer.Pointer[]", description: "Subjects that will have the permissions specified." },
				{ name: "subjectClass", type: "Carbon.Pointer.Pointer", description: "The type of the subjects provided." },
				{ name: "permissions", type: "Carbon.Pointer.Pointer[]", description: "The permissions that will be granted or denied." },
			],
			{ type: "T & Carbon.Auth.ACE.ACE" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ACE",
		"Carbon.Auth.ACE.ACEConstant",
		"Constant that implements the `Carbon.Auth.ACE.ACEConstant` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ACE ).toBeDefined();
			expect( ACE ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ACE.TYPE", ():void => {
			expect( ACE.TYPE ).toBeDefined();
			expect( Utils.isString( ACE.TYPE ) ).toBe( true );

			expect( ACE.TYPE ).toBe( CS.AccessControlEntry );
		} );

		// TODO: Separate in different tests
		it( "ACE.SCHEMA", ():void => {
			expect( ACE.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ACE.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( ACE.SCHEMA, "granting" ) ).toBe( true );
			expect( ACE.SCHEMA[ "granting" ] ).toEqual( {
				"@id": CS.granting,
				"@type": XSD.boolean,
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "permissions" ) ).toBe( true );
			expect( ACE.SCHEMA[ "permissions" ] ).toEqual( {
				"@id": CS.permission,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "subjects" ) ).toBe( true );
			expect( ACE.SCHEMA[ "subjects" ] ).toEqual( {
				"@id": CS.subject,
				"@type": "@id",
				"@container": "@set",
			} );

			expect( Utils.hasProperty( ACE.SCHEMA, "subjectsClass" ) ).toBe( true );
			expect( ACE.SCHEMA[ "subjectsClass" ] ).toEqual( {
				"@id": CS.subjectClass,
				"@type": "@id",
			} );
		} );

		// TODO: Separate in different tests
		it( "ACE.is", ():void => {
			expect( ACE.is ).toBeDefined();
			expect( Utils.isFunction( ACE.is ) ).toBe( true );

			let object:any;
			expect( ACE.is( object ) ).toBe( false );

			object = Fragment.createFrom( {
				granting: null,
				permissions: null,
				subjects: null,
				subjectsClass: null,
			}, null );
			expect( ACE.is( object ) ).toBe( true );

			delete object.granting;
			expect( ACE.is( object ) ).toBe( false );
			object.granting = null;

			delete object.permissions;
			expect( ACE.is( object ) ).toBe( false );
			object.permissions = null;

			delete object.subjects;
			expect( ACE.is( object ) ).toBe( false );
			object.subjects = null;

			delete object.subjectsClass;
			expect( ACE.is( object ) ).toBe( false );
			object.subjectsClass = null;
		} );

		// TODO: Test `ACE.create`

		// TODO: Separate in different tests
		it( "ACE.createFrom", ():void => {
			expect( ACE.createFrom ).toBeDefined();
			expect( Utils.isFunction( ACE.createFrom ) ).toBe( true );

			let object:any;
			let ace:ACE;

			object = {};
			ace = ACE.createFrom( object, true, [ Pointer.create( "1" ) ], Pointer.create( "2" ), [ Pointer.create( "3" ) ] );
			expect( ace.types ).toContain( ACE.TYPE );
			expect( ace.granting ).toBe( true );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "1" );
			expect( ace.subjectsClass.id ).toContain( "2" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "3" );
			expect( ace[ "some" ] ).toBeUndefined();

			object = { some: "some" };
			ace = ACE.createFrom( object, false, [ Pointer.create( "4" ) ], Pointer.create( "5" ), [ Pointer.create( "6" ) ] );
			expect( ace.types ).toContain( ACE.TYPE );
			expect( ace.granting ).toBe( false );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "4" );
			expect( ace.subjectsClass.id ).toContain( "5" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "6" );
			expect( ace[ "some" ] ).toBe( "some" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.ACE.ACE" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let ace:ACE;

		ace = defaultExport;
		expect( ace ).toEqual( jasmine.any( Object ) );
	} );

} );
