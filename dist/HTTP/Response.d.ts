import * as Header from "./Header";
import { ClientRequest } from "http";
export declare class Class {
    constructor(request: XMLHttpRequest);
    constructor(request: ClientRequest, data: string);
    status: number;
    data: string;
    headers: Map<string, Header.Class>;
    request: XMLHttpRequest | ClientRequest;
    getHeader(name: string): Header.Class;
    private setHeaders(headersString);
    private setHeaders(headerObject);
}
export declare class Util {
    static getETag(response: Class): string;
}
export default Class;
