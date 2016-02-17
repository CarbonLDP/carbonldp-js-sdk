import HTTPError from "./../HTTPError";
declare class NotAcceptableError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default NotAcceptableError;
