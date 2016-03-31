import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	upload( slug:string, blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
}

// TODO: Accept non document objects and turn them to documents
/*
	function createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	function createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	function createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	function createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	function createChild( slugOrObject:Object = null, object:Object = null ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
*/

function createChild( slug:string, document:Document ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( document:Document ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slugOrDocument:any, document:any = null ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrDocument ) ? slugOrDocument : null;
	document =  slug ? document : slugOrDocument;

	if( slug ) {
		return this._documents.createChild( this.id, slug, document );
	} else {
		return this._documents.createChild( this.id, document );
	}
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
			&& Utils.hasFunction( document, "upload" );
	}

	static decorate<T extends PersistedDocument.Class>( persistedDocument:T ):T & Class {
		if( Factory.hasClassProperties( persistedDocument ) ) return <any> persistedDocument;

		Object.defineProperties( persistedDocument, {
			"createChild": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChild,
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
