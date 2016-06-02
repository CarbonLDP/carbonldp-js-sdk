import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";
import * as Errors from "./../Errors";
import * as Document from "./../Document";

import * as Role from "./Role";

describe( module( "Carbon/Auth/Role" ), ():void => {

	it( isDefined(), ():void => {
		expect( Role ).toBeDefined();
		expect( Utils.isObject( Role ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Role.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Role.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Role.SCHEMA, "name" ) ).toBe( true );
		expect( Role.SCHEMA[ "name" ] ).toEqual({
			"@id": NS.CS.Predicate.namae,
			"@type": NS.XSD.DataType.string
		});

		expect( Utils.hasProperty( Role.SCHEMA, "agents" ) ).toBe( true );
		expect( Role.SCHEMA[ "agents" ] ).toEqual({
			"@id": NS.CS.Predicate.agent,
			"@type": "@id",
			"@container": "@set",
		});
	});

	describe( clazz(
		"Carbon.Auth.Role.Factory",
		"Factory class for `Carbon.Auth.Role.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Role.Factory ).toBeDefined();
			expect( Utils.isFunction( Role.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Auth.Role.Class` object", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Role.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null
			};
			expect( Role.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( Role.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.Role.Class` object", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( Role.Factory.is ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( Role.Factory.is( object ) ).toBe( false );
			object = {
				name: null
			};
			expect( Role.Factory.is( object ) ).toBe( false );

			object = Document.Factory.createFrom( object );
			expect( Role.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.Auth.Role.Class` object with the name specified.", [
				{ name: "name", type: "string", description: "The name of the role to create." },
			],
			{ type: "Carbon.Auth.Role.Class" }
		), ():void => {
			expect( Role.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.create ) ).toBe( true );

			let spy = spyOn( Role.Factory, "createFrom" );

			Role.Factory.create( "Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Role name" );

			Role.Factory.create( "Another Role name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another Role name" );

			Role.Factory.create( "" );
			expect( spy ).toHaveBeenCalledWith( {}, "" );
		});

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.Auth.Role.Class` object with the object provided.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "T & Carbon.Auth.Role.Class" }
		), ():void => {
			expect( Role.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Role.Factory.createFrom ) ).toBe( true );

			interface TheAppRole {
				myProperty?: string;
			}
			interface MyAppRole extends Role.Class, TheAppRole {}

			let role:MyAppRole;
			role = Role.Factory.createFrom<TheAppRole>( {}, "Role name" );
			expect( Role.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeUndefined();
			expect( role.name ).toBe( "Role name");

			role = Role.Factory.createFrom<TheAppRole>( { myProperty: "a property" }, "Role name" );
			expect( Role.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeDefined();
			expect( role.myProperty ).toBe( "a property" );
			expect( role.name ).toBe( "Role name");

			expect( () => Role.Factory.createFrom( {}, "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Role.Factory.createFrom( {}, null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Role.Factory.createFrom( {}, undefined ) ).toThrowError( Errors.IllegalArgumentError );
		});

	});

});