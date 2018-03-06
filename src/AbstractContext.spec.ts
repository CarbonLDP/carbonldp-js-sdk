import DefaultExport, { AbstractContext } from "./AbstractContext";
import {
	globalContext,
	SDKContext
} from "./SDKContext";

import {
	clazz,
	extendsClass,
	hasConstructor,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	module,
} from "./test/JasmineExtender";

describe( module( "CarbonLDP/AbstractContext" ), ():void => {

	describe( clazz( "CarbonLDP.AbstractContext.AbstractContext", "Abstract class for defining contexts." ), ():void => {

		it( "should exists", ():void => {
			expect( AbstractContext ).toBeDefined();
			expect( AbstractContext ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "";
			}();
		} );

		it( hasConstructor(), ():void => {
			expect( context ).toBeTruthy();
			expect( context ).toEqual( jasmine.any( AbstractContext ) );
		} );

		it( extendsClass( "CarbonLDP.SDKContext.SDKContext" ), ():void => {
			expect( context ).toEqual( jasmine.any( SDKContext ) );
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
			expect( context.resolve ).toEqual( jasmine.any( Function ) );

			expect( context.resolve( "The mock returns the string provided" ) ).toBe( "The mock returns the string provided" );
		} );

		it( hasProperty(
			INSTANCE,
			"parentContext",
			"CarbonLDP.Context.Context",
			"The parent context provided in the constructor. " +
			"If no context was provided, this property will be the singleton `CarbonLDP.SDKContext#globalContext` of the class `CarbonLDP.SDKContext.SDKContext`."
		), ():void => {
			expect( context.parentContext ).toBeDefined();

			expect( context.parentContext ).toBe( globalContext );

			let newContext:AbstractContext = new class extends AbstractContext {
				protected _baseURI:string = "";
			}( context );
			expect( newContext.parentContext ).toBe( context );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.AbstractContext.AbstractContext" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( AbstractContext );
	} );

} );
