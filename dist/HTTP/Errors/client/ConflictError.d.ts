import HTTPError from "./../HTTPError";
declare class ConflictError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default ConflictError;
