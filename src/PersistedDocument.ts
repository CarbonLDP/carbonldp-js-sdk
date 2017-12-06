import { QueryClause } from "sparqler/Clauses";

import * as AccessPoint from "./AccessPoint";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as MessagingDocument from "./Messaging/Document";
import * as NamedFragment from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as URI from "./RDF/URI";
import * as ServiceAwareDocument from "./ServiceAwareDocument";
import * as SPARQL from "./SPARQL";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument";
import * as Utils from "./Utils";

export interface Class extends Document.Class, PersistedResource.Class, ServiceAwareDocument.Class, MessagingDocument.Class {
	created?:Date;
	modified?:Date;
	defaultInteractionModel?:Pointer.Class;
	accessPoints?:Pointer.Class[];
	hasMemberRelation?:Pointer.Class;
	isMemberOfRelation?:Pointer.Class;
	contains?:Pointer.Class[];

	_etag:string;
	_fragmentsIndex:Map<string, PersistedFragment.Class>;
	_savedFragments:PersistedFragment.Class[];

	_syncSavedFragments():void;

	isLocallyOutDated():boolean;

	getFragment<T extends object>( slug:string ):T & PersistedFragment.Class;

	getNamedFragment<T extends object>( slug:string ):T & PersistedNamedFragment.Class;

	getFragments():PersistedFragment.Class[];

	createFragment():PersistedFragment.Class;

	createFragment( slug:string ):PersistedFragment.Class;

	createFragment<T extends object>( object:T ):PersistedFragment.Class & T;

	createFragment<T extends object>( object:T, slug:string ):PersistedFragment.Class & T;

	createNamedFragment( slug:string ):PersistedNamedFragment.Class;

	createNamedFragment<T extends object>( object:T, slug:string ):PersistedNamedFragment.Class & T;

	refresh<T extends object>():Promise<[ T & Class, HTTP.Response.Class ]>;

	save<T extends object>( requestOptions?:HTTP.Request.Options ):Promise<[ T & Class, HTTP.Response.Class ]>;

	saveAndRefresh<T extends object>():Promise<[ T & Class, HTTP.Response.Class ]>;

	delete():Promise<HTTP.Response.Class>;

	getDownloadURL():Promise<string>;

	addMember( member:Pointer.Class ):Promise<HTTP.Response.Class>;

	addMember( memberURI:string ):Promise<HTTP.Response.Class>;

	addMembers( members:(Pointer.Class | string)[] ):Promise<HTTP.Response.Class>;

	createChild<T extends object>( object:T, slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChild<T extends object>( object:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChild( slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChild( requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;

	createChildren<T extends object>( objects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;

	createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChildAndRetrieve<T extends object>( object:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChildAndRetrieve( slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChildAndRetrieve( requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;

	createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;

	createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;

	createAccessPoint<T extends object>( accessPoint:T & AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;

	createAccessPoint<T extends object>( accessPoint:T & AccessPoint.Class, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedAccessPoint.Class, HTTP.Response.Class ]>;

	createAccessPoints<T extends object>( accessPoints:(T & AccessPoint.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;

	createAccessPoints<T extends object>( accessPoints:(T & AccessPoint.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;


	getChildren<T extends object>( requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;


	getMembers<T extends object>( requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;

	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;


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

	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.SELECTResults.Class<T>, HTTP.Response.Class ]>;

	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;

	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;

	executeUPDATE( updateQuery:string, requestOptions?:HTTP.Request.Options ):Promise<HTTP.Response.Class>;

	sparql():QueryClause;
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

function isLocallyOutDated( this:Class ):boolean {
	return this._etag === null;
}

function extendRevert( superFunction:() => void ):() => void {
	return function():void {
		let persistedDocument:Class = this;
		persistedDocument._fragmentsIndex.clear();
		for( let fragment of persistedDocument._savedFragments ) {
			let slug:string = "slug" in fragment ? (fragment as PersistedNamedFragment.Class).slug : fragment.id;

			fragment.revert();
			persistedDocument._fragmentsIndex.set( slug, fragment );
		}
		superFunction.call( persistedDocument );
	};
}

function syncSavedFragments():void {
	let document:Class = this;
	document._savedFragments = Utils.A.from( document._fragmentsIndex.values() );
}

function resolveURI( uri:string ):string {
	if( URI.Util.isAbsolute( uri ) ) return uri;

	let schema:ObjectSchema.DigestedObjectSchema = this._documents.getGeneralSchema();
	return ObjectSchema.Util.resolveURI( uri, schema );
}

function extendAddType( superFunction:( type:string ) => void ):( type:string ) => void {
	return function( type:string ):void {
		type = resolveURI.call( this, type );
		superFunction.call( this, type );
	};
}

function extendHasType( superFunction:( type:string ) => boolean ):( type:string ) => boolean {
	return function( type:string ):boolean {
		type = resolveURI.call( this, type );
		return superFunction.call( this, type );
	};
}

function extendRemoveType( superFunction:( type:string ) => void ):( type:string ) => void {
	return function( type:string ):void {
		type = resolveURI.call( this, type );
		superFunction.call( this, type );
	};
}

function extendCreateFragment( superFunction:() => Fragment.Class ):() => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slug:string ) => Fragment.Class ):( slug:string ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( object:object, slug:string ) => Fragment.Class ):( slug:string, object:object ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( object:object ) => Fragment.Class ):( object:object ) => PersistedFragment.Class;
function extendCreateFragment( superFunction:( slugOrObject?:any, slug?:string ) => Fragment.Class ):any {
	return function( slugOrObject?:any, slug?:string ):any {
		let fragment:Fragment.Class = superFunction.call( this, slugOrObject, slug );
		let id:string = fragment.id;

		if( RDF.URI.Util.isBNodeID( id ) ) PersistedFragment.Factory.decorate( fragment );
		return fragment;
	};
}

function extendCreateNamedFragment( superFunction:( slug:string ) => NamedFragment.Class ):( slug:string ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( object:object, slug:string ) => NamedFragment.Class ):( slug:string, object:object ) => PersistedNamedFragment.Class;
function extendCreateNamedFragment( superFunction:( slugOrObject:any, slug?:string ) => NamedFragment.Class ):any {
	return function( slugOrObject:any, slug?:string ):PersistedNamedFragment.Class {
		let fragment:NamedFragment.Class = superFunction.call( this, slugOrObject, slug );
		return PersistedNamedFragment.Factory.decorate( fragment );
	};
}

function refresh<T extends Class>():Promise<[ T, HTTP.Response.Class ]> {
	return this._documents.refresh( this );
}

function save<T extends Class>( requestOptions?:HTTP.Request.Options ):Promise<[ T, HTTP.Response.Class ]> {
	return this._documents.save( this, requestOptions );
}

function saveAndRefresh<T extends Class>( this:T ):Promise<[ T, HTTP.Response.Class ]> {
	return this._documents.saveAndRefresh<T>( this );
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

function createChild<T extends object>( object:T, slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChild<T extends object>( object:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChild( slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChild( requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChild<T extends object>( this:Class, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
	requestOptions = HTTP.Request.Util.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || HTTP.Request.Util.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChild<T>( this.id, object, slug, requestOptions );
}

function createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
function createChildren<T extends object>( objects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
function createChildren<T extends object>( this:Class, objects:T[], slugsOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]> {
	return this._documents.createChildren<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChildAndRetrieve<T extends object>( object:T, requestOptions?:HTTP.Request.Options ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChildAndRetrieve( slug:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChildAndRetrieve( requestOptions?:HTTP.Request.Options ):Promise<[ PersistedProtectedDocument.Class, HTTP.Response.Class ]>;
function createChildAndRetrieve<T extends object>( this:Class, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions:HTTP.Request.Options = {} ):Promise<[ T & PersistedProtectedDocument.Class, HTTP.Response.Class ]> {
	requestOptions = HTTP.Request.Util.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : HTTP.Request.Util.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || HTTP.Request.Util.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChildAndRetrieve<T>( this.id, object, slug, requestOptions );
}

function createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
function createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]>;
function createChildrenAndRetrieve<T extends object>( this:Class, objects:T[], slugsOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[] ]> {
	return this._documents.createChildrenAndRetrieve<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createAccessPoint<T extends object>( accessPoint:T & AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]>;
function createAccessPoint<T extends object>( accessPoint:T & AccessPoint.Class, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]>;
function createAccessPoint<T extends object>( this:Class, accessPoint:T & AccessPoint.Class, slugOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ PersistedAccessPoint.Class, HTTP.Response.Class ]> {
	return this._documents.createAccessPoint<T>( this.id, accessPoint, slugOrRequestOptions, requestOptions );
}

function createAccessPoints<T extends object>( accessPoints:(T & AccessPoint.Class)[], slugs?:string[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
function createAccessPoints<T extends object>( accessPoints:(T & AccessPoint.Class)[], requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]>;
function createAccessPoints<T extends object>( this:Class, accessPoints:(T & AccessPoint.Class)[], slugsOrRequestOptions?:any, requestOptions?:HTTP.Request.Options ):Promise<[ (T & PersistedAccessPoint.Class)[], HTTP.Response.Class[] ]> {
	return this._documents.createAccessPoints<T>( this.id, accessPoints, slugsOrRequestOptions, requestOptions );
}


function getChildren<T extends object>( this:Class, requestOptions:HTTP.Request.Options, childrenQuery?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
function getChildren<T extends object>( this:Class, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
function getChildren<T extends object>( this:Class, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]> {
	return this._documents.getChildren<T>( this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
}

function getMembers<T extends object>( this:Class, requestOptions:HTTP.Request.Options, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
function getMembers<T extends object>( this:Class, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]>;
function getMembers<T extends object>( this:Class, requestOptionsOrQueryBuilderFn?:any, childrenQuery?:( queryBuilder:QueryDocumentsBuilder.Class ) => QueryDocumentsBuilder.Class ):Promise<[ (T & Class)[], HTTP.Response.Class ]> {
	return this._documents.getMembers<T>( this.id, requestOptionsOrQueryBuilderFn, childrenQuery );
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

function executeSELECTQuery<T extends object>( this:Class, selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class<T>, HTTP.Response.Class ]> {
	return this._documents.executeSELECTQuery<T>( this.id, selectQuery, requestOptions );
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

function sparql():QueryClause {
	return this._documents.sparql( this.id );
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return Utils.hasPropertyDefined( object, "_etag" )
			&& Utils.hasFunction( object, "isLocallyOutDated" )

			&& Utils.hasFunction( object, "refresh" )
			&& Utils.hasFunction( object, "save" )
			&& Utils.hasFunction( object, "saveAndRefresh" )
			&& Utils.hasFunction( object, "delete" )

			&& Utils.hasFunction( object, "getDownloadURL" )

			&& Utils.hasFunction( object, "addMember" )
			&& Utils.hasFunction( object, "addMembers" )
			&& Utils.hasFunction( object, "createAccessPoint" )
			&& Utils.hasFunction( object, "createAccessPoints" )
			&& Utils.hasFunction( object, "createChild" )
			&& Utils.hasFunction( object, "createChildren" )
			&& Utils.hasFunction( object, "createChildAndRetrieve" )
			&& Utils.hasFunction( object, "createChildrenAndRetrieve" )
			&& Utils.hasFunction( object, "getChildren" )
			&& Utils.hasFunction( object, "getMembers" )
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

			&& Utils.hasFunction( object, "sparql" )
			;
	}

	static is( object:object ):object is Class {
		return Document.Factory.is( object )
			&& Factory.hasClassProperties( object )
			&& MessagingDocument.Factory.hasClassProperties( object )
			;
	}

	static create( uri:string, documents:Documents ):Class {
		return Factory.createFrom( {}, uri, documents );
	}

	static createFrom<T extends object>( object:T, uri:string, documents:Documents ):T & Class {
		let document:T & Class = Factory.decorate<T>( object, documents );

		document.id = uri;
		document._normalize();

		return document;
	}

	static decorate<T extends object>( object:T, documents:Documents ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		Document.Factory.decorate( object );
		PersistedResource.Factory.decorate( <T & Document.Class> object );
		ServiceAwareDocument.Factory.decorate( <T & Document.Class> object, documents );
		MessagingDocument.Factory.decorate( <T & ServiceAwareDocument.Class> object );

		const persistedDocument:T & Class = <T & Class> object;

		return Object.defineProperties( persistedDocument, {
			"_etag": {
				writable: true,
				enumerable: false,
				configurable: true,
			},
			"isLocallyOutDated": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isLocallyOutDated,
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

			"addType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendAddType( persistedDocument.addType ),
			},
			"hasType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendHasType( persistedDocument.hasType ),
			},
			"removeType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendRemoveType( persistedDocument.removeType ),
			},

			"hasPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( id:string ) => boolean {
					let superFunction:( id:string ) => boolean = persistedDocument.hasPointer;
					return function( id:string ):boolean {
						if( RDF.URI.Util.isPrefixed( id ) ) {
							id = ObjectSchema.Digester.resolvePrefixedURI( id, (<Class> this)._documents.getGeneralSchema() );
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
							id = ObjectSchema.Digester.resolvePrefixedURI( id, (<Class> this)._documents.getGeneralSchema() );
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
							uri = ObjectSchema.Digester.resolvePrefixedURI( uri, (<Class> this)._documents.getGeneralSchema() );
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
			"saveAndRefresh": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: saveAndRefresh,
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
			"createChildren": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChildren,
			},
			"createChildAndRetrieve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChildAndRetrieve,
			},
			"createChildrenAndRetrieve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createChildrenAndRetrieve,
			},
			"createAccessPoint": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createAccessPoint,
			},
			"createAccessPoints": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createAccessPoints,
			},
			"getChildren": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getChildren,
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

			"sparql": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: sparql,
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
			"revert": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendRevert( persistedDocument.revert ),
			},
		} );
	}
}

export default Class;
