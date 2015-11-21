/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
import * as Header from "./Header";
import Method from "./Method";
import Parser from "./Parser";
import ProcessedResponse from "./ProcessedResponse";
import Response from "./Response";
export interface Options {
    headers?: Map<string, Header.Class>;
    sendCredentialsOnCORS?: boolean;
    timeout?: number;
    request?: XMLHttpRequest;
}
export declare class Service {
    private static defaultOptions;
    static send(method: (Method | string), url: string, options?: Options): Promise<Response>;
    static send(method: (Method | string), url: string, body: string, options?: Options): Promise<Response>;
    static send(method: (Method | string), url: string, body: string, options?: Options): Promise<Response>;
    static send<T>(method: (Method | string), url: string, body: string, options?: Options, parser?: Parser<T>): Promise<ProcessedResponse<T>>;
    static options(url: string, options?: Options): Promise<Response>;
    static head(url: string, options?: Options): Promise<Response>;
    static get(url: string, options?: Options): Promise<Response>;
    static post(url: string, body: string, options?: Options): Promise<Response>;
    static post<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<ProcessedResponse<T>>;
    static put(url: string, body: string, options?: Options): Promise<Response>;
    static patch(url: string, body: string, options?: Options): Promise<Response>;
    static delete(url: string, body: string, options?: Options): Promise<Response>;
}
export declare class Util {
    static setAcceptHeader(accept: string, requestOptions: Options): Options;
    static setContentTypeHeader(contentType: string, requestOptions: Options): Options;
    static setIfMatchHeader(etag: string, requestOptions: Options): Options;
    static setPreferredInteractionModel(interactionModelURI: string, requestOptions: Options): Options;
}
