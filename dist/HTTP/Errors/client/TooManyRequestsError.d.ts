import HTTPError from "./../HTTPError";
declare class TooManyRequestsError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default TooManyRequestsError;
