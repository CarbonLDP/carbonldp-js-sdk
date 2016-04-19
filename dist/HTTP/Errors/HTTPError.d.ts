import AbstractError from "./../../Errors/AbstractError";
import Response from "./../Response";
import ErrorResponse from "./../../LDP/ErrorResponse";
declare class HTTPError extends AbstractError {
    static statusCode: number;
    name: string;
    response: Response;
    errorResponse: ErrorResponse;
    constructor(message: string, response: Response);
}
export default HTTPError;
