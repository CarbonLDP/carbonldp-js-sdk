/// <reference types="node" />
import { Header } from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import Parser from "./Parser";
import Response from "./Response";
export interface Options {
    headers?: Map<string, Header>;
    sendCredentialsOnCORS?: boolean;
    timeout?: number;
    request?: XMLHttpRequest;
}
export interface GETOptions extends Options {
    ensureLatest?: boolean;
}
export interface RetrievalPreferences {
    include?: string[];
    omit?: string[];
}
export declare class Service {
    private static defaultOptions;
    static send(method: (HTTPMethod | string), url: string, options?: Options): Promise<Response>;
    static send(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: Options): Promise<Response>;
    static send(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: Options): Promise<Response>;
    static send<T>(method: (HTTPMethod | string), url: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static send<T>(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static options(url: string, options?: Options): Promise<Response>;
    static head(url: string, options?: Options): Promise<Response>;
    static get(url: string, options?: Options): Promise<Response>;
    static get<T>(url: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: Buffer, options?: Options): Promise<Response>;
    static post<T>(url: string, body: Buffer, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: Blob, options?: Options): Promise<Response>;
    static post<T>(url: string, body: Blob, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: string, options?: Options): Promise<Response>;
    static post<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static put(url: string, body: string, options?: Options): Promise<Response>;
    static put<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static patch(url: string, body: string, options?: Options): Promise<Response>;
    static patch<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static delete(url: string, options?: Options): Promise<Response>;
    static delete(url: string, body: string, options?: Options): Promise<Response>;
    static delete<T>(url: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    static delete<T>(url: string, body: string, options?: Options, parser?: Parser<T>): Promise<[T, Response]>;
    private static _handleGETResponse(url, requestOptions, response);
    private static _contentTypeIsAccepted(requestOptions, response);
    private static _setNoCacheHeaders(requestOptions);
    private static _isChromiumAgent();
    private static _setFalseETag(requestOptions);
}
export declare class Util {
    static getHeader(headerName: string, requestOptions: Options, initialize?: boolean): Header;
    static setAcceptHeader(accept: string, requestOptions: Options): Options;
    static setContentTypeHeader(contentType: string, requestOptions: Options): Options;
    static setIfMatchHeader(eTag: string, requestOptions: Options): Options;
    static setIfNoneMatchHeader(eTag: string, requestOptions: Options): Options;
    static setPreferredInteractionModel(interactionModelURI: string, requestOptions: Options): Options;
    static setPreferredRetrieval(retrievalType: "representation" | "minimal", requestOptions: Options): Options;
    static setRetrievalPreferences(preferences: RetrievalPreferences, requestOptions: Options, returnRepresentation?: boolean): Options;
    static setSlug(slug: string, requestOptions: Options): Options;
    static isOptions(object: Object): object is Options;
    static cloneOptions(options: Options): Options;
}
