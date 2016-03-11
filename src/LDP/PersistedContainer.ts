import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export interface Class extends PersistedDocument.Class {
	createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;
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
function createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( document:Document ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function createChild( slugOrDocument:any = null, document:Document = null ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	let slug:string = Utils.isString( slugOrDocument ) ? <any> slugOrDocument : null;
	document = !! slugOrDocument && ! Utils.isString( slugOrDocument ) ? slugOrDocument : ( !! document ? document : null );

	if( slug !== null ) {
		return this._documents.createChild( this.id, slug, document );
	} else return this._documents.createChild( this.id, document );
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return (
			Utils.hasFunction( document, "createChild" )
		);
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
		} );

		return <any> persistedDocument;
	}
}
