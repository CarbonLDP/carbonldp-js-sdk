import HTTPError from "./../HTTPError";
declare class InternalServerErrorError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default InternalServerErrorError;
