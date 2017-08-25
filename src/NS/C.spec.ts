import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as C from "./C";

describe( module(
	"Carbon/NS/C"
), ():void => {

	it( isDefined(), ():void => {
		expect( C ).toBeDefined();
		expect( Utils.isObject( C ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( C.namespace ).toBeDefined();
		expect( Utils.isString( C.namespace ) ).toBe( true );

		expect( C.namespace ).toBe( "https://carbonldp.com/ns/v1/platform#" );
	} );

	describe( clazz(
		"Carbon.NS.C.Class",
		"Class that contains classes defined by the Carbon Platform."
	), ():void => {

		it( isDefined(), ():void => {
			expect( C.Class ).toBeDefined();
			expect( Utils.isFunction( C.Class ) ).toBe( true );
			expect( Object.keys( C.Class ).length ).toBe( 22 );
		} );

		it( hasProperty(
			STATIC,
			"AccessPoint",
			"string"
		), ():void => {
			expect( C.Class.AccessPoint ).toBeDefined();
			expect( Utils.isString( C.Class.AccessPoint ) ).toBe( true );

			expect( C.Class.AccessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#AccessPoint" );
		} );

		it( hasProperty(
			STATIC,
			"AddMemberAction",
			"string"
		), ():void => {
			expect( C.Class.AddMemberAction ).toBeDefined();
			expect( Utils.isString( C.Class.AddMemberAction ) ).toBe( true );

			expect( C.Class.AddMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#AddMemberAction" );
		} );

		it( hasProperty(
			STATIC,
			"CreatedResource",
			"string"
		), ():void => {
			expect( C.Class.CreatedResource ).toBeDefined();
			expect( Utils.isString( C.Class.CreatedResource ) ).toBe( true );

			expect( C.Class.CreatedResource ).toBe( "https://carbonldp.com/ns/v1/platform#CreatedResource" );
		} );

		it( hasProperty(
			STATIC,
			"Document",
			"string"
		), ():void => {
			expect( C.Class.Document ).toBeDefined();
			expect( Utils.isString( C.Class.Document ) ).toBe( true );

			expect( C.Class.Document ).toBe( "https://carbonldp.com/ns/v1/platform#Document" );
		} );

		it( hasProperty(
			STATIC,
			"DocumentMetadata",
			"string"
		), ():void => {
			expect( C.Class.DocumentMetadata ).toBeDefined();
			expect( Utils.isString( C.Class.DocumentMetadata ) ).toBe( true );

			expect( C.Class.DocumentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentMetadata" );
		} );

		it( hasProperty(
			STATIC,
			"Instance",
			"string"
		), ():void => {
			expect( C.Class.Instance ).toBeDefined();
			expect( Utils.isString( C.Class.Instance ) ).toBe( true );

			expect( C.Class.Instance ).toBe( "https://carbonldp.com/ns/v1/platform#Instance" );
		} );

		it( hasProperty(
			STATIC,
			"Map",
			"string"
		), ():void => {
			expect( C.Class.Map ).toBeDefined();
			expect( Utils.isString( C.Class.Map ) ).toBe( true );

			expect( C.Class.Map ).toBe( "https://carbonldp.com/ns/v1/platform#Map" );
		} );

		it( hasProperty(
			STATIC,
			"ModifiedResource",
			"string"
		), ():void => {
			expect( C.Class.ModifiedResource ).toBeDefined();
			expect( Utils.isString( C.Class.ModifiedResource ) ).toBe( true );

			expect( C.Class.ModifiedResource ).toBe( "https://carbonldp.com/ns/v1/platform#ModifiedResource" );
		} );

		it( hasProperty(
			STATIC,
			"NonReadableMembershipResourceTriples",
			"string"
		), ():void => {
			expect( C.Class.NonReadableMembershipResourceTriples ).toBeDefined();
			expect( Utils.isString( C.Class.NonReadableMembershipResourceTriples ) ).toBe( true );

			expect( C.Class.NonReadableMembershipResourceTriples ).toBe( "https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples" );
		} );

		it( hasProperty(
			STATIC,
			"Platform",
			"string"
		), ():void => {
			expect( C.Class.Platform ).toBeDefined();
			expect( Utils.isString( C.Class.Platform ) ).toBe( true );

			expect( C.Class.Platform ).toBe( "https://carbonldp.com/ns/v1/platform#Platform" );
		} );

		it( hasProperty(
			STATIC,
			"PreferContainer",
			"string"
		), ():void => {
			expect( C.Class.PreferContainer ).toBeDefined();
			expect( Utils.isString( C.Class.PreferContainer ) ).toBe( true );

			expect( C.Class.PreferContainer ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainer" );
		} );

		it( hasProperty(
			STATIC,
			"PreferContainmentResources",
			"string"
		), ():void => {
			expect( C.Class.PreferContainmentResources ).toBeDefined();
			expect( Utils.isString( C.Class.PreferContainmentResources ) ).toBe( true );

			expect( C.Class.PreferContainmentResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentResources" );
		} );

		it( hasProperty(
			STATIC,
			"PreferContainmentTriples",
			"string"
		), ():void => {
			expect( C.Class.PreferContainmentTriples ).toBeDefined();
			expect( Utils.isString( C.Class.PreferContainmentTriples ) ).toBe( true );

			expect( C.Class.PreferContainmentTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentTriples" );
		} );

		it( hasProperty(
			STATIC,
			"PreferMembershipResources",
			"string"
		), ():void => {
			expect( C.Class.PreferMembershipResources ).toBeDefined();
			expect( Utils.isString( C.Class.PreferMembershipResources ) ).toBe( true );

			expect( C.Class.PreferMembershipResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipResources" );
		} );

		it( hasProperty(
			STATIC,
			"PreferMembershipTriples",
			"string"
		), ():void => {
			expect( C.Class.PreferMembershipTriples ).toBeDefined();
			expect( Utils.isString( C.Class.PreferMembershipTriples ) ).toBe( true );

			expect( C.Class.PreferMembershipTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipTriples" );
		} );

		it( hasProperty(
			STATIC,
			"VolatileResource",
			"string"
		), ():void => {
			expect( C.Class.VolatileResource ).toBeDefined();
			expect( Utils.isString( C.Class.VolatileResource ) ).toBe( true );

			expect( C.Class.VolatileResource ).toBe( "https://carbonldp.com/ns/v1/platform#VolatileResource" );
		} );

		it( hasProperty(
			STATIC,
			"RDFRepresentation",
			"string"
		), ():void => {
			expect( C.Class.RDFRepresentation ).toBeDefined();
			expect( Utils.isString( C.Class.RDFRepresentation ) ).toBe( true );

			expect( C.Class.RDFRepresentation ).toBe( "https://carbonldp.com/ns/v1/platform#RDFRepresentation" );
		} );

		it( hasProperty(
			STATIC,
			"RemoveMemberAction",
			"string"
		), ():void => {
			expect( C.Class.RemoveMemberAction ).toBeDefined();
			expect( Utils.isString( C.Class.RemoveMemberAction ) ).toBe( true );

			expect( C.Class.RemoveMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#RemoveMemberAction" );
		} );

		it( hasProperty(
			STATIC,
			"ErrorResponse",
			"string"
		), ():void => {
			expect( C.Class.ErrorResponse ).toBeDefined();
			expect( Utils.isString( C.Class.ErrorResponse ) ).toBe( true );

			expect( C.Class.ErrorResponse ).toBe( "https://carbonldp.com/ns/v1/platform#ErrorResponse" );
		} );

		it( hasProperty(
			STATIC,
			"Error",
			"string"
		), ():void => {
			expect( C.Class.Error ).toBeDefined();
			expect( Utils.isString( C.Class.Error ) ).toBe( true );

			expect( C.Class.Error ).toBe( "https://carbonldp.com/ns/v1/platform#Error" );
		} );

		it( hasProperty(
			STATIC,
			"ResponseMetadata",
			"string"
		), ():void => {
			expect( C.Class.ResponseMetadata ).toBeDefined();
			expect( Utils.isString( C.Class.ResponseMetadata ) ).toBe( true );

			expect( C.Class.ResponseMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#ResponseMetadata" );
		} );

	} );

	describe( clazz(
		"Carbon.NS.C.Predicate",
		"Class that contains predicates defined by the Carbon Platform."
	), ():void => {

		it( isDefined(), ():void => {
			expect( C.Predicate ).toBeDefined();
			expect( Utils.isFunction( C.Predicate ) ).toBe( true );

			expect( Object.keys( C.Predicate ).length ).toBe( 21 );
		} );

		it( hasProperty(
			STATIC,
			"accessPoint",
			"string"
		), ():void => {
			expect( C.Predicate.accessPoint ).toBeDefined();
			expect( Utils.isString( C.Predicate.accessPoint ) ).toBe( true );

			expect( C.Predicate.accessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#accessPoint" );
		} );

		it( hasProperty(
			STATIC,
			"bNodesMap",
			"string"
		), ():void => {
			expect( C.Predicate.bNodesMap ).toBeDefined();
			expect( Utils.isString( C.Predicate.bNodesMap ) ).toBe( true );

			expect( C.Predicate.bNodesMap ).toBe( "https://carbonldp.com/ns/v1/platform#bNodesMap" );
		} );

		it( hasProperty(
			STATIC,
			"buildDate",
			"string"
		), ():void => {
			expect( C.Predicate.buildDate ).toBeDefined();
			expect( Utils.isString( C.Predicate.buildDate ) ).toBe( true );

			expect( C.Predicate.buildDate ).toBe( "https://carbonldp.com/ns/v1/platform#buildDate" );
		} );

		it( hasProperty(
			STATIC,
			"created",
			"string"
		), ():void => {
			expect( C.Predicate.created ).toBeDefined();
			expect( Utils.isString( C.Predicate.created ) ).toBe( true );

			expect( C.Predicate.created ).toBe( "https://carbonldp.com/ns/v1/platform#created" );
		} );

		it( hasProperty(
			STATIC,
			"documentMetadata",
			"string"
		), ():void => {
			expect( C.Predicate.documentMetadata ).toBeDefined();
			expect( Utils.isString( C.Predicate.documentMetadata ) ).toBe( true );

			expect( C.Predicate.documentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#documentMetadata" );
		} );

		it( hasProperty(
			STATIC,
			"defaultInteractionModel",
			"string"
		), ():void => {
			expect( C.Predicate.defaultInteractionModel ).toBeDefined();
			expect( Utils.isString( C.Predicate.defaultInteractionModel ) ).toBe( true );

			expect( C.Predicate.defaultInteractionModel ).toBe( "https://carbonldp.com/ns/v1/platform#defaultInteractionModel" );
		} );

		it( hasProperty(
			STATIC,
			"entry",
			"string"
		), ():void => {
			expect( C.Predicate.entry ).toBeDefined();
			expect( Utils.isString( C.Predicate.entry ) ).toBe( true );

			expect( C.Predicate.entry ).toBe( "https://carbonldp.com/ns/v1/platform#entry" );
		} );

		it( hasProperty(
			STATIC,
			"key",
			"string"
		), ():void => {
			expect( C.Predicate.key ).toBeDefined();
			expect( Utils.isString( C.Predicate.key ) ).toBe( true );

			expect( C.Predicate.key ).toBe( "https://carbonldp.com/ns/v1/platform#key" );
		} );

		it( hasProperty(
			STATIC,
			"modified",
			"string"
		), ():void => {
			expect( C.Predicate.modified ).toBeDefined();
			expect( Utils.isString( C.Predicate.modified ) ).toBe( true );

			expect( C.Predicate.modified ).toBe( "https://carbonldp.com/ns/v1/platform#modified" );
		} );


		it( hasProperty(
			STATIC,
			"mediaType",
			"string"
		), ():void => {
			expect( C.Predicate.mediaType ).toBeDefined();
			expect( Utils.isString( C.Predicate.mediaType ) ).toBe( true );

			expect( C.Predicate.mediaType ).toBe( "https://carbonldp.com/ns/v1/platform#mediaType" );
		} );


		it( hasProperty(
			STATIC,
			"size",
			"string"
		), ():void => {
			expect( C.Predicate.size ).toBeDefined();
			expect( Utils.isString( C.Predicate.size ) ).toBe( true );

			expect( C.Predicate.size ).toBe( "https://carbonldp.com/ns/v1/platform#size" );
		} );

		it( hasProperty(
			STATIC,
			"targetMember",
			"string"
		), ():void => {
			expect( C.Predicate.targetMember ).toBeDefined();
			expect( Utils.isString( C.Predicate.targetMember ) ).toBe( true );

			expect( C.Predicate.targetMember ).toBe( "https://carbonldp.com/ns/v1/platform#targetMember" );
		} );

		it( hasProperty(
			STATIC,
			"error",
			"string"
		), ():void => {
			expect( C.Predicate.error ).toBeDefined();
			expect( Utils.isString( C.Predicate.error ) ).toBe( true );

			expect( C.Predicate.error ).toBe( "https://carbonldp.com/ns/v1/platform#error" );
		} );

		it( hasProperty(
			STATIC,
			"httpStatusCode",
			"string"
		), ():void => {
			expect( C.Predicate.httpStatusCode ).toBeDefined();
			expect( Utils.isString( C.Predicate.httpStatusCode ) ).toBe( true );

			expect( C.Predicate.httpStatusCode ).toBe( "https://carbonldp.com/ns/v1/platform#httpStatusCode" );
		} );

		it( hasProperty(
			STATIC,
			"carbonCode",
			"string"
		), ():void => {
			expect( C.Predicate.carbonCode ).toBeDefined();
			expect( Utils.isString( C.Predicate.carbonCode ) ).toBe( true );

			expect( C.Predicate.carbonCode ).toBe( "https://carbonldp.com/ns/v1/platform#carbonCode" );
		} );

		it( hasProperty(
			STATIC,
			"message",
			"string"
		), ():void => {
			expect( C.Predicate.message ).toBeDefined();
			expect( Utils.isString( C.Predicate.message ) ).toBe( true );

			expect( C.Predicate.message ).toBe( "https://carbonldp.com/ns/v1/platform#message" );
		} );

		it( hasProperty(
			STATIC,
			"resource",
			"string"
		), ():void => {
			expect( C.Predicate.resource ).toBeDefined();
			expect( Utils.isString( C.Predicate.resource ) ).toBe( true );

			expect( C.Predicate.resource ).toBe( "https://carbonldp.com/ns/v1/platform#resource" );
		} );

		it( hasProperty(
			STATIC,
			"eTag",
			"string"
		), ():void => {
			expect( C.Predicate.eTag ).toBeDefined();
			expect( Utils.isString( C.Predicate.eTag ) ).toBe( true );

			expect( C.Predicate.eTag ).toBe( "https://carbonldp.com/ns/v1/platform#eTag" );
		} );

		it( hasProperty(
			STATIC,
			"requestID",
			"string"
		), ():void => {
			expect( C.Predicate.requestID ).toBeDefined();
			expect( Utils.isString( C.Predicate.requestID ) ).toBe( true );

			expect( C.Predicate.requestID ).toBe( "https://carbonldp.com/ns/v1/platform#requestID" );
		} );

		it( hasProperty(
			STATIC,
			"value",
			"string"
		), ():void => {
			expect( C.Predicate.value ).toBeDefined();
			expect( Utils.isString( C.Predicate.value ) ).toBe( true );

			expect( C.Predicate.value ).toBe( "https://carbonldp.com/ns/v1/platform#value" );
		} );

		it( hasProperty(
			STATIC,
			"version",
			"string"
		), ():void => {
			expect( C.Predicate.version ).toBeDefined();
			expect( Utils.isString( C.Predicate.version ) ).toBe( true );

			expect( C.Predicate.version ).toBe( "https://carbonldp.com/ns/v1/platform#version" );
		} );

	} );

} );
