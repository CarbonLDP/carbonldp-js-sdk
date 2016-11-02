import HTTPError from "./../HTTPError";
declare class MethodNotAllowedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default MethodNotAllowedError;
