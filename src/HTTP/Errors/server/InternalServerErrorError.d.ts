import RESTError from './../HTTPError';
declare class InternalServerError extends RESTError {
    static statusCode: number;
    name: string;
}
export default InternalServerError;
