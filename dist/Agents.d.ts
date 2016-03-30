import Context from "./Context";
import * as Agent from "./Agent";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
export declare class Class {
    private context;
    constructor(context: Context);
    create(agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, agentDocument: Agent.Class): Promise<[Pointer.Class, Response.Class]>;
    private getContainerURI();
}
export default Class;
