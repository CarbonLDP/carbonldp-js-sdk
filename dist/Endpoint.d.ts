import { Documents } from "./Documents";
import { GETOptions, RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { QueryDocumentBuilder } from "./SPARQL/QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
export interface EndpointModelFactory<T extends object, U extends PersistedProtectedDocument> extends ModelDecorator<U> {
    validateBase?(object: object): object is T;
}
export interface Endpoint<T extends object, U extends PersistedProtectedDocument> extends PersistedProtectedDocument {
    _ModelFactory: EndpointModelFactory<T, U>;
    get<W extends object>(relativeURI: string, requestOptions?: GETOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<W & U>;
    get<W extends object>(relativeURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<W & U>;
    createChild<W extends T>(child: W, slug: string, requestOptions?: RequestOptions): Promise<W & U>;
    createChild<W extends T>(child: W, requestOptions?: RequestOptions): Promise<W & U>;
    createChildren<W extends T>(children: W[], slugs: string[], requestOptions?: RequestOptions): Promise<(W & U)[]>;
    createChildren<W extends T>(children: W[], requestOptions?: RequestOptions): Promise<(W & U)[]>;
    createChildAndRetrieve<W extends T>(child: W, slug: string, requestOptions?: RequestOptions): Promise<W & U>;
    createChildAndRetrieve<W extends T>(child: W, requestOptions?: RequestOptions): Promise<W & U>;
    createChildrenAndRetrieve<W extends T>(children: W[], slugs: string[], requestOptions?: RequestOptions): Promise<(W & U)[]>;
    createChildrenAndRetrieve<W extends T>(children: W[], requestOptions?: RequestOptions): Promise<(W & U)[]>;
    listChildren(requestOptions?: RequestOptions): Promise<U[]>;
    listMembers(requestOptions?: RequestOptions): Promise<U[]>;
    getChildren<W extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(W & U)[]>;
    getChildren<W extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(W & U)[]>;
    getMembers<W extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(W & U)[]>;
    getMembers<W extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(W & U)[]>;
    delete(relativeURI: string, requestOptions?: RequestOptions): Promise<void>;
    delete(requestOptions?: RequestOptions): Promise<void>;
}
export interface EndpointFactory extends ModelDecorator<Endpoint<any, any>, PersistedProtectedDocument> {
    isDecorated<U extends object, W extends PersistedProtectedDocument>(object: object): object is Endpoint<U, W>;
    decorate<T extends object, U extends object, W extends PersistedProtectedDocument>(object: T, documents: Documents): T & Endpoint<U, W>;
    resolveEndpointURI(endpoint: Endpoint<any, any>, relativeURI: string): Promise<string>;
    resolveChildBase<T extends object>(endpoint: Endpoint<T, any>, objects: object[]): Promise<T[]>;
    resolveChildBase<T extends object>(endpoint: Endpoint<T, any>, object: object): Promise<T>;
    decorateEndpointChild<T extends object, U extends PersistedProtectedDocument>(endpoint: Endpoint<T, U>, documents: (T & PersistedDocument)[]): (T & U)[];
    decorateEndpointChild<T extends object, U extends PersistedProtectedDocument>(endpoint: Endpoint<T, U>, documents: T & PersistedDocument): T & U;
}
export declare const Endpoint: EndpointFactory;
