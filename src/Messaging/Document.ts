import * as ServiceAwareDocument from "../ServiceAwareDocument";
import { hasFunction, isObject } from "../Utils";
import * as Messaging from "./../Messaging";
import { Event } from "./Event";
import * as Message from "./Message";

export interface Class extends ServiceAwareDocument.Class {
	on( event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void;

	off( event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void;

	one( event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void;

	onAccessPointCreated( onEvent:( message:Messaging.AccessPointCreated.Class, onError:( error:Error ) => void ) => void ):void;

	onChildCreated( onEvent:( message:Messaging.ChildCreated.Class, onError:( error:Error ) => void ) => void ):void;

	onDocumentCreated( onEvent:( message:Messaging.DocumentCreated.Class, onError:( error:Error ) => void ) => void ):void;

	onDocumentModified( onEvent:( message:Messaging.DocumentModified.Class, onError:( error:Error ) => void ) => void ):void;

	onDocumentDeleted( onEvent:( message:Messaging.DocumentDeleted.Class, onError:( error:Error ) => void ) => void ):void;

	onMemberAdded( onEvent:( message:Messaging.MemberAdded.Class, onError:( error:Error ) => void ) => void ):void;

	onMemberRemoved( onEvent:( message:Messaging.MemberRemoved.Class, onError:( error:Error ) => void ) => void ):void;
}

function on( this:Class, event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.on( event, this.id, onEvent, onError );
}

function off( this:Class, event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.off( event, this.id, onEvent, onError );
}

function one( this:Class, event:Event | string, onEvent:( message:Message.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.one( event, this.id, onEvent, onError );
}

function onAccessPointCreated( this:Class, onEvent:( message:Messaging.AccessPointCreated.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onAccessPointCreated( this.id, onEvent, onError );
}

function onChildCreated( this:Class, onEvent:( message:Messaging.ChildCreated.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onChildCreated( this.id, onEvent, onError );
}

function onDocumentCreated( this:Class, onEvent:( message:Messaging.DocumentCreated.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentCreated( this.id, onEvent, onError );
}

function onDocumentModified( this:Class, onEvent:( message:Messaging.DocumentModified.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentModified( this.id, onEvent, onError );
}

function onDocumentDeleted( this:Class, onEvent:( message:Messaging.DocumentDeleted.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onDocumentDeleted( this.id, onEvent, onError );
}

function onMemberAdded( this:Class, onEvent:( message:Messaging.MemberAdded.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onMemberAdded( this.id, onEvent, onError );
}

function onMemberRemoved( this:Class, onEvent:( message:Messaging.MemberRemoved.Class ) => void, onError:( error:Error ) => void ):void {
	return this._documents.onMemberRemoved( this.id, onEvent, onError );
}

export class Factory {

	static hasClassProperties( object:object ):object is Class {
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
	}

	static decorate<T extends ServiceAwareDocument.Class>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

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
	}

}

export default Class;
