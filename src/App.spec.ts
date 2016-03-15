/// <reference path="./../typings/typings.d.ts" />

import * as App from "./App";

import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Document from "./Document";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedContainer from "./LDP/PersistedContainer";
import AbstractContext from "./AbstractContext";

describe( module( "Carbon/App" ), ():void => {

	it( isDefined(), ():void => {
		expect( App ).toBeDefined();
		expect( Utils.isObject( App ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( App.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( App.RDF_CLASS ) ).toBe( true );

		expect( App.RDF_CLASS ).toBe( NS.CS.Class.Application );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( App.SCHEMA ).toBeDefined();
		expect( Utils.isObject( App.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( App.SCHEMA, "rootContainer" ) ).toBe( true );
		expect( App.SCHEMA[ "rootContainer" ] ).toEqual({
			"@id": NS.CS.Predicate.rootContainer,
			"@type": "@id"
		});
	});

	describe( clazz(
		"Carbon.App.Context",
		"Class that represents a Carbon Application. " +
		"It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application's scope."
	), ():void => {
		let parentContext:AbstractContext;
		let appContext:App.Context;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			let parentContext = new MockedContext();
			let app = <App.Class> Document.Factory.create( "http://example.com/platform/apps/example-app/" );
			app.rootContainer = PersistedContainer.Factory.decorate(
				<PersistedDocument.Class> Pointer.Factory.create( "http://example.com/apps/example-app/" )
			);
			appContext = new App.Context( parentContext, app );
		});

		it( isDefined(), ():void => {
			expect( App.Context ).toBeDefined();
			expect( Utils.isFunction( App.Context ) );
		});

		it( hasConstructor([
			{ name: "parentContext", type: "Carbon.Context" },
			{ name: "app", type: "Carbon.App.Context" },
		]), ():void => {
			expect( appContext ).toBeTruthy();
			expect( appContext instanceof App.Context );
		});

		it( extendsClass(
			"Carbon.AbstractContext"
		), ():void => {
			expect( appContext instanceof AbstractContext );
		});

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Resolve the URI provided in the scope of the application", [
				{ name: "uri", type: "string" }
			],
			{ type: "string" }
		), ():void => {
			expect( appContext.resolve( "/child/" ) ).toBe( "http://example.com/apps/example-app/child/" );

			expect( appContext.resolve( "/child-another/grandchild/" ) )
				.toBe( "http://example.com/apps/example-app/child-another/grandchild/" );
			expect( appContext.resolve( "http://example.com/apps/another-app/child/" ) )
				.toBe( "http://example.com/apps/another-app/child/" );
		});
	});

	describe( clazz(
		"Carbon.App.Factory",
		"Factory class for `Carbon.App.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( App.Factory ).toBeDefined();
			expect( Utils.isFunction( App.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.App.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( App.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( App.Factory.hasClassProperties ) ).toBe( true );

			expect( App.Factory.hasClassProperties( { rootContainer: {} } ) ).toBe( true );
			expect( App.Factory.hasClassProperties( { rootContainer: Pointer.Factory.create( "http://example.com/apps/example-app/" ) } ) ).toBe( true );

			expect( App.Factory.hasClassProperties( {} ) ).toBe( false );
			expect( App.Factory.hasClassProperties( null ) ).toBe( false );
			expect( App.Factory.hasClassProperties( undefined ) ).toBe( false );
		});

	});

});
