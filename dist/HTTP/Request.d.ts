/// <reference types="node" />
import { Header } from "./Header";
import { HTTPMethod } from "./HTTPMethod";
import { Parser } from "./Parser";
import { Response } from "./Response";
export interface RequestOptions {
    headers?: Map<string, Header>;
    sendCredentialsOnCORS?: boolean;
    timeout?: number;
    request?: XMLHttpRequest;
}
export interface GETOptions extends RequestOptions {
    ensureLatest?: boolean;
}
export interface RetrievalPreferences {
    include?: string[];
    omit?: string[];
}
export declare class RequestService {
    private static defaultOptions;
    static send(method: (HTTPMethod | string), url: string, options?: RequestOptions): Promise<Response>;
    static send(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: RequestOptions): Promise<Response>;
    static send(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: RequestOptions): Promise<Response>;
    static send<T>(method: (HTTPMethod | string), url: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static send<T>(method: (HTTPMethod | string), url: string, body: string | Blob | Buffer, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static options(url: string, options?: RequestOptions): Promise<Response>;
    static head(url: string, options?: RequestOptions): Promise<Response>;
    static get(url: string, options?: RequestOptions): Promise<Response>;
    static get<T>(url: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: Buffer, options?: RequestOptions): Promise<Response>;
    static post<T>(url: string, body: Buffer, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: Blob, options?: RequestOptions): Promise<Response>;
    static post<T>(url: string, body: Blob, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static post(url: string, body: string, options?: RequestOptions): Promise<Response>;
    static post<T>(url: string, body: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static put(url: string, body: string, options?: RequestOptions): Promise<Response>;
    static put<T>(url: string, body: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static patch(url: string, body: string, options?: RequestOptions): Promise<Response>;
    static patch<T>(url: string, body: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static delete(url: string, options?: RequestOptions): Promise<Response>;
    static delete(url: string, body: string, options?: RequestOptions): Promise<Response>;
    static delete<T>(url: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    static delete<T>(url: string, body: string, options?: RequestOptions, parser?: Parser<T>): Promise<[T, Response]>;
    private static _handleGETResponse;
    private static _contentTypeIsAccepted;
    private static _setNoCacheHeaders;
    private static _isChromiumAgent;
    private static _setFalseETag;
}
export declare class RequestUtils {
    static getHeader(headerName: string, requestOptions: RequestOptions, initialize?: boolean): Header;
    static setAcceptHeader(accept: string, requestOptions: RequestOptions): RequestOptions;
    static setContentTypeHeader(contentType: string, requestOptions: RequestOptions): RequestOptions;
    static setIfMatchHeader(eTag: string, requestOptions: RequestOptions): RequestOptions;
    static setIfNoneMatchHeader(eTag: string, requestOptions: RequestOptions): RequestOptions;
    static setPreferredInteractionModel(interactionModelURI: string, requestOptions: RequestOptions): RequestOptions;
    static setPreferredRetrieval(retrievalType: "representation" | "minimal", requestOptions: RequestOptions): RequestOptions;
    static setRetrievalPreferences(preferences: RetrievalPreferences, requestOptions: RequestOptions): RequestOptions;
    static setSlug(slug: string, requestOptions: RequestOptions): RequestOptions;
    static isOptions(object: Object): object is RequestOptions;
    static cloneOptions(options: RequestOptions): RequestOptions;
}
