import { EventEmitterDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/EventEmitterDocumentsRepositoryTrait";
import { ChildCreatedEvent } from "../../Messaging/ChildCreatedEvent";
import { DocumentDeletedEvent } from "../../Messaging/DocumentDeletedEvent";
import { DocumentModifiedEvent } from "../../Messaging/DocumentModifiedEvent";
import { Event } from "../../Messaging/Event";
import { EventMessage } from "../../Messaging/EventMessage";
import { MemberAddedEvent } from "../../Messaging/MemberAddedEvent";
import { MemberRemovedEvent } from "../../Messaging/MemberRemovedEvent";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";

import { URI } from "../../RDF/URI";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { isFunction, isObject, isString } from "../../Utils";

import { TransientDocument } from "../TransientDocument";


/**
 * Properties for creating an {@link EventEmitterDocumentTrait}.
 */
export interface BaseEventEmitterDocumentTrait {
	/**
	 * Repository trait that will to execute requests of the trait to create.
	 */
	$repository:EventEmitterDocumentsRepositoryTrait;
}

/**
 * Trait of a {@link Document} with methods for event subscriptions.
 */
export interface EventEmitterDocumentTrait extends TransientDocument, ResolvablePointer {
	/**
	 * Repository trait that actually executes the request of the current trait.
	 */
	$repository:EventEmitterDocumentsRepositoryTrait;

	/**
	 * Subscribe to the child created event for the desired URI pattern.
	 * @param event Child created event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the child created event for the current document.
	 * @param event Child created event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document modified event for the desired URI pattern.
	 * @param event Document modified event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document modified event for the current document.
	 * @param event Document modified event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the document modified message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document deleted event for the desired URI pattern.
	 * @param event Document deleted event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document deleted event for the current document.
	 * @param event Document deleted event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the document deleted message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member added event for the desired URI pattern.
	 * @param event Member added event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member added event for the current document.
	 * @param event Member added event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the member added message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member removed event for the desired URI pattern.
	 * @param event Member removed event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member removed event for the current document.
	 * @param event Member removed event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the member removed message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the specified event for the desired URI pattern.
	 * @param event Event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the notification message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the specified event for the current document.
	 * @param event Event to subscribe for its notifications.
	 * @param onEvent Callback that will receive the notification message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$on( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Removes the subscription of the child created event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Child created event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the child created event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the child created event and {@param onEvent} callback for the current document.
	 * @param event Child created event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the child created event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document modified event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Document modified event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the document modified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document modified event and {@param onEvent} callback for the current document.
	 * @param event Document modified event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the document modified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document deleted event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Document deleted event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the document deleted event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document deleted event and {@param onEvent} callback for the current document.
	 * @param event Document deleted event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the document deleted event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member added event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Member added event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the member added event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member added event and {@param onEvent} callback for the current document.
	 * @param event Member added event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the member added event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member removed event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Member removed event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the member removed event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member removed event and {@param onEvent} callback for the current document.
	 * @param event Member removed event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the member removed event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the specified event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the specified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the specified event and {@param onEvent} callback for the current document.
	 * @param event Event of the subscription to be removed.
	 * @param onEvent Callback that was used to subscribe to the specified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	$off( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to only one notification of the child created event for the desired URI pattern.
	 * @param event Child created event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the child created event for the current document.
	 * @param event Child created event to subscribe for one notification.
	 * @param onEvent Callback that will receive the child created event message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document modified event for the desired URI pattern.
	 * @param event Document modified event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document modified event for the current document.
	 * @param event Document modified event to subscribe for one notification.
	 * @param onEvent Callback that will receive the document modified message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document deleted event for the desired URI pattern.
	 * @param event Document deleted event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document deleted event for the current document.
	 * @param event Document deleted event to subscribe for one notification.
	 * @param onEvent Callback that will receive the document deleted message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member added event for the desired URI pattern.
	 * @param event Member added event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member added event for the current document.
	 * @param event Member added event to subscribe for one notification.
	 * @param onEvent Callback that will receive the member added message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member removed event for the desired URI pattern.
	 * @param event Member removed event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member removed event for the current document.
	 * @param event Member removed event to subscribe for one notification.
	 * @param onEvent Callback that will receive the member removed message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the specified event for the desired URI pattern.
	 * @param event Event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the notification message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the specified event for the current document.
	 * @param event Event to subscribe for one notification.
	 * @param onEvent Callback that will receive the notification message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$one( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	/**
	 * Subscribe to the child created event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onChildCreated( uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the child created event for the current document.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onChildCreated( onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to the document modified event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onDocumentModified( uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document modified event for the current document.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onDocumentModified( onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to the document deleted event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document deleted event for the current document.
	 * @param onEvent Callback that will receive the document deleted event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onDocumentDeleted( onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to the member added event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onMemberAdded( uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member added event for the current document.
	 * @param onEvent Callback that will receive the member added event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onMemberAdded( onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to the member removed event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member removed event for the current document.
	 * @param onEvent Callback that will receive the member removed event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	$onMemberRemoved( onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
}


type AnyMessageEvent =
	ChildCreatedEvent
	| DocumentModifiedEvent
	| DocumentDeletedEvent
	| MemberAddedEvent
	| MemberRemovedEvent;
type OnEvent<T extends AnyMessageEvent> = ( message:T ) => void;
type OnError = ( error:Error ) => void;

function __parseParams<T extends AnyMessageEvent>( resource:Pointer, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError:OnError | undefined ):{ uriPattern:string, onEvent:OnEvent<T>, onError:OnError | undefined } {
	const uriPattern:string = isString( uriPatternOROnEvent ) ?
		URI.resolve( resource.$id, uriPatternOROnEvent ) : resource.$id;

	const onEvent:OnEvent<T> = isFunction( uriPatternOROnEvent ) ?
		uriPatternOROnEvent : onEventOrOnError as OnEvent<T>;

	if( onEvent !== onEventOrOnError ) onError = onEventOrOnError as OnError;

	return { uriPattern, onEvent, onError };
}


/**
 * Factory, decorator and utils for {@link EventEmitterDocumentTrait}.
 */
export type EventEmitterDocumentTraitFactory =
	& ModelPrototype<EventEmitterDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<EventEmitterDocumentTrait, BaseEventEmitterDocumentTrait>
	;

/**
 * Constant that implements {@link EventEmitterDocumentTraitFactory}
 */
export const EventEmitterDocumentTrait:{

	/**
	 * The object with the properties/methods to use in the decoration of a {@link EventEmitterDocumentTrait}
	 */
	PROTOTYPE:EventEmitterDocumentTraitFactory["PROTOTYPE"];

	/**
	 * Checks if the EventEmitterDocumentTrait has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is EventEmitterDocumentTrait;

	/**
	 * Defines the EventEmitterDocumentTrait's prototype properties and methods to the EventEmitterDocumentTrait object.
	 */
	decorate<T extends BaseEventEmitterDocumentTrait>( object:T ):T & EventEmitterDocumentTrait

} = {
	PROTOTYPE: {
		$on( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<any>, onEventOrOnError:OnEvent<any> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.on( event, uriPattern, onEvent, $onError );
		},

		$off( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<any>, onEventOrOnError:OnEvent<any> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.off( event, uriPattern, onEvent, $onError );
		},

		$one( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<any>, onEventOrOnError:OnEvent<any> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.one( event, uriPattern, onEvent, $onError );
		},


		$onChildCreated( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<ChildCreatedEvent>, onEventOrOnError?:OnEvent<ChildCreatedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.CHILD_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<ChildCreatedEvent>, onError );
		},

		$onDocumentModified( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentModifiedEvent>, onEventOrOnError?:OnEvent<DocumentModifiedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.DOCUMENT_MODIFIED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentModifiedEvent>, onError );
		},

		$onDocumentDeleted( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentDeletedEvent>, onEventOrOnError?:OnEvent<DocumentDeletedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.DOCUMENT_DELETED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentDeletedEvent>, onError );
		},

		$onMemberAdded( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberAddedEvent>, onEventOrOnError?:OnEvent<MemberAddedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.MEMBER_ADDED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberAddedEvent>, onError );
		},

		$onMemberRemoved( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberRemovedEvent>, onEventOrOnError?:OnEvent<MemberRemovedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.MEMBER_REMOVED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberRemovedEvent>, onError );
		},
	},


	isDecorated( object:object ):object is EventEmitterDocumentTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( EventEmitterDocumentTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseEventEmitterDocumentTrait>( object:T ):T & EventEmitterDocumentTrait {
		if( EventEmitterDocumentTrait.isDecorated( object ) ) return object;

		const resource:T & TransientDocument & ResolvablePointer = ModelDecorator
			.decorateMultiple( object, TransientDocument, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( EventEmitterDocumentTrait.PROTOTYPE, resource );
	},
};
