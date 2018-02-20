import {
	STATIC,

	OBLIGATORY,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Document from "./../Document";
import * as Errors from "./../Errors";
import * as NS from "../Vocabularies/index";
import * as Utils from "./../Utils";

import * as Role from "./Role";
import DefaultExport from "./Role";

describe( module( "Carbon/Auth/Role" ), ():void => {

	it( isDefined(), ():void => {
		expect( Role ).toBeDefined();
		expect( Utils.isObject( Role ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Role.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Role.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Role.SCHEMA, "name" ) ).toBe( true );
		expect( Role.SCHEMA[ "name" ] ).toEqual( {
			"@id": NS.CS.name,
			"@type": NS.XSD.string,
		} );

		expect( Utils.hasProperty( Role.SCHEMA, "description" ) ).toBe( true );
		expect( Role.SCHEMA[ "description" ] ).toEqual( {
			"@id": NS.CS.description,
			"@type": NS.XSD.string,
		} );

		expect( Utils.hasProperty( Role.SCHEMA, "parentRole" ) ).toBe( true );
		expect( Role.SCHEMA[ "parentRole" ] ).toEqual( {
			"@id": NS.CS.parentRole,
			"@type": "@id",
		} );

		expect( Utils.hasProperty( Role.SCHEMA, "childRoles" ) ).toBe( true );
		expect( Role.SCHEMA[ "childRoles" ] ).toEqual( {
			"@id": NS.CS.childRole,
			"@type": "@id",
			"@container": "@set",
		} );

		expect( Utils.hasProperty( Role.SCHEMA, "users" ) ).toBe( true );
		expect( Role.SCHEMA[ "users" ] ).toEqual( {
			"@id": NS.CS.user,
			"@type": "@id",
			"@container": "@set",
		} );
	} );

	describe( interfaze(
		"Carbon.Auth.Role.Class",
		"Specific interface that represents the base of an in-memory role for any context."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {
			let role:Role.Class = <any> {};
			let document:Document.Class;

			document = role;
			expect( document ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"A descriptive name for the role."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.Auth.Role.Factory",
		"Factory class for `Carbon.Auth.Role.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Role.Factory ).toBeDefined();
			expect( Utils.isFunction( Role.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Auth.Role.Class` object", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Role.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				description: null,
				users: null,
			};
			expect( Role.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.description;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( true );
			object.description = null;

			delete object.users;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( true );
			object.users = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.Role.Class` object", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Role.Factory.is ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( Role.Factory.is( object ) ).toBe( false );
			object = {
				name: null,
			};
			expect( Role.Factory.is( object ) ).toBe( false );

			object = Document.Factory.createFrom( object );
			expect( Role.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.Auth.Role.Class` object with the name specified.", [
				{ name: "name", type: "string", description: "The name of the role to create." },
				{ name: "description", type: "string", optional: true, description: "The optional description of the role to create." },
			],
			{ type: "Carbon.Auth.Role.Class" }
		), ():void => {
			expect( Role.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( Role.Factory, "createFrom" );

			Role.Factory.create( "Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Role name", undefined );

			Role.Factory.create( "Another Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another Role name", undefined );

			Role.Factory.create( "Another Role name", "And its description" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another Role name", "And its description" );

			Role.Factory.create( "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", undefined );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Create a `Carbon.Auth.Role.Class` object with the object provided.", [
				{ name: "object", type: "T", description: "Object where to create the new role." },
				{ name: "name", type: "string", description: "The name of the role to create." },
				{ name: "description", type: "string", optional: true, description: "The optional description of the role to create." },
			],
			{ type: "T & Carbon.Auth.Role.Class" }
		), ():void => {
			expect( Role.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.createFrom ) ).toBe( true );

			interface TheRole {
				myProperty?:string;
			}
			interface MyRole extends Role.Class, TheRole {}

			let role:MyRole;
			role = Role.Factory.createFrom<TheRole>( {}, "Role name" );
			expect( Role.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeUndefined();
			expect( role.name ).toBe( "Role name" );
			expect( role.description ).toBeUndefined();

			role = Role.Factory.createFrom<TheRole>( { myProperty: "a property" }, "Role name" );
			expect( Role.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeDefined();
			expect( role.myProperty ).toBe( "a property" );
			expect( role.name ).toBe( "Role name" );
			expect( role.description ).toBeUndefined();

			role = Role.Factory.createFrom<TheRole>( { myProperty: "a property" }, "Role name", "Description of the role" );
			expect( Role.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeDefined();
			expect( role.myProperty ).toBe( "a property" );
			expect( role.name ).toBe( "Role name" );
			expect( role.description ).toBe( "Description of the role" );

			expect( () => Role.Factory.createFrom( {}, "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Role.Factory.createFrom( {}, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Role.Factory.createFrom( {}, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.Role.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Role.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
