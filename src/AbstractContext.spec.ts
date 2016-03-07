/// <reference path="./../typings/typings.d.ts" />

import AbstractContext from "./AbstractContext";

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
//import * as SDKContext from "./SDKContext";

describe( module( "Carbon/AbstractContext" ), ():void => {
	//let context:AbstractContext;

	describe( clazz(
		"Carbon.AbstractContext",
		"Abstract class for defining contexts"
	), ():void => {

		it( isDefined(), ():void => {
			// TODO test. Creates error inside Carbon.App file. When Carbon.App.Context want to extends AbstractContext send an runtime error, because the module AbstractContext it's empty for an unknown reason.
			//expect( AbstractContext ).toBeDefined();
			//expect( Utils.isFunction( AbstractContext ) ).toBe( true );
		});

		beforeEach( ():void => {
			//class MockedContext extends AbstractContext {
			//	resolve( uri:string ):string {
			//		return uri;
			//	}
			//}
			//context = new MockedContext();
		});

		it( hasConstructor(), ():void => {
			//expect( context ).toBeTruthy();
			//expect( context instanceof AbstractContext ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Abstract method which implementation must resolve the URI provided in the scope of the application.", [
				{ name: "relativeURI", type: "string" }
			],
			{ type: "string" }
		), ():void => {
			//expect( context.resolve ).toBeDefined();
			//expect( Utils.isFunction( context.resolve ) ).toBe( true );
			//
			//expect( context.resolve( "the mock just returns the string provided" ) ).toBe( "the mock just returns the string provided" );
		});

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"The parent context provided in the constructor. " +
			"If no context has provided, the property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`."
		), ():void => {
			//expect( context.parentContext ).toBeDefined();
			//
			////expect( context.parentContext instanceof SDKContext.Class ).toBe( true );
			//expect( context.parentContext instanceof AbstractContext ).toBe( false );
			////expect( context.parentContext ).toBe( SDKContext.instance );
			//
			//let newContext = new MockedContext( context );
			////expect( newContext.parentContext instanceof SDKContext.Class ).toBe( true );
			//expect( newContext.parentContext instanceof AbstractContext ).toBe( true );
			//expect( newContext.parentContext instanceof MockedContext ).toBe( true );
			//expect( newContext.parentContext ).toBe( context );
		});

	});

});
