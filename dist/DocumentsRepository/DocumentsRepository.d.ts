import { DocumentsContext } from "../Context/DocumentsContext";
import { Document } from "../Document/Document";
import { GETOptions, RequestOptions } from "../HTTP/Request";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";
import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./Traits/QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";
export interface DocumentsRepository extends QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait {
    $context: DocumentsContext;
    $get<T extends object>(uri: string, requestOptions?: GETOptions): Promise<T & Document>;
    $get<T extends object>(uri: string, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $get<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $resolve<T extends object>(document: Document, requestOptions?: GETOptions): Promise<T & Document>;
    $resolve<T extends object>(document: Document, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $resolve<T extends object>(document: Document, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $exists(uri: string, requestOptions?: RequestOptions): Promise<boolean>;
    $refresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $save<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $saveAndRefresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $delete(uri: string, requestOptions?: RequestOptions): Promise<void>;
}
export declare type DocumentsRepositoryFactory = ModelFactory<DocumentsRepository, BaseDocumentsRepository> & ModelTypeGuard<DocumentsRepository>;
export declare const DocumentsRepository: DocumentsRepositoryFactory;
