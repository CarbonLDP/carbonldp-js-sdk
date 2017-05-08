import * as User from "./User";
import Context from "./../Context";
import * as HTTP from "./../HTTP";
import * as PersistedUser from "./PersistedUser";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";
export declare class Class {
    private context;
    constructor(context: Context);
    register(userDocument: User.Class, slug?: string): Promise<[PersistedProtectedDocument.Class, HTTP.Response.Class]>;
    get(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class]>;
    enable(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    disable(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, [HTTP.Response.Class, HTTP.Response.Class]]>;
    delete(userURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private changeEnabledStatus(userURI, value, requestOptions?);
    private resolveURI(userURI);
    private getContainerURI();
}
export default Class;
