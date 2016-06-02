import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../test/JasmineExtender";
import * as Role from "./Role";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as PersistedRole from "./PersistedRole";

describe( module( "Carbon/Auth/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRole ).toBeDefined();
		expect( Utils.isObject( PersistedRole ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Auth.PersistedRole.Factory",
		"Factory class for `Carbon.Auth.PersistedRole.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedRole.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Auth.PersistedRole.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any;

			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				agents: null,
			};
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.agents;
			expect( PersistedRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.agents = null;
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedRole.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.is ) ).toBe( true );

			let object:any;


			object = {};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = {
				name: null,
				agents: null,
			};
			expect( PersistedRole.Factory.is( object ) ).toBe( false );

			object = Role.Factory.createFrom( object,  "Role name" );
			expect( PersistedRole.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the methods and properties of a `Carbon.Auth.PersistedRole.Class` object.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "T & Carbon.Auth.PersistedRole.Class" }
		), ():void => {
			expect( PersistedRole.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedRole.Factory.decorate ) ).toBe( true );

			interface ThePersistedRole {
				myProperty?: string;
			}
			interface MyPersistedRole extends PersistedRole.Class, ThePersistedRole {}

			let object:Object = {};
			let role:MyPersistedRole;
			role = PersistedRole.Factory.decorate<ThePersistedRole>( object );
		});

	});

});