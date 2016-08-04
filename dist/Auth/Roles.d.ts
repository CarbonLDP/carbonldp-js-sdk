import Context from "./../Context";
import * as Pointer from "./../Pointer";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import * as PersistedRole from "./PersistedRole";
import * as Role from "./Role";
export declare abstract class Class {
    private context;
    constructor(context: Context);
    createChild(parentRole: string | Pointer.Class, role: Role.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChild(parentRole: string | Pointer.Class, role: Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    get(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedRole.Class, HTTP.Response.Class]>;
    listAgents(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedDocument.Class[], HTTP.Response.Class]>;
    getAgents<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    getAgents<T>(roleURI: string, retrievalPreferences?: RetrievalPreferences.Class, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedDocument.Class)[], HTTP.Response.Class]>;
    private resolveURI(agentURI);
    private getAgentsAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
