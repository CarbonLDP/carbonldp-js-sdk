import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedRDFSource from "./PersistedRDFSource";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";
import * as RetrievalPreferences from "./../RetrievalPreferences";

export interface Class extends PersistedRDFSource.Class {
	addMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
	addMember( memberURI:string ): Promise<HTTP.Response.Class>;

	addMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;

	createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	listChildren():Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getChildren( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	listMembers( includeNonReadable?:boolean ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getMembers( includeNonReadable?:boolean, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
	getMembers( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	removeMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
	removeMember( memberURI:string ):Promise<HTTP.Response.Class>;

	removeMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;
	removeAllMembers():Promise<HTTP.Response.Class>;

	upload( slug:string, blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( slug:string, blob:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
}

function addMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
function addMember( memberURI:string ): Promise<HTTP.Response.Class>;
function addMember( memberOrUri:any ): Promise<HTTP.Response.Class> {
	return this._documents.addMember( this.id, memberOrUri );
}

function addMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class> {
	return this._documents.addMembers( this.id, members );
}

function createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slugOrObject?:any, object?:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrObject ) ? slugOrObject : null;
	object = Utils.isString( slugOrObject ) ? object : slugOrObject;
	object = object || {};

	if( slug ) {
		return this._documents.createChild( this.id, slug, object );
	} else {
		return this._documents.createChild( this.id, object );
	}
}

function listChildren():Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	return this._documents.listChildren( this.id );
}

function getChildren( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	return this._documents.getChildren( this.id, retrievalPreferences );
}

function listMembers( includeNonReadable:boolean = true ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	return this._documents.listMembers( this.id, includeNonReadable );
}

function getMembers( includeNonReadable:boolean, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
function getMembers( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;
function getMembers( nonReadRetPref:boolean = true, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	return this._documents.getMembers( this.id, nonReadRetPref, retrievalPreferences );
}

function removeMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
function removeMember( memberURI:string ): Promise<HTTP.Response.Class>;
function removeMember( memberOrUri:any ): Promise<HTTP.Response.Class> {
	return this._documents.removeMember( this.id, memberOrUri );
}

function removeMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class> {
	return this._documents.removeMembers( this.id, members );
}

function removeAllMembers(): Promise<HTTP.Response.Class> {
	return this._documents.removeAllMembers( this.id );
}

function upload( slug:string, data:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( slug:string, data:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( slugOrData:any, data:any = null ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrData ) ? slugOrData : null;
	data = slug ? data : slugOrData;

	if( slug ) {
		return this._documents.upload( this.id, slug, data );
	} else {
		return this._documents.upload( this.id, data );
	}
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return Utils.isObject( document )
			&& Utils.hasFunction( document, "addMember" )
			&& Utils.hasFunction( document, "addMembers" )
			&& Utils.hasFunction( document, "createChild" )
			&& Utils.hasFunction( document, "listChildren" )
			&& Utils.hasFunction( document, "getChildren" )
			&& Utils.hasFunction( document, "listMembers" )
			&& Utils.hasFunction( document, "getMembers" )
			&& Utils.hasFunction( document, "removeMember" )
			&& Utils.hasFunction( document, "removeMembers" )
			&& Utils.hasFunction( document, "removeAllMembers" )
			&& Utils.hasFunction( document, "upload" );
	}

	static decorate<T extends PersistedDocument.Class>( persistedDocument:T ):T & Class {
		if( Factory.hasClassProperties( persistedDocument ) ) return <any> persistedDocument;

		PersistedRDFSource.Factory.decorate( persistedDocument );

		Object.defineProperties( persistedDocument, {
			"addMember": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: addMember,
			},
			"addMembers": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: addMembers,
			},
			"createChild": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChild,
			},
			"listChildren": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: listChildren,
			},
			"getChildren": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getChildren,
			},
			"listMembers": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: listMembers,
			},
			"getMembers": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getMembers,
			},
			"removeMember": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: removeMember,
			},
			"removeMembers": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: removeMembers,
			},
			"removeAllMembers": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: removeAllMembers,
			},
			"upload": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: upload,
			},
		} );

		return <any> persistedDocument;
	}
}

export default Class;
