import {
	hasProperty,
	INSTANCE,
	module,
	namespaze,
} from "../test/JasmineExtender";

import { C } from "./C";

describe( module( "carbonldp/Vocabularies/C" ), ():void => {

	describe( namespaze( "CarbonLDP.Vocabularies.C", "The vocabulary of Carbon LDP." ), ():void => {

		it( "should exists", ():void => {
			expect( C ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( C ).length ).toBe( 60 );
		} );

		it( hasProperty(
			INSTANCE,
			"namespace",
			"string"
		), ():void => {
			expect( C.namespace ).toEqual( jasmine.any( String ) );
			expect( C.namespace ).toBe( "https://carbonldp.com/ns/v1/platform#" );
		} );

		it( hasProperty(
			INSTANCE,
			"AccessPoint",
			"string"
		), ():void => {
			expect( C.AccessPoint ).toEqual( jasmine.any( String ) );
			expect( C.AccessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#AccessPoint" );
		} );

		it( hasProperty(
			INSTANCE,
			"AccessPointCreated",
			"string"
		), ():void => {
			expect( C.AccessPointCreated ).toEqual( jasmine.any( String ) );
			expect( C.AccessPointCreated ).toBe( "https://carbonldp.com/ns/v1/platform#AccessPointCreated" );
		} );

		it( hasProperty(
			INSTANCE,
			"AddMemberAction",
			"string"
		), ():void => {
			expect( C.AddMemberAction ).toEqual( jasmine.any( String ) );
			expect( C.AddMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#AddMemberAction" );
		} );

		it( hasProperty(
			INSTANCE,
			"ChildCreated",
			"string"
		), ():void => {
			expect( C.ChildCreated ).toEqual( jasmine.any( String ) );
			expect( C.ChildCreated ).toBe( "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" );
		} );

		it( hasProperty(
			INSTANCE,
			"Document",
			"string"
		), ():void => {
			expect( C.Document ).toEqual( jasmine.any( String ) );
			expect( C.Document ).toBe( "https://carbonldp.com/ns/v1/platform#Document" );
		} );

		it( hasProperty(
			INSTANCE,
			"DocumentCreatedDetails",
			"string"
		), ():void => {
			expect( C.DocumentCreatedDetails ).toEqual( jasmine.any( String ) );
			expect( C.DocumentCreatedDetails ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentCreatedEventDetails" );
		} );

		it( hasProperty(
			INSTANCE,
			"DocumentDeleted",
			"string"
		), ():void => {
			expect( C.DocumentDeleted ).toEqual( jasmine.any( String ) );
			expect( C.DocumentDeleted ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentDeleted" );
		} );

		it( hasProperty(
			INSTANCE,
			"DocumentMetadata",
			"string"
		), ():void => {
			expect( C.DocumentMetadata ).toEqual( jasmine.any( String ) );
			expect( C.DocumentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentMetadata" );
		} );

		it( hasProperty(
			INSTANCE,
			"DocumentModified",
			"string"
		), ():void => {
			expect( C.DocumentModified ).toEqual( jasmine.any( String ) );
			expect( C.DocumentModified ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentModified" );
		} );

		it( hasProperty(
			INSTANCE,
			"ErrorResponse",
			"string"
		), ():void => {
			expect( C.ErrorResponse ).toEqual( jasmine.any( String ) );
			expect( C.ErrorResponse ).toBe( "https://carbonldp.com/ns/v1/platform#ErrorResponse" );
		} );

		it( hasProperty(
			INSTANCE,
			"Error",
			"string"
		), ():void => {
			expect( C.Error ).toEqual( jasmine.any( String ) );
			expect( C.Error ).toBe( "https://carbonldp.com/ns/v1/platform#Error" );
		} );

		it( hasProperty(
			INSTANCE,
			"Instance",
			"string"
		), ():void => {
			expect( C.Instance ).toEqual( jasmine.any( String ) );
			expect( C.Instance ).toBe( "https://carbonldp.com/ns/v1/platform#Instance" );
		} );

		it( hasProperty(
			INSTANCE,
			"Map",
			"string"
		), ():void => {
			expect( C.Map ).toEqual( jasmine.any( String ) );
			expect( C.Map ).toBe( "https://carbonldp.com/ns/v1/platform#Map" );
		} );

		it( hasProperty(
			INSTANCE,
			"MemberAdded",
			"string"
		), ():void => {
			expect( C.MemberAdded ).toEqual( jasmine.any( String ) );
			expect( C.MemberAdded ).toBe( "https://carbonldp.com/ns/v1/platform#MemberAddedEvent" );
		} );

		it( hasProperty(
			INSTANCE,
			"MemberAddedDetails",
			"string"
		), ():void => {
			expect( C.MemberAddedDetails ).toEqual( jasmine.any( String ) );
			expect( C.MemberAddedDetails ).toBe( "https://carbonldp.com/ns/v1/platform#MemberAddedEventDetails" );
		} );

		it( hasProperty(
			INSTANCE,
			"MemberRemoved",
			"string"
		), ():void => {
			expect( C.MemberRemoved ).toEqual( jasmine.any( String ) );
			expect( C.MemberRemoved ).toBe( "https://carbonldp.com/ns/v1/platform#MemberRemovedEvent" );
		} );

		it( hasProperty(
			INSTANCE,
			"MemberRemovedDetails",
			"string"
		), ():void => {
			expect( C.MemberRemovedDetails ).toEqual( jasmine.any( String ) );
			expect( C.MemberRemovedDetails ).toBe( "https://carbonldp.com/ns/v1/platform#MemberRemovedEventDetails" );
		} );

		it( hasProperty(
			INSTANCE,
			"NonReadableMembershipResourceTriples",
			"string"
		), ():void => {
			expect( C.NonReadableMembershipResourceTriples ).toEqual( jasmine.any( String ) );
			expect( C.NonReadableMembershipResourceTriples ).toBe( "https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples" );
		} );

		it( hasProperty(
			INSTANCE,
			"Platform",
			"string"
		), ():void => {
			expect( C.Platform ).toEqual( jasmine.any( String ) );
			expect( C.Platform ).toBe( "https://carbonldp.com/ns/v1/platform#Platform" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferContainer",
			"string"
		), ():void => {
			expect( C.PreferContainer ).toEqual( jasmine.any( String ) );
			expect( C.PreferContainer ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainer" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferContainmentResources",
			"string"
		), ():void => {
			expect( C.PreferContainmentResources ).toEqual( jasmine.any( String ) );
			expect( C.PreferContainmentResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentResources" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferContainmentTriples",
			"string"
		), ():void => {
			expect( C.PreferContainmentTriples ).toEqual( jasmine.any( String ) );
			expect( C.PreferContainmentTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentTriples" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferDocumentETags",
			"string"
		), ():void => {
			expect( C.PreferDocumentETags ).toEqual( jasmine.any( String ) );
			expect( C.PreferDocumentETags ).toBe( "https://carbonldp.com/ns/v1/platform#PreferDocumentETags" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferMembershipResources",
			"string"
		), ():void => {
			expect( C.PreferMembershipResources ).toEqual( jasmine.any( String ) );
			expect( C.PreferMembershipResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipResources" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferMembershipTriples",
			"string"
		), ():void => {
			expect( C.PreferMembershipTriples ).toEqual( jasmine.any( String ) );
			expect( C.PreferMembershipTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipTriples" );
		} );

		it( hasProperty(
			INSTANCE,
			"PreferResultsContext",
			"string"
		), ():void => {
			expect( C.PreferResultsContext ).toEqual( jasmine.any( String ) );
			expect( C.PreferResultsContext ).toBe( "https://carbonldp.com/ns/v1/platform#PreferResultsContext" );
		} );

		it( hasProperty(
			INSTANCE,
			"QueryMetadata",
			"string"
		), ():void => {
			expect( C.QueryMetadata ).toEqual( jasmine.any( String ) );
			expect( C.QueryMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#QueryMetadata" );
		} );

		it( hasProperty(
			INSTANCE,
			"RemoveMemberAction",
			"string"
		), ():void => {
			expect( C.RemoveMemberAction ).toEqual( jasmine.any( String ) );
			expect( C.RemoveMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#RemoveMemberAction" );
		} );

		it( hasProperty(
			INSTANCE,
			"ResponseMetadata",
			"string"
		), ():void => {
			expect( C.ResponseMetadata ).toEqual( jasmine.any( String ) );
			expect( C.ResponseMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#ResponseMetadata" );
		} );

		it( hasProperty(
			INSTANCE,
			"ValidationError",
			"string"
		), ():void => {
			expect( C.ValidationError ).toEqual( jasmine.any( String ) );
			expect( C.ValidationError ).toBe( "https://carbonldp.com/ns/v1/platform#ValidationError" );
		} );

		it( hasProperty(
			INSTANCE,
			"VolatileResource",
			"string"
		), ():void => {
			expect( C.VolatileResource ).toEqual( jasmine.any( String ) );
			expect( C.VolatileResource ).toBe( "https://carbonldp.com/ns/v1/platform#VolatileResource" );
		} );


		it( hasProperty(
			INSTANCE,
			"accessPoint",
			"string"
		), ():void => {
			expect( C.accessPoint ).toEqual( jasmine.any( String ) );
			expect( C.accessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#accessPoint" );
		} );

		it( hasProperty(
			INSTANCE,
			"bNodesMap",
			"string"
		), ():void => {
			expect( C.bNodesMap ).toEqual( jasmine.any( String ) );
			expect( C.bNodesMap ).toBe( "https://carbonldp.com/ns/v1/platform#bNodesMap" );
		} );

		it( hasProperty(
			INSTANCE,
			"buildDate",
			"string"
		), ():void => {
			expect( C.buildDate ).toEqual( jasmine.any( String ) );
			expect( C.buildDate ).toBe( "https://carbonldp.com/ns/v1/platform#buildDate" );
		} );

		it( hasProperty(
			INSTANCE,
			"created",
			"string"
		), ():void => {
			expect( C.created ).toEqual( jasmine.any( String ) );
			expect( C.created ).toBe( "https://carbonldp.com/ns/v1/platform#created" );
		} );

		it( hasProperty(
			INSTANCE,
			"createdDocument",
			"string"
		), ():void => {
			expect( C.createdDocument ).toEqual( jasmine.any( String ) );
			expect( C.createdDocument ).toBe( "https://carbonldp.com/ns/v1/platform#createdDocument" );
		} );

		it( hasProperty(
			INSTANCE,
			"details",
			"string"
		), ():void => {
			expect( C.details ).toEqual( jasmine.any( String ) );
			expect( C.details ).toBe( "https://carbonldp.com/ns/v1/platform#details" );
		} );

		it( hasProperty(
			INSTANCE,
			"defaultInteractionModel",
			"string"
		), ():void => {
			expect( C.defaultInteractionModel ).toEqual( jasmine.any( String ) );
			expect( C.defaultInteractionModel ).toBe( "https://carbonldp.com/ns/v1/platform#defaultInteractionModel" );
		} );

		it( hasProperty(
			INSTANCE,
			"documentMetadata",
			"string"
		), ():void => {
			expect( C.documentMetadata ).toEqual( jasmine.any( String ) );
			expect( C.documentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#documentMetadata" );
		} );

		it( hasProperty(
			INSTANCE,
			"entry",
			"string"
		), ():void => {
			expect( C.entry ).toEqual( jasmine.any( String ) );
			expect( C.entry ).toBe( "https://carbonldp.com/ns/v1/platform#entry" );
		} );

		it( hasProperty(
			INSTANCE,
			"entryKey",
			"string"
		), ():void => {
			expect( C.entryKey ).toEqual( jasmine.any( String ) );
			expect( C.entryKey ).toBe( "https://carbonldp.com/ns/v1/platform#key" );
		} );

		it( hasProperty(
			INSTANCE,
			"modified",
			"string"
		), ():void => {
			expect( C.modified ).toEqual( jasmine.any( String ) );
			expect( C.modified ).toBe( "https://carbonldp.com/ns/v1/platform#modified" );
		} );


		it( hasProperty(
			INSTANCE,
			"mediaType",
			"string"
		), ():void => {
			expect( C.mediaType ).toEqual( jasmine.any( String ) );
			expect( C.mediaType ).toBe( "https://carbonldp.com/ns/v1/platform#mediaType" );
		} );


		it( hasProperty(
			INSTANCE,
			"size",
			"string"
		), ():void => {
			expect( C.size ).toEqual( jasmine.any( String ) );
			expect( C.size ).toBe( "https://carbonldp.com/ns/v1/platform#size" );
		} );

		it( hasProperty(
			INSTANCE,
			"error",
			"string"
		), ():void => {
			expect( C.error ).toEqual( jasmine.any( String ) );
			expect( C.error ).toBe( "https://carbonldp.com/ns/v1/platform#error" );
		} );

		it( hasProperty(
			INSTANCE,
			"errorCode",
			"string"
		), ():void => {
			expect( C.errorCode ).toEqual( jasmine.any( String ) );
			expect( C.errorCode ).toBe( "https://carbonldp.com/ns/v1/platform#errorCode" );
		} );

		it( hasProperty(
			INSTANCE,
			"errorDetails",
			"string"
		), ():void => {
			expect( C.errorDetails ).toEqual( jasmine.any( String ) );
			expect( C.errorDetails ).toBe( "https://carbonldp.com/ns/v1/platform#errorDetails" );
		} );

		it( hasProperty(
			INSTANCE,
			"member",
			"string"
		), ():void => {
			expect( C.member ).toEqual( jasmine.any( String ) );
			expect( C.member ).toBe( "https://carbonldp.com/ns/v1/platform#member" );
		} );

		it( hasProperty(
			INSTANCE,
			"errorMessage",
			"string"
		), ():void => {
			expect( C.errorMessage ).toEqual( jasmine.any( String ) );
			expect( C.errorMessage ).toBe( "https://carbonldp.com/ns/v1/platform#errorMessage" );
		} );

		it( hasProperty(
			INSTANCE,
			"errorParameters",
			"string"
		), ():void => {
			expect( C.errorParameters ).toEqual( jasmine.any( String ) );
			expect( C.errorParameters ).toBe( "https://carbonldp.com/ns/v1/platform#errorParameters" );
		} );

		it( hasProperty(
			INSTANCE,
			"httpStatusCode",
			"string"
		), ():void => {
			expect( C.httpStatusCode ).toEqual( jasmine.any( String ) );
			expect( C.httpStatusCode ).toBe( "https://carbonldp.com/ns/v1/platform#httpStatusCode" );
		} );

		it( hasProperty(
			INSTANCE,
			"relatedDocument",
			"string"
		), ():void => {
			expect( C.relatedDocument ).toEqual( jasmine.any( String ) );
			expect( C.relatedDocument ).toBe( "https://carbonldp.com/ns/v1/platform#relatedDocument" );
		} );

		it( hasProperty(
			INSTANCE,
			"eTag",
			"string"
		), ():void => {
			expect( C.eTag ).toEqual( jasmine.any( String ) );
			expect( C.eTag ).toBe( "https://carbonldp.com/ns/v1/platform#eTag" );
		} );

		it( hasProperty(
			INSTANCE,
			"requestID",
			"string"
		), ():void => {
			expect( C.requestID ).toEqual( jasmine.any( String ) );
			expect( C.requestID ).toBe( "https://carbonldp.com/ns/v1/platform#requestID" );
		} );

		it( hasProperty(
			INSTANCE,
			"entryValue",
			"string"
		), ():void => {
			expect( C.entryValue ).toEqual( jasmine.any( String ) );
			expect( C.entryValue ).toBe( "https://carbonldp.com/ns/v1/platform#value" );
		} );

		it( hasProperty(
			INSTANCE,
			"version",
			"string"
		), ():void => {
			expect( C.version ).toEqual( jasmine.any( String ) );
			expect( C.version ).toBe( "https://carbonldp.com/ns/v1/platform#version" );
		} );

		it( hasProperty(
			INSTANCE,
			"target",
			"string"
		), ():void => {
			expect( C.target ).toEqual( jasmine.any( String ) );
			expect( C.target ).toBe( "https://carbonldp.com/ns/v1/platform#target" );
		} );

		it( hasProperty(
			INSTANCE,
			"targetMember",
			"string"
		), ():void => {
			expect( C.targetMember ).toEqual( jasmine.any( String ) );
			expect( C.targetMember ).toBe( "https://carbonldp.com/ns/v1/platform#targetMember" );
		} );

	} );

} );
