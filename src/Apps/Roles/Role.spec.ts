import * as AppRole from "./Role";

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../../test/JasmineExtender";
import * as Utils from "./../../Utils";
import * as NS from "./../../NS";
import * as Errors from "./../../Errors";
import * as Document from "./../../Document";

describe( module( "Carbon/Apps/Roles/Role" ), ():void => {

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

		expect( Utils.hasProperty( AppRole.SCHEMA, "name" ) ).toBe( true );
		expect( AppRole.SCHEMA[ "name" ] ).toEqual({
			"@id": NS.CS.Predicate.name,
			"@type": NS.XSD.DataType.string
		});
	});

	describe( clazz(
		"Carbon.Roles.AppRole.Factory",
		"Factory class for `Carbon.Roles.AppRole.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AppRole.Factory ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Roles.AppRole.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( AppRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any = {};
			expect( AppRole.Factory.hasClassProperties( object ) ).toBe( false );
			
			object.name = "Role name";
			expect( AppRole.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.Roles.AppRole.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( AppRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( AppRole.Factory.is( object ) ).toBe( false );
			object.name = "Role name";
			expect( AppRole.Factory.is( object ) ).toBe( false );

			object = Document.Factory.create();
			expect( AppRole.Factory.is( object ) ).toBe( false );
			object.name = "Role name";
			object.types.push( NS.CS.Class.AppRole );
			expect( AppRole.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.Roles.AppRole.Class` object with the name and email specified.", [
				{ name: "name", type: "string" },
				{ name: "email", type: "string" }
			],
			{ type: "Carbon.Roles.AppRole.Class" }
		), ():void => {
			expect( AppRole.Factory.create ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.create ) ).toBe( true );

			let spy = spyOn( AppRole.Factory, 'createFrom');

			AppRole.Factory.create( 'Role name' );
			expect( spy ).toHaveBeenCalledWith( {}, 'Role name' );

			AppRole.Factory.create( 'Another Role name' );
			expect( spy ).toHaveBeenCalledWith( {}, 'Another Role name' );

			AppRole.Factory.create( '' );
			expect( spy ).toHaveBeenCalledWith( {}, '' );
		});

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.Roles.AppRole.Class` object with the object provided.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "T & Carbon.Roles.AppRole.Class" }
		), ():void => {
			expect( AppRole.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( AppRole.Factory.createFrom ) ).toBe( true );

			interface TheAppRole {
				myProperty?: string;
			}
			interface MyAppRole extends AppRole.Class, TheAppRole {}

			let role:MyAppRole;
			role = AppRole.Factory.createFrom<TheAppRole>( {}, 'Role name' );
			expect( AppRole.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeUndefined();
			expect( role.name ).toBe( 'Role name');
			expect( role.types ).toContain( NS.CS.Class.AppRole );

			role = AppRole.Factory.createFrom<TheAppRole>( { myProperty: "a property" }, 'Role name' );
			expect( AppRole.Factory.is( role ) ).toBe( true );
			expect( role.myProperty ).toBeDefined();
			expect( role.myProperty ).toBe( 'a property' );
			expect( role.name ).toBe( 'Role name');
			expect( role.types ).toContain( NS.CS.Class.AppRole );

			expect( () => AppRole.Factory.createFrom( {}, '' ) ).toThrowError( Errors.IllegalArgumentError );
		});

	});

});