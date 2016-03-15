import HTTPError from "./../HTTPError";
declare class PreconditionFailedError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default PreconditionFailedError;
