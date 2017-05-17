import * as Context from "./../Context";
import * as HTTP from "./../HTTP";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context.Class);
    register(email: string, password: string, enabled?: boolean): Promise<[PersistedUser.Class, HTTP.Response.Class[]]>;
    get(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class]>;
    enableCredentials(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class[]]>;
    disableCredentials(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class[]]>;
    delete(userURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private changeEnabledStatus(userURI, value, requestOptions?);
    private resolveURI(relativeURI);
    private getContainerURI();
    private getCredentialsContainerURI();
}
export default Class;
