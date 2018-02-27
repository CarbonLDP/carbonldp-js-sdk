import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import { Documents } from "./../Documents";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import { Pointer } from "./../Pointer";
import * as Role from "./Role";
import * as Roles from "./Roles";
export interface Class extends PersistedProtectedDocument.Class {
    _roles: Roles.Class;
    name?: string;
    description?: string;
    parentRole?: Pointer;
    childRoles?: Pointer[];
    users?: Pointer[];
    createChild<T extends object>(role: T & Role.Class, requestOptions?: HTTP.Request.Options): Promise<[T & Class, Response]>;
    createChild<T extends object>(role: T & Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & Class, Response]>;
    getUsers<T>(requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], Response]>;
    addUser(user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<Response>;
    addUsers(users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<Response>;
    removeUser(user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<Response>;
    removeUsers(users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<Response>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents): T & Class;
}
export default Class;
