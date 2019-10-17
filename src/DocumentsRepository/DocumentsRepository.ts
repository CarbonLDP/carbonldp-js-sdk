import { DocumentsContext } from "../Context/DocumentsContext";

import { Document } from "../Document/Document";

import { GETOptions, RequestOptions } from "../HTTP/Request";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../QueryDocuments/QueryDocumentsBuilder";

import { isObject } from "../Utils";

import { BaseDocumentsRepository } from "./BaseDocumentsRepository";

import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./Traits/QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";


/**
 * Repository for request related to {@link Document}'s.
 */
export interface DocumentsRepository extends QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait {
	/**
	 * Context where the repository belongs to.
	 */
	readonly context:DocumentsContext;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.get}
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.resolve}
	 */
	resolve<T extends object>( document:Document, requestOptions?:GETOptions ):Promise<T & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	/**
	 * @see {@link HTTPRepositoryTrait.exists}
	 */
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.refresh}
	 */
	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * @see {@link LDPDocumentsRepositoryTrait.save}
	 */
	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.saveAndRefresh}
	 */
	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * @see {@link LDPDocumentsRepositoryTrait.delete}
	 */
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


/**
 * Factory, decorator and utils for {@link DocumentsRepository}.
 */
export type DocumentsRepositoryFactory =
	& ModelFactory<DocumentsRepository, BaseDocumentsRepository>
	& ModelTypeGuard<DocumentsRepository>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentsRepository} object.
 */
export const DocumentsRepository:{

	/**
	 * Creates a {@link DocumentsRepository} with the provided data.
	 */
	create<T extends object>( data:T & BaseDocumentsRepository ):T & DocumentsRepository;

	/**
	 * Creates a {@link DocumentsRepository} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseDocumentsRepository ):T & DocumentsRepository;

	/**
	 * Returns true when the value provided is considered to be a {@link DocumentsRepository}.
	 */
	is( object:object ): object is DocumentsRepository;

} = {
	create<T extends object>( data:T & BaseDocumentsRepository ):T & DocumentsRepository {
		return DocumentsRepository.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRepository ):T & DocumentsRepository {
		return ModelDecorator
			.decorateMultiple( object,
				QueryableDocumentsRepositoryTrait,
				SPARQLDocumentsRepositoryTrait,
				EventEmitterDocumentsRepositoryTrait
			);
	},


	is( value:any ):value is DocumentsRepository {
		return isObject( value )
			&& QueryableDocumentsRepositoryTrait.isDecorated( value )
			&& SPARQLDocumentsRepositoryTrait.isDecorated( value )
			&& EventEmitterDocumentsRepositoryTrait.isDecorated( value )
			;
	},
};
