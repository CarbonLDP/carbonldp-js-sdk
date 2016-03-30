import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

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
			expect( Object.keys( CS.Class ).length ).toBe( 4 );
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

		it( hasProperty(
			STATIC,
			"AllOrigins",
			"string"
		), ():void => {
			expect( CS.Class.AllOrigins ).toBeDefined();
			expect( Utils.isString( CS.Class.AllOrigins ) ).toBe( true );

			expect( CS.Class.AllOrigins ).toBe( "https://carbonldp.com/ns/v1/security#AllOrigins" );
		});

		it( hasProperty(
			STATIC,
			"AllOrigins",
			"string"
		), ():void => {
			expect( CS.Class.Agent ).toBeDefined();
			expect( Utils.isString( CS.Class.Agent ) ).toBe( true );

			expect( CS.Class.Agent ).toBe( "https://carbonldp.com/ns/v1/security#Agent" );
		});

	});

	describe( clazz(
		"Carbon.NS.CS.Predicate",
		"Class that contains predicates defined by Carbon Security"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CS.Predicate ).toBeDefined();
			expect( Utils.isFunction( CS.Predicate ) ).toBe( true );

			expect( Object.keys( CS.Predicate ).length ).toBe( 6 );
		});

		it( hasProperty(
			STATIC,
			"name",
			"string"
		), ():void => {
			expect( CS.Predicate.name ).toBeDefined();
			expect( Utils.isString( CS.Predicate.name ) ).toBe( true );

			expect( CS.Predicate.name ).toBe( "https://carbonldp.com/ns/v1/security#name" );
		});

		it( hasProperty(
			STATIC,
			"allowsOrigin",
			"string"
		), ():void => {
			expect( CS.Predicate.allowsOrigin ).toBeDefined();
			expect( Utils.isString( CS.Predicate.allowsOrigin ) ).toBe( true );

			expect( CS.Predicate.allowsOrigin ).toBe( "https://carbonldp.com/ns/v1/security#allowsOrigin" );
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

		it( hasProperty(
			STATIC,
			"password",
			"string"
		), ():void => {
			expect( CS.Predicate.password ).toBeDefined();
			expect( Utils.isString( CS.Predicate.password ) ).toBe( true );

			expect( CS.Predicate.password ).toBe( "https://carbonldp.com/ns/v1/security#password" );
		});

	});

});