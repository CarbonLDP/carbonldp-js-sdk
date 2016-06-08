import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
} from "./../test/JasmineExtender";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";

import * as PersistedAgent from "./PersistedAgent";

describe( module( "Carbon/Auth/PersistedAgent" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAgent ).toBeDefined();
		expect( Utils.isObject( PersistedAgent ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.Auth.PersistedAgent.Factory",
		"Factory class for `Carbon.Auth.PersistedAgent.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedAgent.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.PersistedAgent.Class` object.", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedAgent.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				email: null,
				enabled: null,
			};
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.email;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );
			object.email = null;

			delete object.enabled;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );
			object.enabled = null;
		});

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedAgent.Class` object.", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedAgent.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.name = "PersistedAgent name";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.email = "email.of.agent@example.com";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.enabled = "myAwesomePassword";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.Factory.create( "http://example.com/resource/", null );
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.name = "PersistedAgent name";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.email = "email.of.agent@example.com";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.enabled = "myAwesomePassword";
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.Agent );
			expect( PersistedAgent.Factory.is( object ) ).toBe( true );
		});

	});

});