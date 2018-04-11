import { HTTPError } from "../HTTPError";
export declare class UnauthorizedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
