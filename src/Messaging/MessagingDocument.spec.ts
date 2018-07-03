import { defineNonEnumerableProps } from "../../test/helpers/mocks";
import { CarbonLDP } from "../CarbonLDP";
import { TransientDocument } from "../Document";
import { DocumentsContext } from "../Context/DocumentsContext";
import { IllegalActionError } from "../Errors";
import { TransientResource } from "../Resource";
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
import { PickSelfProps } from "../Utils";
import { Event } from "./Event";

import { MessagingDocument } from "./MessagingDocument";


function createMock<T extends object>( data?:T & Partial<MessagingDocument> ):T & MessagingDocument {
	const mock:T & MessagingDocument = MessagingDocument.decorate( Object.assign( {
		id: "https://example.com/resource/",
	}, data ) );

	defineNonEnumerableProps( mock );

	return mock;
}

describe( module( "carbonldp/Messaging/MessagingDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MessagingDocument",
		"Interface with the methods required to have messaging/real-time capabilities."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingDocument = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:TransientResource = {} as MessagingDocument;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "on" ), ():void => {

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified uri pattern event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the specified document event notifications.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for its notifications." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
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
				const resource:MessagingDocument = createMock();

				expect( resource.on ).toBeDefined();
				expect( resource.on ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error in callback when does not have registry", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				resource.on( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error in callback when does not have context", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: void 0 } as any } );

				resource.on( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when context does not have a messaging service", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: { messaging: void 0 } } as any } );

				resource.on( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when does not have registry and no valid onError is provided", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				expect( () => resource.on( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( IllegalActionError, `"https://example.com/resource/" doesn't support messaging subscriptions.` );
				done();
			} );


			it( "should subscribe with the Messaging Service for self", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.on( "*.*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource", onEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.on( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", onEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.on( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );
				done();
			} );

		} );

		describe( method( OBLIGATORY, "off" ), ():void => {

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the subscription specified by the uri pattern, event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to unsubscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove a subscription that contains the document event and onEvent callback provided.",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
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
				const resource:MessagingDocument = createMock();

				expect( resource.off ).toBeDefined();
				expect( resource.off ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error in callback when does not have registry", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				resource.off( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error in callback when does not have context", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: void 0 } as any } );

				resource.off( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when context does not have a messaging service", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: { messaging: void 0 } } as any } );

				resource.off( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when does not have registry and no valid onError is provided", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				expect( () => resource.off( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( IllegalActionError, `"https://example.com/resource/" doesn't support messaging subscriptions.` );
				done();
			} );


			it( "should unsubscribe with the Messaging Service for self", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.off( "*.*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource", onEvent );
				done();
			} );

			it( "should unsubscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.off( "*.*", "child/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", onEvent );
				done();
			} );

			it( "should unsubscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.off( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				done();
			} );

		} );

		describe( method( OBLIGATORY, "one" ), ():void => {

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the uri pattern and event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for one notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to only one notification to the document event provided",
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for one notification." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
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
				const resource:MessagingDocument = createMock();

				expect( resource.one ).toBeDefined();
				expect( resource.one ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error in callback when does not have registry", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				resource.one( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error in callback when does not have context", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: void 0 } as any } );

				resource.one( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when context does not have a messaging service", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: { context: { messaging: void 0 } } as any } );

				resource.one( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( IllegalActionError ) );
					expect( error.message ).toBe( `"https://example.com/resource/" doesn't support messaging subscriptions.` );
					done();
				} );
			} );

			it( "should throw error when does not have registry and no valid onError is provided", ( done:DoneFn ):void => {
				const resource:MessagingDocument = createMock( { _registry: void 0 } );

				expect( () => resource.one( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( IllegalActionError, `"https://example.com/resource/" doesn't support messaging subscriptions.` );
				done();
			} );


			it( "should subscribe with the Messaging Service for self", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.resource", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource", actualOnEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", "child/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", actualOnEvent, onError );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => done.fail( "Should not enter here." );
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				expect( subscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				expect( subscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent, onError );
				done();
			} );


			it( "should call user onEvent after message when self", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );


				const onEvent:jasmine.Spy = jasmine.createSpy( "onEvent" );
				const onError:( error:Error ) => void = () => {};

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, { the: "message" } );

				expect( onEvent ).not.toBe( actualOnEvent );
				expect( onEvent ).toHaveBeenCalledWith( { the: "message" } );

				done();
			} );

			it( "should call user onEvent after message when uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );
				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );


				const onEvent:jasmine.Spy = jasmine.createSpy( "onEvent" );
				const onError:( error:Error ) => void = () => {};

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, { the: "message" } );

				expect( onEvent ).not.toBe( actualOnEvent );
				expect( onEvent ).toHaveBeenCalledWith( { the: "message" } );

				done();
			} );


			it( "should subscribe with the Messaging Service for self", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.resource", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource", actualOnEvent );
				done();
			} );

			it( "should subscribe with the Messaging Service for relative uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", "child/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.resource.child.!*", actualOnEvent );
				done();
			} );

			it( "should subscribe with the Messaging Service for absolute uriPattern", ( done:DoneFn ):void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( context.messaging, "subscribe" );
				const unsubscribeSpy:jasmine.Spy = spyOn( context.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {};
				const onError:( error:Error ) => void = done.fail;

				const resource:MessagingDocument = createMock( { _registry: context.registry } );
				resource.one( "*.*", "https://example.com/another-resource/!*", onEvent, onError );

				const actualOnEvent:Function = subscribeSpy.calls.mostRecent().args[ 1 ];
				actualOnEvent.call( void 0, null );

				expect( unsubscribeSpy ).not.toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", onEvent );
				expect( unsubscribeSpy ).toHaveBeenCalledWith( "/topic/*.*.another-resource.!*", actualOnEvent );
				done();
			} );


		} );


		describe( method( OBLIGATORY, "onAccessPointCreated" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onAccessPointCreated ).toBeDefined();
				expect( resource.onAccessPointCreated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onAccessPointCreated( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.ACCESS_POINT_CREATED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onAccessPointCreated( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.ACCESS_POINT_CREATED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onChildCreated" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.CHILD_CREATED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.CHILD_CREATED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onChildCreated ).toBeDefined();
				expect( resource.onChildCreated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onChildCreated( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onChildCreated( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onDocumentCreated" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_CREATED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_CREATED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onDocumentCreated ).toBeDefined();
				expect( resource.onDocumentCreated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentCreated( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_CREATED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentCreated( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_CREATED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onDocumentModified" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onDocumentModified ).toBeDefined();
				expect( resource.onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentModified( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentModified( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onDocumentDeleted" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_DELETED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_DELETED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onDocumentDeleted ).toBeDefined();
				expect( resource.onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentDeleted( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onDocumentDeleted( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onMemberAdded" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_ADDED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_ADDED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onMemberAdded ).toBeDefined();
				expect( resource.onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberAdded( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberAdded( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "onMemberRemoved" ), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_REMOVED` event notifications for the document.",
				[
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_REMOVED` event notifications for the uri pattern specified.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback thar receives the errors thrown by the subscription." },
				]
			), ():void => {} );


			it( "should exists", ():void => {
				const resource:MessagingDocument = createMock();

				expect( resource.onMemberRemoved ).toBeDefined();
				expect( resource.onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should should call .on when self", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberRemoved( () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, jasmine.any( Function ), jasmine.any( Function ), void 0 );
			} );

			it( "should should call .on when uriPatter", () => {
				const resource:MessagingDocument = createMock();

				Object.defineProperty( resource, "on", { writable: true } );
				const spy:jasmine.Spy = spyOn( resource, "on" );

				resource.onMemberRemoved( "child/!*", () => fail( "Should not resolve." ), fail );

				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "child/!*", jasmine.any( Function ), jasmine.any( Function ) );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MessagingDocumentFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MessagingDocument` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the specific properties of the `CarbonLDP.Messaging.MessagingDocument` interface.",
			[
				{ name: "object", type: "object", description: "The object to be tested." },
			],
			{ type: "object is CarbonLDP.Messaging.MessagingDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the provided document with the properties od the `CarbonLDP.Messaging.MessagingDocument` interface",
			[
				{ name: "object", type: "T", description: "Object to be decorated" },
			],
			{ type: "T & CarbonLDP.Messaging.MessagingDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MessagingDocument",
		"CarbonLDP.Messaging.MessagingDocumentFactory"
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

			type Expected = PickSelfProps<MessagingDocument, TransientDocument>;

			it( "should return the same reference of the object provided", ():void => {
				const base:object = {};

				const target:MessagingDocument = MessagingDocument.decorate( base );
				expect( base ).toBe( target );
			} );

			it( "should not decorate if already has the specific properties", ():void => {
				const methodsFunction:() => void = () => {};
				const base:Expected = {
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
				};

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
				const base:{} = {};

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
