import { Context } from "../Context";
import { RequestOptions } from "../HTTP";
import { AuthMethod } from "./AuthMethod";
import { BasicCredentials } from "./BasicCredentials";
import { PersistedUser } from "./PersistedUser";
import * as Roles from "./Roles";
import { TokenCredentialsBase } from "./TokenCredentials";
import { TokenCredentials } from "./TokenCredentials";
import { UsersEndpoint } from "./UsersEndpoint";
export declare class AuthService {
    readonly users: UsersEndpoint;
    readonly roles: Roles.Class;
    protected _authenticatedUser: PersistedUser;
    private readonly context;
    private readonly authenticators;
    private authenticator;
    readonly authenticatedUser: PersistedUser;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.BASIC, username: string, password: string): Promise<BasicCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, token: TokenCredentialsBase): Promise<TokenCredentials>;
    addAuthentication(requestOptions: RequestOptions): void;
    clearAuthentication(): void;
}
