import { HTTPError } from "../HTTPError";
export declare class RequestHeaderFieldsTooLargeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
