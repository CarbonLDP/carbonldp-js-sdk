import { HTTPError } from "../HTTPError";
export declare class BadGatewayError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
