import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import * as PersistedCredentials from "./PersistedCredentials";
export interface Class extends PersistedProtectedDocument {
    name?: string;
    credentials?: PersistedCredentials.Class;
    enableCredentials(requestOptions?: RequestOptions): Promise<Class>;
    disableCredentials(requestOptions?: RequestOptions): Promise<Class>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: object): object is Class;
    static decorate<T extends object>(object: T, documents: Documents): Class & T;
}
export default Class;
