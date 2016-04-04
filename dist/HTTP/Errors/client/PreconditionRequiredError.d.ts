import HTTPError from "./../HTTPError";
declare class PreconditionRequiredError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default PreconditionRequiredError;
