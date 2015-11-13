/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as HTTP from "./HTTP";
import Parent from "./Parent";
export declare enum Method {
    BASIC = 0,
    TOKEN = 1,
}
export declare class Class {
    private parent;
    private method;
    private authenticators;
    constructor(parent: Parent);
    isAuthenticated(askParent?: boolean): boolean;
    login(username: string, password: string): Promise<void>;
    addAuthentication(requestOptions: HTTP.Request.Options): void;
}
export default Class;
