import * as Header from "./Header";
export declare class Class {
    constructor(request: XMLHttpRequest);
    status: number;
    data: string;
    headers: Map<string, Header.Class>;
    request: XMLHttpRequest;
    private setHeaders(request);
}
export declare class Util {
    static getETag(response: Class): string;
}
export default Class;
