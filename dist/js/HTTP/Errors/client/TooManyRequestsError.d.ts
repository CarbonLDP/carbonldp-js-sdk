import RESTError from './../HTTPError';
declare class TooManyRequestsError extends RESTError {
    static statusCode: number;
    name: string;
}
export default TooManyRequestsError;
