import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
export interface Class extends PersistedDocument {
    accessControlList?: Pointer;
    getACL(requestOptions?: RequestOptions): Promise<[PersistedACL, Response]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(document: T, documents: Documents): T & Class;
}
export default Class;
