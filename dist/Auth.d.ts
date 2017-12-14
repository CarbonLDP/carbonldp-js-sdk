import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import * as Authenticator from "./Auth/Authenticator";
import * as BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as BasicCredentials from "./Auth/BasicCredentials";
import * as BasicToken from "./Auth/BasicToken";
import * as CredentialsSet from "./Auth/CredentialsSet";
import * as LDAPCredentials from "./Auth/LDAPCredentials";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedRole from "./Auth/PersistedRole";
import * as PersistedUser from "./Auth/PersistedUser";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as Ticket from "./Auth/Ticket";
import * as TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as TokenCredentials from "./Auth/TokenCredentials";
import * as User from "./Auth/User";
import * as UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import * as Users from "./Auth/Users";
import Context from "./Context";
import * as HTTP from "./HTTP";
export { ACE, ACL, Authenticator, BasicAuthenticator, BasicCredentials, BasicToken, CredentialsSet, LDAPCredentials, PersistedACE, PersistedACL, PersistedRole, PersistedUser, Role, Roles, Ticket, TokenAuthenticator, TokenCredentials, User, UsernameAndPasswordCredentials, Users };
export declare enum Method {
    BASIC = "BASIC",
    TOKEN = "TOKEN",
}
export declare class Class {
    users: Users.Class;
    roles: Roles.Class;
    protected _authenticatedUser: PersistedUser.Class;
    private context;
    private authenticators;
    private authenticator;
    readonly authenticatedUser: PersistedUser.Class;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<TokenCredentials.Class>;
    authenticateUsing(method: Method.BASIC, username: string, password: string): Promise<BasicCredentials.Class>;
    authenticateUsing(method: Method.TOKEN, username: string, password: string): Promise<TokenCredentials.Class>;
    authenticateUsing(method: Method.TOKEN, token: TokenCredentials.Class): Promise<TokenCredentials.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: HTTP.Request.Options): Promise<[Ticket.Class, HTTP.Response.Class]>;
    getAuthenticatedURL(uri: string, requestOptions?: HTTP.Request.Options): Promise<string>;
    _resolveSecurityURL(relativeURI: string): string;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrCredentials, password?);
    private getAuthenticatedUser(authenticator);
}
export default Class;
