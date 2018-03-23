import { HTTPError } from "../HTTPError";
export declare class NotAcceptableError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
