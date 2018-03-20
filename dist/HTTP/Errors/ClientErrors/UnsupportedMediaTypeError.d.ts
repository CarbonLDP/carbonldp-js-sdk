import { HTTPError } from "../HTTPError";
export declare class UnsupportedMediaTypeError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
