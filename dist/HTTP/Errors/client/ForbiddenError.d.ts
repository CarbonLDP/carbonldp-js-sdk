import HTTPError from "./../HTTPError";
declare class ForbiddenError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default ForbiddenError;
