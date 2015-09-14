/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import AbstractError from './AbstractError';
import * as Utils from './../Utils';

import {
		INSTANCE,
		STATIC,
		clazz,
		module,
		submodule,
		isDefined,
		hasConstructor,
		hasMethod,
		hasProperty,
		hasInterface,
		MethodArgument,
		interfaze
} from './../test/JasmineExtender';

describe( module( 'Carbon/Errors/AbstractError' ), function () {

	describe( clazz(
			'Carbon.Errors.AbstractError',
			''
	), function() {

		class DummyError extends AbstractError {}

		it( isDefined(), function() {
			expect( AbstractError ).toBeDefined();
			expect( AbstractError ).not.toBeNull();
			expect( Utils.isFunction( AbstractError ) ).toBe( true );
		});

		it( hasConstructor(
				[
					{ name: 'message', type: 'string' }
				]
		), function() {
			var exception:AbstractError = new DummyError( 'This is the message' );
			expect( exception instanceof Error ).toBe( true );
			expect( exception instanceof AbstractError ).toBe( true );
		} );

		it( hasMethod( INSTANCE, 'toString', 'Returns a string representation', { type: 'string' } ), function() {
			var exception:AbstractError = new DummyError( 'This is the message' );

			expect( exception.toString ).toBeDefined();
			expect( exception.toString ).not.toBeNull();
			expect( Utils.isFunction( exception.toString ) ).toBe( true );

			expect( Utils.isString( exception.toString() ) ).toBe( true );
		});

		it( hasProperty( INSTANCE, 'name', 'string' ), function() {
			var exception:AbstractError = new DummyError( 'This is the message' );

			expect( exception.name ).toBeDefined();
			expect( Utils.isString( exception.name ) ).toBe( true );
			expect( exception.name ).toEqual( 'AbstractError' );
		});

		it( hasProperty( INSTANCE, 'message', 'string' ), function() {
			var exception:AbstractError = new DummyError( 'This is the message' );

			expect( exception.message ).toBeDefined();
			expect( Utils.isString( exception.message ) ).toBe( true );
			expect( exception.message ).toEqual( 'This is the message' );
		});
	});
} );