import HTTPError from "./../HTTPError";
declare class PreconditionFailedError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default PreconditionFailedError;
