import * as Header from "./Header";
declare class Response {
    constructor(request: XMLHttpRequest);
    status: number;
    data: string;
    headers: Map<string, Header.Class>;
    request: XMLHttpRequest;
    private setHeaders(request);
}
export default Response;
