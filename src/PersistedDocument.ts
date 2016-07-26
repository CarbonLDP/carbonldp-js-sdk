import * as AccessPoint from "./AccessPoint";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as NamedFragment from "./NamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as RetrievalPreferences from "./RetrievalPreferences";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";
import * as URI from "./RDF/URI";
import * as ObjectSchema from "./ObjectSchema";

export interface Class extends PersistedResource.Class, Document.Class {
	created?:Date;
	modified?:Date;
	defaultInteractionModel?:Pointer.Class;
	accessPoints?:Pointer.Class[];
	hasMemberRelation?:Pointer.Class;
	memberOfRelation?:Pointer.Class;

	_documents:Documents;
	_etag:string;
	_fragmentsIndex:Map<string, PersistedFragment.Class>;
	_savedFragments:PersistedFragment.Class[];
	_syncSavedFragments():void;

	getFragment<T>( slug:string ):T & PersistedFragment.Class;
	getNamedFragment<T>( slug:string ):T & PersistedNamedFragment.Class;
	getFragments():PersistedFragment.Class[];

	createFragment():PersistedFragment.Class;
	createFragment( slug:string ):PersistedNamedFragment.Class;
	createFragment<T extends Object>( slug:string, object:T ):PersistedNamedFragment.Class & T;
	createFragment<T extends Object>( object:T ):PersistedFragment.Class & T;

	createNamedFragment( slug:string ):PersistedNamedFragment.Class;
	createNamedFragment<T extends Object>( slug:string, object:T ):PersistedNamedFragment.Class & T;

	refresh<T extends Class>():Promise<[T, HTTP.Response.Class]>;
	save<T extends Class>():Promise<[T, HTTP.Response.Class]>;
	destroy():Promise<HTTP.Response.Class>;

	getDownloadURL():Promise<string>;

	addMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
	addMember( memberURI:string ):Promise<HTTP.Response.Class>;

	addMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;

	createChild( slug:string, object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild( object:Object ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	createChild():Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	createAccessPoint( accessPoint:AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	listChildren():Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getChildren<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	listMembers( includeNonReadable?:boolean ):Promise<[ Pointer.Class[], HTTP.Response.Class ]>;

	getMembers<T>( includeNonReadable?:boolean, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
	getMembers<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	removeMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
	removeMember( memberURI:string ):Promise<HTTP.Response.Class>;

	removeMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;
	removeAllMembers():Promise<HTTP.Response.Class>;

	upload( slug:string, blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( slug:string, blob:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	executeRawASKQuery( askQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeASKQuery( askQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ boolean, HTTP.Response.Class ]>;
	executeRawSELECTQuery( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeSELECTQuery( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]>;
	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
	executeUPDATE( updateQuery:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;
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

function refresh<T extends Class>():Promise<[T, HTTP.Response.Class]> {
	return this._documents.refresh( this );
}
function save<T extends Class>():Promise<[T, HTTP.Response.Class]> {
	return this._documents.save( this );
}
function destroy():Promise<HTTP.Response.Class> {
	return this._documents.delete( this.id );
}

function getDownloadURL():Promise<string> {
	return (<Class> this)._documents.getDownloadURL( (<Class> this).id );
}

function addMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
function addMember( memberURI:string ):Promise<HTTP.Response.Class>;
function addMember( memberOrUri:any ):Promise<HTTP.Response.Class> {
	return this._documents.addMember( this.id, memberOrUri );
}

function addMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class> {
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

function createAccessPoint( accessPoint:AccessPoint.Class, slug:string = null, requestOptions:HTTP.Request.Options = {} ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	return this._documents.createAccessPoint( accessPoint, slug, requestOptions );
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

function removeMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
function removeMember( memberURI:string ):Promise<HTTP.Response.Class>;
function removeMember( memberOrUri:any ):Promise<HTTP.Response.Class> {
	return this._documents.removeMember( this.id, memberOrUri );
}

function removeMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class> {
	return this._documents.removeMembers( this.id, members );
}

function removeAllMembers():Promise<HTTP.Response.Class> {
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

function executeUPDATE( updateQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
	return this._documents.executeUPDATE( this.id, updateQuery, requestOptions );
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "_documents" )
			&& Utils.hasPropertyDefined( object, "_etag" )

			&& Utils.hasFunction( object, "refresh" )
			&& Utils.hasFunction( object, "save" )
			&& Utils.hasFunction( object, "destroy" )

			&& Utils.hasFunction( object, "getDownloadURL" )

			&& Utils.hasFunction( object, "addMember" )
			&& Utils.hasFunction( object, "addMembers" )
			&& Utils.hasFunction( object, "createAccessPoint" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "getChildren" )
			&& Utils.hasFunction( object, "getMembers" )
			&& Utils.hasFunction( object, "listChildren" )
			&& Utils.hasFunction( object, "listMembers" )
			&& Utils.hasFunction( object, "removeMember" )
			&& Utils.hasFunction( object, "removeMembers" )
			&& Utils.hasFunction( object, "removeAllMembers" )
			&& Utils.hasFunction( object, "upload" )

			&& Utils.hasFunction( object, "executeRawASKQuery" )
			&& Utils.hasFunction( object, "executeASKQuery" )
			&& Utils.hasFunction( object, "executeRawSELECTQuery" )
			&& Utils.hasFunction( object, "executeSELECTQuery" )
			&& Utils.hasFunction( object, "executeRawDESCRIBEQuery" )
			&& Utils.hasFunction( object, "executeRawCONSTRUCTQuery" )
			&& Utils.hasFunction( object, "executeUPDATE" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& Document.Factory.is( object );
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

	static decorate<T extends Object>( document:T, documents:Documents, snapshot:Object = {} ):T & Class {
		Document.Factory.decorate( document );
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
						if( RDF.URI.Util.isPrefixed( id ) ) {
							id = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( id ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
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
						if( RDF.URI.Util.isPrefixed( id ) ) {
							id = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( id ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
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
						if( RDF.URI.Util.isPrefixed( uri ) ) {
							uri = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( uri ), (<Class> this)._documents.getSchemaFor( this ) ).stringValue;
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
			"createAccessPoint": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createAccessPoint,
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
			"executeUPDATE": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeUPDATE,
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
