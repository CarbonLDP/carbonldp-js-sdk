import Context from "./Context";
import * as Agent from "./Agent";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
export declare class Class {
    private context;
    constructor(context: Context);
    create(agentDocument: Agent.Class, slug?: string): Promise<[Pointer.Class, Response.Class]>;
    private getContainerURI();
}
export default Class;
