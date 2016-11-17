import AppContext from "./Context";
import * as AppRole from "./Role";
import * as HTTP from "./../HTTP";
import * as PersistedAppRole from "./PersistedRole";
import * as Pointer from "./../Pointer";
import AuthRoles from "./../Auth/Roles";
export declare class Class extends AuthRoles {
    constructor(appContext: AppContext);
    createChild<T>(parentRole: string | Pointer.Class, role: T & AppRole.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAppRole.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChild<T>(parentRole: string | Pointer.Class, role: T & AppRole.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAppRole.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildren<T>(parentRole: string | Pointer.Class, roles: (T & AppRole.Class)[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAppRole.Class)[], [HTTP.Response.Class[], HTTP.Response.Class]]>;
    createChildren<T>(parentRole: string | Pointer.Class, roles: (T & AppRole.Class)[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAppRole.Class)[], [HTTP.Response.Class[], HTTP.Response.Class]]>;
    createChildAndRetrieve<T>(parentRole: string | Pointer.Class, role: T & AppRole.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAppRole.Class, [HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildAndRetrieve<T>(parentRole: string | Pointer.Class, role: T & AppRole.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedAppRole.Class, [HTTP.Response.Class, HTTP.Response.Class, HTTP.Response.Class]]>;
    createChildrenAndRetrieve<T>(parentRole: string | Pointer.Class, roles: (T & AppRole.Class)[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAppRole.Class)[], [HTTP.Response.Class[], HTTP.Response.Class[], HTTP.Response.Class]]>;
    createChildrenAndRetrieve<T>(parentRole: string | Pointer.Class, roles: (T & AppRole.Class)[], slugs?: string[], requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedAppRole.Class)[], [HTTP.Response.Class[], HTTP.Response.Class[], HTTP.Response.Class]]>;
    get(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAppRole.Class, HTTP.Response.Class]>;
}
export default Class;
