import { QueryableDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait";

import { _parseURIParams } from "../../DocumentsRepository/Utils";

import { GETOptions, RequestOptions } from "../../HTTP/Request";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";

import { URI } from "../../RDF/URI";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { Document } from "../Document";
import { LDPDocumentTrait } from "./LDPDocumentTrait";


/**
 * Properties for creating a {@link QueryableDocumentTrait}.
 */
export interface BaseQueryableDocumentTrait {
	/**
	 * Repository trait that will to execute requests of the trait to create.
	 */
	$repository:QueryableDocumentsRepositoryTrait;
}

/**
 * Trait of a {@link Document} with methods for advanced reading requests.
 */
export interface QueryableDocumentTrait extends LDPDocumentTrait, QueryablePointer {
	/**
	 * Repository trait that actually executes the request of the current trait.
	 */
	$repository:QueryableDocumentsRepositoryTrait;


	/**
	 * Retrieves the specific properties of the current document set by the query function.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	$get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the entire current document or only the properties set by the query function when provided.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	$get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the properties of the document of the URI specified set by the query function.
	 * @param uri URI of the document to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param uri URI of the document to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	$get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Retrieves the properties set by the query function, of the documents specified.
	 * @param uris URIs of the documents to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	$get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entire documents of the URIs specified or only the properties set by the query function when provided.
	 * @param uris URIs of the documents to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	$get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * Resolves the specific properties of the current document set by the query function.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	$resolve<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Resolves the entire current document or only the properties set by the query function when provided.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	$resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Resolves the properties of the document of the URI specified set by the query function.
	 * @param document Document to be resolved.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Resolves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param document Document to be resolved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	$resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	/**
	 * Retrieves the entire children of the current document or only the properties set by the query function.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	$getChildren<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entry children of the current document or only the properties set by the query function.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	$getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entire children of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its children.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	$getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieved the entire children of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its children.
	 * @param queryBuilderFn Function that specify the structure of the children to be retrieved.
	 */
	$getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * Retrieves the entire members of the current document or only the properties set by the query function.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	$getMembers<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entry members of the current document or only the properties set by the query function.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	$getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the entire members of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its members.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	$getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	/**
	 * Retrieved the entire members of the document of the specified URI or only the properties set by the query function.
	 * @param uri URI of the document to retrieve its members.
	 * @param queryBuilderFn Function that specify the structure of the members to be retrieved.
	 */
	$getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;


	/**
	 * Retrieves the shallow children of the current document.
	 * @param requestOptions Customizable options for the request.
	 */
	$listChildren<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the shallow children of the document of the specified URI.
	 * @param uri URI of the document to retrieve its shallow children.
	 * @param requestOptions Customizable options for the request.
	 */
	$listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	/**
	 * Retrieves the shallow members of the current document.
	 * @param requestOptions Customizable options for the request.
	 */
	$listMembers<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Retrieves the shallow members of the document of the specified URI.
	 * @param uri URI of the document to retrieve its shallow members.
	 * @param requestOptions Customizable options for the request.
	 */
	$listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


type QueryDocsBuilderFn = Function & (( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder);

/**
 * Factory, decorator and utils for {@link QueryableDocumentTrait}.
 */
export type QueryableDocumentTraitFactory =
	& ModelPrototype<QueryableDocumentTrait, LDPDocumentTrait & QueryablePointer, "$get">
	& ModelDecorator<QueryableDocumentTrait, BaseQueryableDocumentTrait>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link QueryableDocumentTrait} object.
 */
export const QueryableDocumentTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link QueryableDocumentTrait}.
	 */
	PROTOTYPE:QueryableDocumentTraitFactory["PROTOTYPE"];

	/**
	 * Checks if the QueryableDocumentTrait has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is QueryableDocumentTrait;

	/**
	 * Defines the QueryableDocumentTrait's prototype properties and methods to the QueryableDocumentTrait object.
	 */
	decorate<T extends BaseQueryableDocumentTrait>( object:T ):T & QueryableDocumentTrait
} = {
	PROTOTYPE: {
		$get( this:QueryableDocumentTrait, uris:any | string[], ...args:any[] ):Promise<any> {
			if( !Array.isArray( uris ) )
				return ResolvablePointer.PROTOTYPE.$get.call( this, uris, ...args );

			const resolvedURIs:string[] = uris.map( uri => URI.resolve( this.$id, uri ) );
			return this.$repository.get( resolvedURIs, ...args );
		},

		$getChildren<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions?:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrQueryBuilderFnOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.getChildren( _uri, ..._args );
		},

		$getMembers<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions?:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrQueryBuilderFnOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.getMembers( _uri, ..._args );
		},


		$listChildren<T extends object>( this:QueryableDocumentTrait, uriOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.listChildren( _uri, ..._args );
		},

		$listMembers<T extends object>( this:QueryableDocumentTrait, uriOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.listMembers( _uri, ..._args );
		},
	},


	isDecorated( object:object ):object is QueryableDocumentTrait {
		return ModelDecorator
			.hasPropertiesFrom( QueryableDocumentTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseQueryableDocumentTrait>( object:T ):T & QueryableDocumentTrait {
		if( QueryableDocumentTrait.isDecorated( object ) ) return object;

		type ForcedT = T & Pick<QueryableDocumentTrait, "$get" | "$resolve">;
		const forced:ForcedT = object as ForcedT;

		const target:ForcedT & LDPDocumentTrait & QueryablePointer = ModelDecorator
			.decorateMultiple( forced, LDPDocumentTrait, QueryablePointer );

		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentTrait.PROTOTYPE, target );
	},
};
