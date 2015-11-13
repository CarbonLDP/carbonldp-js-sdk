import HTTPError from "./../HTTPError";
declare class MethodNotAcceptableError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default MethodNotAcceptableError;
