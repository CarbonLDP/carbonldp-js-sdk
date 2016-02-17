import * as Document from "./Document";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as SPARQL from "./SPARQL";
export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
    _documents: Documents;
    _etag: string;
    refresh(): Promise<void>;
    save(): Promise<void>;
    destroy(): Promise<void>;
    executeRawASKQuery(): Promise<[SPARQL.Results.Class, HTTP.Response.Class]>;
    executeRawSELECTQuery(): Promise<[SPARQL.Results.Class, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(): Promise<[string, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(): Promise<[string, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static is(object: Object): boolean;
    static create(uri: string, documents: Documents): Class;
    static createFrom<T extends Object>(object: T, uri: string, documents: Documents): Class;
    static decorate<T extends Document.Class>(document: T, documents: Documents): T & Class;
}
export default Class;
