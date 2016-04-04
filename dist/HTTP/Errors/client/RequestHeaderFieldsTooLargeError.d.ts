import HTTPError from "./../HTTPError";
declare class RequestHeaderFieldsTooLargeError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default RequestHeaderFieldsTooLargeError;
