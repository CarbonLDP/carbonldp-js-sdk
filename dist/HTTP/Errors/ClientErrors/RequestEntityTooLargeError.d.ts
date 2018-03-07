import { HTTPError } from "../HTTPError";
export declare class RequestEntityTooLargeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
