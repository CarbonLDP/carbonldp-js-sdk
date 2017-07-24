import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as PersistedCredentials from "./PersistedCredentials";
export interface Class extends PersistedProtectedDocument.Class {
    name?: string;
    credentials?: PersistedCredentials.Class;
    enableCredentials(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
    disableCredentials(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents.Class): Class & T;
}
export default Class;
