import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	decoratedObject,

	isDefined,
	hasMethod,
} from "./../test/JasmineExtender";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";

import * as PersistedAgent from "./PersistedAgent";
import AbstractContext from "../AbstractContext";

describe( module( "Carbon/Auth/PersistedAgent" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedAgent ).toBeDefined();
		expect( Utils.isObject( PersistedAgent ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.Auth.PersistedAgent.Factory",
		"Factory class for `Carbon.Auth.PersistedAgent.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedAgent.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.PersistedAgent.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedAgent.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
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

			delete object.enable;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );
			object.enable = ():void => {};

			delete object.disable;
			expect( PersistedAgent.Factory.hasClassProperties( object ) ).toBe( false );
			object.disable = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.Auth.PersistedAgent.Class` object.", [
				{name: "object", type: "Object"},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedAgent.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory.is ) ).toBe( true );

			let object:any;

			object = {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
			};
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.Factory.createFrom( {
				name: null,
				email: null,
				enabled: null,
				enable: ():void => {},
				disable: ():void => {},
			}, "http://example.com/resource/", null );
			expect( PersistedAgent.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.Agent );
			expect( PersistedAgent.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.Auth.PersistedAgent.Class` object."
		), ():void => {
			expect( PersistedAgent.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedAgent.Factory.decorate ) ).toBe( true );

			let object:any;

			object = {myProperty: "My Property"};
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
				disable: fn
			};
			object = PersistedAgent.Factory.decorate( object );
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
			object = PersistedAgent.Factory.decorate( object );
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enable ).toBeDefined();
			expect( object.enable ).not.toBe( fn );
			expect( object.disable ).toBeDefined();
			expect( object.disable ).not.toBe( fn );
		} );

		describe( decoratedObject( "Object decorated by the `Carbon.Auth.PersistedAgent.Factory.decorate()` function.", [
			"Carbon.Auth.PersistedAgent.Class",
		] ), ():void => {
			let context:AbstractContext;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				context = new MockedContext();
			} );

			it( hasMethod(
				INSTANCE,
				"enable",
				"Activate the account of the agent.",
				{type: "Promise<[ Carbon.Auth.PersistedAgent.Class Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				let persistedDocument:PersistedDocument.Class;
				let agent:PersistedAgent.Class;

				agent = PersistedAgent.Factory.decorate( {} );
				expect( agent.enable ).toBeDefined();
				expect( Utils.isFunction( agent.enable ) ).toBe( true );

				persistedDocument = PersistedDocument.Factory.createFrom( {}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.enable();

				persistedDocument = PersistedDocument.Factory.createFrom( {enabled: false}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.enable();

				persistedDocument = PersistedDocument.Factory.createFrom( {enabled: true}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.enable();

				expect( spy.calls.count() ).toBe( 3 );
				for( let call of spy.calls.all() ) {
					expect( call.args[ 0 ].enabled ).toBe( true );
				}
			} );

			it( hasMethod(
				INSTANCE,
				"disable",
				"Deactivate the account of the agent.",
				{type: "Promise<[ Carbon.Auth.PersistedAgent.Class Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				let persistedDocument:PersistedDocument.Class;
				let agent:PersistedAgent.Class;

				agent = PersistedAgent.Factory.decorate( {} );
				expect( agent.disable ).toBeDefined();
				expect( Utils.isFunction( agent.disable ) ).toBe( true );

				persistedDocument = PersistedDocument.Factory.createFrom( {}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.disable();

				persistedDocument = PersistedDocument.Factory.createFrom( {enabled: false}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.disable();

				persistedDocument = PersistedDocument.Factory.createFrom( {enabled: true}, "", context.documents );
				agent = PersistedAgent.Factory.decorate( persistedDocument );
				agent.disable();

				expect( spy.calls.count() ).toBe( 3 );
				for( let call of spy.calls.all() ) {
					expect( call.args[ 0 ].enabled ).toBe( false );
				}
			} );

		} );

	} );

} );