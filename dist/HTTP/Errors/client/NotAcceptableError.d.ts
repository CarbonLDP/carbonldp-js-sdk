import HTTPError from "./../HTTPError";
declare class NotAcceptableError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default NotAcceptableError;
