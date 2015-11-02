import RESTError from './../HTTPError';
declare class ConflictError extends RESTError {
    static statusCode: number;
    name: string;
}
export default ConflictError;
