import {
	isDefined,
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";

import * as Messaging from "./";

import { AccessPointCreated } from "./AccessPointCreated";
import { ChildCreated } from "./ChildCreated";
import { MessagingDocument } from "./Document";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberAddedDetails } from "./MemberAddedDetails";
import { MemberDetails } from "./MemberDetails";
import { MemberRemoved } from "./MemberRemoved";
import { MemberRemovedDetails } from "./MemberRemovedDetails";
import { MessagingOptions } from "./Options";
import { MessagingService } from "./Service";
import {
	createDestination,
	parseURIPattern,
	validateEventContext,
	validateEventType,
} from "./Utils";


describe( module( "carbonldp/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"AccessPointCreated",
		"CarbonLDP.Messaging.AccessPointCreated"
	), ():void => {
		expect( Messaging.AccessPointCreated ).toBeDefined();
		expect( Messaging.AccessPointCreated ).toBe( AccessPointCreated );
	} );

	it( reexports(
		STATIC,
		"ChildCreated",
		"CarbonLDP.Messaging.ChildCreated"
	), ():void => {
		expect( Messaging.ChildCreated ).toBeDefined();
		expect( Messaging.ChildCreated ).toBe( ChildCreated );
	} );

	it( reexports(
		STATIC,
		"MessagingDocument",
		"CarbonLDP.Messaging.MessagingDocument"
	), ():void => {
		expect( Messaging.MessagingDocument ).toBeDefined();
		expect( Messaging.MessagingDocument ).toBe( MessagingDocument );
	} );

	it( reexports(
		STATIC,
		"DocumentCreated",
		"CarbonLDP.Messaging.DocumentCreated"
	), ():void => {
		expect( Messaging.DocumentCreated ).toBeDefined();
		expect( Messaging.DocumentCreated ).toBe( DocumentCreated );
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedDetails",
		"CarbonLDP.Messaging.DocumentCreatedDetails"
	), ():void => {
		expect( Messaging.DocumentCreatedDetails ).toBeDefined();
		expect( Messaging.DocumentCreatedDetails ).toBe( DocumentCreatedDetails );
	} );

	it( reexports(
		STATIC,
		"DocumentDeleted",
		"CarbonLDP.Messaging.DocumentDeleted"
	), ():void => {
		expect( Messaging.DocumentDeleted ).toBeDefined();
		expect( Messaging.DocumentDeleted ).toBe( DocumentDeleted );
	} );

	it( reexports(
		STATIC,
		"DocumentModified",
		"CarbonLDP.Messaging.DocumentModified"
	), ():void => {
		expect( Messaging.DocumentModified ).toBeDefined();
		expect( Messaging.DocumentModified ).toBe( DocumentModified );
	} );

	it( reexports(
		STATIC,
		"Event",
		"CarbonLDP.Messaging.Event"
	), ():void => {
		expect( Messaging.Event ).toBeDefined();
		expect( Messaging.Event ).toBe( Event );
	} );

	it( reexports(
		STATIC,
		"MemberAdded",
		"CarbonLDP.Messaging.MemberAdded"
	), ():void => {
		expect( Messaging.MemberAdded ).toBeDefined();
		expect( Messaging.MemberAdded ).toBe( MemberAdded );
	} );

	it( reexports(
		STATIC,
		"MemberAddedDetails",
		"CarbonLDP.Messaging.MemberAddedDetails"
	), ():void => {
		expect( Messaging.MemberAddedDetails ).toBeDefined();
		expect( Messaging.MemberAddedDetails ).toBe( MemberAddedDetails );
	} );

	it( reexports(
		STATIC,
		"MemberDetails",
		"CarbonLDP.Messaging.MemberDetails"
	), ():void => {
		expect( Messaging.MemberDetails ).toBeDefined();
		expect( Messaging.MemberDetails ).toBe( MemberDetails );
	} );

	it( reexports(
		STATIC,
		"MemberRemoved",
		"CarbonLDP.Messaging.MemberRemoved"
	), ():void => {
		expect( Messaging.MemberRemoved ).toBeDefined();
		expect( Messaging.MemberRemoved ).toBe( MemberRemoved );
	} );

	it( reexports(
		STATIC,
		"MemberRemovedDetails",
		"CarbonLDP.Messaging.MemberRemovedDetails"
	), ():void => {
		expect( Messaging.MemberRemovedDetails ).toBeDefined();
		expect( Messaging.MemberRemovedDetails ).toBe( MemberRemovedDetails );
	} );

	it( reexports(
		STATIC,
		"EventMessage",
		"CarbonLDP.Messaging.EventMessage"
	), ():void => {
		expect( Messaging.EventMessage ).toBeDefined();
		expect( Messaging.EventMessage ).toBe( EventMessage );
	} );

	it( reexports(
		STATIC,
		"MessagingOptions",
		"CarbonLDP.Messaging.MessagingOptions"
	), ():void => {
		const target:Messaging.MessagingOptions = {} as MessagingOptions;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MessagingService",
		"CarbonLDP.Messaging.MessagingService"
	), ():void => {
		expect( Messaging.MessagingService ).toBeDefined();
		expect( Messaging.MessagingService ).toBe( MessagingService );
	} );

	it( reexports(
		STATIC,
		"validateEventType",
		"CarbonLDP.Messaging#validateEventType"
	), ():void => {
		expect( Messaging.validateEventType ).toBeDefined();
		expect( Messaging.validateEventType ).toBe( validateEventType );
	} );

	it( reexports(
		STATIC,
		"validateEventContext",
		"CarbonLDP.Messaging#validateEventContext"
	), ():void => {
		expect( Messaging.validateEventContext ).toBeDefined();
		expect( Messaging.validateEventContext ).toBe( validateEventContext );
	} );

	it( reexports(
		STATIC,
		"parseURIPattern",
		"CarbonLDP.Messaging#parseURIPattern"
	), ():void => {
		expect( Messaging.parseURIPattern ).toBeDefined();
		expect( Messaging.parseURIPattern ).toBe( parseURIPattern );
	} );

	it( reexports(
		STATIC,
		"createDestination",
		"CarbonLDP.Messaging#createDestination"
	), ():void => {
		expect( Messaging.createDestination ).toBeDefined();
		expect( Messaging.createDestination ).toBe( createDestination );
	} );

} );
