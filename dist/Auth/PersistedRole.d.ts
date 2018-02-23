import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
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
    createChild<T extends object>(role: T & Role.Class, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    createChild<T extends object>(role: T & Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    getUsers<T>(requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    addUser(user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addUsers(users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUser(user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUsers(users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents.Class): T & Class;
}
export default Class;
