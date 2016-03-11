import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as SPARQL from "./SPARQL";
export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
    _documents: Documents;
    _etag: string;
    getFragment(slug: string): PersistedFragment.Class;
    getNamedFragment(slug: string): PersistedNamedFragment.Class;
    getFragments(): PersistedFragment.Class[];
    createFragment(): PersistedFragment.Class;
    createFragment(slug: string): PersistedNamedFragment.Class;
    createNamedFragment(slug: string): PersistedNamedFragment.Class;
    refresh(): Promise<void>;
    save(): Promise<void>;
    destroy(): Promise<void>;
    executeRawASKQuery(): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeASKQuery(): Promise<[boolean, HTTP.Response.Class]>;
    executeRawSELECTQuery(): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeSELECTQuery(): Promise<[SPARQL.SELECTResults.Class, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(): Promise<[string, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(): Promise<[string, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static is(object: Object): boolean;
    static create(uri: string, documents: Documents, snapshot?: Object): Class;
    static createFrom<T extends Object>(object: T, uri: string, documents: Documents, snapshot?: Object): Class;
    static decorate<T extends Document.Class>(document: T, documents: Documents, snapshot?: Object): T & Class;
}
export default Class;
