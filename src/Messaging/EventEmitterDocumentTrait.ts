import { TransientDocument } from "../Document";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import { ResolvablePointer } from "../Repository";
import {
	isFunction,
	isObject,
	isString,
} from "../Utils";
import { ChildCreated } from "./ChildCreated";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventEmitterDocumentsRepositoryTrait } from "./EventEmitterDocumentsRepositoryTrait";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberRemoved } from "./MemberRemoved";


export interface BaseEventEmitterDocumentTrait {
	$repository:EventEmitterDocumentsRepositoryTrait;
}

export interface EventEmitterDocumentTrait extends TransientDocument, ResolvablePointer {
	$repository:EventEmitterDocumentsRepositoryTrait;

	on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event | string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	onChildCreated( uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	onChildCreated( onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;

	onDocumentCreated( uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	onDocumentCreated( onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;

	onDocumentModified( uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	onDocumentModified( onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;

	onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	onDocumentDeleted( onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;

	onMemberAdded( uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	onMemberAdded( onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;

	onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	onMemberRemoved( onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
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
		on<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.on( event, uriPattern, onEvent, $onError );
		},

		off<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.off( event, uriPattern, onEvent, $onError );
		},

		one<T extends EventMessage>( this:EventEmitterDocumentTrait, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
			const { uriPattern, onEvent, onError: $onError } = __parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError );
			return this.$repository.one( event, uriPattern, onEvent, $onError );
		},


		onChildCreated( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<ChildCreated>, onEventOrOnError:OnEvent<ChildCreated> | OnError, onError?:OnError ):void {
			return this.on( Event.CHILD_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<ChildCreated>, onError );
		},

		onDocumentCreated( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentCreated>, onEventOrOnError:OnEvent<DocumentCreated> | OnError, onError?:OnError ):void {
			return this.on( Event.DOCUMENT_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentCreated>, onError );
		},

		onDocumentModified( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentModified>, onEventOrOnError:OnEvent<DocumentModified> | OnError, onError?:OnError ):void {
			return this.on( Event.DOCUMENT_MODIFIED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentModified>, onError );
		},

		onDocumentDeleted( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<DocumentDeleted>, onEventOrOnError:OnEvent<DocumentDeleted> | OnError, onError?:OnError ):void {
			return this.on( Event.DOCUMENT_DELETED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentDeleted>, onError );
		},

		onMemberAdded( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberAdded>, onEventOrOnError:OnEvent<MemberAdded> | OnError, onError?:OnError ):void {
			return this.on( Event.MEMBER_ADDED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberAdded>, onError );
		},

		onMemberRemoved( this:EventEmitterDocumentTrait, uriPatternOROnEvent:string | OnEvent<MemberRemoved>, onEventOrOnError:OnEvent<MemberRemoved> | OnError, onError?:OnError ):void {
			return this.on( Event.MEMBER_REMOVED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberRemoved>, onError );
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
