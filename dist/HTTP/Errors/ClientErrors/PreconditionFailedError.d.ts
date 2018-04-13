import { HTTPError } from "../HTTPError";
export declare class PreconditionFailedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
