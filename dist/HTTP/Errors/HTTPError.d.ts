import { AbstractError } from "../../Errors/AbstractError";
import { Response } from "../Response";
export declare class HTTPError extends AbstractError {
    static readonly statusCode: number;
    readonly name: string;
    response: Response;
    constructor(message: string, response: Response);
}
