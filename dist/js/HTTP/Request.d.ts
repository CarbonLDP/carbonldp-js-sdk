/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
import Method from "./Method";
import Response from "./Response";
import * as Header from "./Header";
interface Options {
    headers?: Map<string, Header.Class>;
    sendCredentialsOnCORS?: boolean;
    timeout?: number;
    request?: XMLHttpRequest;
}
declare class Service {
    private static defaultOptions;
    static send(method: (Method | string), url: string, options?: Options): Promise<Response>;
    static send(method: (Method | string), url: string, body: string, options?: Options): Promise<Response>;
    static options(url: string, options?: Options): Promise<Response>;
    static head(url: string, options?: Options): Promise<Response>;
    static get(url: string, options?: Options): Promise<Response>;
    static post(url: string, body: string, options?: Options): Promise<Response>;
    static put(url: string, body: string, options?: Options): Promise<Response>;
    static patch(url: string, body: string, options?: Options): Promise<Response>;
    static delete(url: string, body: string, options?: Options): Promise<Response>;
}
export { Options, Service };
