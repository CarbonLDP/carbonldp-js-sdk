import HTTPError from "./../HTTPError";
declare class RequestEntityTooLargeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default RequestEntityTooLargeError;
