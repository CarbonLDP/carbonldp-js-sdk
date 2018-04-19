import { QueryClause } from "sparqler/clauses";

import { AccessPointBase } from "./TransientAccessPoint";
import { TransientDocument } from "./TransientDocument";
import { Documents } from "./Documents";
import { Fragment } from "./Fragment";
import {
	GETOptions,
	RequestOptions,
	RequestUtils,
} from "./HTTP/Request";
import { MessagingDocument } from "./Messaging/Document";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { NamedFragment } from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import { PersistedAccessPoint } from "./PersistedAccessPoint";
import { PersistedFragment } from "./PersistedFragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { PersistedResource } from "./PersistedResource";
import { Pointer } from "./Pointer";
import { URI } from "./RDF/URI";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import { FinishSPARQLSelect } from "./SPARQL/Builder";
import { QueryDocumentBuilder } from "./SPARQL/QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
import { SPARQLRawResults } from "./SPARQL/RawResults";
import { SPARQLSelectResults } from "./SPARQL/SelectResults";
import * as Utils from "./Utils";

export interface Document extends TransientDocument, PersistedResource, ServiceAwareDocument, MessagingDocument {
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


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;


	delete( requestOptions?:RequestOptions ):Promise<void>;


	addMember( member:Pointer, requestOptions?:RequestOptions ):Promise<void>;

	addMember( memberURI:string, requestOptions?:RequestOptions ):Promise<void>;

	addMembers( members:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void>;


	createChild<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;

	createChild<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;

	createChild( slug:string, requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;

	createChild( requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;


	createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;

	createChildren<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;


	createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;

	createChildAndRetrieve<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;

	createChildAndRetrieve( slug:string, requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;

	createChildAndRetrieve( requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;


	createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;

	createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;


	createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, slug?:string, requestOptions?:RequestOptions ):Promise<T & PersistedAccessPoint>;

	createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, requestOptions?:RequestOptions ):Promise<T & PersistedAccessPoint>;


	createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedAccessPoint)[]>;

	createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], requestOptions?:RequestOptions ):Promise<(T & PersistedAccessPoint)[]>;


	listChildren<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;


	getChildren<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;


	listMembers<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;


	getMembers<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;


	removeMember( member:Pointer, requestOptions?:RequestOptions ):Promise<void>;

	removeMember( memberURI:string, requestOptions?:RequestOptions ):Promise<void>;

	removeMembers( members:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void>;

	removeAllMembers( requestOptions?:RequestOptions ):Promise<void>;


	executeRawASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;

	executeASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;

	executeRawSELECTQuery( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;

	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	executeRawSELECTQuery( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;

	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:RequestOptions ):Promise<string>;

	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:RequestOptions ):Promise<string>;

	executeUPDATE( updateQuery:string, requestOptions?:RequestOptions ):Promise<void>;


	sparql():QueryClause<FinishSPARQLSelect>;
}


export interface DocumentFactory extends ModelFactory<Document>, ModelDecorator<Document> {
	is( object:object ):object is Document;

	isDecorated( object:object ):object is Document;


	create( documents:Documents, uri:string ):Document;

	createFrom<T extends object>( object:T, documents:Documents, uri:string ):T & Document;

	decorate<T extends object>( object:T, documents:Documents ):T & Document;
}


export const Document:DocumentFactory = {
	isDecorated( object:object ):object is Document {
		return Utils.hasPropertyDefined( object, "_eTag" )
			&& Utils.hasFunction( object, "isLocallyOutDated" )

			&& Utils.hasFunction( object, "refresh" )
			&& Utils.hasFunction( object, "save" )
			&& Utils.hasFunction( object, "saveAndRefresh" )
			&& Utils.hasFunction( object, "delete" )

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

	is( object:object ):object is Document {
		return TransientDocument.is( object )
			&& MessagingDocument.isDecorated( object )
			&& Document.isDecorated( object )
			;
	},

	create( documents:Documents, uri:string ):Document {
		return Document.createFrom( {}, documents, uri );
	},

	createFrom<T extends object>( object:T, documents:Documents, uri:string ):T & Document {
		const document:T & Document = Document.decorate<T>( object, documents );

		document.id = uri;
		TransientDocument._convertNestedObjects( document, document );

		return document;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & Document {
		if( Document.isDecorated( object ) ) return object;

		TransientDocument.decorate( object );
		PersistedResource.decorate( object );
		ServiceAwareDocument.decorate( object, documents );
		MessagingDocument.decorate( <T & ServiceAwareDocument> object );

		const persistedDocument:T & Document = <T & Document> object;
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
					return function( this:Document, id:string ):boolean {
						id = ObjectSchema.ObjectSchemaUtils.resolveURI( id, this._documents.getGeneralSchema() );

						if( superFunction.call( this, id ) ) return true;
						return ! URI.isBNodeID( id ) && this._documents.hasPointer( id );
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
					return function( this:Document, id:string ):Pointer {
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
					return function( this:Document, idOrPointer:any ):boolean {
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

		let document:Document = this;

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

function isLocallyOutDated( this:Document ):boolean {
	return this._eTag === null;
}

function extendRevert( superFunction:() => void ):() => void {
	return function():void {
		let persistedDocument:Document = this;
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
	let document:Document = this;
	document._savedFragments = Utils.ArrayUtils.from( document._fragmentsIndex.values() );
}

function resolveURI( uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

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

		if( URI.isBNodeID( id ) ) PersistedFragment.decorate( fragment );
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

function refresh<T extends object>( this:T & Document, requestOptions?:RequestOptions ):Promise<T & Document> {
	return this._documents.refresh<T>( this, requestOptions );
}

function save<T extends object>( this:T & Document, requestOptions?:RequestOptions ):Promise<T> {
	return this._documents.save( this, requestOptions );
}

function saveAndRefresh<T extends object>( this:T & Document, requestOptions?:RequestOptions ):Promise<T> {
	return this._documents.saveAndRefresh<T>( this, requestOptions );
}

function _delete( this:Document, requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.delete( this.id, requestOptions );
}

function addMember( member:Pointer, requestOptions?:RequestOptions ):Promise<void>;
function addMember( memberURI:string, requestOptions?:RequestOptions ):Promise<void>;
function addMember( this:Document, memberOrUri:any, requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.addMember( this.id, memberOrUri, requestOptions );
}

function addMembers( this:Document, members:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.addMembers( this.id, members, requestOptions );
}

function get<T extends object>( relativeURI:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
function get<T extends object>( relativeURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
function get<T extends object>( this:Document, relativeURI:string, optionsOrQueryBuilderFn:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document> {
	const uri:string = URI.resolve( this.id, relativeURI );
	return this._documents
		.get<T>( uri, optionsOrQueryBuilderFn, queryBuilderFn )
		.then( data => data[ 0 ] )
		;
}

function createChild<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;
function createChild<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;
function createChild( slug:string, requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;
function createChild( requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;
function createChild<T extends object>( this:Document, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument> {
	requestOptions = RequestUtils.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || RequestUtils.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChild<T>( this.id, object, slug, requestOptions );
}

function createChildren<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;
function createChildren<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;
function createChildren<T extends object>( this:Document, objects:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]> {
	return this._documents.createChildren<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createChildAndRetrieve<T extends object>( object:T, slug:string, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;
function createChildAndRetrieve<T extends object>( object:T, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument>;
function createChildAndRetrieve( slug:string, requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;
function createChildAndRetrieve( requestOptions?:RequestOptions ):Promise<PersistedProtectedDocument>;
function createChildAndRetrieve<T extends object>( this:Document, objectOrSlugOrRequestOptions?:any, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & PersistedProtectedDocument> {
	requestOptions = RequestUtils.isOptions( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : RequestUtils.isOptions( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;
	let object:T = Utils.isString( objectOrSlugOrRequestOptions ) || RequestUtils.isOptions( objectOrSlugOrRequestOptions ) || ! objectOrSlugOrRequestOptions ? <T> {} : objectOrSlugOrRequestOptions;
	let slug:string = Utils.isString( objectOrSlugOrRequestOptions ) ? objectOrSlugOrRequestOptions : Utils.isString( slugOrRequestOptions ) ? slugOrRequestOptions : null;

	return this._documents.createChildAndRetrieve<T>( this.id, object, slug, requestOptions );
}

function createChildrenAndRetrieve<T extends object>( objects:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;
function createChildrenAndRetrieve<T extends object>( objects:T[], requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]>;
function createChildrenAndRetrieve<T extends object>( this:Document, objects:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & PersistedProtectedDocument)[]> {
	return this._documents.createChildrenAndRetrieve<T>( this.id, objects, slugsOrRequestOptions, requestOptions );
}

function createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, slug?:string, requestOptions?:RequestOptions ):Promise<T & PersistedAccessPoint>;
function createAccessPoint<T extends object>( accessPoint:T & AccessPointBase, requestOptions?:RequestOptions ):Promise<T & PersistedAccessPoint>;
function createAccessPoint<T extends object>( this:Document, accessPoint:T & AccessPointBase, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & PersistedAccessPoint> {
	return this._documents.createAccessPoint<T>( this.id, accessPoint, slugOrRequestOptions, requestOptions );
}

function createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & PersistedAccessPoint)[]>;
function createAccessPoints<T extends object>( accessPoints:(T & AccessPointBase)[], requestOptions?:RequestOptions ):Promise<(T & PersistedAccessPoint)[]>;
function createAccessPoints<T extends object>( this:Document, accessPoints:(T & AccessPointBase)[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & PersistedAccessPoint)[]> {
	return this._documents.createAccessPoints<T>( this.id, accessPoints, slugsOrRequestOptions, requestOptions );
}


function listChildren( this:Document, requestOptions?:RequestOptions ):Promise<Document[]> {
	return this._documents.listChildren( this.id, requestOptions );
}

function getChildren<T extends object>( this:Document, requestOptions?:RequestOptions, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
function getChildren<T extends object>( this:Document, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
function getChildren<T extends object>( this:Document, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]> {
	return this._documents.getChildren<T>( this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn );
}


function listMembers( this:Document, requestOptions?:RequestOptions ):Promise<Document[]> {
	return this._documents.listMembers( this.id, requestOptions );
}

function getMembers<T extends object>( this:Document, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
function getMembers<T extends object>( this:Document, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
function getMembers<T extends object>( this:Document, requestOptionsOrQueryBuilderFn?:any, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]> {
	return this._documents.getMembers<T>( this.id, requestOptionsOrQueryBuilderFn, childrenQuery );
}

function removeMember( member:Pointer, requestOptions?:RequestOptions ):Promise<void>;
function removeMember( memberURI:string, requestOptions?:RequestOptions ):Promise<void>;
function removeMember( this:Document, memberOrUri:any, requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.removeMember( this.id, memberOrUri, requestOptions );
}

function removeMembers( this:Document, members:(Pointer | string)[], requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.removeMembers( this.id, members, requestOptions );
}

function removeAllMembers( this:Document, requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.removeAllMembers( this.id, requestOptions );
}

function executeRawASKQuery( this:Document, askQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
	return this._documents.executeRawASKQuery( this.id, askQuery, requestOptions );
}

function executeASKQuery( this:Document, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean> {
	return this._documents.executeASKQuery( this.id, askQuery, requestOptions );
}

function executeRawSELECTQuery( this:Document, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
	return this._documents.executeRawSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeSELECTQuery<T extends object>( this:Document, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
	return this._documents.executeSELECTQuery<T>( this.id, selectQuery, requestOptions );
}

function executeRawCONSTRUCTQuery( this:Document, constructQuery:string, requestOptions?:RequestOptions ):Promise<string> {
	return this._documents.executeRawCONSTRUCTQuery( this.id, constructQuery, requestOptions );
}

function executeRawDESCRIBEQuery( this:Document, describeQuery:string, requestOptions?:RequestOptions ):Promise<string> {
	return this._documents.executeRawDESCRIBEQuery( this.id, describeQuery, requestOptions );
}

function executeUPDATE( this:Document, updateQuery:string, requestOptions?:RequestOptions ):Promise<void> {
	return this._documents.executeUPDATE( this.id, updateQuery, requestOptions );
}

function sparql( this:Document ):QueryClause<FinishSPARQLSelect> {
	return this._documents.sparql( this.id );
}
