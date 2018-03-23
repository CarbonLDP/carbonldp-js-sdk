import { HTTPError } from "../HTTPError";
export declare class PreconditionRequiredError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
