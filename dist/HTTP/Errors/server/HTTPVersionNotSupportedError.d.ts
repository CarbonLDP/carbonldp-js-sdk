import HTTPError from "./../HTTPError";
declare class HTTPVersionNotSupportedError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default HTTPVersionNotSupportedError;
