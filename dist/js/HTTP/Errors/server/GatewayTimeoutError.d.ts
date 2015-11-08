import RESTError from './../HTTPError';
declare class GatewayTimeoutError extends RESTError {
    static statusCode: number;
    name: string;
}
export default GatewayTimeoutError;
