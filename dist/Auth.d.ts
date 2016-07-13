import * as Agent from "./Auth/Agent";
import * as Agents from "./Auth/Agents";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as PersistedAgent from "./Auth/PersistedAgent";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as Ticket from "./Auth/Ticket";
import * as Token from "./Auth/Token";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import Credentials from "./Auth/Credentials";
import Context from "./Context";
import * as HTTP from "./HTTP";
export { Agent, Agents, AuthenticationToken, Authenticator, BasicAuthenticator, PersistedAgent, Role, Roles, Ticket, Token, TokenAuthenticator, UsernameAndPasswordToken };
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
}
export declare abstract class Class {
    agents: Agents.Class;
    roles: Roles.Class;
    private context;
    private method;
    private authenticators;
    private authenticator;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<Credentials>;
    authenticateUsing(method: "BASIC", username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: "TOKEN", username: string, password: string): Promise<Token.Class>;
    authenticateUsing(method: "TOKEN", token: Token.Class): Promise<Token.Class>;
    authenticateUsing(method: string, username: string, password: string): Promise<Credentials>;
    authenticateUsing(method: string, token: Credentials): Promise<Credentials>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
    clearAuthentication(): void;
    createTicket(uri: string, requestOptions?: HTTP.Request.Options): Promise<[Ticket.Class, HTTP.Response.Class]>;
    getAuthenticatedURL(uri: string, requestOptions?: HTTP.Request.Options): Promise<string>;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrTokenOrCredentials, password);
}
export default Class;
