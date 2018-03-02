import { QueryClause } from "sparqler/clauses";

import { AccessPointBase } from "./AccessPoint";
import { Document } from "./Document";
import { Documents } from "./Documents";
import { Fragment } from "./Fragment";
import {
	RequestOptions,
	RequestUtils,
} from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { MessagingDocument } from "./Messaging/Document";
import { NamedFragment } from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import { PersistedAccessPoint } from "./PersistedAccessPoint";
import { PersistedFragment } from "./PersistedFragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { PersistedResource } from "./PersistedResource";
import { Pointer } from "./Pointer";
import * as RDF from "./RDF";
import * as URI from "./RDF/URI";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import * as SPARQL from "./SPARQL";
import { FinishSPARQLSelect } from "./SPARQL/Builder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
import * as Utils from "./Utils";
import { ModelFactory } from "./ModelFactory";
import { ModelDecorator } from "./ModelDecorator";
import { convertNestedObjects } from "./Document/prototype";

export interface PersistedDocument extends Document, PersistedResource, ServiceAwareDocument, MessagingDocument {
	created?:Date;
	modified?:Date;
	defaultInteractionModel?:Pointer;
	accessPoints?:Pointer[];
	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	contains?:Pointer[];

	_eTag:string;
	_fragmentsIndex:Map<string, PersistedFragment>;
	_savedFragments:PersistedFragment[];

	_syncSavedFragments():void;


	isLocallyOutDated():boolean;


	getFragment<T extends object>( slug:string ):T & PersistedFragment;

	getNamedFragment<T extends object>( slug:string ):T & PersistedNamedFragment;

	getFragments():PersistedFragment[];


	createFragment( slug?:string ):PersistedFragment;

	createFragment<T extends object>( object:T ):PersistedFragment & T;

	createFragment<T extends object>( object:T, slug:string ):PersistedFragment & T;


	createNamedFragment( slug:string ):PersistedNamedFragment;

	createNamedFragment<T extends object>( object:T, slug:string ):PersistedNamedFragment & T;


	refresh<T extends object>():Promise<[ T & PersistedDocument, Response ]>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<[ T & PersistedDocument, Response ]>;

	saveAndRefresh<T extends object>():Promise<[ T & PersistedDocument, Response[] ]>;


	delete():Promise<Response>;

	getDownloadURL():Promise<string>;


	addMember( member:Pointer ):Promise<Response>;

	addMember( memberURI:string ):Promise<Response>;

	addMembers( members:(Pointer | string)[] ):Promise<Response>;


	createChild<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;

	createChild<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;

	createChild( slug:string, requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;

	createChild( requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;


	createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;

	createChildren<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;


	createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;

	createChildAndRetrieve<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;

	createChildAndRetrieve( slug:string, requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;

	createChildAndRetrieve( requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;


	createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;

	createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;


	createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, slug?:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedAccessPoint, Response ]>;

	createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, requestOptions?:RequestOptions ):Promise<[ T & PersistedAccessPoint, Response ]>;


	createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint)[], Response[] ]>;

	createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint)[], Response[] ]>;


	listChildren( requestOptions?:RequestOptions ):Promise<[ PersistedDocument[], Response ]>;


	getChildren<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;

	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;


	listMembers( requestOptions?:RequestOptions ):Promise<[ PersistedDocument[], Response ]>;


	getMembers<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;

	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;


	removeMember( member:Pointer ):Promise<Response>;

	removeMember( memberURI:string ):Promise<Response>;

	removeMembers( members:(Pointer | string)[] ):Promise<Response>;

	removeAllMembers():Promise<Response>;


	executeRawASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<[ SPARQL.RawResults.SPARQLRawResults, Response ]>;

	executeASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<[ boolean, Response ]>;

	executeRawSELECTQuery( selectQuery:string, requestOptions?:RequestOptions ):Promise<[ SPARQL.RawResults.SPARQLRawResults, Response ]>;

	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<[ SPARQL.SelectResults.SPARQLSelectResults<T>, Response ]>;

	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:RequestOptions ):Promise<[ string, Response ]>;

	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:RequestOptions ):Promise<[ string, Response ]>;

	executeUPDATE( updateQuery:string, requestOptions?:RequestOptions ):Promise<Response>;


	sparql():QueryClause<FinishSPARQLSelect>;
}


export interface PersistedDocumentFactory extends ModelFactory<PersistedDocument>, ModelDecorator<PersistedDocument> {
	is( object:object ):object is PersistedDocument;

	isDecorated( object:object ):object is PersistedDocument;


	create( documents:Documents, uri:string ):PersistedDocument;

	createFrom<T extends object>( object:T, documents:Documents, uri:string ):T & PersistedDocument;

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedDocument;
}


export const PersistedDocument:PersistedDocumentFactory = {
	isDecorated( object:object ):object is PersistedDocument {
		return Utils.hasPropertyDefined( object, "_eTag" )
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
			&& Utils.hasFunction( object, "listChildren" )
			&& Utils.hasFunction( object, "getChildren" )
			&& Utils.hasFunction( object, "listMembers" )
			&& Utils.hasFunction( object, "getMembers" )
			&& Utils.hasFunction( object, "removeMember" )
			&& Utils.hasFunction( object, "removeMembers" )
			&& Utils.hasFunction( object, "removeAllMembers" )

			&& Utils.hasFunction( object, "executeRawASKQuery" )
			&& Utils.hasFunction( object, "executeASKQuery" )
			&& Utils.hasFunction( object, "executeRawSELECTQuery" )
			&& Utils.hasFunction( object, "executeSELECTQuery" )
			&& Utils.hasFunction( object, "executeRawDESCRIBEQuery" )
			&& Utils.hasFunction( object, "executeRawCONSTRUCTQuery" )
			&& Utils.hasFunction( object, "executeUPDATE" )

			&& Utils.hasFunction( object, "sparql" )
			;
	},

	is( object:object ):object is PersistedDocument {
		return Document.is( object )
			&& MessagingDocument.isDecorated( object )
			&& PersistedDocument.isDecorated( object )
			;
	},

	create( documents:Documents, uri:string ):PersistedDocument {
		return PersistedDocument.createFrom( {}, documents, uri );
	},

	createFrom<T extends object>( object:T, documents:Documents, uri:string ):T & PersistedDocument {
		const document:T & PersistedDocument = PersistedDocument.decorate<T>( object, documents );

		document.id = uri;
		convertNestedObjects( document, document );

		return document;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedDocument {
		if( PersistedDocument.isDecorated( object ) ) return object;

		Document.decorate( object );
		PersistedResource.decorate( object );
		ServiceAwareDocument.decorate( object, documents );
		MessagingDocument.decorate( <T & ServiceAwareDocument> object );

		const persistedDocument:T & PersistedDocument = <T & PersistedDocument> object;
		return Object.defineProperties( persistedDocument, {
			"_eTag": {
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
					return function( this:PersistedDocument, id:string ):boolean {
						id = ObjectSchema.ObjectSchemaUtils.resolveURI( id, this._documents.getGeneralSchema() );

						if( superFunction.call( this, id ) ) return true;
						return ! URI.Util.isBNodeID( id ) && this._documents.hasPointer( id );
					};
				})(),
			},
			"getPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( id:string ) => Pointer {
					let superFunction:( id:string ) => Pointer = persistedDocument.getPointer;
					let inScopeFunction:( id:string ) => boolean = persistedDocument.inScope;
					return function( this:PersistedDocument, id:string ):Pointer {
						id = ObjectSchema.ObjectSchemaUtils.resolveURI( id, this._documents.getGeneralSchema() );

						if( inScopeFunction.call( this, id ) ) return superFunction.call( this, id );
						return this._documents.getPointer( id );
					};
				})(),
			},
			"inScope": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: (function():( idOrPointer:any ) => boolean {
					let superFunction:( idOrPointer:any ) => boolean = persistedDocument.inScope;
					return function( this:PersistedDocument, idOrPointer:any ):boolean {
						let id:string = Pointer.is( idOrPointer ) ? idOrPointer.id : idOrPointer;
						id = ObjectSchema.ObjectSchemaUtils.resolveURI( id, this._documents.getGeneralSchema() );

						if( superFunction.call( this, id ) ) return true;
						return this._documents.inScope( id );
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
	},
};


function extendIsDirty( superFunction:() => boolean ):() => boolean {
	return function():boolean {
		let isDirty:boolean = superFunction.call( this );
		if( isDirty ) return true;

		let document:PersistedDocument = this;

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

function isLocallyOutDated( this:PersistedDocument ):boolean {
	return this._eTag === null;
}

function extendRevert( superFunction:() => void ):() => void {
	return function():void {
		let persistedDocument:PersistedDocument = this;
		persistedDocument._fragmentsIndex.clear();
		for( let fragment of persistedDocument._savedFragments ) {
			let slug:string = "slug" in fragment ? (fragment as PersistedNamedFragment).slug : fragment.id;

			fragment.revert();
			persistedDocument._fragmentsIndex.set( slug, fragment );
		}
		superFunction.call( persistedDocument );
	};
}

function syncSavedFragments():void {
	let document:PersistedDocument = this;
	document._savedFragments = Utils.ArrayUtils.from( document._fragmentsIndex.values() );
}

function resolveURI( uri:string ):string {
	if( URI.Util.isAbsolute( uri ) ) return uri;

	let schema:ObjectSchema.DigestedObjectSchema = this._documents.getGeneralSchema();
	return ObjectSchema.ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
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

function extendCreateFragment( superFunction:() => Fragment ):() => PersistedFragment;
function extendCreateFragment( superFunction:( slug:string ) => Fragment ):( slug:string ) => PersistedFragment;
function extendCreateFragment( superFunction:( object:object, slug:string ) => Fragment ):( slug:string, object:object ) => PersistedFragment;
function extendCreateFragment( superFunction:( object:object ) => Fragment ):( object:object ) => PersistedFragment;
function extendCreateFragment( superFunction:( slugOrObject?:any, slug?:string ) => Fragment ):any {
	return function( slugOrObject?:any, slug?:string ):any {
		let fragment:Fragment = superFunction.call( this, slugOrObject, slug );
		let id:string = fragment.id;

		if( RDF.URI.Util.isBNodeID( id ) ) PersistedFragment.decorate( fragment );
		return fragment;
	};
}

function extendCreateNamedFragment( superFunction:( slug:string ) => NamedFragment ):( slug:string ) => PersistedNamedFragment;
function extendCreateNamedFragment( superFunction:( object:object, slug:string ) => NamedFragment ):( slug:string, object:object ) => PersistedNamedFragment;
function extendCreateNamedFragment( superFunction:( slugOrObject:any, slug?:string ) => NamedFragment ):any {
	return function( slugOrObject:any, slug?:string ):PersistedNamedFragment {
		let fragment:NamedFragment = superFunction.call( this, slugOrObject, slug );
		return PersistedNamedFragment.decorate( fragment );
	};
}

function refresh<T extends PersistedDocument>():Promise<[ T, Response ]> {
	return this._documents.refresh( this );
}

function save<T extends PersistedDocument>( requestOptions?:RequestOptions ):Promise<[ T, Response ]> {
	return this._documents.save( this, requestOptions );
}

function saveAndRefresh<T extends PersistedDocument>( this:T ):Promise<[ T, Response[] ]> {
	return this._documents.saveAndRefresh<T>( this );
}

function _delete():Promise<Response> {
	return this._documents.delete( this.id );
}

function getDownloadURL():Promise<string> {
	return (<PersistedDocument> this)._documents.getDownloadURL( (<PersistedDocument> this).id );
}

function addMember( member:Pointer ):Promise<Response>;
function addMember( memberURI:string ):Promise<Response>;
function addMember( memberOrUri:any ):Promise<Response> {
	return this._documents.addMember( this.id, memberOrUri );
}

function addMembers( members:(Pointer | string)[] ):Promise<Response> {
	return this._documents.addMembers( this.id, members );
}

function createChild<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;
function createChild<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;
function createChild( slug:string, requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;
function createChild( requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;
function createChild<T extends object>( this:PersistedDocument, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedProtectedDocument, Response ]> {
	requestOptions = RequestUtils.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || RequestUtils.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChild<T>( this.id, object, slug, requestOptions );
}

function createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;
function createChildren<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;
function createChildren<T extends object>( this:PersistedDocument, objects:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]> {
	return this._documents.createChildren<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;
function createChildAndRetrieve<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<[ T & PersistedProtectedDocument, Response ]>;
function createChildAndRetrieve( slug:string, requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;
function createChildAndRetrieve( requestOptions?:RequestOptions ):Promise<[ PersistedProtectedDocument, Response ]>;
function createChildAndRetrieve<T extends object>( this:PersistedDocument, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions:RequestOptions = {} ):Promise<[ T & PersistedProtectedDocument, Response ]> {
	requestOptions = RequestUtils.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || RequestUtils.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChildAndRetrieve<T>( this.id, object, slug, requestOptions );
}

function createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;
function createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]>;
function createChildrenAndRetrieve<T extends object>( this:PersistedDocument, objects:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<[ (T & PersistedProtectedDocument)[], Response[] ]> {
	return this._documents.createChildrenAndRetrieve<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, slug?:string, requestOptions?:RequestOptions ):Promise<[ PersistedAccessPoint, Response ]>;
function createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, requestOptions?:RequestOptions ):Promise<[ PersistedAccessPoint, Response ]>;
function createAccessPoint<T extends object>( this:PersistedDocument, accessPoint:T & AccessPointBase, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<[ PersistedAccessPoint, Response ]> {
	return this._documents.createAccessPoint<T>( this.id, accessPoint, slugOrRequestOptions, requestOptions );
}

function createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint)[], Response[] ]>;
function createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint)[], Response[] ]>;
function createAccessPoints<T extends object>( this:PersistedDocument, accessPoints:(T & AccessPointBase)[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<[ (T & PersistedAccessPoint)[], Response[] ]> {
	return this._documents.createAccessPoints<T>( this.id, accessPoints, slugsOrRequestOptions, requestOptions );
}


function listChildren( this:PersistedDocument, requestOptions?:RequestOptions ):Promise<[ PersistedDocument[], Response ]> {
	return this._documents.listChildren( this.id, requestOptions );
}

function getChildren<T extends object>( this:PersistedDocument, requestOptions?:RequestOptions, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;
function getChildren<T extends object>( this:PersistedDocument, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;
function getChildren<T extends object>( this:PersistedDocument, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]> {
	return this._documents.getChildren<T>( this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
}


function listMembers( this:PersistedDocument, requestOptions?:RequestOptions ):Promise<[ PersistedDocument[], Response ]> {
	return this._documents.listMembers( this.id, requestOptions );
}

function getMembers<T extends object>( this:PersistedDocument, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;
function getMembers<T extends object>( this:PersistedDocument, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]>;
function getMembers<T extends object>( this:PersistedDocument, requestOptionsOrQueryBuilderFn?:any, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<[ (T & PersistedDocument)[], Response ]> {
	return this._documents.getMembers<T>( this.id, requestOptionsOrQueryBuilderFn, childrenQuery );
}

function removeMember( member:Pointer ):Promise<Response>;
function removeMember( memberURI:string ):Promise<Response>;
function removeMember( memberOrUri:any ):Promise<Response> {
	return this._documents.removeMember( this.id, memberOrUri );
}

function removeMembers( members:(Pointer | string)[] ):Promise<Response> {
	return this._documents.removeMembers( this.id, members );
}

function removeAllMembers():Promise<Response> {
	return this._documents.removeAllMembers( this.id );
}

function executeRawASKQuery( askQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQL.RawResults.SPARQLRawResults, Response ]> {
	return this._documents.executeRawASKQuery( this.id, askQuery, requestOptions );
}

function executeASKQuery( askQuery:string, requestOptions:RequestOptions = {} ):Promise<[ boolean, Response ]> {
	return this._documents.executeASKQuery( this.id, askQuery, requestOptions );
}

function executeRawSELECTQuery( selectQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQL.RawResults.SPARQLRawResults, Response ]> {
	return this._documents.executeRawSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeSELECTQuery<T extends object>( this:PersistedDocument, selectQuery:string, requestOptions:RequestOptions = {} ):Promise<[ SPARQL.SelectResults.SPARQLSelectResults<T>, Response ]> {
	return this._documents.executeSELECTQuery<T>( this.id, selectQuery, requestOptions );
}

function executeRawCONSTRUCTQuery( constructQuery:string, requestOptions:RequestOptions = {} ):Promise<[ string, Response ]> {
	return this._documents.executeRawCONSTRUCTQuery( this.id, constructQuery, requestOptions );
}

function executeRawDESCRIBEQuery( describeQuery:string, requestOptions:RequestOptions = {} ):Promise<[ string, Response ]> {
	return this._documents.executeRawDESCRIBEQuery( this.id, describeQuery, requestOptions );
}

function executeUPDATE( updateQuery:string, requestOptions:RequestOptions = {} ):Promise<[ string, Response ]> {
	return this._documents.executeUPDATE( this.id, updateQuery, requestOptions );
}

function sparql( this:PersistedDocument ):QueryClause<FinishSPARQLSelect> {
	return this._documents.sparql( this.id );
}

export default PersistedDocument;
