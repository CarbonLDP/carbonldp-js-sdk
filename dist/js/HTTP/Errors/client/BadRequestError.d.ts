import RESTError from "./../HTTPError";
declare class BadRequestError extends RESTError {
    static statusCode: number;
    name: string;
}
export default BadRequestError;
