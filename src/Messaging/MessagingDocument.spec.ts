import { TransientDocument } from "../Document";
import { Pointer } from "../Pointer";
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

import { MessagingDocument } from "./MessagingDocument";

describe( module( "carbonldp/Messaging/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MessagingDocument",
		"Interface with the methods required to have messaging/real-time capabilities."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MessagingDocument = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Pointer" ), ():void => {
			const target:Pointer = {} as MessagingDocument;
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
				const target:MessagingDocument[ "on" ] = ( event:string, pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "off" ] = ( event:string, pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "one" ] = ( event:string, pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onAccessPointCreated" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onChildCreated" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onDocumentCreated" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onDocumentModified" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onDocumentDeleted" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onMemberAdded" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
				const target:MessagingDocument[ "onMemberRemoved" ] = ( pattern:string | Function, onEvent:Function, onError?:Function ) => void 0;
				expect( target ).toBeDefined();
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
