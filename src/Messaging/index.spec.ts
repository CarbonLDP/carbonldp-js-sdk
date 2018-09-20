import { isDefined, module, reexports, STATIC } from "../test/JasmineExtender";

import * as Messaging from "./";

import { ChildCreatedEvent, ChildCreatedEventFactory } from "./ChildCreatedEvent";
import { DocumentCreatedEvent, DocumentCreatedEventFactory } from "./DocumentCreatedEvent";
import { DocumentCreatedEventDetails, DocumentCreatedEventDetailsFactory } from "./DocumentCreatedEventDetails";
import { DocumentDeletedEvent, DocumentDeletedEventFactory } from "./DocumentDeletedEvent";
import { DocumentModifiedEvent, DocumentModifiedEventFactory } from "./DocumentModifiedEvent";
import { Event } from "./Event";
import { EventMessage, EventMessageFactory } from "./EventMessage";
import { MemberAddedEvent, MemberAddedEventFactory } from "./MemberAddedEvent";
import { MemberAddedEventDetails, MemberAddedEventDetailsFactory } from "./MemberAddedEventDetails";
import { MemberEventDetails, MemberEventDetailsFactory } from "./MemberEventDetails";
import { MemberRemovedEvent, MemberRemovedEventFactory } from "./MemberRemovedEvent";
import { MemberRemovedEventDetails, MemberRemovedEventDetailsFactory } from "./MemberRemovedEventDetails";
import { MessagingOptions } from "./MessagingOptions";
import { MessagingService } from "./MessagingService";
import { _createDestination, _parseURIPattern, _validateEventType } from "./Utils";


describe( module( "carbonldp/Messaging" ), ():void => {

	it( isDefined(), ():void => {
		expect( Messaging ).toBeDefined();
		expect( Messaging ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"ChildCreated",
		"CarbonLDP.Messaging.ChildCreatedEvent"
	), ():void => {
		expect( Messaging.ChildCreatedEvent ).toBeDefined();
		expect( Messaging.ChildCreatedEvent ).toBe( ChildCreatedEvent );
	} );

	it( reexports(
		STATIC,
		"ChildCreatedFactory",
		"CarbonLDP.Messaging.ChildCreatedEventFactory"
	), ():void => {
		const target:Messaging.ChildCreatedEventFactory = {} as ChildCreatedEventFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"DocumentCreated",
		"CarbonLDP.Messaging.DocumentCreatedEvent"
	), ():void => {
		expect( Messaging.DocumentCreatedEvent ).toBeDefined();
		expect( Messaging.DocumentCreatedEvent ).toBe( DocumentCreatedEvent );
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedFactory",
		"CarbonLDP.Messaging.DocumentCreatedEventFactory"
	), ():void => {
		const target:Messaging.DocumentCreatedEventFactory = {} as DocumentCreatedEventFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedDetails",
		"CarbonLDP.Messaging.DocumentCreatedEventDetails"
	), ():void => {
		expect( Messaging.DocumentCreatedEventDetails ).toBeDefined();
		expect( Messaging.DocumentCreatedEventDetails ).toBe( DocumentCreatedEventDetails );
	} );

	it( reexports(
		STATIC,
		"DocumentCreatedDetailsFactory",
		"CarbonLDP.Messaging.DocumentCreatedEventDetailsFactory"
	), ():void => {
		const target:Messaging.DocumentCreatedEventDetailsFactory = {} as DocumentCreatedEventDetailsFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"DocumentDeleted",
		"CarbonLDP.Messaging.DocumentDeletedEvent"
	), ():void => {
		expect( Messaging.DocumentDeletedEvent ).toBeDefined();
		expect( Messaging.DocumentDeletedEvent ).toBe( DocumentDeletedEvent );
	} );

	it( reexports(
		STATIC,
		"DocumentDeletedFactory",
		"CarbonLDP.Messaging.DocumentDeletedEventFactory"
	), ():void => {
		const target:Messaging.DocumentDeletedEventFactory = {} as DocumentDeletedEventFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"DocumentModified",
		"CarbonLDP.Messaging.DocumentModifiedEvent"
	), ():void => {
		expect( Messaging.DocumentModifiedEvent ).toBeDefined();
		expect( Messaging.DocumentModifiedEvent ).toBe( DocumentModifiedEvent );
	} );

	it( reexports(
		STATIC,
		"DocumentModifiedFactory",
		"CarbonLDP.Messaging.DocumentModifiedEventFactory"
	), ():void => {
		const target:Messaging.DocumentModifiedEventFactory = {} as DocumentModifiedEventFactory;
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
		"CarbonLDP.Messaging.MemberAddedEvent"
	), ():void => {
		expect( Messaging.MemberAddedEvent ).toBeDefined();
		expect( Messaging.MemberAddedEvent ).toBe( MemberAddedEvent );
	} );

	it( reexports(
		STATIC,
		"MemberAddedFactory",
		"CarbonLDP.Messaging.MemberAddedEventFactory"
	), ():void => {
		const target:Messaging.MemberAddedEventFactory = {} as MemberAddedEventFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MemberAddedDetails",
		"CarbonLDP.Messaging.MemberAddedEventDetails"
	), ():void => {
		expect( Messaging.MemberAddedEventDetails ).toBeDefined();
		expect( Messaging.MemberAddedEventDetails ).toBe( MemberAddedEventDetails );
	} );

	it( reexports(
		STATIC,
		"MemberAddedDetailsFactory",
		"CarbonLDP.Messaging.MemberAddedEventDetailsFactory"
	), ():void => {
		const target:Messaging.MemberAddedEventDetailsFactory = {} as MemberAddedEventDetailsFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MemberDetails",
		"CarbonLDP.Messaging.MemberEventDetails"
	), ():void => {
		expect( Messaging.MemberEventDetails ).toBeDefined();
		expect( Messaging.MemberEventDetails ).toBe( MemberEventDetails );
	} );

	it( reexports(
		STATIC,
		"MemberDetailsFactory",
		"CarbonLDP.Messaging.MemberEventDetailsFactory"
	), ():void => {
		const target:Messaging.MemberEventDetailsFactory = {} as MemberEventDetailsFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MemberRemoved",
		"CarbonLDP.Messaging.MemberRemovedEvent"
	), ():void => {
		expect( Messaging.MemberRemovedEvent ).toBeDefined();
		expect( Messaging.MemberRemovedEvent ).toBe( MemberRemovedEvent );
	} );

	it( reexports(
		STATIC,
		"MemberRemovedFactory",
		"CarbonLDP.Messaging.MemberRemovedEventFactory"
	), ():void => {
		const target:Messaging.MemberRemovedEventFactory = {} as MemberRemovedEventFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"MemberRemovedDetails",
		"CarbonLDP.Messaging.MemberRemovedEventDetails"
	), ():void => {
		expect( Messaging.MemberRemovedEventDetails ).toBeDefined();
		expect( Messaging.MemberRemovedEventDetails ).toBe( MemberRemovedEventDetails );
	} );

	it( reexports(
		STATIC,
		"MemberRemovedDetailsFactory",
		"CarbonLDP.Messaging.MemberRemovedEventDetailsFactory"
	), ():void => {
		const target:Messaging.MemberRemovedEventDetailsFactory = {} as MemberRemovedEventDetailsFactory;
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
		expect( Messaging._validateEventType ).toBeDefined();
		expect( Messaging._validateEventType ).toBe( _validateEventType );
	} );

	it( reexports(
		STATIC,
		"parseURIPattern",
		"carbonldp/Messaging/Utils#parseURIPattern"
	), ():void => {
		expect( Messaging._parseURIPattern ).toBeDefined();
		expect( Messaging._parseURIPattern ).toBe( _parseURIPattern );
	} );

	it( reexports(
		STATIC,
		"createDestination",
		"carbonldp/Messaging/Utils#createDestination"
	), ():void => {
		expect( Messaging._createDestination ).toBeDefined();
		expect( Messaging._createDestination ).toBe( _createDestination );
	} );

} );
