import { CarbonLDP } from "../CarbonLDP";
import { RequestOptions } from "../HTTP";
import { AbstractAuthenticator } from "./AbstractAuthenticator";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicCredentials } from "./BasicCredentials";
import { TokenCredentials, TokenCredentialsBase } from "./TokenCredentials";
import { User } from "./User";
import { UsersEndpoint } from "./UsersEndpoint";
export declare class AuthService implements Authenticator<TokenCredentials> {
    readonly users: UsersEndpoint;
    protected readonly context: CarbonLDP;
    protected readonly authenticators: {
        [P in AuthMethod]: AbstractAuthenticator<any, any>;
    };
    protected authenticator: Authenticator<any>;
    protected _authenticatedUser?: User;
    readonly authenticatedUser: User | null;
    constructor(context: CarbonLDP);
    isAuthenticated(): boolean;
    authenticate(username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.BASIC, username: string, password: string): Promise<BasicCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: AuthMethod.TOKEN, token: TokenCredentialsBase): Promise<TokenCredentials>;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    clearAuthentication(): void;
    private _getAuthenticationToken(userOrCredentials, password?);
}
