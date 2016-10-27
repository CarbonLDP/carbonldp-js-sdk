import HTTPError from "./../HTTPError";
declare class NotFoundError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default NotFoundError;
