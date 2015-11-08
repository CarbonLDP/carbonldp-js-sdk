import RESTError from './../HTTPError';
declare class RequestURITooLongError extends RESTError {
    static statusCode: number;
    name: string;
}
export default RequestURITooLongError;
