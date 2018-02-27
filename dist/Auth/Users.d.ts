import { Context } from "../Context";
import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context);
    register(email: string, password: string, enabled?: boolean): Promise<[PersistedUser.Class, Response]>;
    get(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, Response]>;
    enableCredentials(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, Response[]]>;
    disableCredentials(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, Response[]]>;
    delete(userURI: string, requestOptions?: HTTP.Request.Options): Promise<Response>;
    private changeEnabledStatus(userURI, value, requestOptions?);
    private resolveURI(relativeURI);
    private getContainerURI();
    private getCredentialsContainerURI();
}
export default Class;
