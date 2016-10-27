import HTTPError from "./../HTTPError";
declare class UnsupportedMediaTypeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default UnsupportedMediaTypeError;
