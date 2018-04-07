import { Context } from "../Context";
import { GETOptions, RequestOptions, Response } from "../HTTP";
import * as PersistedUser from "./PersistedUser";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
export declare abstract class Authenticator<T extends object, W extends object> {
    protected context: Context;
    protected _authenticatedUser?: PersistedUser.Class;
    readonly authenticatedUser: PersistedUser.Class;
    protected abstract _credentials?: W;
    constructor(context: Context);
    isAuthenticated(): boolean;
    abstract authenticate(authenticationToken: T): Promise<W>;
    clearAuthentication(): void;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    getAuthenticatedUser(requestOptions?: GETOptions): Promise<PersistedUser.Class>;
    protected abstract _getHeaderValue(): string;
    protected _parseRDFMetadata(rdfData: object[], response: Response, requestOptions?: GETOptions): AuthenticatedUserInformationAccessor;
}
