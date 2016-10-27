import HTTPError from "./../HTTPError";
declare class BadGatewayError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default BadGatewayError;
