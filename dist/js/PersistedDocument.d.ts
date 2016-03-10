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
    save(): Promise<[Class, HTTP.Response.Class]>;
    destroy(): Promise<HTTP.Response.Class>;
    executeRawASKQuery(askQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeASKQuery(): Promise<[boolean, HTTP.Response.Class]>;
    executeRawSELECTQuery(selectQuery: string, requestOptions?: HTTP.Request.Options): Promise<[SPARQL.RawResults.Class, HTTP.Response.Class]>;
    executeSELECTQuery(): Promise<[SPARQL.SELECTResults.Class, HTTP.Response.Class]>;
    executeRawCONSTRUCTQuery(constructQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
    executeRawDESCRIBEQuery(describeQuery: string, requestOptions?: HTTP.Request.Options): Promise<[string, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(document: Document.Class): boolean;
    static is(object: Object): boolean;
    static create(uri: string, documents: Documents): Class;
    static createFrom<T extends Object>(object: T, uri: string, documents: Documents): Class;
    static decorate<T extends Document.Class>(document: T, documents: Documents): T & Class;
}
export default Class;
