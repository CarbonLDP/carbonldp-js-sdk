import * as Auth from "./Auth";
import { Documents } from "./Documents";
import * as HTTP from "./HTTP";
import { Response } from "./HTTP/Response";
import * as PersistedDocument from "./PersistedDocument";
import { Pointer } from "./Pointer";
export interface Class extends PersistedDocument.Class {
    accessControlList?: Pointer;
    getACL(requestOptions?: HTTP.Request.Options): Promise<[Auth.PersistedACL.Class, Response]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(document: T, documents: Documents): T & Class;
}
export default Class;
