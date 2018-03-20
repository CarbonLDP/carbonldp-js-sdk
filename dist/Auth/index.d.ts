import * as ACE from "./ACE";
import * as ACL from "./ACL";
import Authenticator from "./Authenticator";
import BasicAuthenticator from "./BasicAuthenticator";
import * as Credentials from "./Credentials";
import * as PersistedACE from "./PersistedACE";
import * as PersistedACL from "./PersistedACL";
import * as PersistedCredentials from "./PersistedCredentials";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import * as Token from "./Token";
import TokenAuthenticator from "./TokenAuthenticator";
import * as User from "./User";
import UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Users from "./Users";
import Context from "../Context";
import { RequestOptions } from "../HTTP/Request";
export { ACE, ACL, User, Users, Authenticator, BasicAuthenticator, Credentials, PersistedACE, PersistedACL, PersistedCredentials, PersistedRole, PersistedUser, Role, Roles, Ticket, Token, TokenAuthenticator, UsernameAndPasswordToken };
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
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
    authenticate(username: string, password: string): Promise<Token.Class>;
    authenticateUsing(method: "BASIC", username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: "TOKEN", username: string, password: string): Promise<Token.Class>;
    authenticateUsing(method: "TOKEN", token: Token.Class): Promise<Token.Class>;
    addAuthentication(requestOptions: RequestOptions): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: RequestOptions): Promise<Ticket.Class>;
    getAuthenticatedURL(uri: string, requestOptions?: RequestOptions): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrTokenOrCredentials, password);
    private getAuthenticatedUser(authenticator);
}
export default Class;
