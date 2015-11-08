/// <reference path="./../typings/jasmine/jasmine.d.ts" />
/// <reference path="./../typings/jasmine-ajax/mock-ajax.d.ts" />
/// <reference path="./../typings/es6/es6.d.ts" />
/// <reference path="./../typings/es6-promise/es6-promise.d.ts" />

import * as App from "./App";

import {
	PROPERTY,
	INSTANCE,
	STATIC,
	module,
	clazz,
	interfaze,
	method,
	constructor,
	property,
	isDefined,
	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty
} from "./test/JasmineExtender";

describe( module( "Carbon/App" ), function () {

	describe( interfaze( "RDF.Resource.Class", "Description of Interface" ), function () {

		it( hasProperty( PROPERTY, "rootContainer", "string", "The Root of the Container" ), function () {} );

	} );
	describe( clazz( "Carbon.App.Class",
		"Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\"s scope.",
		"Carbon.Parent"
	), function () {

		it( hasConstructor( "Constructor of Carbon.App.Class", [
			{name: "parent", type: "Carbon.Parent"},
			{name: "resource", type: "Carbon.App.Resource"}
		] ), function () {
			// TODO: Test
		} );

		it( hasMethod( INSTANCE, "resolve",
			"",
			[
				{name: "uri", type: "string"}
			],
			{type: "string"}
		), function () {
			// TODO: Test
		} );

		it( hasProperty( STATIC, "TestingProperty", "bool", "Description" ), function () {

		} );
	} );

	describe( clazz( "Carbon.App.Factory",
		"Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\"s scope.<br>" +
		"Instead of instantiating this class it is recommended to use the already exposed instance: Carbon.App.factory",
		"Carbon.Parent"
	), function () {


		describe( constructor( "", "Constructor of Carbon.App.Factory" ), function () {
			it( hasConstructor( [
				{name: "parent", type: "Carbon.Parent"},
				{name: "resource", type: "Carbon.App.Resource"},
				{name: "resource", type: "<a href="#Carbon.Utils.A">Carbon.Utils.A</a>"}
			] ), function () {
				// TODO: Test
			} );
		} );

		it( hasMethod( INSTANCE, "is",
			"",
			[
				{name: "object", type: "Object"}
			],
			{type: "boolean"}
		), function () {
			// TODO: Test
		} );

		describe( method( INSTANCE, "from",
			""
		), function () {
			it( hasSignature(
				"Signature 1",
				[
					{name: "resource", type: "Carbon.RDF.Node.Class"}
				],
				{type: "Carbon.App.Resource"}
			), function () {
				expect( 1 ).toBeGreaterThan( 0 );
			} );
		} );


	} );

	describe( property( STATIC, "factory", "Carbon.App.Factory",
		"Instance of the class Carbon.App.Factory"
	), function () {

		it( isDefined(), function () {
			expect( App.factory ).toBeDefined();
		} );

	} );


} );
