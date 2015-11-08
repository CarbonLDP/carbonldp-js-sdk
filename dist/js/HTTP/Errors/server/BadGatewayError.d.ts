import RESTError from './../HTTPError';
declare class BadGatewayError extends RESTError {
    static statusCode: number;
    name: string;
}
export default BadGatewayError;
