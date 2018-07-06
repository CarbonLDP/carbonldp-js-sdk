import { DocumentsContext } from "../Context";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { Document } from "../Document";
import { Repository } from "../Repository";
import { BaseDocumentsRepository } from "../Repository";
import { isObject } from "../Utils";
import { ChildCreated } from "./ChildCreated";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberRemoved } from "./MemberRemoved";
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

export type EventEmitterDocumentsRepositoryTraitFactory =
	& ModelPrototype<EventEmitterDocumentsRepositoryTrait, Repository<Document>>
	& ModelDecorator<EventEmitterDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

export const EventEmitterDocumentsRepositoryTrait:EventEmitterDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		on<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = createDestination( event, uriPattern, this.$context.baseURI );
				this.$context.messaging.subscribe( destination, onEvent, onError );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		off<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = createDestination( event, uriPattern, this.$context.baseURI );
				this.$context.messaging.unsubscribe( destination, onEvent );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		one<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = createDestination( event, uriPattern, this.$context.baseURI );
				this.$context.messaging.subscribe( destination, function onEventWrapper( message:T ):void {
					onEvent( message );
					this.$context.messaging.unsubscribe( destination, onEventWrapper );
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
	},


	isDecorated( object:object ):object is EventEmitterDocumentsRepositoryTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & EventEmitterDocumentsRepositoryTrait {
		if( EventEmitterDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const resource:T & Repository<Document> = ModelDecorator
			.decorateMultiple( object, Repository );

		return ModelDecorator
			.definePropertiesFrom( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, resource );
	},
};
