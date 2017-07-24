import {
	INSTANCE,

	module,
	clazz,

	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as SDKContext from "./SDKContext";

import * as AbstractContext from "./AbstractContext";
import DefaultExport from "./AbstractContext";

describe( module( "Carbon/AbstractContext" ), ():void => {
	class MockedContext extends AbstractContext.Class {
		protected _baseURI:string = "";
	}
	let context:AbstractContext.Class;

	describe( clazz(
		"Carbon.AbstractContext.Class",
		"Abstract class for defining contexts."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AbstractContext.Class ).toBeDefined();
			expect( Utils.isFunction( AbstractContext.Class ) ).toBe( true );
		} );

		beforeEach( ():void => {
			context = new MockedContext();
		} );

		it( hasConstructor(), ():void => {
			expect( context ).toBeTruthy();
			expect( context instanceof AbstractContext.Class ).toBe( true );
		} );

		it( extendsClass(
			"Carbon.SDKContext.Class"
		), ():void => {
			expect( context instanceof SDKContext.Class ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"resolve",
			"Abstract method that returns an absolute URI in accordance to the context scope from the relative URI provided.", [
				{ name: "relativeURI", type: "string" },
			],
			{ type: "string" }
		), ():void => {
			expect( context.resolve ).toBeDefined();
			expect( Utils.isFunction( context.resolve ) ).toBe( true );

			expect( context.resolve( "The mock returns the string provided" ) ).toBe( "The mock returns the string provided" );
		} );

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"Carbon.Context.Class",
			"The parent context provided in the constructor. " +
			"If no context was provided, this property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`."
		), ():void => {
			expect( context.parentContext ).toBeDefined();

			expect( context.parentContext ).toBe( SDKContext.instance );

			let newContext:AbstractContext.Class = new MockedContext( context );
			expect( newContext.parentContext ).toBe( context );
		} );

	} );

	it( hasDefaultExport( "Carbon.AbstractContext.Class" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AbstractContext.Class );
	} );

} );
