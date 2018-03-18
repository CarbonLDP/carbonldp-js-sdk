import { QueryClause } from "sparqler/clauses";
import { AccessPointBase } from "./AccessPoint";
import { Document } from "./Document";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { MessagingDocument } from "./Messaging/Document";
import { PersistedAccessPoint } from "./PersistedAccessPoint";
import { PersistedFragment } from "./PersistedFragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { PersistedResource } from "./PersistedResource";
import { Pointer } from "./Pointer";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import * as SPARQL from "./SPARQL";
import { FinishSPARQLSelect } from "./SPARQL/Builder";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument/QueryDocumentsBuilder";
import { ModelFactory } from "./ModelFactory";
import { ModelDecorator } from "./ModelDecorator";
export interface PersistedDocument extends Document, PersistedResource, ServiceAwareDocument, MessagingDocument {
    created?: Date;
    modified?: Date;
    defaultInteractionModel?: Pointer;
    accessPoints?: Pointer[];
    hasMemberRelation?: Pointer;
    isMemberOfRelation?: Pointer;
    contains?: Pointer[];
    _eTag: string;
    _fragmentsIndex: Map<string, PersistedFragment>;
    _savedFragments: PersistedFragment[];
    _syncSavedFragments(): void;
    isLocallyOutDated(): boolean;
    getFragment<T extends object>(slug: string): T & PersistedFragment;
    getNamedFragment<T extends object>(slug: string): T & PersistedNamedFragment;
    getFragments(): PersistedFragment[];
    createFragment(slug?: string): PersistedFragment;
    createFragment<T extends object>(object: T): PersistedFragment & T;
    createFragment<T extends object>(object: T, slug: string): PersistedFragment & T;
    createNamedFragment(slug: string): PersistedNamedFragment;
    createNamedFragment<T extends object>(object: T, slug: string): PersistedNamedFragment & T;
    refresh<T extends object>(): Promise<[T & PersistedDocument, Response]>;
    save<T extends object>(requestOptions?: RequestOptions): Promise<[T & PersistedDocument, Response]>;
    saveAndRefresh<T extends object>(): Promise<[T & PersistedDocument, Response[]]>;
    delete(): Promise<Response>;
    getDownloadURL(): Promise<string>;
    addMember(member: Pointer): Promise<Response>;
    addMember(memberURI: string): Promise<Response>;
    addMembers(members: (Pointer | string)[]): Promise<Response>;
    createChild<T extends object>(object: T, slug: string, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument, Response]>;
    createChild<T extends object>(object: T, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument, Response]>;
    createChild(slug: string, requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument, Response]>;
    createChild(requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument, Response]>;
    createChildren<T extends object>(objects: T[], slugs: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument)[], Response[]]>;
    createChildren<T extends object>(objects: T[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument)[], Response[]]>;
    createChildAndRetrieve<T extends object>(object: T, slug: string, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument, Response]>;
    createChildAndRetrieve<T extends object>(object: T, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument, Response]>;
    createChildAndRetrieve(slug: string, requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument, Response]>;
    createChildAndRetrieve(requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument, Response]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], slugs: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument)[], Response[]]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument)[], Response[]]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPointBase, slug?: string, requestOptions?: RequestOptions): Promise<[T & PersistedAccessPoint, Response]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPointBase, requestOptions?: RequestOptions): Promise<[T & PersistedAccessPoint, Response]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPointBase)[], slugs?: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedAccessPoint)[], Response[]]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPointBase)[], requestOptions?: RequestOptions): Promise<[(T & PersistedAccessPoint)[], Response[]]>;
    listChildren(requestOptions?: RequestOptions): Promise<[PersistedDocument[], Response]>;
    getChildren<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<[(T & PersistedDocument)[], Response]>;
    getChildren<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<[(T & PersistedDocument)[], Response]>;
    listMembers(requestOptions?: RequestOptions): Promise<[PersistedDocument[], Response]>;
    getMembers<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<[(T & PersistedDocument)[], Response]>;
    getMembers<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<[(T & PersistedDocument)[], Response]>;
    removeMember(member: Pointer): Promise<Response>;
    removeMember(memberURI: string): Promise<Response>;
    removeMembers(members: (Pointer | string)[]): Promise<Response>;
    removeAllMembers(): Promise<Response>;
    executeRawASKQuery(askQuery: string, requestOptions?: RequestOptions): Promise<[SPARQL.RawResults.SPARQLRawResults, Response]>;
    executeASKQuery(askQuery: string, requestOptions?: RequestOptions): Promise<[boolean, Response]>;
    executeRawSELECTQuery(selectQuery: string, requestOptions?: RequestOptions): Promise<[SPARQL.RawResults.SPARQLRawResults, Response]>;
    executeSELECTQuery<T extends object>(selectQuery: string, requestOptions?: RequestOptions): Promise<[SPARQL.SelectResults.SPARQLSelectResults<T>, Response]>;
    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: RequestOptions): Promise<[string, Response]>;
    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: RequestOptions): Promise<[string, Response]>;
    executeUPDATE(updateQuery: string, requestOptions?: RequestOptions): Promise<Response>;
    sparql(): QueryClause<FinishSPARQLSelect>;
}
export interface PersistedDocumentFactory extends ModelFactory<PersistedDocument>, ModelDecorator<PersistedDocument> {
    is(object: object): object is PersistedDocument;
    isDecorated(object: object): object is PersistedDocument;
    create(documents: Documents, uri: string): PersistedDocument;
    createFrom<T extends object>(object: T, documents: Documents, uri: string): T & PersistedDocument;
    decorate<T extends object>(object: T, documents: Documents): T & PersistedDocument;
}
export declare const PersistedDocument: PersistedDocumentFactory;
export default PersistedDocument;
