/// <reference path="./../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as CP from "./CP";

describe( module(
	"Carbon/NS/CP"
), ():void => {

	it( isDefined(), ():void => {
		expect( CP ).toBeDefined();
		expect( Utils.isObject( CP ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( CP.namespace ).toBeDefined();
		expect( Utils.isString( CP.namespace ) ).toBe( true );

		expect( CP.namespace ).toBe( "https://carbonldp.com/ns/v1/patch#" )
	});

	describe( clazz(
		"Carbon.NS.CP.Predicate",
		"Class that contains predicates defined by Carbon Patch"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CP.Predicate ).toBeDefined();
			expect( Utils.isFunction( CP.Predicate ) ).toBe( true );

			expect( Object.keys( CP.Predicate ).length ).toBe( 3 );
		});

		it( hasProperty(
			STATIC,
			"ADD_ACTION",
			"string"
		), ():void => {
			expect( CP.Predicate.ADD_ACTION ).toBeDefined();
			expect( Utils.isString( CP.Predicate.ADD_ACTION ) ).toBe( true );

			expect( CP.Predicate.ADD_ACTION ).toBe( "https://carbonldp.com/ns/v1/patch#addAction" );
		});


		it( hasProperty(
			STATIC,
			"SET_ACTION",
			"string"
		), ():void => {
			expect( CP.Predicate.SET_ACTION ).toBeDefined();
			expect( Utils.isString( CP.Predicate.SET_ACTION ) ).toBe( true );

			expect( CP.Predicate.SET_ACTION ).toBe( "https://carbonldp.com/ns/v1/patch#setAction" );
		});


		it( hasProperty(
			STATIC,
			"DELETE_ACTION",
			"string"
		), ():void => {
			expect( CP.Predicate.DELETE_ACTION ).toBeDefined();
			expect( Utils.isString( CP.Predicate.DELETE_ACTION ) ).toBe( true );

			expect( CP.Predicate.DELETE_ACTION ).toBe( "https://carbonldp.com/ns/v1/patch#deleteAction" );
		});

	});

});