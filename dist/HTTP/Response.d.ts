/// <reference types="node" />
import { ClientRequest, IncomingMessage } from "http";
import { Header } from "./Header";
export declare class Class {
    status: number;
    data: string;
    headers: Map<string, Header>;
    request: XMLHttpRequest | ClientRequest;
    constructor(request: XMLHttpRequest);
    constructor(request: ClientRequest, data: string, response?: IncomingMessage);
    getHeader(name: string): Header;
    private setHeaders(headersString);
    private setHeaders(headerObject);
}
export declare class Util {
    static getETag(response: Class): string;
}
export default Class;
