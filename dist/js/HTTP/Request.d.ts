/// <reference path="../../typings/typings.d.ts" />
import * as Header from "./Header";
import Method from "./Method";
import Parser from "./Parser";
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
    static send<T>(method: (Method | string), url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static options(url: string, options?: Options): Promise<Response>;
    static head(url: string, options?: Options): Promise<Response>;
    static get(url: string, options?: Options): Promise<Response>;
    static get<T>(url: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: string, options?: Options): Promise<Response>;
    static post<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static put(url: string, body: string, options?: Options): Promise<Response>;
    static put<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static patch(url: string, body: string, options?: Options): Promise<Response>;
    static patch<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static delete(url: string, body: string, options?: Options): Promise<Response>;
    static delete<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
}
export declare class Util {
    static getHeader(headerName: string, requestOptions: Options): Options;
    static setAcceptHeader(accept: string, requestOptions: Options): Options;
    static setContentTypeHeader(contentType: string, requestOptions: Options): Options;
    static setIfMatchHeader(etag: string, requestOptions: Options): Options;
    static setPreferredInteractionModel(interactionModelURI: string, requestOptions: Options): Options;
    static setSlug(slug: string, requestOptions: Options): Options;
    static addPreference(preference: string, requestOptions: Options): Options;
}
