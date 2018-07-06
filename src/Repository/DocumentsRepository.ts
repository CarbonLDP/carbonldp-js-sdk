import { DocumentsContext } from "../Context";
import { Document } from "../Document";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { EventEmitterDocumentsRepositoryTrait } from "../Messaging";
import { SPARQLDocumentsRepositoryTrait } from "../SPARQL";
import {
	QueryableDocumentsRepositoryTrait,
	QueryDocumentBuilder
} from "../SPARQL/QueryDocument";


export interface DocumentsRepository extends QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait {
	$context:DocumentsContext;

	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}
