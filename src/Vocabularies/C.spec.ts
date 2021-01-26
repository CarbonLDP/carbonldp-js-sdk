import { C } from "./C";


describe( "C", ():void => {

	it( "should exist", ():void => {
		expect( C ).toEqual( jasmine.any( Object ) );
	} );

	it( "should test all exported IRIs", ():void => {
		expect( Object.keys( C ).length ).toBe( 67 );
	} );


	it( "C.namespace", ():void => {
		expect( C.namespace ).toEqual( jasmine.any( String ) );
		expect( C.namespace ).toBe( "https://carbonldp.com/ns/v1/platform#" );
	} );

	it( "C.AccessPoint", ():void => {
		expect( C.AccessPoint ).toEqual( jasmine.any( String ) );
		expect( C.AccessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#AccessPoint" );
	} );

	it( "C.AddMemberAction", ():void => {
		expect( C.AddMemberAction ).toEqual( jasmine.any( String ) );
		expect( C.AddMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#AddMemberAction" );
	} );

	it( "C.ChildCreatedEvent", ():void => {
		expect( C.ChildCreatedEvent ).toEqual( jasmine.any( String ) );
		expect( C.ChildCreatedEvent ).toBe( "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" );
	} );

	it( "C.Document", ():void => {
		expect( C.Document ).toEqual( jasmine.any( String ) );
		expect( C.Document ).toBe( "https://carbonldp.com/ns/v1/platform#Document" );
	} );

	it( "C.DocumentCreatedEventDetails", ():void => {
		expect( C.DocumentCreatedEventDetails ).toEqual( jasmine.any( String ) );
		expect( C.DocumentCreatedEventDetails ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentCreatedEventDetails" );
	} );

	it( "C.DocumentDeletedEvent", ():void => {
		expect( C.DocumentDeletedEvent ).toEqual( jasmine.any( String ) );
		expect( C.DocumentDeletedEvent ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentDeletedEvent" );
	} );

	it( "C.DocumentMetadata", ():void => {
		expect( C.DocumentMetadata ).toEqual( jasmine.any( String ) );
		expect( C.DocumentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentMetadata" );
	} );

	it( "C.DocumentModifiedEvent", ():void => {
		expect( C.DocumentModifiedEvent ).toEqual( jasmine.any( String ) );
		expect( C.DocumentModifiedEvent ).toBe( "https://carbonldp.com/ns/v1/platform#DocumentModifiedEvent" );
	} );

	it( "C.ErrorResponse", ():void => {
		expect( C.ErrorResponse ).toEqual( jasmine.any( String ) );
		expect( C.ErrorResponse ).toBe( "https://carbonldp.com/ns/v1/platform#ErrorResponse" );
	} );

	it( "C.Error", ():void => {
		expect( C.Error ).toEqual( jasmine.any( String ) );
		expect( C.Error ).toBe( "https://carbonldp.com/ns/v1/platform#Error" );
	} );

	it( "C.Instance", ():void => {
		expect( C.Instance ).toEqual( jasmine.any( String ) );
		expect( C.Instance ).toBe( "https://carbonldp.com/ns/v1/platform#Instance" );
	} );

	it( "C.Map", ():void => {
		expect( C.Map ).toEqual( jasmine.any( String ) );
		expect( C.Map ).toBe( "https://carbonldp.com/ns/v1/platform#Map" );
	} );

	it( "C.MemberAddedEvent", ():void => {
		expect( C.MemberAddedEvent ).toEqual( jasmine.any( String ) );
		expect( C.MemberAddedEvent ).toBe( "https://carbonldp.com/ns/v1/platform#MemberAddedEvent" );
	} );

	it( "C.MemberAddedEventDetails", ():void => {
		expect( C.MemberAddedEventDetails ).toEqual( jasmine.any( String ) );
		expect( C.MemberAddedEventDetails ).toBe( "https://carbonldp.com/ns/v1/platform#MemberAddedEventDetails" );
	} );

	it( "C.MemberRemovedEvent", ():void => {
		expect( C.MemberRemovedEvent ).toEqual( jasmine.any( String ) );
		expect( C.MemberRemovedEvent ).toBe( "https://carbonldp.com/ns/v1/platform#MemberRemovedEvent" );
	} );

	it( "C.MemberRemovedEventDetails", ():void => {
		expect( C.MemberRemovedEventDetails ).toEqual( jasmine.any( String ) );
		expect( C.MemberRemovedEventDetails ).toBe( "https://carbonldp.com/ns/v1/platform#MemberRemovedEventDetails" );
	} );

	it( "C.NonReadableMembershipResourceTriples", ():void => {
		expect( C.NonReadableMembershipResourceTriples ).toEqual( jasmine.any( String ) );
		expect( C.NonReadableMembershipResourceTriples ).toBe( "https://carbonldp.com/ns/v1/platform#NonReadableMembershipResourceTriples" );
	} );

	it( "C.Platform", ():void => {
		expect( C.Platform ).toEqual( jasmine.any( String ) );
		expect( C.Platform ).toBe( "https://carbonldp.com/ns/v1/platform#Platform" );
	} );

	it( "C.PlatformInstance", ():void => {
		expect( C.PlatformInstance ).toEqual( jasmine.any( String ) );
		expect( C.PlatformInstance ).toBe( "https://carbonldp.com/ns/v1/platform#PlatformInstance" );
	} );

	it( "C.PreferContainer", ():void => {
		expect( C.PreferContainer ).toEqual( jasmine.any( String ) );
		expect( C.PreferContainer ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainer" );
	} );

	it( "C.PreferContainmentResources", ():void => {
		expect( C.PreferContainmentResources ).toEqual( jasmine.any( String ) );
		expect( C.PreferContainmentResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentResources" );
	} );

	it( "C.PreferContainmentTriples", ():void => {
		expect( C.PreferContainmentTriples ).toEqual( jasmine.any( String ) );
		expect( C.PreferContainmentTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferContainmentTriples" );
	} );

	it( "C.PreferDocumentChecksums", ():void => {
		expect( C.PreferDocumentChecksums ).toEqual( jasmine.any( String ) );
		expect( C.PreferDocumentChecksums ).toBe( "https://carbonldp.com/ns/v1/platform#PreferDocumentChecksums" );
	} );

	it( "C.PreferMembershipResources", ():void => {
		expect( C.PreferMembershipResources ).toEqual( jasmine.any( String ) );
		expect( C.PreferMembershipResources ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipResources" );
	} );

	it( "C.PreferMembershipTriples", ():void => {
		expect( C.PreferMembershipTriples ).toEqual( jasmine.any( String ) );
		expect( C.PreferMembershipTriples ).toBe( "https://carbonldp.com/ns/v1/platform#PreferMembershipTriples" );
	} );

	it( "C.PreferResultsContexts", ():void => {
		expect( C.PreferResultsContexts ).toEqual( jasmine.any( String ) );
		expect( C.PreferResultsContexts ).toBe( "https://carbonldp.com/ns/v1/platform#PreferResultsContexts" );
	} );

	it( "C.QueryMetadata", ():void => {
		expect( C.QueryMetadata ).toEqual( jasmine.any( String ) );
		expect( C.QueryMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#QueryMetadata" );
	} );

	it( "C.RemoveMemberAction", ():void => {
		expect( C.RemoveMemberAction ).toEqual( jasmine.any( String ) );
		expect( C.RemoveMemberAction ).toBe( "https://carbonldp.com/ns/v1/platform#RemoveMemberAction" );
	} );

	it( "C.ResponseMetadata", ():void => {
		expect( C.ResponseMetadata ).toEqual( jasmine.any( String ) );
		expect( C.ResponseMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#ResponseMetadata" );
	} );

	it( "C.ValidationError", ():void => {
		expect( C.ValidationError ).toEqual( jasmine.any( String ) );
		expect( C.ValidationError ).toBe( "https://carbonldp.com/ns/v1/platform#ValidationError" );
	} );

	it( "C.VolatileResource", ():void => {
		expect( C.VolatileResource ).toEqual( jasmine.any( String ) );
		expect( C.VolatileResource ).toBe( "https://carbonldp.com/ns/v1/platform#VolatileResource" );
	} );


	it( "C.accessPoint", ():void => {
		expect( C.accessPoint ).toEqual( jasmine.any( String ) );
		expect( C.accessPoint ).toBe( "https://carbonldp.com/ns/v1/platform#accessPoint" );
	} );

	it( "C.bNodesMap", ():void => {
		expect( C.bNodesMap ).toEqual( jasmine.any( String ) );
		expect( C.bNodesMap ).toBe( "https://carbonldp.com/ns/v1/platform#bNodesMap" );
	} );

	it( "C.buildDate", ():void => {
		expect( C.buildDate ).toEqual( jasmine.any( String ) );
		expect( C.buildDate ).toBe( "https://carbonldp.com/ns/v1/platform#buildDate" );
	} );

	it( "C.checksum", ():void => {
		expect( C.checksum ).toEqual( jasmine.any( String ) );
		expect( C.checksum ).toBe( "https://carbonldp.com/ns/v1/platform#checksum" );
	} );

	it( "C.created", ():void => {
		expect( C.created ).toEqual( jasmine.any( String ) );
		expect( C.created ).toBe( "https://carbonldp.com/ns/v1/platform#created" );
	} );

	it( "C.createdDocument", ():void => {
		expect( C.createdDocument ).toEqual( jasmine.any( String ) );
		expect( C.createdDocument ).toBe( "https://carbonldp.com/ns/v1/platform#createdDocument" );
	} );

	it( "C.details", ():void => {
		expect( C.details ).toEqual( jasmine.any( String ) );
		expect( C.details ).toBe( "https://carbonldp.com/ns/v1/platform#details" );
	} );

	it( "C.defaultInteractionModel", ():void => {
		expect( C.defaultInteractionModel ).toEqual( jasmine.any( String ) );
		expect( C.defaultInteractionModel ).toBe( "https://carbonldp.com/ns/v1/platform#defaultInteractionModel" );
	} );

	it( "C.document", ():void => {
		expect( C.document ).toEqual( jasmine.any( String ) );
		expect( C.document ).toBe( "https://carbonldp.com/ns/v1/platform#document" );
	} );

	it( "C.documentMetadata", ():void => {
		expect( C.documentMetadata ).toEqual( jasmine.any( String ) );
		expect( C.documentMetadata ).toBe( "https://carbonldp.com/ns/v1/platform#documentMetadata" );
	} );

	it( "C.entry", ():void => {
		expect( C.entry ).toEqual( jasmine.any( String ) );
		expect( C.entry ).toBe( "https://carbonldp.com/ns/v1/platform#entry" );
	} );

	it( "C.entryKey", ():void => {
		expect( C.entryKey ).toEqual( jasmine.any( String ) );
		expect( C.entryKey ).toBe( "https://carbonldp.com/ns/v1/platform#entryKey" );
	} );

	it( "C.modified", ():void => {
		expect( C.modified ).toEqual( jasmine.any( String ) );
		expect( C.modified ).toBe( "https://carbonldp.com/ns/v1/platform#modified" );
	} );


	it( "C.mediaType", ():void => {
		expect( C.mediaType ).toEqual( jasmine.any( String ) );
		expect( C.mediaType ).toBe( "https://carbonldp.com/ns/v1/platform#mediaType" );
	} );


	it( "C.size", ():void => {
		expect( C.size ).toEqual( jasmine.any( String ) );
		expect( C.size ).toBe( "https://carbonldp.com/ns/v1/platform#size" );
	} );

	it( "C.error", ():void => {
		expect( C.error ).toEqual( jasmine.any( String ) );
		expect( C.error ).toBe( "https://carbonldp.com/ns/v1/platform#error" );
	} );

	it( "C.errorCode", ():void => {
		expect( C.errorCode ).toEqual( jasmine.any( String ) );
		expect( C.errorCode ).toBe( "https://carbonldp.com/ns/v1/platform#errorCode" );
	} );

	it( "C.errorDetails", ():void => {
		expect( C.errorDetails ).toEqual( jasmine.any( String ) );
		expect( C.errorDetails ).toBe( "https://carbonldp.com/ns/v1/platform#errorDetails" );
	} );

	it( "C.member", ():void => {
		expect( C.member ).toEqual( jasmine.any( String ) );
		expect( C.member ).toBe( "https://carbonldp.com/ns/v1/platform#member" );
	} );

	it( "C.errorMessage", ():void => {
		expect( C.errorMessage ).toEqual( jasmine.any( String ) );
		expect( C.errorMessage ).toBe( "https://carbonldp.com/ns/v1/platform#errorMessage" );
	} );

	it( "C.errorParameters", ():void => {
		expect( C.errorParameters ).toEqual( jasmine.any( String ) );
		expect( C.errorParameters ).toBe( "https://carbonldp.com/ns/v1/platform#errorParameters" );
	} );

	it( "C.httpStatusCode", ():void => {
		expect( C.httpStatusCode ).toEqual( jasmine.any( String ) );
		expect( C.httpStatusCode ).toBe( "https://carbonldp.com/ns/v1/platform#httpStatusCode" );
	} );

	it( "C.instance", ():void => {
		expect( C.instance ).toEqual( jasmine.any( String ) );
		expect( C.instance ).toBe( "https://carbonldp.com/ns/v1/platform#instance" );
	} );

	it( "C.relatedDocument", ():void => {
		expect( C.relatedDocument ).toEqual( jasmine.any( String ) );
		expect( C.relatedDocument ).toBe( "https://carbonldp.com/ns/v1/platform#relatedDocument" );
	} );

	it( "C.requestID", ():void => {
		expect( C.requestID ).toEqual( jasmine.any( String ) );
		expect( C.requestID ).toBe( "https://carbonldp.com/ns/v1/platform#requestID" );
	} );

	it( "C.entryValue", ():void => {
		expect( C.entryValue ).toEqual( jasmine.any( String ) );
		expect( C.entryValue ).toBe( "https://carbonldp.com/ns/v1/platform#entryValue" );
	} );

	it( "C.version", ():void => {
		expect( C.version ).toEqual( jasmine.any( String ) );
		expect( C.version ).toBe( "https://carbonldp.com/ns/v1/platform#version" );
	} );

	it( "C.target", ():void => {
		expect( C.target ).toEqual( jasmine.any( String ) );
		expect( C.target ).toBe( "https://carbonldp.com/ns/v1/platform#target" );
	} );

	it( "C.targetMember", ():void => {
		expect( C.targetMember ).toEqual( jasmine.any( String ) );
		expect( C.targetMember ).toBe( "https://carbonldp.com/ns/v1/platform#targetMember" );
	} );

} );
