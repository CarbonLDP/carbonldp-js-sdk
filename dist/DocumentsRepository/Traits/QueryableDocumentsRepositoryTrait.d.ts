import { Document } from "../../Document/Document";
import { GETOptions, RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { QueryDocumentBuilder } from "../../QueryDocuments/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";
import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";
export interface QueryableDocumentsRepositoryTrait extends LDPDocumentsRepositoryTrait {
    get<T extends object>(uri: string, requestOptions?: GETOptions): Promise<T & Document>;
    get<T extends object>(uri: string, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    get<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    resolve<T extends object>(document: Document, requestOptions?: GETOptions): Promise<T & Document>;
    resolve<T extends object>(document: Document, queryBuilderFn: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    resolve<T extends object>(document: Document, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & Document>;
    refresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    saveAndRefresh<T extends object>(document: Document, requestOptions?: RequestOptions): Promise<T & Document>;
    getChildren<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    getChildren<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    getMembers<T extends object>(uri: string, requestOptions: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    getMembers<T extends object>(uri: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & Document)[]>;
    listChildren<T extends object>(uri: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
    listMembers<T extends object>(uri: string, requestOptions?: RequestOptions): Promise<(T & Document)[]>;
}
export declare type OverriddenMembers = "get" | "resolve" | "refresh" | "saveAndRefresh";
export declare type QueryableDocumentsRepositoryTraitFactory = ModelPrototype<QueryableDocumentsRepositoryTrait, LDPDocumentsRepositoryTrait, OverriddenMembers> & ModelDecorator<QueryableDocumentsRepositoryTrait, BaseDocumentsRepository>;
export declare const QueryableDocumentsRepositoryTrait: QueryableDocumentsRepositoryTraitFactory;
