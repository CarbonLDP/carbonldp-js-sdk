import { HTTPError } from "../HTTPError";
export declare class BadResponseError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
