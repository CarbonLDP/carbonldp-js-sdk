import { Context } from "../Context";
import { GETOptions, RequestOptions, Response } from "../HTTP";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { User } from "./User";
export declare abstract class Authenticator<T extends object, W extends object> {
    protected context: Context;
    protected _authenticatedUser?: User;
    readonly authenticatedUser: User;
    protected abstract _credentials?: W;
    constructor(context: Context);
    isAuthenticated(): boolean;
    abstract authenticate(authenticationToken: T): Promise<W>;
    clearAuthentication(): void;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    getAuthenticatedUser(requestOptions?: GETOptions): Promise<User>;
    protected abstract _getHeaderValue(): string;
    protected _parseRDFMetadata(rdfData: object[], response: Response, requestOptions?: GETOptions): AuthenticatedUserInformationAccessor;
}
