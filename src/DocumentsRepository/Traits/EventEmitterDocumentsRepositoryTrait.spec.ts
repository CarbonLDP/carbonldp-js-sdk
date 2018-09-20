import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { Event } from "../../Messaging/Event";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../../test/JasmineExtender";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";

import {
	EventEmitterDocumentsRepositoryTrait,
	EventEmitterDocumentsRepositoryTraitFactory
} from "./EventEmitterDocumentsRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/EventEmitterDocumentsRepositoryTrait" ), () => {

	let context:DocumentsContext;
	beforeEach( ():void => {
		context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTrait",
		"Documents repository with the implementation for event subscriptions."
	), () => {

		it( extendsClass( "CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:GeneralRepository<Document> = {} as EventEmitterDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:EventEmitterDocumentsRepositoryTrait[ "context" ] = {} as DocumentsContext;
			expect( target ).toBeDefined();
		} );


		function createMock():EventEmitterDocumentsRepositoryTrait {
			return EventEmitterDocumentsRepositoryTrait.decorate( { context } );
		}

		describe( method( OBLIGATORY, "on" ), ():void => {

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreatedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreatedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModifiedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeletedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAddedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemovedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.on ).toBeDefined();
				expect( resource.on ).toEqual( jasmine.any( Function ) );
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.on( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.on( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );
				done();
			} );

		} );

		describe( method( OBLIGATORY, "off" ), ():void => {

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreatedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreatedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModifiedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeletedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAddedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemovedEvent ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.off ).toBeDefined();
				expect( resource.off ).toEqual( jasmine.any( Function ) );
			} );


			it( "should unsubscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.off( "*.*", "child/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent );
				done();
			} );

			it( "should unsubscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.off( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				done();
			} );

		} );

		describe( method( OBLIGATORY, "one" ), ():void => {

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreatedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreatedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModifiedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeletedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAddedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemovedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.one ).toBeDefined();
				expect( resource.one ).toEqual( jasmine.any( Function ) );
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", actualOnEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent, onError );
				done();
			} );


			it( "should call user onEvent after message", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );


				const onEvent:jasmine.Spy = jasmine.createSpy( "onEvent" );
				const onError:( error:Error ) => void = () => {};

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, { the: "message" } );

				expect( onEvent ).not.toBe( actualOnEvent );
				expect( onEvent ).toHaveBeenCalledWith( { the: "message" } );

				done();
			} );


			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.child.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.child.!*", actualOnEvent );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:EventEmitterDocumentsRepositoryTrait = createMock();
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent );
				done();
			} );


		} );


		describe( method( OBLIGATORY, "onChildCreated" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.CHILD_CREATED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreatedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onChildCreated ).toBeDefined();
				expect( resource.onChildCreated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onChildCreated( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onDocumentModified" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModifiedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onDocumentModified ).toBeDefined();
				expect( resource.onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentModified( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onDocumentDeleted" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_DELETED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeletedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onDocumentDeleted ).toBeDefined();
				expect( resource.onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentDeleted( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onMemberAdded" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_ADDED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAddedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onMemberAdded ).toBeDefined();
				expect( resource.onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberAdded( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onMemberRemoved" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_REMOVED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemovedEvent ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				expect( resource.onMemberRemoved ).toBeDefined();
				expect( resource.onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on", () => {
				const resource:EventEmitterDocumentsRepositoryTrait = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberRemoved( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTrait, CarbonLDP.GeneralRepository<CarbonLDP.Document>" ), () => {
			const target:ModelPrototype<EventEmitterDocumentsRepositoryTrait, GeneralRepository<Document>> = {} as EventEmitterDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTrait<any>, CarbonLDP.BaseDocumentsRepository>" ), () => {
			const target:ModelDecorator<EventEmitterDocumentsRepositoryTrait, BaseDocumentsRepository> = {} as EventEmitterDocumentsRepositoryTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "EventEmitterDocumentsRepositoryTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( EventEmitterDocumentsRepositoryTrait.isDecorated ).toBeDefined();
				expect( EventEmitterDocumentsRepositoryTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				EventEmitterDocumentsRepositoryTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "EventEmitterDocumentsRepositoryTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( EventEmitterDocumentsRepositoryTrait.decorate ).toBeDefined();
				expect( EventEmitterDocumentsRepositoryTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				EventEmitterDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( EventEmitterDocumentsRepositoryTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				EventEmitterDocumentsRepositoryTrait.decorate( { context } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with GeneralRepository", () => {
				const spy:jasmine.Spy = spyOn( GeneralRepository, "decorate" )
					.and.callThrough();

				EventEmitterDocumentsRepositoryTrait.decorate( { context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"EventEmitterDocumentsRepositoryTrait",
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentsRepositoryTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( EventEmitterDocumentsRepositoryTrait ).toBeDefined();
			expect( EventEmitterDocumentsRepositoryTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
