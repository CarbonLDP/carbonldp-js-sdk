/// <reference path="../../typings/jasmine/jasmine.d.ts" />
import IllegalStateError from './IllegalStateError';
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
	interfaze,
	extendsClass
} from './../test/JasmineExtender';

describe( module( 'Carbon/Errors/IllegalStateError' ), function () {

	describe( clazz(
		'Carbon.Errors.IllegalStateError',
		'Error class that can be thrown to show an illegal state, meaning an state that the application is not supposed to reach.'
	), function() {
		it( isDefined(), function() {
			expect( IllegalStateError ).toBeDefined();
			expect( IllegalStateError ).not.toBeNull();
			expect( Utils.isFunction( IllegalStateError ) ).toBe( true );
		});

		it( extendsClass( 'Carbon.Errors.AbstractError' ), function() {
			var illegalStateError:IllegalStateError = new IllegalStateError( 'This is the message' );
			expect( illegalStateError instanceof AbstractError ).toBe( true );
		});
	});
} );