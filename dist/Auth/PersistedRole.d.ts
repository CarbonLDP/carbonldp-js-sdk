import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as Role from "./Role";
import * as Roles from "./Roles";
export interface Class extends PersistedProtectedDocument.Class {
    _roles: Roles.Class;
    name?: string;
    description?: string;
    parentRole?: Pointer.Class;
    childRoles?: Pointer.Class[];
    users?: Pointer.Class[];
    createChild<T>(role: T & Role.Class, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    createChild<T>(role: T & Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    listUsers(requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getUsers<T>(requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    getUsers<T>(retrievalPreferences?: RetrievalPreferences.Class, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    addUser(user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addUsers(users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUser(user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUsers(users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends object>(object: T, documents: Documents.Class): T & Class;
}
export default Class;
