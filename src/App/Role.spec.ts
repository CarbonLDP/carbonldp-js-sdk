import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../test/JasmineExtender";
import * as Document from "./../Document";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as Role from "./../Auth/Role";
import * as Utils from "./../Utils";

import * as AppRole from "./Role";

describe( module( "Carbon/Apps/Role" ), ():void => {

	it( isDefined(), ():void => {
		expect( AppRole ).toBeDefined();
		expect( Utils.isObject( AppRole ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( AppRole.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( AppRole.RDF_CLASS ) ).toBe( true );

		expect( AppRole.RDF_CLASS ).toBe( NS.CS.Class.AppRole );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( AppRole.SCHEMA ).toBeDefined();
		expect( Utils.isObject( AppRole.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( AppRole.SCHEMA, "parentRole" ) ).toBe( true );
		expect( AppRole.SCHEMA[ "parentRole" ] ).toEqual({
			"@id": NS.CS.Predicate.parentRole,
			"@type": "@id",
		});

		expect( Utils.hasProperty( AppRole.SCHEMA, "childRoles" ) ).toBe( true );
		expect( AppRole.SCHEMA[ "childRoles" ] ).toEqual({
			"@id": NS.CS.Predicate.childRole,
			"@type": "@id",
			"@container": "@set",
		});

		expect( Utils.hasProperty( AppRole.SCHEMA, "agents" ) ).toBe( true );
		expect( AppRole.SCHEMA[ "agents" ] ).toEqual({
			"@id": NS.CS.Predicate.agent,
			"@type": "@id",
			"@container": "@set",
		});
	});

	describe( clazz(
		"Carbon.App.Role.Factory",
		"Factory class for `Carbon.App.Role.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AppRole.Factory ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.App.Role.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( AppRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any;

			expect( AppRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
			};
			expect( AppRole.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.App.Role.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( AppRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.is ) ).toBe( true );

			let object:any;


			object = {};
			expect( AppRole.Factory.is( object ) ).toBe( false );

			object = {
			};
			expect( AppRole.Factory.is( object ) ).toBe( false );
			object.types = [ NS.CS.Class.AppRole ];
			expect( AppRole.Factory.is( object ) ).toBe( false );

			object = Role.Factory.create( "Role name" );
			expect( AppRole.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.AppRole );
			expect( AppRole.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.App.Role.Class` object with the name and email specified.", [
				{ name: "name", type: "string" },
				{ name: "email", type: "string" }
			],
			{ type: "Carbon.App.Role.Class" }
		), ():void => {
			expect( AppRole.Factory.create ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.create ) ).toBe( true );

			let spy = spyOn( AppRole.Factory, "createFrom" );

			AppRole.Factory.create( "Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Role name" );

			AppRole.Factory.create( "Another Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another Role name" );

			AppRole.Factory.create( "" );
			expect( spy ).toHaveBeenCalledWith( {}, "" );
		});

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.App.Role.Class` object with the object provided.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "T & Carbon.App.Role.Class" }
		), ():void => {
			expect( AppRole.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.createFrom ) ).toBe( true );

			interface TheAppRole {
				myProperty?: string;
			}
			interface MyAppRole extends AppRole.Class, TheAppRole {}

			let role:MyAppRole;
			role = AppRole.Factory.createFrom<TheAppRole>( {}, "Role name" );
			expect( AppRole.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeUndefined();
			expect( role.name ).toBe( "Role name");
			expect( role.types ).toContain( NS.CS.Class.AppRole );

			role = AppRole.Factory.createFrom<TheAppRole>( { myProperty: "a property" }, "Role name" );
			expect( AppRole.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeDefined();
			expect( role.myProperty ).toBe( "a property" );
			expect( role.name ).toBe( "Role name");
			expect( role.types ).toContain( NS.CS.Class.AppRole );

			expect( () => AppRole.Factory.createFrom( {}, "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => AppRole.Factory.createFrom( {}, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => AppRole.Factory.createFrom( {}, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		});

	});

});