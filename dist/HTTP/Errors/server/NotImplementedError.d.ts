import HTTPError from "./../HTTPError";
declare class NotImplementedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default NotImplementedError;
