import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context);
    register(email: string, password: string, enabled?: boolean): Promise<PersistedUser.Class>;
    get(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser.Class>;
    enableCredentials(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser.Class>;
    disableCredentials(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser.Class>;
    delete(userURI: string, requestOptions?: RequestOptions): Promise<void>;
    private changeEnabledStatus(userURI, value, requestOptions?);
    private resolveURI(relativeURI);
    private getContainerURI();
    private getCredentialsContainerURI();
}
export default Class;
