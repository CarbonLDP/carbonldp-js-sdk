import HTTPError from "./../HTTPError";
declare class BadGatewayError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default BadGatewayError;
