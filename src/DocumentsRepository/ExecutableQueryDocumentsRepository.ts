import { ExecutableQueryDocument } from "../ExecutableQueryDocument/ExecutableQueryDocument";
import { ExecutableQuerySPARQLResults } from "../ExecutableQueryDocument/ExecutableQuerySPARQLResults";
import { GETOptions, RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../QueryDocuments/QueryDocumentsBuilder";
import { SPARQLRawResults } from "../SPARQL/RawResults";
import { isObject } from "../Utils";
import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import { DocumentsRepository } from "./DocumentsRepository";
import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { ExecutableQueryDocumentsRepositoryTrait } from "./Traits/ExecutableQueryDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";

export interface ExecutableQueryDocumentsRepository extends DocumentsRepository, ExecutableQueryDocumentsRepositoryTrait {
	/**
	 * Executes the stored query directly. Returns result in plain JSON Format.
	 */
	execute( uri:string ):Promise<ExecutableQuerySPARQLResults>;

	/**
	 * Executes the stored query and returns the result in {@link SPARQLRawResults} format.
	 */
	executeAsRAWSPARQLQuery( uri:string ):Promise<[ SPARQLRawResults, Response ]>;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.get}
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & ExecutableQueryDocument>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & ExecutableQueryDocument)[]>;
	get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & ExecutableQueryDocument)[]>;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.resolve}
	 */
	resolve<T extends object>( document:ExecutableQueryDocument, requestOptions?:GETOptions ):Promise<T & ExecutableQueryDocument>;
	resolve<T extends object>( document:ExecutableQueryDocument, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;
	resolve<T extends object>( document:ExecutableQueryDocument, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & ExecutableQueryDocument>;

	/**
	 * @see {@link HTTPRepositoryTrait.exists}
	 */
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.refresh}
	 */
	refresh<T extends object>( document:ExecutableQueryDocument, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;

	/**
	 * @see {@link LDPDocumentsRepositoryTrait.save}
	 */
	save<T extends object>( document:ExecutableQueryDocument, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;

	/**
	 * @see {@link QueryableDocumentsRepositoryTrait.saveAndRefresh}
	 */
	saveAndRefresh<T extends object>( document:ExecutableQueryDocument, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;


	/**
	 * @see {@link LDPDocumentsRepositoryTrait.delete}
	 */
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Modifies the `c:storedQuery` of a given `c:ExecutableQueryDocument`.
	 * @param uri URI of the `c:ExecutableQueryDocument` to modify it's `c:storedQuery`.
	 * @param newStoredQuery The new stored query to use.
	 * @param requestOptions Customizable options for the request.
	 */
	modifyStoredQuery<T extends object>( uri:string, newStoredQuery:string, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;

	/**
	 * Modifies the `c:storedQuery` of a given `c:ExecutableQueryDocument` and returns the updated document.
	 * @param uri URI of the `c:ExecutableQueryDocument` to modify it's `c:storedQuery`.
	 * @param newStoredQuery The new stored query to use.
	 * @param requestOptions Customizable options for the request.
	 */
	modifyStoredQueryAndRefresh<T extends object>( uri:string, newStoredQuery:string, requestOptions?:RequestOptions ):Promise<T & ExecutableQueryDocument>;


}


/**
 * Factory, decorator and utils for {@link ExecutableQueryDocumentsRepository}.
 */
export type ExecutableQueryDocumentsRepositoryFactory =
	& ModelFactory<ExecutableQueryDocumentsRepository, BaseDocumentsRepository>
	& ModelTypeGuard<ExecutableQueryDocumentsRepository>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link ExecutableQueryDocumentsRepository} object.
 */
export const ExecutableQueryDocumentsRepository:{

	/**
	 * Creates a {@link DocumentsRepository} with the provided data.
	 */
	create<T extends object>( data:T & BaseDocumentsRepository ):T & ExecutableQueryDocumentsRepository;

	/**
	 * Creates a {@link DocumentsRepository} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseDocumentsRepository ):T & ExecutableQueryDocumentsRepository;

	/**
	 * Returns true when the value provided is considered to be a {@link ExecutableQueryDocumentsRepository}.
	 */
	is( object:object ):object is ExecutableQueryDocumentsRepository;

} = <ExecutableQueryDocumentsRepositoryFactory> {
	create<T extends object>( data:T & BaseDocumentsRepository ):T & ExecutableQueryDocumentsRepository {
		return ExecutableQueryDocumentsRepository.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRepository ):T & ExecutableQueryDocumentsRepository {
		return ModelDecorator
			.decorateMultiple( object,
				ExecutableQueryDocumentsRepositoryTrait,
				SPARQLDocumentsRepositoryTrait,
				EventEmitterDocumentsRepositoryTrait
			);
	},


	is( value:any ):value is ExecutableQueryDocumentsRepository {
		return isObject( value )
			&& ExecutableQueryDocumentsRepositoryTrait.isDecorated( value )
			&& SPARQLDocumentsRepositoryTrait.isDecorated( value )
			&& EventEmitterDocumentsRepositoryTrait.isDecorated( value )
			;
	},
};
