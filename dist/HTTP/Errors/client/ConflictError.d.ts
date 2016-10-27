import HTTPError from "./../HTTPError";
declare class ConflictError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default ConflictError;
