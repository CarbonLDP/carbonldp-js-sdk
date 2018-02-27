import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import { Documents } from "./../Documents";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as PersistedCredentials from "./PersistedCredentials";
export interface Class extends PersistedProtectedDocument.Class {
    name?: string;
    credentials?: PersistedCredentials.Class;
    enableCredentials(requestOptions?: HTTP.Request.Options): Promise<[Class, Response[]]>;
    disableCredentials(requestOptions?: HTTP.Request.Options): Promise<[Class, Response[]]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents): Class & T;
}
export default Class;
