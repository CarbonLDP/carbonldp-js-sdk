import * as Agent from "./Agent";
import Context from "./../Context";
import * as HTTP from "./../HTTP";
import * as PersistedAgent from "./PersistedAgent";
import * as Pointer from "./../Pointer";
import * as Response from "./../HTTP/Response";
export declare abstract class Class {
    private context;
    constructor(context: Context);
    register(agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    register(slug: string, agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    get(agentURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedAgent.Class, HTTP.Response.Class]>;
    private resolveURI(agentURI);
    private getContainerURI();
}
export default Class;
