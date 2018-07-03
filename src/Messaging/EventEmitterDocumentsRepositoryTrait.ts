import { ModelDecorator } from "../core";
import { TransientDocument } from "../Document";
import { DocumentsContext } from "../DocumentsContext";
import { IllegalActionError } from "../Errors";
import { Repository } from "../Repository";
import {
	isObject,
	PickSelfProps
} from "../Utils";
import { ChildCreated } from "./ChildCreated";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberRemoved } from "./MemberRemoved";
import { MessagingDocument } from "./MessagingDocument";
import { MessagingService } from "./Service";
import { createDestination } from "./Utils";

export interface EventEmitterDocumentsRepositoryTrait extends Repository<Document> {
	$context:DocumentsContext;

	on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_CREATED, uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	onChildCreated( uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	onDocumentCreated( uriPattern:string, onEvent:( message:DocumentCreated ) => void, onError?:( error:Error ) => void ):void;
	onDocumentModified( uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	onMemberAdded( uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
}


type OnEvent<T extends EventMessage> = ( message:T ) => void;
type OnError = ( error:Error ) => void;

function getMessagingService( resource:EventEmitterDocumentsRepositoryTrait ):MessagingService {
	if( ! resource.$context || ! resource.$context.messaging )
		throw new IllegalActionError( `The repository doesn't support events subscriptions.` );

	return resource.$context.messaging;
}

const PROTOTYPE:PickSelfProps<EventEmitterDocumentsRepositoryTrait, Repository<Document>> = {
	on<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			const destination:string = createDestination( event, uriPattern, messaging.context.baseURI );
			messaging.subscribe( destination, onEvent, onError );

		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	},

	off<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			const destination:string = createDestination( event, uriPattern, messaging.context.baseURI );
			messaging.unsubscribe( destination, onEvent );

		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	},

	one<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			const destination:string = createDestination( event, uriPattern, messaging.context.baseURI );
			messaging.subscribe( destination, function onEventWrapper( message:T ):void {
				onEvent( message );
				messaging.unsubscribe( destination, onEventWrapper );
			}, onError );

		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	},


	onChildCreated( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<ChildCreated>, onError?:OnError ):void {
		return this.on( Event.CHILD_CREATED, uriPattern, onEvent as OnEvent<ChildCreated>, onError );
	},

	onDocumentCreated( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<DocumentCreated>, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_CREATED, uriPattern, onEvent, onError );
	},

	onDocumentModified( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<DocumentModified>, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError );
	},

	onDocumentDeleted( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<DocumentDeleted>, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_DELETED, uriPattern, onEvent, onError );
	},

	onMemberAdded( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<MemberAdded>, onError?:OnError ):void {
		return this.on( Event.MEMBER_ADDED, uriPattern, onEvent, onError );
	},

	onMemberRemoved( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<MemberRemoved>, onError?:OnError ):void {
		return this.on( Event.MEMBER_REMOVED, uriPattern, onEvent, onError );
	},
};

export interface EventEmitterDocumentsRepositoryTraitFactory extends ModelDecorator<EventEmitterDocumentsRepositoryTrait> {
	isDecorated( object:object ):object is EventEmitterDocumentsRepositoryTrait;

	decorate<T extends object>( object:T ):T & EventEmitterDocumentsRepositoryTrait;
}

export const EventEmitterDocumentsRepositoryTrait:EventEmitterDocumentsRepositoryTraitFactory = {
	isDecorated( object:object ):object is EventEmitterDocumentsRepositoryTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & EventEmitterDocumentsRepositoryTrait {
		if( EventEmitterDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const resource:T & Repository<Document> = ModelDecorator
			.decorateMultiple( object, Repository );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
