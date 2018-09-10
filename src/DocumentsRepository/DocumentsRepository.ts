import { DocumentsContext } from "../Context/DocumentsContext";

import { Document } from "../Document/Document";

import { GETOptions, RequestOptions } from "../HTTP/Request";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { QueryDocumentBuilder2 } from "../QueryDocuments/QueryDocumentBuilder2";

import { isObject } from "../Utils";

import { BaseDocumentsRepository } from "./BaseDocumentsRepository";

import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./Traits/QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";


export interface DocumentsRepository extends QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait {
	context:DocumentsContext;

	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder2 ) => QueryDocumentBuilder2 ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder2 ) => QueryDocumentBuilder2 ):Promise<T & Document>;

	resolve<T extends object>( document:Document, requestOptions?:GETOptions ):Promise<T & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder2 ) => QueryDocumentBuilder2 ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder2 ) => QueryDocumentBuilder2 ):Promise<T & Document>;

	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


export type DocumentsRepositoryFactory =
	& ModelFactory<DocumentsRepository, BaseDocumentsRepository>
	& ModelTypeGuard<DocumentsRepository>
	;

export const DocumentsRepository:DocumentsRepositoryFactory = {
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
