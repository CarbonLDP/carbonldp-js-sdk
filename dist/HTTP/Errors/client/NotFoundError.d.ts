import HTTPError from "./../HTTPError";
declare class NotFoundError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default NotFoundError;
