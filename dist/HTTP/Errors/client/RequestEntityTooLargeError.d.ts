import HTTPError from "./../HTTPError";
declare class RequestEntityTooLargeError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default RequestEntityTooLargeError;
