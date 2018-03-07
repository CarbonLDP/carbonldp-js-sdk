import { ModelDecorator } from "../ModelDecorator";
import { ServiceAwareDocument } from "../ServiceAwareDocument";
import {
	hasFunction,
	isObject,
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

export interface MessagingDocument extends ServiceAwareDocument {
	on( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError:( error:Error ) => void ):void;

	on( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError:( error:Error ) => void ):void;

	on( event:Event | string, onEvent:( message:EventMessage ) => void, onError:( error:Error ) => void ):void;


	off( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError:( error:Error ) => void ):void;

	off( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError:( error:Error ) => void ):void;

	off( event:Event | string, onEvent:( message:EventMessage ) => void, onError:( error:Error ) => void ):void;


	one( event:Event.CHILD_CREATED, onEvent:( message:ChildCreated ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.ACCESS_POINT_CREATED, onEvent:( message:AccessPointCreated ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.DOCUMENT_CREATED, onEvent:( message:DocumentCreated ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.DOCUMENT_MODIFIED, onEvent:( message:DocumentModified ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.DOCUMENT_DELETED, onEvent:( message:DocumentDeleted ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.MEMBER_ADDED, onEvent:( message:MemberAdded ) => void, onError:( error:Error ) => void ):void;

	one( event:Event.MEMBER_REMOVED, onEvent:( message:MemberRemoved ) => void, onError:( error:Error ) => void ):void;

	one( event:Event | string, onEvent:( message:EventMessage ) => void, onError:( error:Error ) => void ):void;


	onAccessPointCreated( onEvent:( message:AccessPointCreated ) => void, onError:( error:Error ) => void ):void;

	onChildCreated( onEvent:( message:ChildCreated ) => void, onError:( error:Error ) => void ):void;

	onDocumentCreated( onEvent:( message:DocumentCreated ) => void, onError:( error:Error ) => void ):void;

	onDocumentModified( onEvent:( message:DocumentModified ) => void, onError:( error:Error ) => void ):void;

	onDocumentDeleted( onEvent:( message:DocumentDeleted ) => void, onError:( error:Error ) => void ):void;

	onMemberAdded( onEvent:( message:MemberAdded ) => void, onError:( error:Error ) => void ):void;

	onMemberRemoved( onEvent:( message:MemberRemoved ) => void, onError:( error:Error ) => void ):void;
}


function on<T extends EventMessage>( this:MessagingDocument, event:Event | string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
	return this._documents.on( event, this.id, onEvent, onError );
}

function off<T extends EventMessage>( this:MessagingDocument, event:Event | string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
	return this._documents.off( event, this.id, onEvent, onError );
}

function one<T extends EventMessage>( this:MessagingDocument, event:Event | string, onEvent:( message:T ) => void, onError:( error:Error ) => void ):void {
	return this._documents.one( event, this.id, onEvent, onError );
}

function onAccessPointCreated( this:MessagingDocument, onEvent:( message:AccessPointCreated ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onAccessPointCreated( this.id, onEvent, onError );
}

function onChildCreated( this:MessagingDocument, onEvent:( message:ChildCreated ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onChildCreated( this.id, onEvent, onError );
}

function onDocumentCreated( this:MessagingDocument, onEvent:( message:DocumentCreated ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentCreated( this.id, onEvent, onError );
}

function onDocumentModified( this:MessagingDocument, onEvent:( message:DocumentModified ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentModified( this.id, onEvent, onError );
}

function onDocumentDeleted( this:MessagingDocument, onEvent:( message:DocumentDeleted ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentDeleted( this.id, onEvent, onError );
}

function onMemberAdded( this:MessagingDocument, onEvent:( message:MemberAdded ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onMemberAdded( this.id, onEvent, onError );
}

function onMemberRemoved( this:MessagingDocument, onEvent:( message:MemberRemoved ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onMemberRemoved( this.id, onEvent, onError );
}

export interface MessagingDocumentFactory extends ModelDecorator<MessagingDocument, ServiceAwareDocument> {
	isDecorated( object:object ):object is MessagingDocument;

	decorate<T extends ServiceAwareDocument>( object:T ):T & MessagingDocument;
}

export const MessagingDocument:MessagingDocumentFactory = {

	isDecorated( object:object ):object is MessagingDocument {
		return isObject( object )
			&& hasFunction( object, "on" )
			&& hasFunction( object, "off" )
			&& hasFunction( object, "one" )
			&& hasFunction( object, "onDocumentCreated" )
			&& hasFunction( object, "onChildCreated" )
			&& hasFunction( object, "onAccessPointCreated" )
			&& hasFunction( object, "onDocumentModified" )
			&& hasFunction( object, "onDocumentDeleted" )
			&& hasFunction( object, "onMemberAdded" )
			&& hasFunction( object, "onMemberRemoved" )
			;
	},

	decorate<T extends ServiceAwareDocument>( object:T ):T & MessagingDocument {
		if( MessagingDocument.isDecorated( object ) ) return object;

		return Object.defineProperties( object, {
			"on": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: on,
			},
			"off": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: off,
			},
			"one": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: one,
			},
			"onDocumentCreated": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onDocumentCreated,
			},
			"onChildCreated": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onChildCreated,
			},
			"onAccessPointCreated": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onAccessPointCreated,
			},
			"onDocumentModified": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onDocumentModified,
			},
			"onDocumentDeleted": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onDocumentDeleted,
			},
			"onMemberAdded": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onMemberAdded,
			},
			"onMemberRemoved": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: onMemberRemoved,
			},
		} );
	},

};
