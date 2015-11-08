import RESTError from './../HTTPError';
declare class ForbiddenError extends RESTError {
    static statusCode: number;
    name: string;
}
export default ForbiddenError;
