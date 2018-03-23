import { HTTPError } from "../HTTPError";
export declare class NotFoundError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
