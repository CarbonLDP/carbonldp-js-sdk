import { HTTPError } from "../HTTPError";
export declare class ServiceUnavailableError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
