import HTTPError from "./../HTTPError";
declare class TooManyRequestsError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default TooManyRequestsError;
