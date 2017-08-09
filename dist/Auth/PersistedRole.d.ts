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
    agents?: Pointer.Class[];
    createChild<T>(role: T & Role.Class, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    createChild<T>(role: T & Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & Class, HTTP.Response.Class]>;
    listAgents(requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getAgents<T>(requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    getAgents<T>(retrievalPreferences?: RetrievalPreferences.Class, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedProtectedDocument.Class)[], HTTP.Response.Class]>;
    addAgent(agent: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addAgents(agents: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeAgent(agent: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeAgents(agents: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(object: T, roles: Roles.Class): T & Class;
}
export default Class;
