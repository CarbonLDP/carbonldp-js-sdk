import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { ChildCreatedEvent } from "../../Messaging/ChildCreatedEvent";
import { DocumentDeletedEvent } from "../../Messaging/DocumentDeletedEvent";
import { DocumentModifiedEvent } from "../../Messaging/DocumentModifiedEvent";
import { Event } from "../../Messaging/Event";
import { EventMessage } from "../../Messaging/EventMessage";
import { MemberAddedEvent } from "../../Messaging/MemberAddedEvent";
import { MemberRemovedEvent } from "../../Messaging/MemberRemovedEvent";
import { _createDestination } from "../../Messaging/Utils";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { isObject } from "../../Utils";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";


/**
 * Trait of a {@link DocumentsRepository} with methods for event subscriptions.
 */
export interface EventEmitterDocumentsRepositoryTrait extends GeneralRepository<Document> {
	/**
	 * Context from where the repository is created.
	 */
	readonly context:DocumentsContext;

	/**
	 * Subscribe to the child created event for the desired URI pattern.
	 * @param event Child created event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document modified event for the desired URI pattern.
	 * @param event Document modified event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document deleted event for the desired URI pattern.
	 * @param event Document deleted event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member added event for the desired URI pattern.
	 * @param event Member added event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member removed event for the desired URI pattern.
	 * @param event Member removed event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the specified event for the desired URI pattern.
	 * @param event Event to subscribe for its notifications.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the notification message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Removes the subscription of the child created event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Child created event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the child created event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document modified event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Document modified event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the document modified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the document deleted event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Document deleted event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the document deleted event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member added event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Member added event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the member added event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the member removed event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Member removed event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the member removed event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Removes the subscription of the specified event and {@param onEvent} callback for the desired URI pattern.
	 * @param event Event of the subscription to be removed.
	 * @param uriPattern URI or pattern of the resources to unsubscribe for.
	 * @param onEvent Callback that was used to subscribe to the specified event.
	 * @param onError Callback that will receive any error in the subscription removal.
	 */
	off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	/**
	 * Subscribe to only one notification of the child created event for the desired URI pattern.
	 * @param event Child created event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document modified event for the desired URI pattern.
	 * @param event Document modified event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the document deleted event for the desired URI pattern.
	 * @param event Document deleted event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member added event for the desired URI pattern.
	 * @param event Member added event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the member removed event for the desired URI pattern.
	 * @param event Member removed event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to only one notification of the specified event for the desired URI pattern.
	 * @param event Event to subscribe for one notification.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the notification message when the event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	/**
	 * Subscribe to the child created event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the child created event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	onChildCreated( uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document modified event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document modified event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	onDocumentModified( uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the document deleted event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the document deleted event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member added event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member added event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	onMemberAdded( uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	/**
	 * Subscribe to the member removed event for the desired URI pattern.
	 * @param uriPattern URI or pattern of the resources to subscribe for.
	 * @param onEvent Callback that will receive the member removed event message when an event occurs.
	 * @param onError Callback that will receive any error in the subscription.
	 */
	onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
}


type OnEvent<T extends EventMessage> = ( message:T ) => void;
type OnError = ( error:Error ) => void;

/**
 * Factory, decorator and utils for {@link EventEmitterDocumentsRepositoryTrait}.
 */
export type EventEmitterDocumentsRepositoryTraitFactory =
	& ModelPrototype<EventEmitterDocumentsRepositoryTrait, GeneralRepository<Document>>
	& ModelDecorator<EventEmitterDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

/**
 * Constant that implements {@link EventEmitterDocumentsRepositoryTraitFactory}.
 */
export const EventEmitterDocumentsRepositoryTrait:EventEmitterDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		on<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.context.baseURI );
				this.context.messaging.subscribe( destination, onEvent, onError );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		off<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.context.baseURI );
				this.context.messaging.unsubscribe( destination, onEvent );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		one<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.context.baseURI );

				const onEventWrapper:OnEvent<T> = message => {
					onEvent( message );
					this.context.messaging.unsubscribe( destination, onEventWrapper );
				};

				this.context.messaging.subscribe( destination, onEventWrapper, onError );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},


		onChildCreated( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<ChildCreatedEvent>, onError?:OnError ):void {
			return this.on( Event.CHILD_CREATED, uriPattern, onEvent, onError );
		},

		onDocumentModified( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<DocumentModifiedEvent>, onError?:OnError ):void {
			return this.on( Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError );
		},

		onDocumentDeleted( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<DocumentDeletedEvent>, onError?:OnError ):void {
			return this.on( Event.DOCUMENT_DELETED, uriPattern, onEvent, onError );
		},

		onMemberAdded( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<MemberAddedEvent>, onError?:OnError ):void {
			return this.on( Event.MEMBER_ADDED, uriPattern, onEvent, onError );
		},

		onMemberRemoved( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<MemberRemovedEvent>, onError?:OnError ):void {
			return this.on( Event.MEMBER_REMOVED, uriPattern, onEvent, onError );
		},
	},


	isDecorated( object:object ):object is EventEmitterDocumentsRepositoryTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & EventEmitterDocumentsRepositoryTrait {
		if( EventEmitterDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const resource:T & GeneralRepository<Document> = ModelDecorator
			.decorateMultiple( object, GeneralRepository );

		return ModelDecorator
			.definePropertiesFrom( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, resource );
	},
};
