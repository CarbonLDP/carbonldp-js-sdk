import HTTPError from "./../HTTPError";
declare class NotImplementedError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default NotImplementedError;
