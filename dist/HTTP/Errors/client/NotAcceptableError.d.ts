import RESTError from './../HTTPError';
declare class MethodNotAcceptableError extends RESTError {
    static statusCode: number;
    name: string;
}
export default MethodNotAcceptableError;
