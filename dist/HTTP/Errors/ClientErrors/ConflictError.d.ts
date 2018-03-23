import { HTTPError } from "../HTTPError";
export declare class ConflictError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
