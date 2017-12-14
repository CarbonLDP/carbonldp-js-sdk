import { Minus } from "../Utils";
import * as Document from "./../Document";
import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as User from "./User";
export interface Class extends Minus<User.Class, Document.Class>, PersistedProtectedDocument.Class {
    enable(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
    disable(requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
}
export declare function enable(this: Class, requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
export declare function disable(this: Class, requestOptions?: HTTP.Request.Options): Promise<[Class, HTTP.Response.Class[]]>;
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static is(object: object): object is Class;
    static decorate<T extends object>(object: T, documents: Documents.Class): Class & T;
}
export default Class;
