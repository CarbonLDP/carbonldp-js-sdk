import RESTError from "./../HTTPError";
declare class MethodNotAllowedError extends RESTError {
    static statusCode: number;
    name: string;
}
export default MethodNotAllowedError;
