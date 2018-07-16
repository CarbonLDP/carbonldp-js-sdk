import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";

import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";

import { ChildCreated } from "../../Messaging/ChildCreated";
import { DocumentDeleted } from "../../Messaging/DocumentDeleted";
import { DocumentModified } from "../../Messaging/DocumentModified";
import { Event } from "../../Messaging/Event";
import { EventMessage } from "../../Messaging/EventMessage";
import { MemberAdded } from "../../Messaging/MemberAdded";
import { MemberRemoved } from "../../Messaging/MemberRemoved";
import { _createDestination } from "../../Messaging/Utils";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { isObject } from "../../Utils";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";


export interface EventEmitterDocumentsRepositoryTrait extends GeneralRepository<Document> {
	$context:DocumentsContext;

	on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	off( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;

	one( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_MODIFIED, uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.DOCUMENT_DELETED, uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_ADDED, uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.MEMBER_REMOVED, uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event | string, uriPattern:string, onEvent:( message:EventMessage ) => void, onError?:( error:Error ) => void ):void;


	onChildCreated( uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	onDocumentModified( uriPattern:string, onEvent:( message:DocumentModified ) => void, onError?:( error:Error ) => void ):void;
	onDocumentDeleted( uriPattern:string, onEvent:( message:DocumentDeleted ) => void, onError?:( error:Error ) => void ):void;
	onMemberAdded( uriPattern:string, onEvent:( message:MemberAdded ) => void, onError?:( error:Error ) => void ):void;
	onMemberRemoved( uriPattern:string, onEvent:( message:MemberRemoved ) => void, onError?:( error:Error ) => void ):void;
}


type OnEvent<T extends EventMessage> = ( message:T ) => void;
type OnError = ( error:Error ) => void;

export type EventEmitterDocumentsRepositoryTraitFactory =
	& ModelPrototype<EventEmitterDocumentsRepositoryTrait, GeneralRepository<Document>>
	& ModelDecorator<EventEmitterDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

export const EventEmitterDocumentsRepositoryTrait:EventEmitterDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		on<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.$context.baseURI );
				this.$context.messaging.subscribe( destination, onEvent, onError );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		off<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.$context.baseURI );
				this.$context.messaging.unsubscribe( destination, onEvent );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},

		one<T extends EventMessage>( this:EventEmitterDocumentsRepositoryTrait, event:Event | string, uriPattern:string, onEvent:OnEvent<T>, onError?:OnError ):void {
			try {
				const destination:string = _createDestination( event, uriPattern, this.$context.baseURI );

				const onEventWrapper:OnEvent<T> = message => {
					onEvent( message );
					this.$context.messaging.unsubscribe( destination, onEventWrapper );
				};

				this.$context.messaging.subscribe( destination, onEventWrapper, onError );

			} catch( error ) {
				if( ! onError ) throw error;
				onError( error );
			}
		},


		onChildCreated( this:EventEmitterDocumentsRepositoryTrait, uriPattern:string, onEvent:OnEvent<ChildCreated>, onError?:OnError ):void {
			return this.on( Event.CHILD_CREATED, uriPattern, onEvent, onError );
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

		const resource:T & GeneralRepository<Document> = ModelDecorator
			.decorateMultiple( object, GeneralRepository );

		return ModelDecorator
			.definePropertiesFrom( EventEmitterDocumentsRepositoryTrait.PROTOTYPE, resource );
	},
};
