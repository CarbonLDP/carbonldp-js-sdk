import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicCredentials } from "./BasicCredentials";
import { PersistedUser } from "./PersistedUser";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import * as TokenCredentials from "./TokenCredentials";
import { UsersEndpoint } from "./UsersEndpoint";
export declare class AuthService {
    readonly users: UsersEndpoint;
    readonly roles: Roles.Class;
    protected _authenticatedUser: PersistedUser;
    protected authenticator: Authenticator<object, object>;
    protected readonly context: Context;
    protected readonly authenticators: {
        [P in AuthMethod]: Authenticator<object, object>;
    };
    readonly authenticatedUser: PersistedUser;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<TokenCredentials.Class>;
    authenticateUsing(method: AuthMethod.BASIC, username: string, password: string): Promise<BasicCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, username: string, password: string): Promise<TokenCredentials.Class>;
    authenticateUsing(method: AuthMethod.TOKEN, token: TokenCredentials.Class): Promise<TokenCredentials.Class>;
    addAuthentication(requestOptions: RequestOptions): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: RequestOptions): Promise<[Ticket.Class, Response]>;
    getAuthenticatedURL(uri: string, requestOptions?: RequestOptions): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrCredentials, password?);
    private getAuthenticatedUser(authenticator);
}
