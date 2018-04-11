import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import * as Errors from "../Errors";
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
	OPTIONAL,
	property,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as Role from "./Role";


describe( module( "carbonldp/Auth/Role" ), ():void => {

	it( isDefined(), ():void => {
		expect( Role ).toBeDefined();
		expect( Utils.isObject( Role ) ).toBe( true );
	} );

	it( hasProperty( STATIC, "RDF_CLASS", "string" ), ():void => {
		expect( Role.RDF_CLASS ).toEqual( jasmine.any( String ) );
		expect( Role.RDF_CLASS ).toBe( CS.Role );
	} );

	describe( property( STATIC, "SCHEMA", "CarbonLDP.ObjectSchema" ), ():void => {

		it( "should exists", ():void => {
			expect( Role.SCHEMA ).toEqual( jasmine.any( Object ) );
		} );

		it( "should have cs:name property", ():void => {
			expect( Role.SCHEMA[ "name" ] ).toEqual( {
				"@id": CS.name,
				"@type": XSD.string,
			} );
		} );

		it( "should have cs:description property", ():void => {
			expect( Role.SCHEMA[ "description" ] ).toEqual( {
				"@id": CS.description,
				"@type": XSD.string,
			} );
		} );

		it( "should have cs:parent property", ():void => {
			expect( Role.SCHEMA[ "parent" ] ).toEqual( {
				"@id": CS.parent,
				"@type": "@id",
			} );
		} );

		it( "should have cs:child property", ():void => {
			expect( Role.SCHEMA[ "children" ] ).toEqual( {
				"@id": CS.child,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

		it( "should have cs:user property", ():void => {
			expect( Role.SCHEMA[ "users" ] ).toEqual( {
				"@id": CS.user,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.Role.Class",
		"Specific interface that represents the base of an in-memory role for any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document" ), ():void => {
			let role:Role.Class = <any> {};
			let document:Document;

			document = role;
			expect( document ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"A descriptive name for the role."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"description",
			"string",
			"An optional large description of the role."
		), ():void => {} );

	} );

	describe( clazz(
		"CarbonLDP.Auth.Role.Factory",
		"Factory class for `CarbonLDP.Auth.Role.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Role.Factory ).toBeDefined();
			expect( Utils.isFunction( Role.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `CarbonLDP.Auth.Role.Class` object", [
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
			"Returns true if the object provided is considered a `CarbonLDP.Auth.Role.Class` object", [
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

			object = Document.createFrom( object );
			expect( Role.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `CarbonLDP.Auth.Role.Class` object with the name specified.", [
				{ name: "name", type: "string", description: "The name of the role to create." },
				{ name: "description", type: "string", optional: true, description: "The optional description of the role to create." },
			],
			{ type: "CarbonLDP.Auth.Role.Class" }
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
			[ "T extends object" ],
			"Create a `CarbonLDP.Auth.Role.Class` object with the object provided.", [
				{ name: "object", type: "T", description: "Object where to create the new role." },
				{ name: "name", type: "string", description: "The name of the role to create." },
				{ name: "description", type: "string", optional: true, description: "The optional description of the role to create." },
			],
			{ type: "T & CarbonLDP.Auth.Role.Class" }
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

	it( hasDefaultExport( "CarbonLDP.Auth.Role.Class" ), ():void => {
		const target:Role.default = {} as Role.Class;
		expect( target ).toBeDefined();
	} );

} );
