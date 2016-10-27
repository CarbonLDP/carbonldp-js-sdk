import HTTPError from "./../HTTPError";
declare class GatewayTimeoutError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default GatewayTimeoutError;
