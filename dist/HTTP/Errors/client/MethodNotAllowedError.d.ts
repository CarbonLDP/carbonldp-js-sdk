import HTTPError from "./../HTTPError";
declare class MethodNotAllowedError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default MethodNotAllowedError;
