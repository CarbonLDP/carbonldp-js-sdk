import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import * as PersistedUser from "./PersistedUser";
export interface Class extends PersistedProtectedDocument {
    email?: string;
    password?: string;
    enabled?: boolean;
    user?: PersistedUser.Class;
    enable(requestOptions?: RequestOptions): Promise<Class>;
    disable(requestOptions?: RequestOptions): Promise<Class>;
}
export declare class Factory {
    static hasClassProperties(object: object): boolean;
    static decorate<T extends object>(persistedDocument: T, documents: Documents): T & Class;
}
export default Class;
