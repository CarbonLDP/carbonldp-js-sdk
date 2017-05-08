import Context from "./../Context";
import * as HTTP from "./../HTTP";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
import * as Pointer from "./../Pointer";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends Role.Class>(parentRole: string | Pointer.Class, role: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    createChild<T extends Role.Class>(parentRole: string | Pointer.Class, role: T, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    get<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    listUsers(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedProtectedDocument.Class[], HTTP.Response.Class]>;
    getUsers<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedUser.Class)[], HTTP.Response.Class]>;
    getUsers<T>(roleURI: string, retrievalPreferences?: RetrievalPreferences.Class, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedUser.Class)[], HTTP.Response.Class]>;
    addUser(roleURI: string, user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addUsers(roleURI: string, users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUser(roleURI: string, user: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeUsers(roleURI: string, users: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private resolveURI(userURI);
    private getUsersAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
