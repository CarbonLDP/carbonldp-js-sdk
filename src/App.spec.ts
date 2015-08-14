/// <reference path="./../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="./../typings/es6/es6.d.ts" />
/// <reference path="./../typings/es6-promise/es6-promise.d.ts" />

//@formatter:off
import * as App from './App';

import {
	INSTANCE,
	STATIC,
	module,
	clazz,
	method,
	property,
	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty
} from './test/JasmineExtender';
//@formatter:on

describe( module( 'Carbon/App' ), function () {

	describe( clazz( 'Carbon.App.Class',
		'Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\'s scope.',
		'Carbon.Parent'
	), function () {

		it( hasConstructor( [
			{name: 'parent', type: 'Carbon.Parent'},
			{name: 'resource', type: 'Carbon.App.Resource'}
		] ), function () {
			// TODO: Test
		} );

		it( hasMethod( INSTANCE, 'resolve',
			'',
			[
				{name: 'uri', type: 'string'}
			],
			{type: 'string'}
		), function () {
			// TODO: Test
		} );

	} );

	describe( clazz( 'Carbon.App.Factory',
		'Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\'s scope.<br>' +
		'Instead of instantiating this class it is recommended to use the already exposed instance: Carbon.App.factory',
		'Carbon.Parent'
	), function () {

		it( hasConstructor( [
			{name: 'parent', type: 'Carbon.Parent'},
			{name: 'resource', type: 'Carbon.App.Resource'}
		] ), function () {
			// TODO: Test
		} );

		it( hasMethod( INSTANCE, 'is',
			'',
			[
				{name: 'object', type: 'Object'}
			],
			{type: 'boolean'}
		), function () {
			// TODO: Test
		} );

		describe( method( INSTANCE, 'from',
			''
		), function () {
			it( hasSignature(
				[
					{name: 'resource', type: 'Carbon.RDF.Node.Class'}
				],
				{type: 'Carbon.App.Resource'}
			), function () {
				// TODO: Test
			} );

			it( hasSignature(
				[
					{name: 'resources', type: 'Carbon.RDF.Node.Class[]'}
				],
				{type: 'Carbon.App.Resource[]'}
			), function () {
				// TODO: Test
			} );
		} );
	} );

	describe( property( STATIC, 'Carbon.App.factory', 'Carbon.App.Factory',
		'Instance of the class Carbon.App.Factory'
	), function () {

		it( isDefined(), function () {
			expect( App.factory ).toBeDefined();
		} );

	} );

} );