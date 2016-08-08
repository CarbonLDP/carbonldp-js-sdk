import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as Ticket from "./Auth/Ticket";
import * as Token from "./Auth/Token";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import Credentials from "./Auth/Credentials";
import * as Agent from "./Agent";
import Context from "./Context";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
export { ACE, ACL, AuthenticationToken, Authenticator, BasicAuthenticator, PersistedACE, PersistedACL, Ticket, Token, TokenAuthenticator, UsernameAndPasswordToken };
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
}
export declare class Class {
    protected _authenticatedAgent: Agent.Class & PersistedDocument.Class;
    private context;
    private method;
    private authenticators;
    private authenticator;
    authenticatedAgent: Agent.Class & PersistedDocument.Class;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<Token.Class>;
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
    private getAuthenticatedAgent(authenticator);
}
export default Class;
