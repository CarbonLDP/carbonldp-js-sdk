import { Document } from "./Document";
import { Documents } from "./Documents";
import { GETOptions, RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { QueryDocumentBuilder } from "./SPARQL/QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
export interface EndpointModelFactory<B extends object, D extends Document, P extends PersistedProtectedDocument> {
    createFrom?(object: B): B & D;
    decorate?<T extends object>(object: T, documents: Documents): T & P;
}
export interface Endpoint<B extends object, D extends Document, P extends PersistedProtectedDocument> extends PersistedProtectedDocument {
    _ModelFactory: EndpointModelFactory<B, D, P>;
    get<T extends object>(relativeURI: string, requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & P>;
    get<T extends object>(relativeURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & P>;
    createChild<T extends B>(child: T, slug: string, requestOptions?: RequestOptions): Promise<T & P>;
    createChild<T extends B>(child: T, requestOptions?: RequestOptions): Promise<T & P>;
    createChildren<T extends B>(children: T[], slugs: string[], requestOptions?: RequestOptions): Promise<(T & P)[]>;
    createChildren<T extends B>(children: T[], requestOptions?: RequestOptions): Promise<(T & P)[]>;
    createChildAndRetrieve<T extends B>(child: T, slug: string, requestOptions?: RequestOptions): Promise<T & P>;
    createChildAndRetrieve<T extends B>(child: T, requestOptions?: RequestOptions): Promise<T & P>;
    createChildrenAndRetrieve<T extends B>(children: T[], slugs: string[], requestOptions?: RequestOptions): Promise<(T & P)[]>;
    createChildrenAndRetrieve<T extends B>(children: T[], requestOptions?: RequestOptions): Promise<(T & P)[]>;
    listChildren(requestOptions?: RequestOptions): Promise<P[]>;
    listMembers(requestOptions?: RequestOptions): Promise<P[]>;
    getChildren<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & P)[]>;
    getChildren<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & P)[]>;
    getMembers<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & P)[]>;
    getMembers<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & P)[]>;
    delete(relativeURI: string, requestOptions?: RequestOptions): Promise<void>;
    delete(requestOptions?: RequestOptions): Promise<void>;
}
export interface EndpointFactory extends ModelDecorator<Endpoint<object, Document, PersistedProtectedDocument>, PersistedProtectedDocument> {
    isDecorated<B extends object, D extends Document, P extends PersistedProtectedDocument>(value: any): value is Endpoint<B, D, P>;
    decorate<T extends object, B extends object, D extends Document, P extends PersistedProtectedDocument>(object: T, documents: Documents): T & Endpoint<B, D, P>;
    resolveEndpointURI(endpoint: Endpoint<any, any, any>, relativeURI: string): Promise<string>;
    createChildren<B extends object, D extends Document>(endpoint: Endpoint<B, D, any>, objects: B[]): Promise<(B & D)[]>;
    createChildren<B extends object, D extends Document>(endpoint: Endpoint<B, D, any>, object: B): Promise<B & D>;
    decorateChildren<B extends object, P extends PersistedProtectedDocument>(endpoint: Endpoint<B, any, P>, documents: (B & PersistedDocument)[]): (B & P)[];
    decorateChildren<B extends object, P extends PersistedProtectedDocument>(endpoint: Endpoint<B, any, P>, documents: B & PersistedDocument): B & P;
}
export declare const Endpoint: EndpointFactory;
