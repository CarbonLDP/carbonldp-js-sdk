/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as HTTP from "./HTTP";
import Parent from "./Parent";
declare enum Method {
    Basic = 0,
}
export interface Credentials {
    username: string;
    password: string;
}
declare class Auth {
    private parent;
    private authenticated;
    private method;
    private credentials;
    constructor(parent: Parent);
    isAuthenticated(askParent?: boolean): boolean;
    login(username: string, password: string): Promise<void>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
    private basicAuthentication(username, password);
    private addBasicAuthHeader(headers);
}
export default Auth;
export { Auth as Class, Method };
