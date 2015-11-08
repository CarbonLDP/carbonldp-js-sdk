import RESTError from './../HTTPError';
declare class UnsupportedMediaTypeError extends RESTError {
    static statusCode: number;
    name: string;
}
export default UnsupportedMediaTypeError;
