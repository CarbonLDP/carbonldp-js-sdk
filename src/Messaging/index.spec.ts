import { ChildCreatedEvent } from "./ChildCreatedEvent";
import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { DocumentDeletedEvent } from "./DocumentDeletedEvent";
import { DocumentModifiedEvent } from "./DocumentModifiedEvent";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import * as Module from "./index";
import { MemberAddedEvent } from "./MemberAddedEvent";
import { MemberAddedEventDetails } from "./MemberAddedEventDetails";
import { MemberEventDetails } from "./MemberEventDetails";
import { MemberRemovedEvent } from "./MemberRemovedEvent";
import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";
import { MessagingService } from "./MessagingService";
import * as Utils from "./Utils";

describe( "Messaging/index", () => {

	it( "should reexport ChildCreatedEvent", () => {
		expect( Module.ChildCreatedEvent ).toBeDefined();
		expect( Module.ChildCreatedEvent ).toBe( ChildCreatedEvent );
	} );

	it( "should reexport DocumentCreatedEventDetails", () => {
		expect( Module.DocumentCreatedEventDetails ).toBeDefined();
		expect( Module.DocumentCreatedEventDetails ).toBe( DocumentCreatedEventDetails );
	} );

	it( "should reexport DocumentDeletedEvent", () => {
		expect( Module.DocumentDeletedEvent ).toBeDefined();
		expect( Module.DocumentDeletedEvent ).toBe( DocumentDeletedEvent );
	} );

	it( "should reexport DocumentModifiedEvent", () => {
		expect( Module.DocumentModifiedEvent ).toBeDefined();
		expect( Module.DocumentModifiedEvent ).toBe( DocumentModifiedEvent );
	} );

	it( "should reexport Event", () => {
		expect( Module.Event ).toBeDefined();
		expect( Module.Event ).toBe( Event );
	} );

	it( "should reexport EventMessage", () => {
		expect( Module.EventMessage ).toBeDefined();
		expect( Module.EventMessage ).toBe( EventMessage );
	} );

	it( "should reexport MemberAddedEvent", () => {
		expect( Module.MemberAddedEvent ).toBeDefined();
		expect( Module.MemberAddedEvent ).toBe( MemberAddedEvent );
	} );

	it( "should reexport MemberAddedEventDetails", () => {
		expect( Module.MemberAddedEventDetails ).toBeDefined();
		expect( Module.MemberAddedEventDetails ).toBe( MemberAddedEventDetails );
	} );

	it( "should reexport MemberEventDetails", () => {
		expect( Module.MemberEventDetails ).toBeDefined();
		expect( Module.MemberEventDetails ).toBe( MemberEventDetails );
	} );

	it( "should reexport MemberRemovedEvent", () => {
		expect( Module.MemberRemovedEvent ).toBeDefined();
		expect( Module.MemberRemovedEvent ).toBe( MemberRemovedEvent );
	} );

	it( "should reexport MemberRemovedEventDetails", () => {
		expect( Module.MemberRemovedEventDetails ).toBeDefined();
		expect( Module.MemberRemovedEventDetails ).toBe( MemberRemovedEventDetails );
	} );

	it( "should reexport MessagingService", () => {
		expect( Module.MessagingService ).toBeDefined();
		expect( Module.MessagingService ).toBe( MessagingService );
	} );

	it( "should reexport _createDestination", () => {
		expect( Module._createDestination ).toBeDefined();
		expect( Module._createDestination ).toBe( Utils._createDestination );
	} );

	it( "should reexport _parseURIPattern", () => {
		expect( Module._parseURIPattern ).toBeDefined();
		expect( Module._parseURIPattern ).toBe( Utils._parseURIPattern );
	} );

	it( "should reexport _validateEventType", () => {
		expect( Module._validateEventType ).toBeDefined();
		expect( Module._validateEventType ).toBe( Utils._validateEventType );
	} );

} );
