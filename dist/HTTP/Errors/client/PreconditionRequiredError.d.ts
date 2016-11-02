import HTTPError from "./../HTTPError";
declare class PreconditionRequiredError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default PreconditionRequiredError;
