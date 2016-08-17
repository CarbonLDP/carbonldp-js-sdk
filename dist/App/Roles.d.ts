import AppContext from "./Context";
import * as AppRole from "./Role";
import * as HTTP from "./../HTTP";
import * as Pointer from "./../Pointer";
import AuthRoles from "./../Auth/Roles";
export declare class Class extends AuthRoles {
    constructor(appContext: AppContext);
    createChild(parentRole: string | Pointer.Class, role: AppRole.Class, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    createChild(parentRole: string | Pointer.Class, role: AppRole.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
}
export default Class;
