import { Document } from "./Document";
import { Documents } from "./Documents";
import { IllegalArgumentError } from "./Errors/IllegalArgumentError";
import {
	GETOptions,
	RequestOptions,
} from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { URI } from "./RDF/URI";
import { QueryDocumentBuilder } from "./SPARQL/QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
import {
	isObject,
	isString,
	promiseMethod,
} from "./Utils";


export interface EndpointModelFactory<B extends object, D extends Document, P extends PersistedProtectedDocument> {
	createFrom?( object:B ):B & D;
	decorate?<T extends object>( object:T, documents:Documents ):T & P;
}

export interface Endpoint<B extends object, D extends Document, P extends PersistedProtectedDocument> extends PersistedProtectedDocument {
	_ModelFactory:EndpointModelFactory<B, D, P>;


	get<T extends object>( relativeURI:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & P>;
	get<T extends object>( relativeURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & P>;


	createChild<T extends B>( child:T, slug:string, requestOptions?:RequestOptions ):Promise<T & P>;
	createChild<T extends B>( child:T, requestOptions?:RequestOptions ):Promise<T & P>;

	createChildren<T extends B>( children:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & P)[]>;
	createChildren<T extends B>( children:T[], requestOptions?:RequestOptions ):Promise<(T & P)[]>;

	createChildAndRetrieve<T extends B>( child:T, slug:string, requestOptions?:RequestOptions ):Promise<T & P>;
	createChildAndRetrieve<T extends B>( child:T, requestOptions?:RequestOptions ):Promise<T & P>;

	createChildrenAndRetrieve<T extends B>( children:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & P)[]>;
	createChildrenAndRetrieve<T extends B>( children:T[], requestOptions?:RequestOptions ):Promise<(T & P)[]>;


	listChildren( requestOptions?:RequestOptions ):Promise<P[]>;

	listMembers( requestOptions?:RequestOptions ):Promise<P[]>;

	getChildren<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;

	getMembers<T extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;


	delete( relativeURI:string, requestOptions?:RequestOptions ):Promise<void>;
	delete( requestOptions?:RequestOptions ):Promise<void>;
}


export interface EndpointFactory extends ModelDecorator<Endpoint<object, Document, PersistedProtectedDocument>, PersistedProtectedDocument> {
	isDecorated<B extends object, D extends Document, P extends PersistedProtectedDocument>( value:any ):value is Endpoint<B, D, P>;

	decorate<T extends object, B extends object, D extends Document, P extends PersistedProtectedDocument>( object:T, documents:Documents ):T & Endpoint<B, D, P>;


	resolveEndpointURI( endpoint:Endpoint<any, any, any>, relativeURI:string ):Promise<string>;

	createChildren<B extends object, D extends Document>( endpoint:Endpoint<B, D, any>, objects:B[] ):Promise<(B & D)[]>;
	createChildren<B extends object, D extends Document>( endpoint:Endpoint<B, D, any>, object:B ):Promise<B & D>;

	decorateChildren<B extends object, P extends PersistedProtectedDocument>( endpoint:Endpoint<B, any, P>, documents:(B & PersistedDocument)[] ):(B & P)[];
	decorateChildren<B extends object, P extends PersistedProtectedDocument>( endpoint:Endpoint<B, any, P>, documents:B & PersistedDocument ):B & P;
}

export const Endpoint:EndpointFactory = {
	isDecorated( value:any ):value is Endpoint<any, any, any> {
		return isObject( value )
			&& value.hasOwnProperty( "_ModelFactory" )

			&& value[ "get" ] === get

			&& value[ "createChild" ] === createChild
			&& value[ "createChildren" ] === createChildren
			&& value[ "createChildAndRetrieve" ] === createChildAndRetrieve
			&& value[ "createChildrenAndRetrieve" ] === createChildrenAndRetrieve

			&& value[ "listChildren" ] === listChildren
			&& value[ "listMembers" ] === listMembers
			&& value[ "getChildren" ] === getChildren
			&& value[ "getMembers" ] === getMembers

			&& value[ "delete" ] === deleteChild
			;
	},

	decorate<T extends object, B extends object, D extends Document, P extends PersistedProtectedDocument>( object:T, documents:Documents ):T & Endpoint<B, D, P> {
		if( Endpoint.isDecorated<B, D, P>( object ) ) return object;

		PersistedProtectedDocument.decorate( object, documents );

		return Object.defineProperties( object, {
			"_ModelFactory": {
				configurable: true,
			},
			"get": {
				configurable: true,
				value: get,
			},
			"createChild": {
				configurable: true,
				value: createChild,
			},
			"createChildren": {
				configurable: true,
				value: createChildren,
			},
			"createChildAndRetrieve": {
				configurable: true,
				value: createChildAndRetrieve,
			},
			"createChildrenAndRetrieve": {
				configurable: true,
				value: createChildrenAndRetrieve,
			},
			"listChildren": {
				configurable: true,
				value: listChildren,
			},
			"listMembers": {
				configurable: true,
				value: listMembers,
			},
			"getChildren": {
				configurable: true,
				value: getChildren,
			},
			"getMembers": {
				configurable: true,
				value: getMembers,
			},

			"delete": {
				configurable: true,
				value: deleteChild,
			},
		} );
	},


	resolveEndpointURI( endpoint:Endpoint<any, any, any>, relativeURI:string ):Promise<string> {
		return promiseMethod( () => {
			if( ! URI.isBaseOf( endpoint.id, relativeURI ) )
				throw new IllegalArgumentError( `The URI "${ relativeURI }" isn't a child of "${ endpoint.id }".` );

			return URI.resolve( endpoint.id, relativeURI );
		} );
	},

	createChildren<B extends object, D extends Document>( endpoint:Endpoint<B, D, any>, objects:B | B[] ):Promise<(B & D) | (B & D)[]> {
		return promiseMethod( () => {
			if( ! endpoint._ModelFactory || ! endpoint._ModelFactory.createFrom )
				return objects as (B & D) | (B & D)[];

			if( ! Array.isArray( objects ) ) {
				const document:B & D = endpoint._ModelFactory.createFrom( objects );

				if( document ) return document;
				throw new IllegalArgumentError( `Invalid base child object for the "${ endpoint.id }" endpoint.` );
			}

			const documents:(B & D)[] = objects
				.map( object => endpoint._ModelFactory.createFrom( object ) )
				.filter( document => ! ! document )
			;

			if( documents.length === objects.length ) return documents;
			throw new IllegalArgumentError( `Invalid base child objects for the "${ endpoint.id }" endpoint.` );
		} );
	},

	decorateChildren<B extends object, P extends PersistedProtectedDocument>( endpoint:Endpoint<B, any, P>, documents:(B & PersistedDocument) | (B & PersistedDocument)[] ):(B & P) | (B & P)[] {
		if( ! endpoint._ModelFactory || ! endpoint._ModelFactory.decorate )
			return documents as (B & P) | (B & P)[];

		if( ! Array.isArray( documents ) )
			return endpoint._ModelFactory.decorate( documents, endpoint._documents );

		return documents
			.map( document => endpoint._ModelFactory.decorate( document, endpoint._documents ) );
	},
};


function get<T extends object, P extends PersistedProtectedDocument>( relativeURI:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & P>;
function get<T extends object, P extends PersistedProtectedDocument>( relativeURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & P>;
function get<T extends object, P extends PersistedProtectedDocument>( this:Endpoint<any, any, P>, relativeURI:string, optionsOrQueryBuilderFn:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & P> {
	return Endpoint
		.resolveEndpointURI( this, relativeURI )
		.then( absoluteURI => this._documents
			.get( absoluteURI, optionsOrQueryBuilderFn, queryBuilderFn ) )
		.then( document => Endpoint.decorateChildren( this, document ) )
		;
}

function createChild<B extends object, D extends Document, P extends PersistedProtectedDocument>( child:B, slug:string, requestOptions?:RequestOptions ):Promise<B & P>;
function createChild<B extends object, D extends Document, P extends PersistedProtectedDocument>( child:B, requestOptions?:RequestOptions ):Promise<B & P>;
function createChild<B extends object, D extends Document, P extends PersistedProtectedDocument>( this:Endpoint<B, D, P>, child:B, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<B & P> {
	return Endpoint
		.createChildren( this, child )
		.then( base => this._documents
			.createChild( this.id, base, slugOrRequestOptions, requestOptions ) )
		.then( document => Endpoint.decorateChildren( this, document ) )
		;
}

function createChildren<B extends object, D extends Document, P extends PersistedProtectedDocument>( children:B[], slugs:string[], requestOptions?:RequestOptions ):Promise<(B & P)[]>;
function createChildren<B extends object, D extends Document, P extends PersistedProtectedDocument>( children:B[], requestOptions?:RequestOptions ):Promise<(B & P)[]>;
function createChildren<B extends object, D extends Document, P extends PersistedProtectedDocument>( this:Endpoint<B, D, P>, children:B[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(B & P)[]> {
	return Endpoint
		.createChildren( this, children )
		.then( bases => this._documents
			.createChildren( this.id, bases, slugsOrRequestOptions, requestOptions ) )
		.then( documents => Endpoint.decorateChildren( this, documents ) )
		;
}

function createChildAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( child:B, slug:string, requestOptions?:RequestOptions ):Promise<B & P>;
function createChildAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( child:B, requestOptions?:RequestOptions ):Promise<B & P>;
function createChildAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( this:Endpoint<B, D, P>, child:B, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<B & P> {
	return Endpoint
		.createChildren( this, child )
		.then( base => this._documents
			.createChildAndRetrieve( this.id, base, slugOrRequestOptions, requestOptions ) )
		.then( document => Endpoint.decorateChildren( this, document ) )
		;
}

function createChildrenAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( children:B[], slugs:string[], requestOptions?:RequestOptions ):Promise<(B & P)[]>;
function createChildrenAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( children:B[], requestOptions?:RequestOptions ):Promise<(B & P)[]>;
function createChildrenAndRetrieve<B extends object, D extends Document, P extends PersistedProtectedDocument>( this:Endpoint<B, D, P>, children:B[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(B & P)[]> {
	return Endpoint
		.createChildren( this, children )
		.then( bases => this._documents
			.createChildrenAndRetrieve( this.id, bases, slugsOrRequestOptions, requestOptions ) )
		.then( documents => Endpoint.decorateChildren( this, documents ) )
		;
}


function listChildren<P extends PersistedProtectedDocument>( this:Endpoint<{}, any, P>, requestOptions?:RequestOptions ):Promise<P[]> {
	return this._documents
		.listChildren( this.id, requestOptions )
		.then( documents => Endpoint.decorateChildren( this, documents ) );
}

function listMembers<P extends PersistedProtectedDocument>( this:Endpoint<{}, any, P>, requestOptions?:RequestOptions ):Promise<P[]> {
	return this._documents
		.listMembers( this.id, requestOptions )
		.then( documents => Endpoint.decorateChildren( this, documents ) )
		;
}

function getChildren<T extends object, P extends PersistedProtectedDocument>( requestOptions?:RequestOptions, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
function getChildren<T extends object, P extends PersistedProtectedDocument>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
function getChildren<T extends object, P extends PersistedProtectedDocument>( this:Endpoint<T, any, P>, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]> {
	return this._documents
		.getChildren<T>( this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn )
		.then( documents => Endpoint.decorateChildren( this, documents ) )
		;
}

function getMembers<T extends object, P extends PersistedProtectedDocument>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
function getMembers<T extends object, P extends PersistedProtectedDocument>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]>;
function getMembers<T extends object, P extends PersistedProtectedDocument>( this:Endpoint<T, any, P>, requestOptionsOrQueryBuilderFn?:any, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & P)[]> {
	return this._documents
		.getMembers<T>( this.id, requestOptionsOrQueryBuilderFn, childrenQuery )
		.then( documents => Endpoint.decorateChildren( this, documents ) )
		;
}

function deleteChild( relativeURI:string, requestOptions?:RequestOptions ):Promise<void>;
function deleteChild( requestOptions?:RequestOptions ):Promise<void>;
function deleteChild( this:Endpoint<any, any, any>, relativeURIOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
	const relativeURI:string = isString( relativeURIOrOptions ) ? relativeURIOrOptions : "";
	if( isObject( relativeURIOrOptions ) ) requestOptions = relativeURIOrOptions;

	return Endpoint
		.resolveEndpointURI( this, relativeURI )
		.then( uri => this._documents
			.delete( uri, requestOptions ) )
		;
}
