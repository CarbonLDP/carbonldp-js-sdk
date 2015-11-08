import RESTError from './../HTTPError';
declare class PreconditionRequiredError extends RESTError {
    static statusCode: number;
    name: string;
}
export default PreconditionRequiredError;
