import { Context as AppContext } from "./../App";
import * as Role from "./Roles/Role";
import * as Pointer from "./../Pointer";
import * as Response from "./../HTTP/Response";
export declare class Class {
    private context;
    constructor(context: AppContext);
    create(agentDocument: Role.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, agentDocument: Role.Class): Promise<[Pointer.Class, Response.Class]>;
    private getContainerURI();
}
export { Role };
export default Class;
