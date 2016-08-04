import * as AccessPoint from "./AccessPoint";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as NamedFragment from "./NamedFragment";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
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
	isMemberOfRelation?:Pointer.Class;

	_documents:Documents;
	_etag:string;
	_fragmentsIndex:Map<string, PersistedFragment.Class>;
	_savedFragments:PersistedFragment.Class[];
	_syncSavedFragments():void;

	getFragment<T>( slug:string ):T & PersistedFragment.Class;
	getNamedFragment<T>( slug:string ):T & PersistedNamedFragment.Class;
	getFragments():PersistedFragment.Class[];

	createFragment():PersistedFragment.Class;
	createFragment( slug:string ):PersistedFragment.Class;
	createFragment<T extends Object>( object:T ):PersistedFragment.Class & T;
	createFragment<T extends Object>( object:T, slug:string ):PersistedFragment.Class & T;

	createNamedFragment( slug:string ):PersistedNamedFragment.Class;
	createNamedFragment<T extends Object>( object:T, slug:string ):PersistedNamedFragment.Class & T;

	refresh<T extends Class>():Promise<[T, HTTP.Response.Class]>;
	save<T extends Class>():Promise<[T, HTTP.Response.Class]>;
	delete():Promise<HTTP.Response.Class>;

	getDownloadURL():Promise<string>;

	addMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
	addMember( memberURI:string ):Promise<HTTP.Response.Class>;

	addMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;

	createChild<T extends Object>( object:Object, slug:string ):Promise<[ T & Class, HTTP.Response.Class ]>;
	createChild<T extends Object>( object:T ):Promise<[ T & Class, HTTP.Response.Class ]>;
	createChild( slug:string ):Promise<[ Class, HTTP.Response.Class ]>;
	createChild():Promise<[ Class, HTTP.Response.Class ]>;

	createChildAndRetrieve<T extends Object>( object:Object, slug:string ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve<T extends Object>( object:T ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve( slug:string ):Promise<[ Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
	createChildAndRetrieve():Promise<[ Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;

	createAccessPoint<T extends AccessPoint.Class>( accessPoint:T, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;
	createAccessPoint<T extends AccessPoint.Class>( accessPoint:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;

	listChildren():Promise<[ Class[], HTTP.Response.Class ]>;

	getChildren<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	listMembers( includeNonReadable?:boolean ):Promise<[ Class[], HTTP.Response.Class ]>;

	getMembers<T>( includeNonReadable?:boolean, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
	getMembers<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	removeMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;
	removeMember( memberURI:string ):Promise<HTTP.Response.Class>;

	removeMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;
	removeAllMembers():Promise<HTTP.Response.Class>;

	upload( blob:Blob, slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
	upload( blob:Buffer, slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
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

function extendCreateFragment( superFunction:() => Fragment.Class ):() => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slug:string ) => Fragment.Class ):( slug:string ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( object:Object, slug:string ) => Fragment.Class ):( slug:string, object:Object ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( object:Object ) => Fragment.Class ):( object:Object ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slugOrObject?:any, slug?:string ) => Fragment.Class ):any {
	return function( slugOrObject?:any, slug?:string  ):any {
		let fragment:Fragment.Class = superFunction.call( this, slugOrObject, slug );
		let id:string = fragment.id;

		if( RDF.URI.Util.isBNodeID( id ) ) {
			PersistedFragment.Factory.decorate( fragment );
		} else {
			PersistedNamedFragment.Factory.decorate( <NamedFragment.Class> fragment );
		}
		return fragment;
	};
}
function extendCreateNamedFragment( superFunction:( slug:string ) => NamedFragment.Class ):( slug:string ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( object:Object, slug:string ) => NamedFragment.Class ):( slug:string, object:Object ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( slugOrObject:any, slug?:string  ) => NamedFragment.Class ):any {
	return function( slugOrObject:any, slug?:string ):PersistedNamedFragment.Class {
		let fragment:NamedFragment.Class = superFunction.call( this, slugOrObject, slug );
		return PersistedFragment.Factory.decorate( fragment );
	};
}

function refresh<T extends Class>():Promise<[T, HTTP.Response.Class]> {
	return this._documents.refresh( this );
}
function save<T extends Class>():Promise<[T, HTTP.Response.Class]> {
	return this._documents.save( this );
}
function _delete():Promise<HTTP.Response.Class> {
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

function createChild<T extends Object>( object:T, slug:string ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild<T extends Object>( object:T ):Promise<[ T & Class, HTTP.Response.Class ]>;
function createChild( slug:string ):Promise<[ Class, HTTP.Response.Class ]>;
function createChild():Promise<[ Class, HTTP.Response.Class ]>;
function createChild<T extends Object>( slugOrObject?:any, slug?:string ):Promise<[ T & Class, HTTP.Response.Class ]> {
	let object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;

	return (<Class> this)._documents.createChild( this.id, object, slug );
}
function createChildAndRetrieve<T extends Object>( object:T, slug:string ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
function createChildAndRetrieve<T extends Object>( object:T ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
function createChildAndRetrieve( slug:string ):Promise<[ Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
function createChildAndRetrieve():Promise<[ Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>;
function createChildAndRetrieve<T extends Object>( slugOrObject?:any, slug?:string ):Promise<[ T & Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]> {
	let object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;

	return (<Class> this)._documents.createChildAndRetrieve<T>( this.id, object, slug );
}


function createAccessPoint( accessPoint:AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]>;
function createAccessPoint( accessPoint:AccessPoint.Class, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]>;
function createAccessPoint( accessPoint:AccessPoint.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]> {
	return this._documents.createAccessPoint( this.id, accessPoint, slugOrRequestOptions, requestOptions );
}

function listChildren():Promise<[ Class[], HTTP.Response.Class ]> {
	return this._documents.listChildren( this.id );
}

function getChildren<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ T & Class[], HTTP.Response.Class ]> {
	return this._documents.getChildren( this.id, retrievalPreferences );
}

function listMembers( includeNonReadable:boolean = true ):Promise<[ Class[], HTTP.Response.Class ]> {
	return this._documents.listMembers( this.id, includeNonReadable );
}

function getMembers<T>( includeNonReadable:boolean, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ T & Class[], HTTP.Response.Class ]>;
function getMembers<T>( retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ T & Class[], HTTP.Response.Class ]>;
function getMembers<T>( nonReadRetPref:boolean = true, retrievalPreferences?:RetrievalPreferences.Class ):Promise<[ T & Class[], HTTP.Response.Class ]> {
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

function upload( data:Buffer, slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Buffer ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Blob, slug:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Blob ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;
function upload( data:Blob | Buffer, slug?:string ):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	return this._documents.upload( this.id, data, slug );
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
			&& Utils.hasFunction( object, "delete" )

			&& Utils.hasFunction( object, "getDownloadURL" )

			&& Utils.hasFunction( object, "addMember" )
			&& Utils.hasFunction( object, "addMembers" )
			&& Utils.hasFunction( object, "createAccessPoint" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "createChildAndRetrieve" )
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
			"delete": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: _delete,
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
			"createChildAndRetrieve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChildAndRetrieve,
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
