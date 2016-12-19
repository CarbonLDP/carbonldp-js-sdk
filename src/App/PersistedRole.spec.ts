import {
	STATIC,

	OPTIONAL,
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
import AbstractContext from "../AbstractContext";
import AppContext from "./Context";
import Documents from "./../Documents";
import * as NS from "./../NS";
import * as PersistedAuthRole from "./../Auth/PersistedRole";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
import * as Utils from "./../Utils";

import * as PersistedAppRole from "./PersistedRole";
import DefaultExport from "./PersistedRole";

describe( module( "Carbon/App/PersistedRole" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAppRole ).toBeDefined();
		expect( Utils.isObject( PersistedAppRole ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.App.PersistedRole.Class",
		"Specific interface that represents a persisted role of an application."
	), ():void => {

		it( extendsClass( "Carbon.Auth.PersistedRole.Class" ), ():void => {
			let persistedAppRole:PersistedAppRole.Class = <any> {};
			let persistedAuthRole:PersistedAuthRole.Class;

			persistedAuthRole = persistedAppRole;
			expect( persistedAuthRole ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"_roles",
			"Carbon.App.Roles.Class",
			"(Internal) Instance of the AppRoles class that manage the current role."
		), ():void => {
			let persistedRole:PersistedAppRole.Class = <any> {};

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

			persistedRole._roles = new Roles.Class( appContext );
			expect( persistedRole._roles ).toEqual( jasmine.any( Roles.Class ) );
		} );

		it( hasProperty(
			OPTIONAL,
			"parentRole",
			"Carbon.Pointer.Class",
			"Reference to the parent of the current role."
		), ():void => {
			let parent:Pointer.Class = Pointer.Factory.create();
			let persistedRole:PersistedAppRole.Class = <any> {};

			persistedRole.parentRole = parent;
			expect( Pointer.Factory.is( persistedRole.parentRole ) ).toBe( true );
		} );

		it( hasProperty(
			OPTIONAL,
			"childrenRoles",
			"Carbon.Pointer.Class[]",
			"An array of pointer that references to all the children of the current role."
		), ():void => {
			let children:Pointer.Class[] = [ Pointer.Factory.create() ];
			let persistedRole:PersistedAppRole.Class = <any> {};

			persistedRole.childrenRoles = children;
			expect( persistedRole.childrenRoles ).toEqual( jasmine.any( Array ) );
			expect( Pointer.Factory.is( persistedRole.childrenRoles[ 0 ] ) ).toBe( true );
		} );

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
				{ name: "resource", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedAppRole.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedAppRole.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				_roles: null,
				parentRole: null,
				childrenRoles: null,
			};
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );

			delete object._roles;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( false );
			object._roles = null;

			delete object.parentRole;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.parentRole = null;

			delete object.childrenRoles;
			expect( PersistedAppRole.Factory.hasClassProperties( object ) ).toBe( true );
			object.childrenRoles = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.App.PersistedRole.Class` object", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
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
				childrenRoles: null,
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
				{ name: "object", type: "T" },
			],
			{ type: "T & Carbon.App.PersistedRole.Class" }
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

			let object:PersistedDocument.Class = PersistedDocument.Factory.createFrom( { name: "Role name" }, "", new Documents() );
			let role:MyPersistedAppRole = PersistedAppRole.Factory.decorate( object, appContext.auth.roles );

			expect( PersistedAppRole.Factory.hasClassProperties( role ) ).toBe( true );
			expect( spyDecorate ).toHaveBeenCalledWith( object, appContext.auth.roles );
		} );

	} );

	it( hasDefaultExport( "Carbon.App.PersistedRole.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let persistedRole:PersistedAppRole.Class;

		persistedRole = defaultExport;
		expect( persistedRole ).toEqual( jasmine.any( Object ) );
	} );

} );
