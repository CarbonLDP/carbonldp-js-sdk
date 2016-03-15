import HTTPError from "./../HTTPError";
declare class RequestURITooLongError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default RequestURITooLongError;
