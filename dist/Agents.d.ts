import Context from "./Context";
import * as Agent from "./Agents/Agent";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
export declare class Class {
    private context;
    constructor(context: Context);
    createAgent(agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    createAgent(slug: string, agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    private getContainerURI();
}
export { Agent };
export default Class;
