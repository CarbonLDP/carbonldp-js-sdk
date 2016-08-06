import Context from "./../Context";
import * as Pointer from "./../Pointer";
import * as HTTP from "./../HTTP";
import * as PersistedDocument from "./../PersistedDocument";
import * as Role from "./Role";
import * as PersistedRole from "./PersistedRole";
export declare abstract class Class {
    private context;
    constructor(context: Context);
    createChild<T extends Role.Class>(parentRole: string | Pointer.Class, role: T, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChild<T extends Role.Class>(parentRole: string | Pointer.Class, role: T, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedDocument.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    get<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, HTTP.Response.Class]>;
    private resolveURI(agentURI);
    private getContainerURI();
}
export default Class;
