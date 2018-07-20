import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { EventEmitterDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/EventEmitterDocumentsRepositoryTrait";

import { Event } from "../../Messaging/Event";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

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

import { TransientDocument } from "../TransientDocument";

import {
	BaseEventEmitterDocumentTrait,
	EventEmitterDocumentTrait,
	EventEmitterDocumentTraitFactory
} from "./EventEmitterDocumentTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/EventEmitterDocumentTrait" ), () => {

	let context:DocumentsContext;
	let $repository:EventEmitterDocumentsRepositoryTrait;
	beforeEach( ():void => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = EventEmitterDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTrait",
		"Documents repository with the implementation for event subscriptions."
	), () => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), () => {
			const target:TransientDocument = {} as EventEmitterDocumentTrait;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.ResolvablePointer" ), () => {
			const target:ResolvablePointer = {} as EventEmitterDocumentTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$repository",
			"CarbonLDP.DocumentsRepository.Trait.EventEmitterDocumentsRepositoryTrait"
		), ():void => {
			const target:EventEmitterDocumentTrait[ "$repository" ] = {} as EventEmitterDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		let resource:EventEmitterDocumentTrait;
		beforeEach( ():void => {
			resource = EventEmitterDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
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
				expect( resource.on ).toBeDefined();
				expect( resource.on ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.on( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.on( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.on( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.off ).toBeDefined();
				expect( resource.off ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "off" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.off( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.off( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.off( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.one ).toBeDefined();
				expect( resource.one ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "one" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.one( Event.CHILD_CREATED, onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.one( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.one( Event.CHILD_CREATED, "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.onChildCreated ).toBeDefined();
				expect( resource.onChildCreated ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onChildCreated( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onChildCreated( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onChildCreated( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.CHILD_CREATED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.onDocumentModified ).toBeDefined();
				expect( resource.onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentModified( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentModified( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentModified( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.onDocumentDeleted ).toBeDefined();
				expect( resource.onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentDeleted( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentDeleted( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onDocumentDeleted( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.onMemberAdded ).toBeDefined();
				expect( resource.onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberAdded( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberAdded( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberAdded( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, "https://example.com/resource/relative/", onEvent, onError );
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
				expect( resource.onMemberRemoved ).toBeDefined();
				expect( resource.onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "on" );
			} );


			it( "should call repository with resource $id when no pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberRemoved( onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/resource/", onEvent, onError );
			} );

			it( "should call repository with absolute pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberRemoved( "https://example.com/another-resource/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/another-resource/", onEvent, onError );
			} );

			it( "should call repository with resolved relative pattern", () => {
				const onEvent:( data:any ) => void = () => fail( "Should not enter here." );
				const onError:( error:Error ) => void = fail;

				resource.onMemberRemoved( "relative/", onEvent, onError );
				expect( spy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, "https://example.com/resource/relative/", onEvent, onError );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTrait, CarbonLDP.TransientDocument, CarbonLDP.ResolvablePointer" ), () => {
			const target:ModelPrototype<EventEmitterDocumentTrait, TransientDocument & ResolvablePointer> = {} as EventEmitterDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTrait<any>, CarbonLDP.BaseEventEmitterDocumentTrait>" ), () => {
			const target:ModelDecorator<EventEmitterDocumentTrait, BaseEventEmitterDocumentTrait> = {} as EventEmitterDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "EventEmitterDocumentTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( EventEmitterDocumentTrait.isDecorated ).toBeDefined();
				expect( EventEmitterDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				EventEmitterDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "EventEmitterDocumentTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( EventEmitterDocumentTrait.decorate ).toBeDefined();
				expect( EventEmitterDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( EventEmitterDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( EventEmitterDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				EventEmitterDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with TransientDocument", () => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" )
					.and.callThrough();

				EventEmitterDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"EventEmitterDocumentTrait",
		"CarbonLDP.DocumentsRepository.Traits.EventEmitterDocumentTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( EventEmitterDocumentTrait ).toBeDefined();
			expect( EventEmitterDocumentTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

