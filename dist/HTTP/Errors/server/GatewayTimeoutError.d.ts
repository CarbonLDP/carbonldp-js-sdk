import HTTPError from "./../HTTPError";
declare class GatewayTimeoutError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default GatewayTimeoutError;
