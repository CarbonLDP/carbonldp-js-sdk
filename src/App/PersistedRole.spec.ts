import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import AppContext from "./Context";
import Documents from "./../Documents";
import * as NS from "./../NS";
import * as PersistedAuthRole from "./../Auth/PersistedRole";
import * as PersistedDocument from "./../PersistedDocument";
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
				{name: "resource", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedAppRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
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
				{name: "object", type: "Object"},
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
				types: [ NS.CS.Class.AppRole ],
			};
			expect( PersistedAppRole.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.Factory.createFrom( object, "", new Documents() );
			expect( PersistedAppRole.Factory.is( object ) ).toBe( false );

			object = PersistedAuthRole.Factory.decorate( object, null );
			expect( PersistedAppRole.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.PersistedDocument.Class" ],
			"Decorates the object provided with the methods and properties of a `Carbon.App.PersistedRole.Class` object.", [
				{name: "object", type: "T"},
			],
			{type: "T & Carbon.App.PersistedRole.Class"}
		), ():void => {
			expect( PersistedAppRole.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.decorate ) ).toBe( true );

			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let parentContext:AbstractContext = new MockedContext();
			let appContext:AppContext = new AppContext( parentContext, <any> {
				rootContainer: {
					id: "http://example.com/apps/example-app/",
				},
			} );

			interface ThePersistedAppRole {
				myProperty?:string;
			}
			interface MyPersistedAppRole extends PersistedAppRole.Class, ThePersistedAppRole {}

			let spyDecorate:jasmine.Spy = spyOn( PersistedAuthRole.Factory, "decorate" ).and.callThrough();

			let object:PersistedDocument.Class = PersistedDocument.Factory.createFrom( {name: "Role name"}, "", new Documents() );
			let role:MyPersistedAppRole = PersistedAppRole.Factory.decorate( object, appContext.auth.roles );

			expect( PersistedAppRole.Factory.hasClassProperties( role ) ).toBe( true );
			expect( spyDecorate ).toHaveBeenCalledWith( object, appContext.auth.roles );
		} );

	} );

} );
