import IllegalStateError from "./IllegalStateError";
import AbstractError from "./AbstractError";
import * as Utils from "./../Utils";

import {
	INSTANCE,
	STATIC,
	clazz,
	module,
	isDefined,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasInterface,
	MethodArgument,
	interfaze,
	extendsClass
} from "./../test/JasmineExtender";

describe( module( "Carbon/Errors/IllegalStateError" ), function ():void {

	describe( clazz(
		"Carbon.Errors.IllegalStateError",
		"Error class to indicate that a task can't be completed because of the lack of pre-required configuration or execution of previous tasks."
	), function():void {
		it( isDefined(), function():void {
			expect( IllegalStateError ).toBeDefined();
			expect( IllegalStateError ).not.toBeNull();
			expect( Utils.isFunction( IllegalStateError ) ).toBe( true );
		});

		it( extendsClass( "Carbon.Errors.AbstractError" ), function():void {
			let illegalStateError:IllegalStateError = new IllegalStateError( "This is the message" );
			expect( illegalStateError instanceof AbstractError ).toBe( true );
		});

		it( hasConstructor([
			{ name: "message", type: "string", optional: true, default: "" }
		]), ():void => {
			let error: IllegalStateError = new IllegalStateError( "Message of the error" );

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError).toBe( true );

			error = new IllegalStateError();

			expect( error ).toBeTruthy();
			expect( error instanceof IllegalStateError).toBe( true );
		});

		it( hasMethod(
			INSTANCE,
			"toString",
			{ type: "string" }
		), ():void => {
			let error: IllegalStateError = new IllegalStateError( "Message of the error" );

			expect( error.toString ).toBeDefined();
			expect( Utils.isFunction( error.toString ) );

			expect( error.toString() ).toBe("IllegalStateError: Message of the error");

			error = new IllegalStateError();
			expect( error.toString() ).toBe("IllegalStateError: ");
		});

		it( hasProperty(
			INSTANCE,
			"name",
			"string"
		), ():void => {
			let error: IllegalStateError = new IllegalStateError( "Message of the error" );

			expect( error.name ).toBeDefined();
			expect( Utils.isString( error.name ) ).toBe( true );

			expect( error.name ).toBe( "IllegalStateError" );
		});

	});
} );