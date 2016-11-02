import HTTPError from "./../HTTPError";
declare class UnauthorizedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default UnauthorizedError;
