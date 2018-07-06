import { ModelDecorator } from "../Model";
import { TransientDocument } from "../Document";
import { IllegalActionError } from "../Errors";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import { DocumentsRegistry } from "../Registry";
import { Resource } from "../Resource";
import {
	isFunction,
	isObject,
	isString,
	PickSelfProps,
} from "../Utils";
import { AccessPointCreated } from "./AccessPointCreated";
import { ChildCreated } from "./ChildCreated";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberRemoved } from "./MemberRemoved";
import { MessagingService } from "./Service";
import { createDestination } from "./Utils";

export interface MessagingDocument extends Resource {
	_registry:DocumentsRegistry;

	on( event:Event.CHILD_CREATED, uriPattern:string, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
	on( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
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
	off( event:Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
	off( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
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
	one( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
	one( event:Event.ACCESS_POINT_CREATED, uriPattern:string, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
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


	onAccessPointCreated( uriPattern:string, onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;
	onAccessPointCreated( onEvent:( message:AccessPointCreated ) => void, onError?:( error:Error ) => void ):void;

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

function getMessagingService( repository:MessagingDocument ):MessagingService {
	if( ! repository._registry || ! repository._registry.context || ! repository._registry.context.messaging )
		throw new IllegalActionError( `"${ repository.$id }" doesn't support messaging subscriptions.` );

	return repository._registry.context.messaging;
}

function parseParams<T extends EventMessage>( resource:Pointer, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError:OnError | undefined ):{ uriPattern:string, onEvent:OnEvent<T>, onError:OnError | undefined } {
	const uriPattern:string = isString( uriPatternOROnEvent ) ?
		URI.resolve( resource.$id, uriPatternOROnEvent ) : resource.$id;

	const onEvent:OnEvent<T> = isFunction( uriPatternOROnEvent ) ?
		uriPatternOROnEvent : onEventOrOnError as OnEvent<T>;

	if( onEvent !== onEventOrOnError ) onError = onEventOrOnError as OnError;

	return { uriPattern, onEvent, onError };
}

const PROTOTYPE:PickSelfProps<MessagingDocument, TransientDocument> = {
	on<T extends EventMessage>( this:MessagingDocument, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			let uriPattern:string, onEvent:OnEvent<T>;
			({ uriPattern, onEvent, onError } = parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError ));

			const destination:string = createDestination( event, uriPattern, messaging.context.baseURI );
			messaging.subscribe( destination, onEvent, onError );

		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	},

	off<T extends EventMessage>( this:MessagingDocument, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			let uriPattern:string, onEvent:OnEvent<T>;
			({ uriPattern, onEvent, onError } = parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError ));

			const destination:string = createDestination( event, uriPattern, messaging.context.baseURI );
			messaging.unsubscribe( destination, onEvent );

		} catch( error ) {
			if( ! onError ) throw error;
			onError( error );
		}
	},

	one<T extends EventMessage>( this:MessagingDocument, event:Event | string, uriPatternOROnEvent:string | OnEvent<T>, onEventOrOnError:OnEvent<T> | OnError, onError?:OnError ):void {
		try {
			const messaging:MessagingService = getMessagingService( this );

			let uriPattern:string, onEvent:OnEvent<T>;
			({ uriPattern, onEvent, onError } = parseParams( this, uriPatternOROnEvent, onEventOrOnError, onError ));

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


	onAccessPointCreated( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<AccessPointCreated>, onEventOrOnError:OnEvent<AccessPointCreated> | OnError, onError?:OnError ):void {
		return this.on( Event.ACCESS_POINT_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<AccessPointCreated>, onError );
	},

	onChildCreated( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<ChildCreated>, onEventOrOnError:OnEvent<ChildCreated> | OnError, onError?:OnError ):void {
		return this.on( Event.CHILD_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<ChildCreated>, onError );
	},

	onDocumentCreated( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<DocumentCreated>, onEventOrOnError:OnEvent<DocumentCreated> | OnError, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_CREATED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentCreated>, onError );
	},

	onDocumentModified( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<DocumentModified>, onEventOrOnError:OnEvent<DocumentModified> | OnError, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_MODIFIED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentModified>, onError );
	},

	onDocumentDeleted( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<DocumentDeleted>, onEventOrOnError:OnEvent<DocumentDeleted> | OnError, onError?:OnError ):void {
		return this.on( Event.DOCUMENT_DELETED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<DocumentDeleted>, onError );
	},

	onMemberAdded( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<MemberAdded>, onEventOrOnError:OnEvent<MemberAdded> | OnError, onError?:OnError ):void {
		return this.on( Event.MEMBER_ADDED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberAdded>, onError );
	},

	onMemberRemoved( this:MessagingDocument, uriPatternOROnEvent:string | OnEvent<MemberRemoved>, onEventOrOnError:OnEvent<MemberRemoved> | OnError, onError?:OnError ):void {
		return this.on( Event.MEMBER_REMOVED, uriPatternOROnEvent as string, onEventOrOnError as OnEvent<MemberRemoved>, onError );
	},
};


export interface MessagingDocumentFactory extends ModelDecorator<MessagingDocument> {
	isDecorated( object:object ):object is MessagingDocument;

	decorate<T extends object>( object:T ):T & MessagingDocument;
}

export const MessagingDocument:MessagingDocumentFactory = {

	isDecorated( object:object ):object is MessagingDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & MessagingDocument {
		if( MessagingDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument = ModelDecorator
			.decorateMultiple( object, TransientDocument );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},

};
