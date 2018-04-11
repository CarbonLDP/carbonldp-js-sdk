import { HTTPError } from "../HTTPError";
export declare class NotImplementedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
