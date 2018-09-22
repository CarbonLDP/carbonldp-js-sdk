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


export interface BaseEventEmitterDocumentTrait {
	$repository:EventEmitterDocumentsRepositoryTrait;
}

export interface EventEmitterDocumentTrait extends TransientDocument, ResolvablePointer {
	$repository:EventEmitterDocumentsRepositoryTrait;

	$on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	$on( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	$off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	$off( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	$one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.CHILD_CREATED, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.MEMBER_ADDED, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	$one( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	$onChildCreated( uriPattern:string, onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;
	$onChildCreated( onEvent:( message:ChildCreatedEvent ) => void, onError?:( error:Error ) => void ):void;

	$onDocumentModified( uriPattern:string, onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;
	$onDocumentModified( onEvent:( message:DocumentModifiedEvent ) => void, onError?:( error:Error ) => void ):void;

	$onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;
	$onDocumentDeleted( onEvent:( message:DocumentDeletedEvent ) => void, onError?:( error:Error ) => void ):void;

	$onMemberAdded( uriPattern:string, onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;
	$onMemberAdded( onEvent:( message:MemberAddedEvent ) => void, onError?:( error:Error ) => void ):void;

	$onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
	$onMemberRemoved( onEvent:( message:MemberRemovedEvent ) => void, onError?:( error:Error ) => void ):void;
}


type OnEvent<T extends EventMessage> = ( message:EventMessage ) => void;
type OnError = ( error:Error ) => void;

function __parseParams<T extends EventMessage>( resource:Pointer, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError:OnError | undefined ):{ uriPattern:string, onEvent:OnEvent<T>, onError:OnError | undefined } {
	const uriPattern:string = isString( uriPatternOROnEvent ) ?
		URI.resolve( resource.$id, uriPatternOROnEvent ) : resource.$id;

	const onEvent:OnEvent<T> = isFunction( uriPatternOROnEvent ) ?
		uriPatternOROnEvent : onEventOrOnError as OnEvent<T>;

	if( onEvent !== onEventOrOnError ) onError = onEventOrOnError as OnError;

	return { uriPattern, onEvent, onError };
}


export type EventEmitterDocumentTraitFactory =
	& ModelPrototype<EventEmitterDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<EventEmitterDocumentTrait, BaseEventEmitterDocumentTrait>
	;

export const EventEmitterDocumentTrait:EventEmitterDocumentTraitFactory = {
	PROTOTYPE: {
		$on<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.on( event, uriPattern, onEvent, $onError );
		},

		$off<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.off( event, uriPattern, onEvent, $onError );
		},

		$one<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.one( event, uriPattern, onEvent, $onError );
		},


		$onChildCreated( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<ChildCreatedEvent>, onEventOrOnError:OnEvent<ChildCreatedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.CHILD_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<ChildCreatedEvent>, onError );
		},

		$onDocumentModified( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentModifiedEvent>, onEventOrOnError:OnEvent<DocumentModifiedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.DOCUMENT_MODIFIED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentModifiedEvent>, onError );
		},

		$onDocumentDeleted( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentDeletedEvent>, onEventOrOnError:OnEvent<DocumentDeletedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.DOCUMENT_DELETED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentDeletedEvent>, onError );
		},

		$onMemberAdded( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberAddedEvent>, onEventOrOnError:OnEvent<MemberAddedEvent> | OnError, onError?:OnError ):void {
			return this.$on( Event.MEMBER_ADDED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberAddedEvent>, onError );
		},

		$onMemberRemoved( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberRemovedEvent>, onEventOrOnError:OnEvent<MemberRemovedEvent> | OnError, onError?:OnError ):void {
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
