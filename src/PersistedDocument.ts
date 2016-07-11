import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as Fragment from "./Fragment";
import * as NamedFragment from "./NamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";
import * as URI from "./RDF/URI";
import { Digester } from "./ObjectSchema";

export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
	_documents:Documents;
	_etag:string;
	_fragmentsIndex:Map<string, PersistedFragment.Class>;
	_savedFragments:PersistedFragment.Class[];
	_syncSavedFragments():void;

	getFragment( slug:string ):PersistedFragment.Class;
	getNamedFragment( slug:string ):PersistedNamedFragment.Class;
	getFragments():PersistedFragment.Class[];

	createFragment():PersistedFragment.Class;
	createFragment( slug:string ):PersistedNamedFragment.Class;
	createFragment<T extends Object>( slug:string, object:T ):PersistedNamedFragment.Class & T;
	createFragment<T extends Object>( object:T ):PersistedFragment.Class & T;

	createNamedFragment( slug:string ):PersistedNamedFragment.Class;
	createNamedFragment<T extends Object>( slug:string, object:T ):PersistedNamedFragment.Class & T;

	refresh():Promise<[Class, HTTP.Response.Class]>;
	save():Promise<[Class, HTTP.Response.Class]>;
	destroy():Promise<HTTP.Response.Class>;

	getDownloadURL():Promise<string>;

	executeRawASKQuery( askQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeASKQuery( askQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ boolean, HTTP.Response.Class ]>;
	executeRawSELECTQuery( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeSELECTQuery( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]>;
	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
}

function extendIsDirty( superFunction:() => boolean ):() => boolean {
	return function():boolean {
		let isDirty:boolean = superFunction.call( this );
		if( isDirty ) return true;

		let document:Class = this;

		for( let fragment of document.getFragments() ) {
			if( fragment.isDirty() ) return true;
		}

		// Check if an already saved fragment was removed
		for( let fragment of document._savedFragments ) {
			if( ! document.hasFragment( fragment.id ) ) return true;
		}

		return false;
	};
}

function syncSavedFragments():void {
	let document:Class = this;
	document._savedFragments = Utils.A.from( document._fragmentsIndex.values() );
}

function extendCreateFragment( superFunction:( slug:string ) => NamedFragment.Class ):( slug:string ) => PersistedNamedFragment.Class;
function extendCreateFragment( superFunction:() => Fragment.Class ):() => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slug:string, object:Object ) => NamedFragment.Class ):( slug:string, object:Object ) => PersistedNamedFragment.Class;
function extendCreateFragment( superFunction:( object:Object ) => Fragment.Class ):( object:Object ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slug?:string, object?:Object ) => any ):any {
	return function( slugOrObject:string = null, object:Object = null ):any {
		let fragment:Fragment.Class = superFunction.call( this, slugOrObject, object );
		let id:string = fragment.id;

		if( RDF.URI.Util.isBNodeID( id ) ) {
			PersistedFragment.Factory.decorate( fragment );
		} else {
			PersistedNamedFragment.Factory.decorate( fragment );
		}
		return fragment;
	};
}
function extendCreateNamedFragment( superFunction:( slug:string ) => NamedFragment.Class ):( slug:string ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( slug:string, object:Object ) => NamedFragment.Class ):( slug:string, object:Object ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( slug:string, object?:Object ) => NamedFragment.Class ):any {
	return function( slug:string, object:Object = null ):PersistedNamedFragment.Class {
		let fragment:NamedFragment.Class = superFunction.call( this, slug, object );
		return PersistedFragment.Factory.decorate( fragment );
	};
}

function refresh():Promise<[Class, HTTP.Response.Class]> {
	return this._documents.refresh( this );
}
function save():Promise<void> {
	return this._documents.save( this );
}
function destroy():Promise<HTTP.Response.Class> {
	return this._documents.delete( this.id );
}

function getDownloadURL():Promise<string> {
	return (<Class> this)._documents.getDownloadURL( (<Class> this).id );
}

function executeRawASKQuery( askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeRawASKQuery( this.id, askQuery, requestOptions );
}

function executeASKQuery( askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
	return this._documents.executeASKQuery( this.id, askQuery, requestOptions );
}

function executeRawSELECTQuery( selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeRawSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeSELECTQuery( selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeRawCONSTRUCTQuery( constructQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
	return this._documents.executeRawCONSTRUCTQuery( this.id, constructQuery, requestOptions );
}

function executeRawDESCRIBEQuery( describeQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
	return this._documents.executeRawDESCRIBEQuery( this.id, describeQuery, requestOptions );
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return (
			Utils.hasPropertyDefined( document, "_documents" ) &&
			Utils.hasPropertyDefined( document, "_etag" ) &&
			Utils.hasFunction( document, "refresh" ) &&
			Utils.hasFunction( document, "save" ) &&
			Utils.hasFunction( document, "destroy" ) &&

			Utils.hasFunction( document, "getDownloadURL" ) &&

			Utils.hasFunction( document, "executeRawASKQuery" ) &&
			Utils.hasFunction( document, "executeASKQuery" ) &&
			Utils.hasFunction( document, "executeRawSELECTQuery" ) &&
			Utils.hasFunction( document, "executeSELECTQuery" ) &&
			Utils.hasFunction( document, "executeRawDESCRIBEQuery" ) &&
			Utils.hasFunction( document, "executeRawCONSTRUCTQuery" )
		);
	}

	static is( object:Object ):boolean {
		return Utils.isObject( object )
			&& Document.Factory.hasClassProperties( object )
			&& Factory.hasClassProperties( <any> object );
	}

	static create( uri:string, documents:Documents, snapshot:Object = {} ):Class {
		let document:Document.Class = Document.Factory.create();
		document.id = uri;

		return Factory.decorate( document, documents, snapshot );
	}

	static createFrom<T extends Object>( object:T, uri:string, documents:Documents, snapshot:Object = {} ):Class {
		let document:Document.Class = Document.Factory.createFrom( object );
		document.id = uri;

		return Factory.decorate( document, documents, snapshot );
	}

	static decorate<T extends Document.Class>( document:T, documents:Documents, snapshot:Object = {} ):T & Class {
		PersistedResource.Factory.decorate( document, snapshot );

		if( Factory.hasClassProperties( document ) ) return <any> document;

		let persistedDocument:Class = <any> document;

		Object.defineProperties( persistedDocument, {
			"_documents": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: documents,
			},
			"_etag": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: null,
			},
			"_savedFragments": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: [],
			},
			"_syncSavedFragments": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: syncSavedFragments,
			},

			"hasPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( id:string ) => boolean {
					let superFunction:( id:string ) => boolean = persistedDocument.hasPointer;
					return function( id:string ):boolean {
						if ( RDF.URI.Util.isPrefixed( id ) ) {
							id = Digester.resolvePrefixedURI( new RDF.URI.Class( id ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
						}

						if( superFunction.call( this, id ) ) return true;

						return ! URI.Util.isBNodeID( id ) && (<Class> this)._documents.hasPointer( id );
					};
				})(),
			},
			"getPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( id:string ) => Pointer.Class {
					let superFunction:( id:string ) => Pointer.Class = persistedDocument.getPointer;
					let inScopeFunction:( id:string ) => boolean = persistedDocument.inScope;
					return function( id:string ):Pointer.Class {
						if ( RDF.URI.Util.isPrefixed( id ) ) {
							id = Digester.resolvePrefixedURI( new RDF.URI.Class( id ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
						}

						if( inScopeFunction.call( this, id ) ) return superFunction.call( this, id );

						return (<Class> this)._documents.getPointer( id );
					};
				})(),
			},
			"inScope": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( idOrPointer:any ) => boolean {
					let superFunction:( idOrPointer:any ) => boolean = persistedDocument.inScope;
					return function( idOrPointer:any ):boolean {
						let uri:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;
						if ( RDF.URI.Util.isPrefixed( uri ) ) {
							uri = Digester.resolvePrefixedURI( new RDF.URI.Class( uri ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
						}

						if( superFunction.call( this, uri ) ) return true;

						return (<Class> this)._documents.inScope( uri );
					};
				})(),
			},
			"refresh": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: refresh,
			},
			"save": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: save,
			},
			"destroy": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: destroy,
			},

			"getDownloadURL": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getDownloadURL,
			},

			"executeRawASKQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawASKQuery,
			},
			"executeASKQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeASKQuery,
			},
			"executeRawSELECTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawSELECTQuery,
			},
			"executeSELECTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeSELECTQuery,
			},
			"executeRawCONSTRUCTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawCONSTRUCTQuery,
			},
			"executeRawDESCRIBEQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawDESCRIBEQuery,
			},

			"createFragment": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendCreateFragment( persistedDocument.createFragment ),
			},
			"createNamedFragment": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendCreateNamedFragment( persistedDocument.createNamedFragment ),
			},

			// Overwrite PersistedResource.isDirty to take into account fragments state
			"isDirty": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendIsDirty( persistedDocument.isDirty ),
			},
		} );

		return <any> persistedDocument;
	}
}

export default Class;
