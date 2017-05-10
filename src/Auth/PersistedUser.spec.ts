import {
	STATIC,
	INSTANCE,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,
	decoratedObject,

	isDefined,
	hasMethod,
	extendsClass,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Utils from "./../Utils";

import * as PersistedUser from "./PersistedUser";
import DefaultExport from "./PersistedUser";

describe( module( "Carbon/Auth/PersistedUser" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedUser ).toBeDefined();
		expect( Utils.isObject( PersistedUser ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.PersistedUser.Class",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of he current User."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"email",
			"string",
			"The email of he current User."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"enabled",
			"boolean",
			"Flag that indicates if the current user has been activated o not."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"password",
			"string",
			"Property that represents the password of the user. This property is not retrieved but you can change the current password by setting a new one here and saving it."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"enable",
			"Activate the account of the user.",
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"disable",
			"Deactivate the account of the user.",
			{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.Auth.PersistedUser.Factory",
		"Factory class for `Carbon.Auth.PersistedUser.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedUser.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedUser.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
			};
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.email;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.email = null;

			delete object.enabled;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.enabled = null;

			delete object.enable;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.enable = ():void => {};

			delete object.disable;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.disable = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedUser.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.is ) ).toBe( true );

			let object:any;

			object = {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
			};
			expect( PersistedUser.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.Factory.createFrom( {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
			}, "http://example.com/resource/", null );
			expect( PersistedUser.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.User );
			expect( PersistedUser.Factory.is( object ) ).toBe( false );

			object = PersistedProtectedDocument.Factory.decorate( object );
			expect( PersistedUser.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.PersistedDocument.Class" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & Carbon.Auth.PersistedUser.Class" }
		), ():void => {
			expect( PersistedUser.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.decorate ) ).toBe( true );

			let object:any;

			object = { myProperty: "My Property" };
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enable ).toBeUndefined();
			expect( object.disable ).toBeUndefined();

			let fn:Function = ():void => {};
			object = {
				name: null,
				email: null,
				enabled: null,
				myProperty: "My Property",
				enable: fn,
				disable: fn,
			};
			object = PersistedUser.Factory.decorate( object );
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enable ).toBeDefined();
			expect( object.enable ).toBe( fn );
			expect( object.disable ).toBeDefined();
			expect( object.disable ).toBe( fn );

			object = {
				name: null,
				email: null,
				enabled: null,
				myProperty: "My Property",
			};
			object = PersistedUser.Factory.decorate( object );
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enable ).toBeDefined();
			expect( object.enable ).not.toBe( fn );
			expect( object.disable ).toBeDefined();
			expect( object.disable ).not.toBe( fn );
		} );

		describe( decoratedObject( "Object decorated by the `Carbon.Auth.PersistedUser.Factory.decorate()` function.", [
			"Carbon.Auth.PersistedUser.Class",
		] ), ():void => {
			let context:AbstractContext;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.setSetting( "system.container", ".system/" );
					}
				}
				context = new MockedContext();
			} );

			it( hasMethod(
				INSTANCE,
				"enable",
				"Activate the account of the user.",
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				let persistedDocument:PersistedDocument.Class;
				let user:PersistedUser.Class;

				user = PersistedUser.Factory.decorate( <any> {} );
				expect( user.enable ).toBeDefined();
				expect( Utils.isFunction( user.enable ) ).toBe( true );

				persistedDocument = PersistedDocument.Factory.createFrom( {}, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.enable();

				persistedDocument = PersistedDocument.Factory.createFrom( { enabled: false }, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.enable();

				persistedDocument = PersistedDocument.Factory.createFrom( { enabled: true }, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.enable();

				expect( spy.calls.count() ).toBe( 3 );
				for( let call of spy.calls.all() ) {
					expect( call.args[ 0 ].enabled ).toBe( true );
				}
			} );

			it( hasMethod(
				INSTANCE,
				"disable",
				"Deactivate the account of the user.",
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				let persistedDocument:PersistedDocument.Class;
				let user:PersistedUser.Class;

				user = PersistedUser.Factory.decorate( <any> {} );
				expect( user.disable ).toBeDefined();
				expect( Utils.isFunction( user.disable ) ).toBe( true );

				persistedDocument = PersistedDocument.Factory.createFrom( {}, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.disable();

				persistedDocument = PersistedDocument.Factory.createFrom( { enabled: false }, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.disable();

				persistedDocument = PersistedDocument.Factory.createFrom( { enabled: true }, "", context.documents );
				user = PersistedUser.Factory.decorate( persistedDocument );
				user.disable();

				expect( spy.calls.count() ).toBe( 3 );
				for( let call of spy.calls.all() ) {
					expect( call.args[ 0 ].enabled ).toBe( false );
				}
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedUser.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedUser.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
