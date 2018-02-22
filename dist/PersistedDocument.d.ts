import { QueryClause } from "sparqler/clauses";
import * as AccessPoint from "./AccessPoint";
import { Document } from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as MessagingDocument from "./Messaging/Document";
import * as PersistedAccessPoint from "./PersistedAccessPoint";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as ServiceAwareDocument from "./ServiceAwareDocument";
import * as SPARQL from "./SPARQL";
import { QueryDocumentsBuilder } from "./SPARQL/QueryDocument";
export interface Class extends Document, PersistedResource.Class, ServiceAwareDocument.Class, MessagingDocument.Class {
    created?: Date;
    modified?: Date;
    defaultInteractionModel?: Pointer.Class;
    accessPoints?: Pointer.Class[];
    hasMemberRelation?: Pointer.Class;
    isMemberOfRelation?: Pointer.Class;
    contains?: Pointer.Class[];
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
    refresh<T extends object>(): Promise<[T & Class, HTTP.Response.Class]>;
    save<T extends object>(requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    saveAndRefresh<T extends object>(): Promise<[T & Class, HTTP.Response.Class[]]>;
    delete(): Promise<HTTP.Response.Class>;
    getDownloadURL(): Promise<string>;
    addMember(member: Pointer.Class): Promise<HTTP.Response.Class>;
    addMember(memberURI: string): Promise<HTTP.Response.Class>;
    addMembers(members: (Pointer.Class | string)[]): Promise<HTTP.Response.Class>;
    createChild<T extends object>(object: T, slug: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChild<T extends object>(object: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChild(slug: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChild(requestOptions?: HTTP.Request.Options): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildren<T extends object>(objects: T[], slugs: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildren<T extends object>(objects: T[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildAndRetrieve<T extends object>(object: T, slug: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildAndRetrieve<T extends object>(object: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildAndRetrieve(slug: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildAndRetrieve(requestOptions?: HTTP.Request.Options): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], slugs: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createChildrenAndRetrieve<T extends object>(objects: T[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class[]]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPoint.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAccessPoint.Class, HTTP.Response.Class]>;
    createAccessPoint<T extends object>(accessPoint: T & AccessPoint.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAccessPoint.Class, HTTP.Response.Class]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPoint.Class)[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], HTTP.Response.Class[]]>;
    createAccessPoints<T extends object>(accessPoints: (T & AccessPoint.Class)[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAccessPoint.Class)[], HTTP.Response.Class[]]>;
    listChildren(requestOptions?: HTTP.Request.Options): Promise<[Class[], HTTP.Response.Class]>;
    getChildren<T extends object>(requestOptions?: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], HTTP.Response.Class]>;
    getChildren<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], HTTP.Response.Class]>;
    listMembers(requestOptions?: HTTP.Request.Options): Promise<[Class[], HTTP.Response.Class]>;
    getMembers<T extends object>(requestOptions?: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], HTTP.Response.Class]>;
    getMembers<T extends object>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & Class)[], HTTP.Response.Class]>;
    removeMember(member: Pointer.Class): Promise<HTTP.Response.Class>;
    removeMember(memberURI: string): Promise<HTTP.Response.Class>;
    removeMembers(members: (Pointer.Class | string)[]): Promise<HTTP.Response.Class>;
    removeAllMembers(): Promise<HTTP.Response.Class>;
    executeRawASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    executeRawSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeSELECTQuery<T extends object>(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.SELECTResults.Class<T>, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeUPDATE(updateQuery: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
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
