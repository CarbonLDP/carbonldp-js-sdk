import { anyThatMatches } from "../../test/helpers/jasmine-equalities";
import { createMockRole } from "../../test/helpers/mocks";

import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";

import {
	Role,
	RoleBase,
	RoleFactory,
} from "./Role";


describe( module( "carbonldp/Auth/Role" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.Role",
		"Specific interface that represents the base of an in-memory role for any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document" ), ():void => {
			let role:Role = <any> {};
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

	describe( interfaze(
		"CarbonLDP.Auth.RolesFactory",
		"Interface with the factory and utils for `CarbonLDP.Auth.Role` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.Role"
		), ():void => {
			const target:RoleFactory[ "TYPE" ] = "" as CS[ "Role" ];
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {
			const target:RoleFactory[ "SCHEMA" ] = {} as ObjectSchema;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.Auth.Role` object",
			[
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Auth.Role" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `CarbonLDP.Auth.Role` object with the properties from the data provided.", [
				{ name: "data", type: "CarbonLDP.Auth.RoleBase", description: "Object with the base data to create a role document." },
			],
			{ type: "CarbonLDP.Auth.Role" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends CarbonLDP.Auth.RoleBase" ],
			"Create a `CarbonLDP.Auth.Role` object with the base object provided.", [
				{ name: "object", type: "T", description: "Object where to create the new role with the base data of the role." },
			],
			{ type: "T & CarbonLDP.Auth.Role" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Role",
		"CarbonLDP.Auth.RoleFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( Role ).toBeDefined();
			expect( Role ).toEqual( jasmine.any( Object ) );
		} );


		describe( "Role.TYPE", ():void => {

			it( "should exists", ():void => {
				expect( Role.TYPE ).toBeDefined();
				expect( Role.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be cs:Role", ():void => {
				expect( Role.TYPE ).toBe( CS.Role );
			} );

		} );

		describe( "Role.SCHEMA", ():void => {

			it( "should exists", ():void => {
				expect( Role.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );

			it( "should have the Role & PersistedRole properties", ():void => {
				expect( Role.SCHEMA as {} ).toEqual( {
					"name": jasmine.any( Object ),
					"description": jasmine.any( Object ),
					"parent": jasmine.any( Object ),
					"children": jasmine.any( Object ),
					"users": jasmine.any( Object ),
				} );
			} );

			it( "should have cs:name", ():void => {
				expect( Role.SCHEMA[ "name" ] ).toEqual( {
					"@id": CS.name,
					"@type": XSD.string,
				} );
			} );

			it( "should have cs:description", ():void => {
				expect( Role.SCHEMA[ "description" ] ).toEqual( {
					"@id": CS.description,
					"@type": XSD.string,
				} );
			} );

			it( "should have cs:parent", ():void => {
				expect( Role.SCHEMA[ "parent" ] ).toEqual( {
					"@id": CS.parent,
					"@type": "@id",
				} );
			} );

			it( "should have cs:child", ():void => {
				expect( Role.SCHEMA[ "children" ] ).toEqual( {
					"@id": CS.child,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

			it( "should have cs:user", ():void => {
				expect( Role.SCHEMA[ "users" ] ).toEqual( {
					"@id": CS.user,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );


		describe( "Role.is", ():void => {

			it( "should exists", ():void => {
				expect( Role.is ).toBeDefined();
				expect( Role.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call Document.is", ():void => {
				const spy:jasmine.Spy = spyOn( Document, "is" )
					.and.returnValue( false );

				Role.is( { the: "role" } );

				expect( spy ).toHaveBeenCalledWith( { the: "role" } );
			} );

			it( "should return true when Document with Roles properties", ():void => {
				const role:Role = createMockRole();

				const returned:boolean = Role.is( role );
				expect( returned ).toBe( true );
			} );

			it( "should return false when NO name", ():void => {
				const role:Role = createMockRole();
				delete role.name;

				const returned:boolean = Role.is( role );
				expect( returned ).toBe( false );
			} );

			it( "should return true when NO description", ():void => {
				const role:Role = createMockRole();
				delete role.description;

				const returned:boolean = Role.is( role );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "Role.create", ():void => {

			it( "should exists", ():void => {
				expect( Role.create ).toBeDefined();
				expect( Role.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call Role.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( Role, "createFrom" );

				Role.create( { name: "Role name" } );
				expect( spy ).toHaveBeenCalledWith( { name: "Role name" } );
			} );

			it( "should return another reference for the role document", ():void => {
				const data:RoleBase = { name: "Role name" };
				const returned:Role = Role.create( data );

				expect( data ).not.toBe( returned );
			} );

		} );

		describe( "Role.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( Role.createFrom ).toBeDefined();
				expect( Role.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should add cs:Role", ():void => {
				const role:Role = Role.createFrom( { name: "Role name" } );

				expect( role.types ).toContain( CS.Role );
			} );

			it( "should return a Document", ():void => {
				const role:Role = Role.createFrom( { name: "Role name" } );

				expect( role ).toEqual( anyThatMatches( Document.is, "Document" ) as any );
			} );

			it( "should return the same reference", ():void => {
				const object:RoleBase = { name: "Role name" };
				const role:Role = Role.createFrom( object );

				expect( object ).toBe( role );
			} );

		} );

	} );

} );
