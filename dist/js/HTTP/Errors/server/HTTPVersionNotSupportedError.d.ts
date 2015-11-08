import RESTError from './../HTTPError';
declare class HTTPVersionNotSupportedError extends RESTError {
    static statusCode: number;
    name: string;
}
export default HTTPVersionNotSupportedError;
