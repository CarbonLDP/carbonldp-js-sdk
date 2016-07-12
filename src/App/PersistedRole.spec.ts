import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import AppContext from "./Context";
import * as AppRole from "./Role";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as PersistedAuthRole from "./../Auth/PersistedRole";
import * as Roles from "./Roles";
import * as Utils from "./../Utils";

import * as PersistedAppRole from "./PersistedRole";

describe( module( "Carbon/App/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAppRole ).toBeDefined();
		expect( Utils.isObject( PersistedAppRole ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.App.PersistedRole.Factory",
		"Factory class for `Carbon.App.PersistedRole.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedAppRole.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.App.PersistedRole.Class` object", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedAppRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any;

			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_roles: null,
				parentRole: null,
				childRoles: null,
			};
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._roles;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( false );
			object._roles = null;

			delete object.parentRole;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.parentRole = null;

			delete object.childRoles;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.childRoles = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.App.PersistedRole.Class` object", [
				{name: "object", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedAppRole.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.is ) ).toBe( true );

			let object:any;


			object = {};
			expect( PersistedAppRole.Factory.is( object ) ).toBe( false );

			object = {
				_roles: null,
				name: null,
				parentRole: null,
				childRoles: null,
				agents: null,
			};
			expect( PersistedAppRole.Factory.is( object ) ).toBe( false );
			object.types = [ NS.CS.Class.AppRole ];
			expect( PersistedAppRole.Factory.is( object ) ).toBe( false );

			object = AppRole.Factory.createFrom( object, "Role name" );
			expect( PersistedAppRole.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the methods and properties of a `Carbon.App.PersistedRole.Class` object.", [
				{name: "object", type: "T extends Object"}
			],
			{type: "T & Carbon.App.PersistedRole.Class"}
		), ():void => {
			expect( PersistedAppRole.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.decorate ) ).toBe( true );

			class MockedContext extends AbstractContext {
				resolve( uri:string ) {
					return uri;
				}
			}
			let parentContext:AbstractContext = new MockedContext();
			let appContext:AppContext = new AppContext( parentContext, <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/"
				}
			} );

			interface ThePersistedAppRole {
				myProperty?:string;
			}
			interface MyPersistedAppRole extends PersistedAppRole.Class, ThePersistedAppRole {}

			let spyDecorate = spyOn( PersistedAuthRole.Factory, "decorate" ).and.callThrough();

			let object:Object = { name: "Role name" };
			let role:MyPersistedAppRole;
			role = PersistedAppRole.Factory.decorate<ThePersistedAppRole>( object, appContext.auth.roles );

			expect( PersistedAppRole.Factory.hasClassProperties( role ) ).toBe( true );
			expect( spyDecorate ).toHaveBeenCalledWith( object, appContext.auth.roles );
		});

	} );

} );