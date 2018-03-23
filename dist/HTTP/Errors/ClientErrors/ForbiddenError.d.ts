import { HTTPError } from "../HTTPError";
export declare class ForbiddenError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
