import * as HTTP from "./../HTTP";
import * as Documents from "./../Documents";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as PersistedUser from "./PersistedUser";
export interface Class extends PersistedProtectedDocument.Class {
    email?: string;
    password?: string;
    enabled?: boolean;
    user?: PersistedUser.Class;
    enable(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
    disable(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
}
export declare class Factory {
    static hasClassProperties(object: object): boolean;
    static decorate<T extends object>(persistedDocument: T, documents: Documents.Class): T & Class;
}
export default Class;
