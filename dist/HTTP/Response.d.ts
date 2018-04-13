/// <reference types="node" />
import { ClientRequest, IncomingMessage } from "http";
import { Header } from "./Header";
export declare class Response {
    readonly status: number;
    readonly data: string;
    readonly headers: Map<string, Header>;
    readonly request: XMLHttpRequest | ClientRequest;
    constructor(request: XMLHttpRequest);
    constructor(request: ClientRequest, data: string, response?: IncomingMessage);
    getHeader(name: string): Header;
    getETag(): string;
}
