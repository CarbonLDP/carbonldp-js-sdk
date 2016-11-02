import HTTPError from "./../HTTPError";
declare class RequestHeaderFieldsTooLargeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default RequestHeaderFieldsTooLargeError;
