import RESTError from './../HTTPError';
declare class RequestHeaderFieldsTooLargeError extends RESTError {
    static statusCode: number;
    name: string;
}
export default RequestHeaderFieldsTooLargeError;
