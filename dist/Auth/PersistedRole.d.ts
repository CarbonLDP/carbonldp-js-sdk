import { QueryDocumentsBuilder } from "../SPARQL/QueryDocument";
import * as Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
export interface Class extends PersistedProtectedDocument.Class {
    name?: string;
    description?: string;
    parent?: Pointer.Class;
    children?: Pointer.Class[];
    users?: Pointer.Class[];
    createChild<T extends object>(role: T & Roles.NewRole, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    createChild<T extends object>(role: T & Roles.NewRole, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    getUsers<T>(requestOptions?: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    getUsers<T>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    addUser(user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addUsers(users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUser(user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUsers(users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static is(object: object): object is Class;
    static decorate<T extends object>(object: T, documents: Documents.Class): T & Class;
}
export default Class;
