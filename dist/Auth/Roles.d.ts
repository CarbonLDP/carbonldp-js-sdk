import Context from "./../Context";
import * as Pointer from "./../Pointer";
import * as HTTP from "./../HTTP";
import * as Role from "./Role";
import * as PersistedRole from "./PersistedRole";
import * as RetrievalPreferences from "./../RetrievalPreferences";
export declare abstract class Class {
    private context;
    constructor(context: Context);
    createChild(parentRole: string | Pointer.Class, role: Role.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChild(parentRole: string | Pointer.Class, role: Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    get(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedRole.Class, HTTP.Response.Class]>;
    listAgents(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    getAgents(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    getAgents(roleURI: string, retrievalPreferences?: RetrievalPreferences.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class[], HTTP.Response.Class]>;
    addAgent(roleURI: string, agent: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    addAgents(roleURI: string, agents: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeAgent(roleURI: string, agent: Pointer.Class | string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    removeAgents(roleURI: string, agents: (Pointer.Class | string)[], requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private resolveURI(agentURI);
    private getAgentsAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
