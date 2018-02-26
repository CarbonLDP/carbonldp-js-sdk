/// <reference types="node" />
import { ClientRequest, IncomingMessage } from "http";
import * as Header from "./Header";
export declare class Class {
    status: number;
    data: string;
    headers: Map<string, Header.Class>;
    request: XMLHttpRequest | ClientRequest;
    constructor(request: XMLHttpRequest);
    constructor(request: ClientRequest, data: string, response?: IncomingMessage);
    getHeader(name: string): Header.Class;
    private setHeaders(headersString);
    private setHeaders(headerObject);
}
export declare class Util {
    static getETag(response: Class): string;
}
export default Class;
