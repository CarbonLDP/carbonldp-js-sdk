import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import { Documents } from "./../Documents";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as PersistedUser from "./PersistedUser";
export interface Class extends PersistedProtectedDocument.Class {
    email?: string;
    password?: string;
    enabled?: boolean;
    user?: PersistedUser.Class;
    enable(requestOptions?: HTTP.Request.Options): Promise<[Class, Response[]]>;
    disable(requestOptions?: HTTP.Request.Options): Promise<[Class, Response[]]>;
}
export declare class Factory {
    static hasClassProperties(object: object): boolean;
    static decorate<T extends object>(persistedDocument: T, documents: Documents): T & Class;
}
export default Class;
