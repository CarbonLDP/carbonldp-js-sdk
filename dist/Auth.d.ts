/// <reference path="../typings/typings.d.ts" />
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as Token from "./Auth/Token";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import TokenCredentials from "./Auth/TokenCredentials";
import Credentials from "./Auth/Credentials";
import * as HTTP from "./HTTP";
import Context from "./Context";
export { AuthenticationToken, Authenticator, BasicAuthenticator, Token, TokenAuthenticator, UsernameAndPasswordToken };
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
}
export declare class Class {
    private context;
    private method;
    private authenticators;
    private authenticator;
    constructor(context: Context);
    isAuthenticated(askParent?: boolean): boolean;
    authenticate(username: string, password: string): Promise<Credentials>;
    authenticateUsing(method: "BASIC", username: string, password: string): Promise<UsernameAndPasswordCredentials>;
    authenticateUsing(method: "TOKEN", username: string, password: string): Promise<TokenCredentials>;
    authenticateUsing(method: string, username: string, password: string): Promise<Credentials>;
    authenticateUsing(method: string, token: AuthenticationToken): Promise<Credentials>;
    authenticateUsing(method: string, token: Credentials): Promise<Credentials>;
    addAuthentication(requestOptions: HTTP.Request.Options): any;
    clearAuthentication(): void;
    private authenticateWithBasic(username, password);
    private authenticateWithToken(userOrTokenOrCredentials, password);
}
export default Class;
