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
    _fragmentsIndex: Map<string, PersistedFragment.Class>;
    _savedFragments: PersistedFragment.Class[];
    _syncSavedFragments(): void;
    getFragment(slug: string): PersistedFragment.Class;
    getNamedFragment(slug: string): PersistedNamedFragment.Class;
    getFragments(): PersistedFragment.Class[];
    createFragment(): PersistedFragment.Class;
    createFragment(slug: string): PersistedNamedFragment.Class;
    createFragment<T extends Object>(slug: string, object: T): PersistedNamedFragment.Class & T;
    createFragment<T extends Object>(object: T): PersistedFragment.Class & T;
    createNamedFragment(slug: string): PersistedNamedFragment.Class;
    createNamedFragment<T extends Object>(slug: string, object: T): PersistedNamedFragment.Class & T;
    refresh(): Promise<[Class, HTTP.Response.Class]>;
    save(): Promise<[Class, HTTP.Response.Class]>;
    destroy(): Promise<HTTP.Response.Class>;
    getDownloadURL(): Promise<string>;
    executeRawASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[boolean, HTTP.Response.Class]>;
    executeRawSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.SELECTResults.Class, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeUPDATE(updateQuery: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static create(uri: string, documents: Documents, snapshot?: Object): Class;
    static createFrom<T extends Object>(object: T, uri: string, documents: Documents, snapshot?: Object): Class;
    static decorate<T extends Object>(object: T, documents: Documents, snapshot?: Object): T & Class;
}
export default Class;
