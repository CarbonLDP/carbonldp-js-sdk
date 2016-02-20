/// <reference path="./../typings/typings.d.ts" />

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
	hasProperty,
} from "./test/JasmineExtender";

describe( module( "Carbon/App" ), function():void {
	describe( clazz( "Carbon.App.Class",
		"Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\"s scope.",
		"Carbon.Parent"
	), function():void {

		it( hasConstructor( "Constructor of Carbon.App.Class", [
			{name: "parent", type: "Carbon.Parent"},
			{name: "resource", type: "Carbon.App.Resource"},
		] ), function():void {
			// TODO: Test
		} );

		it( hasMethod( INSTANCE, "resolve",
			"",
			[
				{name: "uri", type: "string"}
			],
			{type: "string"}
		), function():void {
			// TODO: Test
		} );

		it( hasProperty( STATIC, "TestingProperty", "bool", "Description" ), function():void {

		} );
	} );

	describe( clazz( "Carbon.App.Factory",
		"Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application\"s scope.<br>" +
		"Instead of instantiating this class it is recommended to use the already exposed instance: Carbon.App.factory",
		"Carbon.Parent"
	), function():void {


		describe( constructor(), function():void {
			it( hasConstructor( [
				{name: "parent", type: "Carbon.Parent"},
				{name: "resource", type: "Carbon.App.Resource"},
				{name: "resource", type: '<a href="#Carbon.Utils.A">Carbon.Utils.A</a>'},
			] ), function():void {
				// TODO: Test
			} );
		} );

		it( hasMethod( INSTANCE, "is",
			"",
			[
				{name: "object", type: "Object"}
			],
			{type: "boolean"}
		), function():void {
			// TODO: Test
		} );

		describe( method( INSTANCE, "from",
			""
		), function():void {
			it( hasSignature(
				"Signature 1",
				[
					{name: "resource", type: "Carbon.RDF.Node.Class"}
				],
				{type: "Carbon.App.Resource"}
			), function():void {
				expect( 1 ).toBeGreaterThan( 0 );
			} );
		} );


	} );

	describe( property( STATIC, "factory", "Carbon.App.Factory",
		"Instance of the class Carbon.App.Factory"
	), function():void {

		it( isDefined(), function():void {
			expect( App.factory ).toBeDefined();
		} );

	} );


} );
