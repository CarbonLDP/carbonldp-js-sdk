import HTTPError from "./../HTTPError";
declare class HTTPVersionNotSupportedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default HTTPVersionNotSupportedError;
