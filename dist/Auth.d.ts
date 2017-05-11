import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedRole from "./Auth/PersistedRole";
import * as PersistedUser from "./Auth/PersistedUser";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as Ticket from "./Auth/Ticket";
import * as Token from "./Auth/Token";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as User from "./Auth/User";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import * as Users from "./Auth/Users";
import Context from "./Context";
import * as HTTP from "./HTTP";
export { ACE, ACL, User, Users, Authenticator, BasicAuthenticator, PersistedACE, PersistedACL, PersistedUser, PersistedRole, Role, Roles, Ticket, Token, TokenAuthenticator, UsernameAndPasswordToken };
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
}
export declare class Class {
    users: Users.Class;
    roles: Roles.Class;
    protected _authenticatedUser: PersistedUser.Class;
    private context;
    private method;
    private authenticators;
    private authenticator;
    readonly authenticatedUser: PersistedUser.Class;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<Token.Class>;
    authenticateUsing(method: "BASIC", username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: "TOKEN", username: string, password: string): Promise<Token.Class>;
    authenticateUsing(method: "TOKEN", token: Token.Class): Promise<Token.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: HTTP.Request.Options): Promise<[Ticket.Class, HTTP.Response.Class]>;
    getAuthenticatedURL(uri: string, requestOptions?: HTTP.Request.Options): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrTokenOrCredentials, password);
    private getAuthenticatedUser(authenticator);
}
export default Class;
