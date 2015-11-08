import RESTError from './../HTTPError';
declare class NotFoundError extends RESTError {
    static statusCode: number;
    name: string;
}
export default NotFoundError;
