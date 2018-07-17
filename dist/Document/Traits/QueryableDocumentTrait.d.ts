import { QueryableDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait";
import { GETOptions, RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";
import { Document } from "../Document";
import { LDPDocumentTrait } from "./LDPDocumentTrait";
export interface BaseQueryableDocumentTrait {
    $repository: QueryableDocumentsRepositoryTrait;
}
export interface QueryableDocumentTrait extends LDPDocumentTrait, QueryablePointer {
    $repository: QueryableDocumentsRepositoryTrait;
    $get<T extends object>(queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $get<T extends object>(requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $get<T extends object>(uri: string, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $get<T extends object>(uri: string, requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $resolve<T extends object>(queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & this & Document>;
    $resolve<T extends object>(requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & this & Document>;
    $resolve<T extends object>(document: Document, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $resolve<T extends object>(document: Document, requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    $exists(requestOptions?: RequestOptions): Promise<boolean>;
    $exists(uri: string, requestOptions?: RequestOptions): Promise<boolean>;
    $refresh<T extends object>(requestOptions?: RequestOptions): Promise<T & this>;
    $refresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $save<T extends object>(requestOptions?: RequestOptions): Promise<T & this>;
    $save<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $saveAndRefresh<T extends object>(requestOptions?: RequestOptions): Promise<T & this>;
    $saveAndRefresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    $delete(uri: string, requestOptions?: RequestOptions): Promise<void>;
    $delete(requestOptions?: RequestOptions): Promise<void>;
    $getChildren<T extends object>(requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getChildren<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getChildren<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getChildren<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getMembers<T extends object>(requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getMembers<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getMembers<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $getMembers<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    $listChildren<T extends object>(requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    $listChildren<T extends object>(uri: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    $listMembers<T extends object>(requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    $listMembers<T extends object>(uri: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
}
export declare type QueryableDocumentTraitFactory = ModelPrototype<QueryableDocumentTrait, LDPDocumentTrait & QueryablePointer> & ModelDecorator<QueryableDocumentTrait, BaseQueryableDocumentTrait>;
export declare const QueryableDocumentTrait: QueryableDocumentTraitFactory;
