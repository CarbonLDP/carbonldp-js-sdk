import HTTPError from "./../HTTPError";
declare class InternalServerError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default InternalServerError;
