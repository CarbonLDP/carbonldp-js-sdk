import RESTError from './../HTTPError';
declare class PreconditionFailedError extends RESTError {
    static statusCode: number;
    name: string;
}
export default PreconditionFailedError;
