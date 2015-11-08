import RESTError from './../HTTPError';
declare class NotImplementedError extends RESTError {
    static statusCode: number;
    name: string;
}
export default NotImplementedError;
