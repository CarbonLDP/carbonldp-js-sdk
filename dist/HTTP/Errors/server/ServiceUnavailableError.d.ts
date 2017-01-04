import HTTPError from "./../HTTPError";
import Response from "./../../Response";
declare class ServiceUnavailableError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
    constructor(message: string, response: Response);
}
export default ServiceUnavailableError;
