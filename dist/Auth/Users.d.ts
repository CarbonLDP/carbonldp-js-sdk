import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context);
    register(email: string, password: string, enabled?: boolean): Promise<[PersistedUser.Class, Response]>;
    get(userURI: string, requestOptions?: RequestOptions): Promise<[PersistedUser.Class, Response]>;
    enableCredentials(userURI: string, requestOptions?: RequestOptions): Promise<[PersistedUser.Class, Response[]]>;
    disableCredentials(userURI: string, requestOptions?: RequestOptions): Promise<[PersistedUser.Class, Response[]]>;
    delete(userURI: string, requestOptions?: RequestOptions): Promise<Response>;
    private changeEnabledStatus(userURI, value, requestOptions?);
    private resolveURI(relativeURI);
    private getContainerURI();
    private getCredentialsContainerURI();
}
export default Class;
