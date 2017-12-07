import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as Credentials from "./Auth/Credentials";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedCredentials from "./Auth/PersistedCredentials";
import * as PersistedRole from "./Auth/PersistedRole";
import * as PersistedUser from "./Auth/PersistedUser";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as Ticket from "./Auth/Ticket";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as TokenCredentials from "./Auth/TokenCredentials";
import * as User from "./Auth/User";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import * as Users from "./Auth/Users";
import Context from "./Context";
import * as HTTP from "./HTTP";
export { ACE, ACL, User, Users, Authenticator, BasicAuthenticator, Credentials, PersistedACE, PersistedACL, PersistedCredentials, PersistedRole, PersistedUser, Role, Roles, Ticket, TokenCredentials, TokenAuthenticator, UsernameAndPasswordToken };
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
    authenticateUsing(method: Method.BASIC, username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: Method.TOKEN, username: string, password: string): Promise<TokenCredentials.Class>;
    authenticateUsing(method: Method.TOKEN, token: TokenCredentials.Class): Promise<TokenCredentials.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: HTTP.Request.Options): Promise<[Ticket.Class, HTTP.Response.Class]>;
    getAuthenticatedURL(uri: string, requestOptions?: HTTP.Request.Options): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrCredentials, password?);
    private getAuthenticatedUser(authenticator);
}
export default Class;
