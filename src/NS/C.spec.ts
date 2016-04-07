import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as C from "./C";

describe( module(
	"Carbon/NS/C"
), ():void => {

	it( isDefined(), ():void => {
		expect( C ).toBeDefined();
		expect( Utils.isObject( C ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( C.namespace ).toBeDefined();
		expect( Utils.isString( C.namespace ) ).toBe( true );

		expect( C.namespace ).toBe( "https://carbonldp.com/ns/v1/platform#" )
	});

	describe( clazz(
		"Carbon.NS.C.Class",
		"Class that contains objects defined by the Carbon Platform"
	), ():void => {

		it( isDefined(), ():void => {
			expect( C.Class ).toBeDefined();
			expect( Utils.isFunction( C.Class ) ).toBe( true );
			expect( Object.keys( C.Class ).length ).toBe( 9 );
		});

		it( hasProperty(
			STATIC,
			"AccessPoint",
			"string"
		), ():void => {
			expect( C.Class.AccessPoint ).toBeDefined();
			expect( Utils.isString( C.Class.AccessPoint ) ).toBe( true );

			expect( C.Class.AccessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#AccessPoint" );
		});

		it( hasProperty(
			STATIC,
			"API",
			"string"
		), ():void => {
			expect( C.Class.API ).toBeDefined();
			expect( Utils.isString( C.Class.API ) ).toBe( true );

			expect( C.Class.API ).toBe( "https://carbonldp.com/ns/v1/platform#API" );
		});

		it( hasProperty(
			STATIC,
			"NonReadableMembershipResourceTriples",
			"string"
		), ():void => {
			expect( C.Class.NonReadableMembershipResourceTriples ).toBeDefined();
			expect( Utils.isString( C.Class.NonReadableMembershipResourceTriples ) ).toBe( true );

			expect( C.Class.NonReadableMembershipResourceTriples ).toBe( "https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples" );
		});

		it( hasProperty(
			STATIC,
			"PreferContainmentResources",
			"string"
		), ():void => {
			expect( C.Class.PreferContainmentResources ).toBeDefined();
			expect( Utils.isString( C.Class.PreferContainmentResources ) ).toBe( true );

			expect( C.Class.PreferContainmentResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentResources" );
		});

		it( hasProperty(
			STATIC,
			"PreferContainmentTriples",
			"string"
		), ():void => {
			expect( C.Class.PreferContainmentTriples ).toBeDefined();
			expect( Utils.isString( C.Class.PreferContainmentTriples ) ).toBe( true );

			expect( C.Class.PreferContainmentTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentTriples" );
		});

		it( hasProperty(
			STATIC,
			"PreferMembershipResources",
			"string"
		), ():void => {
			expect( C.Class.PreferMembershipResources ).toBeDefined();
			expect( Utils.isString( C.Class.PreferMembershipResources ) ).toBe( true );

			expect( C.Class.PreferMembershipResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipResources" );
		});

		it( hasProperty(
			STATIC,
			"PreferMembershipTriples",
			"string"
		), ():void => {
			expect( C.Class.PreferMembershipTriples ).toBeDefined();
			expect( Utils.isString( C.Class.PreferMembershipTriples ) ).toBe( true );

			expect( C.Class.PreferMembershipTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipTriples" );
		});

		it( hasProperty(
			STATIC,
			"VolatileResource",
			"string"
		), ():void => {
			expect( C.Class.VolatileResource ).toBeDefined();
			expect( Utils.isString( C.Class.VolatileResource ) ).toBe( true );

			expect( C.Class.VolatileResource ).toBe( "https://carbonldp.com/ns/v1/platform#VolatileResource" );
		});

		it( hasProperty(
			STATIC,
			"RDFRepresentation",
			"string"
		), ():void => {
			expect( C.Class.RDFRepresentation ).toBeDefined();
			expect( Utils.isString( C.Class.RDFRepresentation ) ).toBe( true );

			expect( C.Class.RDFRepresentation ).toBe( "https://carbonldp.com/ns/v1/platform#RDFRepresentation" );
		});

	});

	describe( clazz(
		"Carbon.NS.C.Predicate",
		"Class that contains predicates defined by the Carbon Platform"
	), ():void => {

		it( isDefined(), ():void => {
			expect( C.Predicate ).toBeDefined();
			expect( Utils.isFunction( C.Predicate ) ).toBe( true );

			expect( Object.keys( C.Predicate ).length ).toBe( 7 );
		});

		it( hasProperty(
			STATIC,
			"accessPoint",
			"string"
		), ():void => {
			expect( C.Predicate.accessPoint ).toBeDefined();
			expect( Utils.isString( C.Predicate.accessPoint ) ).toBe( true );

			expect( C.Predicate.accessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#accessPoint" );
		});

		it( hasProperty(
			STATIC,
			"buildDate",
			"string"
		), ():void => {
			expect( C.Predicate.buildDate ).toBeDefined();
			expect( Utils.isString( C.Predicate.buildDate ) ).toBe( true );

			expect( C.Predicate.buildDate ).toBe( "https://carbonldp.com/ns/v1/platform#buildDate" );
		});

		it( hasProperty(
			STATIC,
			"created",
			"string"
		), ():void => {
			expect( C.Predicate.created ).toBeDefined();
			expect( Utils.isString( C.Predicate.created ) ).toBe( true );

			expect( C.Predicate.created ).toBe( "https://carbonldp.com/ns/v1/platform#created" );
		});

		it( hasProperty(
			STATIC,
			"modified",
			"string"
		), ():void => {
			expect( C.Predicate.modified ).toBeDefined();
			expect( Utils.isString( C.Predicate.modified ) ).toBe( true );

			expect( C.Predicate.modified ).toBe( "https://carbonldp.com/ns/v1/platform#modified" );
		});

		it( hasProperty(
			STATIC,
			"version",
			"string"
		), ():void => {
			expect( C.Predicate.version ).toBeDefined();
			expect( Utils.isString( C.Predicate.version ) ).toBe( true );

			expect( C.Predicate.version ).toBe( "https://carbonldp.com/ns/v1/platform#version" );
		});


		it( hasProperty(
			STATIC,
			"mediaType",
			"string"
		), ():void => {
			expect( C.Predicate.mediaType ).toBeDefined();
			expect( Utils.isString( C.Predicate.mediaType ) ).toBe( true );

			expect( C.Predicate.mediaType ).toBe( "https://carbonldp.com/ns/v1/platform#mediaType" );
		});


		it( hasProperty(
			STATIC,
			"size",
			"string"
		), ():void => {
			expect( C.Predicate.size ).toBeDefined();
			expect( Utils.isString( C.Predicate.size ) ).toBe( true );

			expect( C.Predicate.size ).toBe( "https://carbonldp.com/ns/v1/platform#size" );
		});

	});

});