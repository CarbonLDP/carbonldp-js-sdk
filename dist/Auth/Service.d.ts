import { Context } from "../Context";
import { RequestOptions } from "../HTTP";
import { AuthMethod } from "./AuthMethod";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";
import { TokenCredentialsBase } from "./TokenCredentials";
import { TokenCredentials } from "./TokenCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import * as Users from "./Users";
export declare class AuthService {
    users: Users.Class;
    roles: Roles.Class;
    protected _authenticatedUser: PersistedUser.Class;
    private readonly context;
    private readonly authenticators;
    private authenticator;
    readonly authenticatedUser: PersistedUser.Class;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.BASIC, username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, token: TokenCredentialsBase): Promise<TokenCredentials>;
    addAuthentication(requestOptions: RequestOptions): void;
    clearAuthentication(): void;
}
