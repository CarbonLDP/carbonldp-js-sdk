import { HTTPError } from "./../HTTPError";
export declare class HTTPVersionNotSupportedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
