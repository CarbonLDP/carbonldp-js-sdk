import RESTError from './../HTTPError';
declare class RequestEntityTooLargeError extends RESTError {
    static statusCode: number;
    name: string;
}
export default RequestEntityTooLargeError;
