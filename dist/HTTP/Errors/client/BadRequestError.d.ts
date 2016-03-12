import HTTPError from "./../HTTPError";
declare class BadRequestError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default BadRequestError;
