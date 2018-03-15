import { ACE } from "./ACE";
import { ACL } from "./ACL";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as Credentials from "./Credentials";
import { PersistedACE } from "./PersistedACE";
import { PersistedACL } from "./PersistedACL";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as User from "./User";
import UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Users from "./Users";
import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
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
    addAuthentication(requestOptions: RequestOptions): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: RequestOptions): Promise<[Ticket.Class, Response]>;
    getAuthenticatedURL(uri: string, requestOptions?: RequestOptions): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrCredentials, password?);
    private getAuthenticatedUser(authenticator);
}
export default Class;
