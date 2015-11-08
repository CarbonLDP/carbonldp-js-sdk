import RESTError from './../HTTPError';
declare class UnauthorizedError extends RESTError {
    static statusCode: number;
    name: string;
}
export default UnauthorizedError;
