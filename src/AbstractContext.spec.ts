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
	extendsClass
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as SDKContext from "./SDKContext";

describe( module( "Carbon/AbstractContext" ), ():void => {
	class MockedContext extends AbstractContext {
		resolve( uri:string ):string {
			return uri;
		}
	}
	let context:AbstractContext;

	describe( clazz(
		"Carbon.AbstractContext",
		"Abstract class for defining contexts"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AbstractContext ).toBeDefined();
			expect( Utils.isFunction( AbstractContext ) ).toBe( true );
		});

		beforeEach( ():void => {
			context = new MockedContext();
		});

		it( hasConstructor(), ():void => {
			expect( context ).toBeTruthy();
			expect( context instanceof AbstractContext ).toBe( true );
		});

		it( extendsClass(
			"Carbon.SDKContext.Class"
		), ():void => {
			expect( context instanceof SDKContext.Class ).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Abstract method which implementation must resolve the URI provided in the scope of the application.", [
				{ name: "relativeURI", type: "string" }
			],
			{ type: "string" }
		), ():void => {
			expect( context.resolve ).toBeDefined();
			expect( Utils.isFunction( context.resolve ) ).toBe( true );

			expect( context.resolve( "the mock just returns the string provided" ) ).toBe( "the mock just returns the string provided" );
		});

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"Carbon.Context",
			"The parent context provided in the constructor. " +
			"If no context has provided, the property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`."
		), ():void => {
			expect( context.parentContext ).toBeDefined();

			expect( context.parentContext ).toBe( SDKContext.instance );

			let newContext = new MockedContext( context );
			expect( newContext.parentContext ).toBe( context );
		});

	});

});
