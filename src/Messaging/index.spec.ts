import {
	isDefined,
	module,
	reexports,
	STATIC
} from "../test/JasmineExtender";

import * as Messaging from "./";

import {
	ChildCreated,
	ChildCreatedFactory,
} from "./ChildCreated";
import {
	DocumentCreated,
	DocumentCreatedFactory,
} from "./DocumentCreated";
import {
	DocumentCreatedDetails,
	DocumentCreatedDetailsFactory,
} from "./DocumentCreatedDetails";
import {
	DocumentDeleted,
	DocumentDeletedFactory,
} from "./DocumentDeleted";
import {
	DocumentModified,
	DocumentModifiedFactory,
} from "./DocumentModified";
import { Event } from "./Event";
import { EventEmitterDocumentTrait } from "../Document/Traits/EventEmitterDocumentTrait";
import {
	EventMessage,
	EventMessageFactory,
} from "./EventMessage";
import {
	MemberAdded,
	MemberAddedFactory,
} from "./MemberAdded";
import {
	MemberAddedDetails,
	MemberAddedDetailsFactory,
} from "./MemberAddedDetails";
import {
	MemberDetails,
	MemberDetailsFactory,
} from "./MemberDetails";
import {
	MemberRemoved,
	MemberRemovedFactory,
} from "./MemberRemoved";
import {
	MemberRemovedDetails,
	MemberRemovedDetailsFactory,
} from "./MemberRemovedDetails";
import { MessagingOptions } from "./Options";
import { MessagingService } from "./Service";
import {
	createDestination,
	parseURIPattern,
	validateEventType,
} from "./Utils";


describe( module( "carbonldp/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
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
		"ChildCreatedFactory",
		"CarbonLDP.Messaging.ChildCreatedFactory"
	), ():void => {
		const target:Messaging.ChildCreatedFactory = {} as ChildCreatedFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MessagingDocument",
		"CarbonLDP.Messaging.MessagingDocument"
	), ():void => {
		expect( Messaging.EventEmitterDocumentTrait ).toBeDefined();
		expect( Messaging.EventEmitterDocumentTrait ).toBe( EventEmitterDocumentTrait );
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
		"DocumentCreatedFactory",
		"CarbonLDP.Messaging.DocumentCreatedFactory"
	), ():void => {
		const target:Messaging.DocumentCreatedFactory = {} as DocumentCreatedFactory;
		expect( target ).toBeDefined();
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
		"DocumentCreatedDetailsFactory",
		"CarbonLDP.Messaging.DocumentCreatedDetailsFactory"
	), ():void => {
		const target:Messaging.DocumentCreatedDetailsFactory = {} as DocumentCreatedDetailsFactory;
		expect( target ).toBeDefined();
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
		"DocumentDeletedFactory",
		"CarbonLDP.Messaging.DocumentDeletedFactory"
	), ():void => {
		const target:Messaging.DocumentDeletedFactory = {} as DocumentDeletedFactory;
		expect( target ).toBeDefined();
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
		"DocumentModifiedFactory",
		"CarbonLDP.Messaging.DocumentModifiedFactory"
	), ():void => {
		const target:Messaging.DocumentModifiedFactory = {} as DocumentModifiedFactory;
		expect( target ).toBeDefined();
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
		"MemberAddedFactory",
		"CarbonLDP.Messaging.MemberAddedFactory"
	), ():void => {
		const target:Messaging.MemberAddedFactory = {} as MemberAddedFactory;
		expect( target ).toBeDefined();
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
		"MemberAddedDetailsFactory",
		"CarbonLDP.Messaging.MemberAddedDetailsFactory"
	), ():void => {
		const target:Messaging.MemberAddedDetailsFactory = {} as MemberAddedDetailsFactory;
		expect( target ).toBeDefined();
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
		"MemberDetailsFactory",
		"CarbonLDP.Messaging.MemberDetailsFactory"
	), ():void => {
		const target:Messaging.MemberDetailsFactory = {} as MemberDetailsFactory;
		expect( target ).toBeDefined();
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
		"MemberRemovedFactory",
		"CarbonLDP.Messaging.MemberRemovedFactory"
	), ():void => {
		const target:Messaging.MemberRemovedFactory = {} as MemberRemovedFactory;
		expect( target ).toBeDefined();
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
		"MemberRemovedDetailsFactory",
		"CarbonLDP.Messaging.MemberRemovedDetailsFactory"
	), ():void => {
		const target:Messaging.MemberRemovedDetailsFactory = {} as MemberRemovedDetailsFactory;
		expect( target ).toBeDefined();
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
		"EventMessageFactory",
		"CarbonLDP.Messaging.EventMessageFactory"
	), ():void => {
		const target:Messaging.EventMessageFactory = {} as EventMessageFactory;
		expect( target ).toBeDefined();
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
		"carbonldp/Messaging/Utils#validateEventType"
	), ():void => {
		expect( Messaging.validateEventType ).toBeDefined();
		expect( Messaging.validateEventType ).toBe( validateEventType );
	} );

	it( reexports(
		STATIC,
		"parseURIPattern",
		"carbonldp/Messaging/Utils#parseURIPattern"
	), ():void => {
		expect( Messaging.parseURIPattern ).toBeDefined();
		expect( Messaging.parseURIPattern ).toBe( parseURIPattern );
	} );

	it( reexports(
		STATIC,
		"createDestination",
		"carbonldp/Messaging/Utils#createDestination"
	), ():void => {
		expect( Messaging.createDestination ).toBeDefined();
		expect( Messaging.createDestination ).toBe( createDestination );
	} );

} );
