import { HTTPError } from "../HTTPError";
export declare class RequestURITooLongError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
