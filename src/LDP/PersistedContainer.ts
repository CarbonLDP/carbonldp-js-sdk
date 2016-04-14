import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	addMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
	addMember( memberURI:string ): Promise<HTTP.Response.Class>;

	addMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class>;

	createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	getMembers( includeNonReadable?:boolean ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	removeMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
	removeMember( memberURI:string ): Promise<HTTP.Response.Class>;

	removeMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class>;

	upload( slug:string, blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
}

function addMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
function addMember( memberURI:string ): Promise<HTTP.Response.Class>;
function addMember( memberOrUri:any ): Promise<HTTP.Response.Class> {
	let that:PersistedDocument.Class = <PersistedDocument.Class> this;
	return that._documents.addMember( that.id, memberOrUri );
}

function addMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class> {
	let that:PersistedDocument.Class = <PersistedDocument.Class> this;
	return that._documents.addMembers( that.id, members );
}

function createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slugOrObject?:any, object?:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrObject ) ? slugOrObject : null;
	object =  Utils.isString( slugOrObject ) ? object : slugOrObject;
	object = object || {};

	if( slug ) {
		return this._documents.createChild( this.id, slug, object );
	} else {
		return this._documents.createChild( this.id, object );
	}
}

function getMembers( includeNonReadable:boolean = true ):Promise<[ Pointer.Class[], HTTP.Response.Class ]> {
	return this._documents.getMembers( this.id, includeNonReadable );
}
function removeMember( member:Pointer.Class ): Promise<HTTP.Response.Class>;
function removeMember( memberURI:string ): Promise<HTTP.Response.Class>;
function removeMember( memberOrUri:any ): Promise<HTTP.Response.Class> {
	let that:PersistedDocument.Class = <PersistedDocument.Class> this;
	return that._documents.removeMember( that.id, memberOrUri );
}

function removeMembers( members:(Pointer.Class | string)[] ): Promise<HTTP.Response.Class> {
	let that:PersistedDocument.Class = <PersistedDocument.Class> this;
	return that._documents.removeMembers( that.id, members );
}

function upload( slug:string, blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( slugOrBlob:any, blob:any = null ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrBlob ) ? slugOrBlob : null;
	blob =  slug ? blob : slugOrBlob;

	if( slug ) {
		return this._documents.upload( this.id, slug, blob );
	} else {
		return this._documents.upload( this.id, blob );
	}
}

	export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return Utils.hasFunction( document, "createChild" )
			&& Utils.hasFunction( document, "addMember" )
			&& Utils.hasFunction( document, "addMembers" )
			&& Utils.hasFunction( document, "upload" )
			&& Utils.hasFunction( document, "removeMember" )
			&& Utils.hasFunction( document, "removeMembers" )
			&& Utils.hasFunction( document, "getMembers" );
	}

	static decorate<T extends PersistedDocument.Class>( persistedDocument:T ):T & Class {
		if( Factory.hasClassProperties( persistedDocument ) ) return <any> persistedDocument;

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
