import { QueryClause } from "sparqler/clauses";
import { AccessPointBase } from "./AccessPoint";
import { Document } from "./Document";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import * as MessagingDocument from "./Messaging/Document";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as PersistedResource from "./PersistedResource";
import { Pointer } from "./Pointer";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import * as SPARQL from "./SPARQL";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument";
export interface Class extends Document, PersistedResource.Class, ServiceAwareDocument, MessagingDocument.Class {
    created?: Date;
    modified?: Date;
    defaultInteractionModel?: Pointer;
    accessPoints?: Pointer[];
    hasMemberRelation?: Pointer;
    isMemberOfRelation?: Pointer;
    contains?: Pointer[];
    _etag: string;
    _fragmentsIndex: Map<string, PersistedFragment.Class>;
    _savedFragments: PersistedFragment.Class[];
    _syncSavedFragments(): void;
    isLocallyOutDated(): boolean;
    getFragment<T extends object>(slug: string): T & PersistedFragment.Class;
    getNamedFragment<T extends object>(slug: string): T & PersistedNamedFragment.Class;
    getFragments(): PersistedFragment.Class[];
    createFragment(): PersistedFragment.Class;
    createFragment(slug: string): PersistedFragment.Class;
    createFragment<T extends object>(object: T): PersistedFragment.Class & T;
    createFragment<T extends object>(object: T, slug: string): PersistedFragment.Class & T;
    createNamedFragment(slug: string): PersistedNamedFragment.Class;
    createNamedFragment<T extends object>(object: T, slug: string): PersistedNamedFragment.Class & T;
    refresh<T extends object>(): Promise<[T & Class, Response]>;
    save<T extends object>(requestOptions?: RequestOptions): Promise<[T & Class, Response]>;
    saveAndRefresh<T extends object>(): Promise<[T & Class, Response[]]>;
    delete(): Promise<Response>;
    getDownloadURL(): Promise<string>;
    addMember(member: Pointer): Promise<Response>;
    addMember(memberURI: string): Promise<Response>;
    addMembers(members: (Pointer | string)[]): Promise<Response>;
    createChild<T extends object>(object: T, slug: string, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChild<T extends object>(object: T, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChild(slug: string, requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument.Class, Response]>;
    createChild(requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument.Class, Response]>;
    createChildren<T extends object>(objects: T[], slugs: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildren<T extends object>(objects: T[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildAndRetrieve<T extends object>(object: T, slug: string, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChildAndRetrieve<T extends object>(object: T, requestOptions?: RequestOptions): Promise<[T & PersistedProtectedDocument.Class, Response]>;
    createChildAndRetrieve(slug: string, requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument.Class, Response]>;
    createChildAndRetrieve(requestOptions?: RequestOptions): Promise<[PersistedProtectedDocument.Class, Response]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], slugs: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument.Class)[], Response[]]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPointBase, slug?: string, requestOptions?: RequestOptions): Promise<[T & PersistedAccessPoint.Class, Response]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPointBase, requestOptions?: RequestOptions): Promise<[T & PersistedAccessPoint.Class, Response]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPointBase)[], slugs?: string[], requestOptions?: RequestOptions): Promise<[(T & PersistedAccessPoint.Class)[], Response[]]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPointBase)[], requestOptions?: RequestOptions): Promise<[(T & PersistedAccessPoint.Class)[], Response[]]>;
    listChildren(requestOptions?: RequestOptions): Promise<[Class[], Response]>;
    getChildren<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], Response]>;
    getChildren<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], Response]>;
    listMembers(requestOptions?: RequestOptions): Promise<[Class[], Response]>;
    getMembers<T extends object>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], Response]>;
    getMembers<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], Response]>;
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
    sparql(): QueryClause;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static is(object: object): object is Class;
    static create(uri: string, documents: Documents): Class;
    static createFrom<T extends object>(object: T, uri: string, documents: Documents): T & Class;
    static decorate<T extends object>(object: T, documents: Documents): T & Class;
}
export default Class;
