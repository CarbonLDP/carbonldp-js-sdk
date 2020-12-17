import { ExecutableQueryDocument } from "../../ExecutableQueryDocument/ExecutableQueryDocument";
import { GETOptions, RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";
import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";
import { OverriddenMembers, QueryableDocumentsRepositoryTrait } from "./QueryableDocumentsRepositoryTrait";

export interface ExecutableQueryDocumentsRepositoryTrait extends QueryableDocumentsRepositoryTrait {
	execute( uri:string ):Promise<JSON>;
	modifyStoredQuery( uri:string, newStoredQuery:string ):Promise<void>;

	/**
	 * Retrieves the properties of the document of the URI specified set by the query function.
	 * @param uri URI of the document to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	/**
	 * Retrieves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param uri URI of the document to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be retrieved.
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	/**
	 * Retrieves the properties set by the query function, of the documents specified.
	 * @param uris URIs of the documents to be retrieved.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & ExecutableQueryDocument)[]>;
	/**
	 * Retrieves the entire documents of the URIs specified or only the properties set by the query function when provided.
	 * @param uris URIs of the documents to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the documents to be retrieved.
	 */
	get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & ExecutableQueryDocument)[]>;

	/**
	 * Resolves the properties of the document of the URI specified set by the query function.
	 * @param document Document to be resolved.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	resolve<T extends object>( document:ExecutableQueryDocument, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	/**
	 * Resolves the entire document of the URI specified or only the properties set by the query function when provided.
	 * @param document Document to be resolved.
	 * @param requestOptions Customizable options for the request.
	 * @param queryBuilderFn Function that specify the structure of the document to be resolved.
	 */
	resolve<T extends object>( document:ExecutableQueryDocument, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;

	/**
	 * Refreshes with the latest data of the specified document.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The document to be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	refresh<T extends object>( document:ExecutableQueryDocument, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;

	/**
	 * Saves the changes of the specified document and retrieves its latest changes.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The resource to saved and refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	saveAndRefresh<T extends object>( document:ExecutableQueryDocument, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;


}


/**
 * Factory, decorator and utils for {@link QueryableDocumentsRepositoryTrait}.
 */
export type ExecutableQueryDocumentsRepositoryTraitFactory =
	& ModelPrototype<ExecutableQueryDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers>
	& ModelDecorator<ExecutableQueryDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link QueryableDocumentsRepositoryTrait} object.
 */
export const ExecutableQueryDocumentsRepositoryTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link QueryableDocumentsRepositoryTrait}.
	 */
	PROTOTYPE:ExecutableQueryDocumentsRepositoryTraitFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link QueryableDocumentsRepositoryTrait}.
	 */
	isDecorated( object:object ):object is ExecutableQueryDocumentsRepositoryTrait;

	/**
	 * Decorates the object with the properties and methods from the {@link QueryableDocumentsRepositoryTrait} prototype.
	 */
	decorate<T extends BaseDocumentsRepository>( object:T ):T & ExecutableQueryDocumentsRepositoryTrait;
} = <ExecutableQueryDocumentsRepositoryTraitFactory> {
	...QueryableDocumentsRepositoryTrait,
	PROTOTYPE: {
		...QueryableDocumentsRepositoryTrait.PROTOTYPE,
		execute( uri:string ):Promise<JSON> {
			return LDPDocumentsRepositoryTrait.PROTOTYPE.execute(uri);
		},
		modifyStoredQuery( uri:string, newStoredQuery:string ):Promise<void> {
			return LDPDocumentsRepositoryTrait.PROTOTYPE.modifyStoredQuery(uri, newStoredQuery);
		},
	},
	isDecorated( object:object ):object is ExecutableQueryDocumentsRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( ExecutableQueryDocumentsRepositoryTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & ExecutableQueryDocumentsRepositoryTrait {
		if( ExecutableQueryDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & LDPDocumentsRepositoryTrait = ModelDecorator
			.decorateMultiple( object, LDPDocumentsRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( ExecutableQueryDocumentsRepositoryTrait.PROTOTYPE, target );
	},
};

