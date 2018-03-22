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


export interface EndpointModelFactory<T extends object, U extends PersistedProtectedDocument> extends ModelDecorator<U> {
	validateBase?( object:object ):object is T;
}

export interface Endpoint<T extends object, U extends PersistedProtectedDocument> extends PersistedProtectedDocument {
	_ModelFactory:EndpointModelFactory<T, U>;


	get<W extends object>( relativeURI:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<W & U>;
	get<W extends object>( relativeURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<W & U>;


	createChild<W extends T>( child:W, slug:string, requestOptions?:RequestOptions ):Promise<W & U>;
	createChild<W extends T>( child:W, requestOptions?:RequestOptions ):Promise<W & U>;

	createChildren<W extends T>( children:W[], slugs:string[], requestOptions?:RequestOptions ):Promise<(W & U)[]>;
	createChildren<W extends T>( children:W[], requestOptions?:RequestOptions ):Promise<(W & U)[]>;

	createChildAndRetrieve<W extends T>( child:W, slug:string, requestOptions?:RequestOptions ):Promise<W & U>;
	createChildAndRetrieve<W extends T>( child:W, requestOptions?:RequestOptions ):Promise<W & U>;

	createChildrenAndRetrieve<W extends T>( children:W[], slugs:string[], requestOptions?:RequestOptions ):Promise<(W & U)[]>;
	createChildrenAndRetrieve<W extends T>( children:W[], requestOptions?:RequestOptions ):Promise<(W & U)[]>;


	listChildren( requestOptions?:RequestOptions ):Promise<U[]>;

	listMembers( requestOptions?:RequestOptions ):Promise<U[]>;

	getChildren<W extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(W & U)[]>;
	getChildren<W extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(W & U)[]>;

	getMembers<W extends object>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(W & U)[]>;
	getMembers<W extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(W & U)[]>;


	delete( relativeURI:string, requestOptions?:RequestOptions ):Promise<void>;
	delete( requestOptions?:RequestOptions ):Promise<void>;
}


export interface EndpointFactory extends ModelDecorator<Endpoint<any, any>, PersistedProtectedDocument> {
	isDecorated<U extends object, W extends PersistedProtectedDocument>( object:object ):object is Endpoint<U, W>;

	decorate<T extends object, U extends object, W extends PersistedProtectedDocument>( object:T, documents:Documents ):T & Endpoint<U, W>;


	resolveEndpointURI( endpoint:Endpoint<any, any>, relativeURI:string ):Promise<string>;

	resolveChildBase<T extends object>( endpoint:Endpoint<T, any>, objects:object[] ):Promise<T[]>;
	resolveChildBase<T extends object>( endpoint:Endpoint<T, any>, object:object ):Promise<T>;

	decorateEndpointChild<T extends object, U extends PersistedProtectedDocument>( endpoint:Endpoint<T, U>, documents:(T & PersistedDocument)[] ):(T & U)[];
	decorateEndpointChild<T extends object, U extends PersistedProtectedDocument>( endpoint:Endpoint<T, U>, documents:T & PersistedDocument ):T & U;
}

export const Endpoint:EndpointFactory = {
	isDecorated<U extends object = any, W extends PersistedProtectedDocument = any>( object:object ):object is Endpoint<U, W> {
		return isObject( object )
			&& object.hasOwnProperty( "_ModelFactory" )

			&& object[ "get" ] === get

			&& object[ "createChild" ] === createChild
			&& object[ "createChildren" ] === createChildren
			&& object[ "createChildAndRetrieve" ] === createChildAndRetrieve
			&& object[ "createChildrenAndRetrieve" ] === createChildrenAndRetrieve

			&& object[ "listChildren" ] === listChildren
			&& object[ "listMembers" ] === listMembers
			&& object[ "getChildren" ] === getChildren
			&& object[ "getMembers" ] === getMembers

			&& object[ "delete" ] === deleteChild
			;
	},

	decorate<T extends object, U extends object, W extends PersistedProtectedDocument>( object:T, documents:Documents ):T & Endpoint<U, W> {
		if( Endpoint.isDecorated<U, W>( object ) ) return object;

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


	resolveEndpointURI( endpoint:Endpoint<any, any>, relativeURI:string ):Promise<string> {
		return promiseMethod( () => {
			if( ! URI.isBaseOf( endpoint.id, relativeURI ) )
				throw new IllegalArgumentError( `The URI "${ relativeURI }" isn't a child of "${ endpoint.id }".` );

			return URI.resolve( endpoint.id, relativeURI );
		} );
	},

	resolveChildBase<T extends object>( endpoint:Endpoint<T, any>, objects:object | object[] ):Promise<T | T[]> {
		return promiseMethod( () => {
			if( ! endpoint._ModelFactory || ! endpoint._ModelFactory.validateBase )
				return objects as T | T[];

			if( ! Array.isArray( objects ) ) {
				if( endpoint._ModelFactory.validateBase( objects ) ) return objects;
				throw new IllegalArgumentError( `Invalid base child object for the "${ endpoint.id }" endpoint.` );
			}

			if( objects.every( object => endpoint._ModelFactory.validateBase( object ) ) )
				return objects as T[];
			throw new IllegalArgumentError( `Invalid base child objects for the "${ endpoint.id }" endpoint.` );
		} );
	},

	decorateEndpointChild<T extends object, U extends PersistedProtectedDocument>( endpoint:Endpoint<T, U>, documents:(T & PersistedDocument) | (T & PersistedDocument)[] ):(T & U) | (T & U)[] {
		if( ! endpoint._ModelFactory || ! endpoint._ModelFactory.decorate )
			return documents as (T & U) | (T & U)[];

		if( ! Array.isArray( documents ) )
			return endpoint._ModelFactory.decorate( documents, endpoint._documents );

		return documents
			.map( document => endpoint._ModelFactory.decorate( document, endpoint._documents ) );
	},
};


function get<T extends object, U extends PersistedProtectedDocument>( relativeURI:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & U>;
function get<T extends object, U extends PersistedProtectedDocument>( relativeURI:string, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & U>;
function get<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<any, U>, relativeURI:string, optionsOrQueryBuilderFn:any, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & U> {
	return Endpoint
		.resolveEndpointURI( this, relativeURI )
		.then( absoluteURI => this._documents
			.get( absoluteURI, optionsOrQueryBuilderFn, queryBuilderFn ) )
		.then( document => Endpoint.decorateEndpointChild( this, document ) )
		;
}

function createChild<T extends object, U extends PersistedProtectedDocument>( child:T, slug:string, requestOptions?:RequestOptions ):Promise<T & U>;
function createChild<T extends object, U extends PersistedProtectedDocument>( child:T, requestOptions?:RequestOptions ):Promise<T & U>;
function createChild<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, child:T, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & U> {
	return Endpoint
		.resolveChildBase( this, child )
		.then( base => this._documents
			.createChild( this.id, base, slugOrRequestOptions, requestOptions ) )
		.then( document => Endpoint.decorateEndpointChild( this, document ) )
		;
}

function createChildren<T extends object, U extends PersistedProtectedDocument>( children:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & U)[]>;
function createChildren<T extends object, U extends PersistedProtectedDocument>( children:T[], requestOptions?:RequestOptions ):Promise<(T & U)[]>;
function createChildren<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, children:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & U)[]> {
	return Endpoint
		.resolveChildBase( this, children )
		.then( bases => this._documents
			.createChildren( this.id, bases, slugsOrRequestOptions, requestOptions ) )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) )
		;
}

function createChildAndRetrieve<T extends object, U extends PersistedProtectedDocument>( child:T, slug:string, requestOptions?:RequestOptions ):Promise<T & U>;
function createChildAndRetrieve<T extends object, U extends PersistedProtectedDocument>( child:T, requestOptions?:RequestOptions ):Promise<T & U>;
function createChildAndRetrieve<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, child:T, slugOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<T & U> {
	return Endpoint
		.resolveChildBase( this, child )
		.then( base => this._documents
			.createChildAndRetrieve( this.id, base, slugOrRequestOptions, requestOptions ) )
		.then( document => Endpoint.decorateEndpointChild( this, document ) )
		;
}

function createChildrenAndRetrieve<T extends object, U extends PersistedProtectedDocument>( children:T[], slugs:string[], requestOptions?:RequestOptions ):Promise<(T & U)[]>;
function createChildrenAndRetrieve<T extends object, U extends PersistedProtectedDocument>( children:T[], requestOptions?:RequestOptions ):Promise<(T & U)[]>;
function createChildrenAndRetrieve<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, children:T[], slugsOrRequestOptions?:any, requestOptions?:RequestOptions ):Promise<(T & U)[]> {
	return Endpoint
		.resolveChildBase( this, children )
		.then( bases => this._documents
			.createChildrenAndRetrieve( this.id, bases, slugsOrRequestOptions, requestOptions ) )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) )
		;
}


function listChildren<U extends PersistedProtectedDocument>( this:Endpoint<{}, U>, requestOptions?:RequestOptions ):Promise<U[]> {
	return this._documents
		.listChildren( this.id, requestOptions )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) );
}

function listMembers<U extends PersistedProtectedDocument>( this:Endpoint<{}, U>, requestOptions?:RequestOptions ):Promise<U[]> {
	return this._documents
		.listMembers( this.id, requestOptions )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) )
		;
}

function getChildren<T extends object, U extends PersistedProtectedDocument>( requestOptions?:RequestOptions, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]>;
function getChildren<T extends object, U extends PersistedProtectedDocument>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]>;
function getChildren<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, requestOptionsOrQueryBuilderFn?:any, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]> {
	return this._documents
		.getChildren<T>( this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) )
		;
}

function getMembers<T extends object, U extends PersistedProtectedDocument>( requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]>;
function getMembers<T extends object, U extends PersistedProtectedDocument>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]>;
function getMembers<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, requestOptionsOrQueryBuilderFn?:any, childrenQuery?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & U)[]> {
	return this._documents
		.getMembers<T>( this.id, requestOptionsOrQueryBuilderFn, childrenQuery )
		.then( documents => Endpoint.decorateEndpointChild( this, documents ) )
		;
}

function deleteChild( relativeURI:string, requestOptions?:RequestOptions ):Promise<void>;
function deleteChild( requestOptions?:RequestOptions ):Promise<void>;
function deleteChild<T extends object, U extends PersistedProtectedDocument>( this:Endpoint<T, U>, relativeURIOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
	const relativeURI:string = isString( relativeURIOrOptions ) ? relativeURIOrOptions : "";
	if( isObject( relativeURIOrOptions ) ) requestOptions = relativeURIOrOptions;

	return Endpoint
		.resolveEndpointURI( this, relativeURI )
		.then( uri => this._documents
			.delete( uri, requestOptions ) )
		;
}
