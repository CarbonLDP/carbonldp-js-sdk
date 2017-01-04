import HTTPError from "./../HTTPError";
import Response from "./../../Response";
declare class NotAcceptableError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
    constructor(message: string, response: Response);
}
export default NotAcceptableError;
