import { Document } from "../Document";
import { Documents } from "../Documents";
import { ServiceAwareDocument } from "../ServiceAwareDocument";
import {
	extendsClass,
	hasMethod,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { MessagingDocument } from "./Document";

describe( module( "carbonldp/Messaging/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.Document.MessagingDocument",
		"Interface with the methods required to have messaging/real-time capabilities."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingDocument = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.ServiceAwareDocument.ServiceAwareDocument" ), ():void => {
			const target:ServiceAwareDocument = {} as MessagingDocument;
			expect( target ).toBeDefined();
		} );

		describe( method( OBLIGATORY, "on" ), ():void => {

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const target:MessagingDocument[ "on" ] = ( event:string, onEvent:Function, onError:Function ) => void 0;
				expect( target ).toBeDefined();
			} );

		} );

		describe( method( OBLIGATORY, "off" ), ():void => {

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated.ChildCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated.AccessPointCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated.DocumentCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified.DocumentModified ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted.DocumentDeleted ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded.MemberAdded ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved.MemberRemoved ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage.EventMessage ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const target:MessagingDocument[ "off" ] = ( event:string, onEvent:Function, onError:Function ) => void 0;
				expect( target ).toBeDefined();
			} );

		} );

		describe( method( OBLIGATORY, "one" ), ():void => {

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const target:MessagingDocument[ "one" ] = ( event:string, onEvent:Function, onError:Function ) => void 0;
				expect( target ).toBeDefined();
			} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"onAccessPointCreated",
			"Subscribe to the `CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onAccessPointCreated" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onChildCreated",
			"Subscribe to the `CarbonLDP.Messaging.Event.CHILD_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onChildCreated" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onDocumentCreated",
			"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_CREATED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onDocumentCreated" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onDocumentModified",
			"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onDocumentModified" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onDocumentDeleted",
			"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_DELETED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onDocumentDeleted" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onMemberAdded",
			"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_ADDED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onMemberAdded" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

		it( hasMethod(
			OBLIGATORY,
			"onMemberRemoved",
			"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_REMOVED` event notifications for the document.",
			[
				{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
				{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
			]
		), ():void => {
			const target:MessagingDocument[ "onMemberRemoved" ] = ( onEvent:Function, onError:Function ) => void 0;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.Document.MessagingDocumentFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.Document.MessagingDocument` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the specific properties of the `CarbonLDP.Messaging.Document.MessagingDocument` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "object is CarbonLDP.Messaging.Document.MessagingDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends CarbonLDP.ServiceAwareDocument.ServiceAwareDocument" ],
			"Decorates the provided document with the properties od the `CarbonLDP.Messaging.Document.MessagingDocument` interface",
			[
				{ name: "object", type: "T", description: "Object to be decorated" },
			],
			{ type: "T & CarbonLDP.Messaging.Document.MessagingDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MessagingDocument",
		"CarbonLDP.Messaging.Document.MessagingDocumentFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( MessagingDocument ).toBeDefined();
			expect( MessagingDocument ).toEqual( jasmine.any( Object ) );
		} );

		describe( "MessagingDocument.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( MessagingDocument.isDecorated ).toBeDefined();
				expect( MessagingDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false if falsy is provided", ():void => {
				expect( MessagingDocument.isDecorated( void 0 ) ).toBe( false );
				expect( MessagingDocument.isDecorated( null ) ).toBe( false );
			} );

			it( "should return false if has a missing class property", ():void => {
				const object:Partial<MessagingDocument> = {
					on: () => {},
					off: () => {},
					one: () => {},
					onDocumentCreated: () => {},
					onChildCreated: () => {},
					onAccessPointCreated: () => {},
					onDocumentModified: () => {},
					onDocumentDeleted: () => {},
					onMemberAdded: () => {},
					onMemberRemoved: () => {},
				};

				expect( MessagingDocument.isDecorated( object ) ).toBe( true );

				delete object.on;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.on = ():void => {};

				delete object.off;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.off = ():void => {};

				delete object.one;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.one = ():void => {};

				delete object.onDocumentCreated;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onDocumentCreated = ():void => {};

				delete object.onChildCreated;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onChildCreated = ():void => {};

				delete object.onAccessPointCreated;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onAccessPointCreated = ():void => {};

				delete object.onDocumentModified;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onDocumentModified = ():void => {};

				delete object.onDocumentDeleted;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onDocumentDeleted = ():void => {};

				delete object.onMemberAdded;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onMemberAdded = ():void => {};

				delete object.onMemberRemoved;
				expect( MessagingDocument.isDecorated( object ) ).toBe( false );
				object.onMemberRemoved = ():void => {};
			} );

		} );

		describe( "MessagingDocument.decorate", ():void => {

			it( "should exists", ():void => {
				expect( MessagingDocument.decorate ).toBeDefined();
				expect( MessagingDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same reference of the object provided", ():void => {
				const documents:Documents = new Documents();
				const base:ServiceAwareDocument = ServiceAwareDocument.decorate( Document.create(), documents );

				const target:MessagingDocument = MessagingDocument.decorate( base );
				expect( base ).toBe( target );
			} );

			it( "should not decorate if already has the specific properties", ():void => {
				const documents:Documents = new Documents();

				const methodsFunction:() => void = () => {};
				const base:ServiceAwareDocument = ServiceAwareDocument.decorate( Document.createFrom( {
					on: methodsFunction,
					off: methodsFunction,
					one: methodsFunction,
					onDocumentCreated: methodsFunction,
					onChildCreated: methodsFunction,
					onAccessPointCreated: methodsFunction,
					onDocumentModified: methodsFunction,
					onDocumentDeleted: methodsFunction,
					onMemberAdded: methodsFunction,
					onMemberRemoved: methodsFunction,
				} ), documents );

				const target:MessagingDocument = MessagingDocument.decorate( base );
				expect( target ).toEqual( jasmine.objectContaining( {
					on: methodsFunction,
					off: methodsFunction,
					one: methodsFunction,
					onDocumentCreated: methodsFunction,
					onChildCreated: methodsFunction,
					onAccessPointCreated: methodsFunction,
					onDocumentModified: methodsFunction,
					onDocumentDeleted: methodsFunction,
					onMemberAdded: methodsFunction,
					onMemberRemoved: methodsFunction,
				} ) );
			} );

			it( "should add the new properties", ():void => {
				const documents:Documents = new Documents();
				const base:ServiceAwareDocument = ServiceAwareDocument.decorate( Document.create(), documents );

				const target:MessagingDocument = MessagingDocument.decorate( base );
				expect( target ).toEqual( jasmine.objectContaining( {
					on: jasmine.any( Function ),
					off: jasmine.any( Function ),
					one: jasmine.any( Function ),
					onDocumentCreated: jasmine.any( Function ),
					onChildCreated: jasmine.any( Function ),
					onAccessPointCreated: jasmine.any( Function ),
					onDocumentModified: jasmine.any( Function ),
					onDocumentDeleted: jasmine.any( Function ),
					onMemberAdded: jasmine.any( Function ),
					onMemberRemoved: jasmine.any( Function ),
				} ) );
			} );

		} );

	} );

} );
