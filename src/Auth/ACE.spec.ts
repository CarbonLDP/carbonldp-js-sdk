import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

import * as ACE from "./ACE";

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

		expect( ACE.RDF_CLASS ).toBe( NS.CS.Class.AccessControlEntry );
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
			"@id": NS.CS.Predicate.granting,
			"@type": NS.XSD.DataType.boolean,
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "permissions" ) ).toBe( true );
		expect( ACE.SCHEMA[ "permissions" ] ).toEqual( {
			"@id": NS.CS.Predicate.permission,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "subjects" ) ).toBe( true );
		expect( ACE.SCHEMA[ "subjects" ] ).toEqual( {
			"@id": NS.CS.Predicate.subject,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( ACE.SCHEMA, "subjectsClass" ) ).toBe( true );
		expect( ACE.SCHEMA[ "subjectsClass" ] ).toEqual( {
			"@id": NS.CS.Predicate.subjectClass,
			"@type": "@id",
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
				{name: "object", type: "Object", description: "The object to evaluate its properties."},
			],
			{type: "boolean"}
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
			"Creates a `Carbon.Auth.ACE.Class` object with the parameters specified.", [
				{name: "object", type: "T extends Object", description: "The object that will be converted into a `Carbon.Auth.ACE.Class`"},
				{name: "granting", type: "boolean", description: "Indicates if the ACE is a granting or denying permissions."},
				{name: "subjects", type: "Carbon.Pointer.Class[]", description: "Subjects that will have the permissions specified."},
				{name: "subjectClass", type: "Carbon.Pointer.Class", description: "The type of the subjects provided."},
				{name: "permissions", type: "Carbon.Pointer.Class[]", description: "The permissions that will be granted or denied."},
			]
		), ():void => {
			expect( ACE.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( ACE.Factory.createFrom ) ).toBe( true );

			let object:any;
			let ace:ACE.Class;

			object = {};
			ace = ACE.Factory.createFrom( object, true, [ Pointer.Factory.create( "1" ) ], Pointer.Factory.create( "2" ), [ Pointer.Factory.create( "3" ) ] );
			expect( ACE.Factory.hasClassProperties( ace ) ).toBe( true );
			expect( ace.types ) .toContain( ACE.RDF_CLASS );
			expect( ace.granting ).toBe( true );
			expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "1" );
			expect( ace.subjectsClass.id ).toContain( "2" );
			expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "3" );
			expect( ace[ "some" ] ).toBeUndefined();

			object = {some: "some"};
			ace = ACE.Factory.createFrom( object, false, [ Pointer.Factory.create( "4" ) ], Pointer.Factory.create( "5" ), [ Pointer.Factory.create( "6" ) ] );
			expect( ACE.Factory.hasClassProperties( ace ) ).toBe( true );
			expect( ace.types ) .toContain( ACE.RDF_CLASS );
			expect( ace.granting ).toBe( false );
			expect( Pointer.Util.getIDs( ace.subjects ) ).toContain( "4" );
			expect( ace.subjectsClass.id ).toContain( "5" );
			expect( Pointer.Util.getIDs( ace.permissions ) ).toContain( "6" );
			expect( ace[ "some" ] ).toBe( "some" );
		} );

	} );

} );
