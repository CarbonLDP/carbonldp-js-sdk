import HTTPError from "./../HTTPError";
declare class UnsupportedMediaTypeError extends HTTPError {
    static statusCode: number;
    name: string;
}
export default UnsupportedMediaTypeError;
