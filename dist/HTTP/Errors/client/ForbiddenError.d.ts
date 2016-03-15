import HTTPError from "./../HTTPError";
declare class ForbiddenError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default ForbiddenError;
