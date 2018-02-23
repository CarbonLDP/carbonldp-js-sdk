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
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

import * as Fragment from "./../Fragment";
import { Pointer } from "./../Pointer";
import * as Utils from "./../Utils";

import * as ACE from "./ACE";
import DefaultExport from "./ACE";

describe( module( "Carbon/Auth/ACE" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACE ).toBeDefined();
		expect( Utils.isObject( ACE ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_Class",
		"string"
	), ():void => {
		expect( ACE.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ACE.RDF_CLASS ) ).toBe( true );

		expect( ACE.RDF_CLASS ).toBe( CS.AccessControlEntry );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.Auth.ACE.Class",
		"Interface that represents an Access Control Entry (ACE) of an Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "Carbon.Fragment.Class" ), ():void => {
			let ace:ACE.Class = <any> {};
			let fragment:Fragment.Class;

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
			let ace:ACE.Class = <any> {};

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
			let ace:ACE.Class = <any> {};

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
			let ace:ACE.Class = <any> {};

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
			let ace:ACE.Class = <any> {};

			ace.subjectsClass = subjectsClass;
			expect( Pointer.is( ace.subjectsClass ) ).toBe( true );
		} );

	} );

	describe( clazz(
		"Carbon.Auth.ACE.Factory",
		"Factory class for `Carbon.Auth.ACE.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ACE.Factory ).toBeDefined();
			expect( Utils.isFunction( ACE.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.ACE.Class` object.", [
				{ name: "object", type: "Object", description: "The object to evaluate its properties." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ACE.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ACE.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				granting: null,
				permissions: null,
				subjects: null,
				subjectsClass: null,
			};
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.granting;
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( false );
			object.granting = null;

			delete object.permissions;
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( false );
			object.permissions = null;

			delete object.subjects;
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( false );
			object.subjects = null;

			delete object.subjectsClass;
			expect( ACE.Factory.hasClassProperties( object ) ).toBe( false );
			object.subjectsClass = null;
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a `Carbon.Auth.ACE.Class` object with the parameters specified.", [
				{ name: "object", type: "T", description: "The object that will be converted into a `Carbon.Auth.ACE.Class`" },
				{ name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions." },
				{ name: "subjects", type: "Carbon.Pointer.Pointer[]", description: "Subjects that will have the permissions specified." },
				{ name: "subjectClass", type: "Carbon.Pointer.Pointer", description: "The type of the subjects provided." },
				{ name: "permissions", type: "Carbon.Pointer.Pointer[]", description: "The permissions that will be granted or denied." },
			],
			{ type: "T & Carbon.Auth.ACE.Class" }
		), ():void => {
			expect( ACE.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( ACE.Factory.createFrom ) ).toBe( true );

			let object:any;
			let ace:ACE.Class;

			object = {};
			ace = ACE.Factory.createFrom( object, true, [ Pointer.create( "1" ) ], Pointer.create( "2" ), [ Pointer.create( "3" ) ] );
			expect( ACE.Factory.hasClassProperties( ace ) ).toBe( true );
			expect( ace.types ).toContain( ACE.RDF_CLASS );
			expect( ace.granting ).toBe( true );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "1" );
			expect( ace.subjectsClass.id ).toContain( "2" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "3" );
			expect( ace[ "some" ] ).toBeUndefined();

			object = { some: "some" };
			ace = ACE.Factory.createFrom( object, false, [ Pointer.create( "4" ) ], Pointer.create( "5" ), [ Pointer.create( "6" ) ] );
			expect( ACE.Factory.hasClassProperties( ace ) ).toBe( true );
			expect( ace.types ).toContain( ACE.RDF_CLASS );
			expect( ace.granting ).toBe( false );
			expect( Pointer.getIDs( ace.subjects ) ).toContain( "4" );
			expect( ace.subjectsClass.id ).toContain( "5" );
			expect( Pointer.getIDs( ace.permissions ) ).toContain( "6" );
			expect( ace[ "some" ] ).toBe( "some" );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.ACE.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let ace:ACE.Class;

		ace = defaultExport;
		expect( ace ).toEqual( jasmine.any( Object ) );
	} );

} );
