import { CarbonLDP } from "../CarbonLDP";
import { GETOptions, RequestOptions, Response } from "../HTTP";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { Authenticator } from "./Authenticator";
import { User } from "./User";
export declare abstract class AbstractAuthenticator<T extends object, W extends object> implements Authenticator<W> {
    protected context: CarbonLDP;
    protected _authenticatedUser?: User;
    readonly authenticatedUser: User;
    protected abstract _credentials?: W;
    constructor(context: CarbonLDP);
    isAuthenticated(): boolean;
    abstract authenticate(authenticationToken: T): Promise<W>;
    clearAuthentication(): void;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    getAuthenticatedUser(requestOptions?: GETOptions): Promise<User>;
    protected abstract _getHeaderValue(): string;
    protected _parseRDFMetadata(rdfData: object[], response: Response, requestOptions?: GETOptions): AuthenticatedUserInformationAccessor;
}
