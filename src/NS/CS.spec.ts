/// <reference path="./../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "../Utils";

import * as CS from "./CS";

describe( module(
	"Carbon/NS/CS"
), ():void => {

	it( isDefined(), ():void => {
		expect( CS ).toBeDefined();
		expect( Utils.isObject( CS ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( CS.namespace ).toBeDefined();
		expect( Utils.isString( CS.namespace ) ).toBe( true );

		expect( CS.namespace ).toBe( "https://carbonldp.com/ns/v1/security#" )
	});

	describe( clazz(
		"Carbon.NS.CS.Class",
		"Class that contains objects defined by Carbon Security"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CS.Class ).toBeDefined();
			expect( Utils.isFunction( CS.Class ) ).toBe( true );
			expect( Object.keys( CS.Class ).length ).toBe( 2 );
		});

		it( hasProperty(
			STATIC,
			"Application",
			"string"
		), ():void => {
			expect( CS.Class.Application ).toBeDefined();
			expect( Utils.isString( CS.Class.Application ) ).toBe( true );

			expect( CS.Class.Application ).toBe( "https://carbonldp.com/ns/v1/security#Application" );
		});

		it( hasProperty(
			STATIC,
			"Token",
			"string"
		), ():void => {
			expect( CS.Class.Token ).toBeDefined();
			expect( Utils.isString( CS.Class.Token ) ).toBe( true );

			expect( CS.Class.Token ).toBe( "https://carbonldp.com/ns/v1/security#Token" );
		});

	});

	describe( clazz(
		"Carbon.NS.CS.Predicate",
		"Class that contains predicates defined by Carbon Security"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CS.Predicate ).toBeDefined();
			expect( Utils.isFunction( CS.Predicate ) ).toBe( true );

			expect( Object.keys( CS.Predicate ).length ).toBe( 3 );
		});

		it( hasProperty(
			STATIC,
			"rootContainer",
			"string"
		), ():void => {
			expect( CS.Predicate.rootContainer ).toBeDefined();
			expect( Utils.isString( CS.Predicate.rootContainer ) ).toBe( true );

			expect( CS.Predicate.rootContainer ).toBe( "https://carbonldp.com/ns/v1/security#rootContainer" );
		});

		it( hasProperty(
			STATIC,
			"tokenKey",
			"string"
		), ():void => {
			expect( CS.Predicate.tokenKey ).toBeDefined();
			expect( Utils.isString( CS.Predicate.tokenKey ) ).toBe( true );

			expect( CS.Predicate.tokenKey ).toBe( "https://carbonldp.com/ns/v1/security#tokenKey" );
		});

		it( hasProperty(
			STATIC,
			"expirationTime",
			"string"
		), ():void => {
			expect( CS.Predicate.expirationTime ).toBeDefined();
			expect( Utils.isString( CS.Predicate.expirationTime ) ).toBe( true );

			expect( CS.Predicate.expirationTime ).toBe( "https://carbonldp.com/ns/v1/security#expirationTime" );
		});

	});

});