import * as Agent from "./Agent";
import Context from "./../Context";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
export declare abstract class Class {
    private context;
    constructor(context: Context);
    register(agentDocument: Agent.Class, slug?: string): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    get(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAgent.Class, HTTP.Response.Class]>;
    enable(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    disable(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAgent.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    delete(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private changeEnabledStatus(agentURI, value, requestOptions?);
    private resolveURI(agentURI);
    private getContainerURI();
}
export default Class;
