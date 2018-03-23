import { HTTPError } from "../HTTPError";
export declare class MethodNotAllowedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
