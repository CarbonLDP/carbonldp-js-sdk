import HTTPError from "./../HTTPError";
declare class UnauthorizedError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default UnauthorizedError;
