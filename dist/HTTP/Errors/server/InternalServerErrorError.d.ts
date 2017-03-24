import HTTPError from "./../HTTPError";
import Response from "./../../Response";
export declare class InternalServerErrorError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
    constructor(message: string, response: Response);
}
export default InternalServerErrorError;
