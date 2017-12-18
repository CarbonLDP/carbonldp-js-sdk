import { Minus } from "../Utils";
import Context from "./../Context";
import * as Document from "./../Document";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import { QueryDocumentsBuilder } from "./../SPARQL/QueryDocument";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
export declare type NewRole = Minus<Role.Class, Document.Class>;
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends object>(parentRole: string | Pointer.Class, role: T & NewRole, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    createChild<T extends object>(parentRole: string | Pointer.Class, role: T & NewRole, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    get<T extends object>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    getUsers<T extends object>(roleURI: string, requestOptions?: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedUser.Class)[], HTTP.Response.Class]>;
    getUsers<T extends object>(roleURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder.Class) => QueryDocumentsBuilder.Class): Promise<[(T & PersistedUser.Class)[], HTTP.Response.Class]>;
    addUser(roleURI: string, user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addUsers(roleURI: string, users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUser(roleURI: string, user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUsers(roleURI: string, users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private getUsersAccessPoint(roleURI);
    private resolveURI(relativeURI?);
}
export default Class;
