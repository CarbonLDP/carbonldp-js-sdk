import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Pointer } from "../Pointer";
import { PersistedProtectedDocument } from "./../PersistedProtectedDocument";
import * as Role from "./Role";
import * as Roles from "./Roles";
export interface Class extends PersistedProtectedDocument {
    _roles: Roles.Class;
    name?: string;
    description?: string;
    parentRole?: Pointer;
    childRoles?: Pointer[];
    users?: Pointer[];
    createChild<T extends object>(role: T & Role.Class, requestOptions?: RequestOptions): Promise<[T & Class, Response]>;
    createChild<T extends object>(role: T & Role.Class, slug?: string, requestOptions?: RequestOptions): Promise<[T & Class, Response]>;
    getUsers<T>(requestOptions?: RequestOptions): Promise<[(T & PersistedProtectedDocument)[], Response]>;
    addUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<Response>;
    addUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<Response>;
    removeUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<Response>;
    removeUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<Response>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents): T & Class;
}
export default Class;
