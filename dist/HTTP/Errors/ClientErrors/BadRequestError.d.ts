import { HTTPError } from "../HTTPError";
export declare class BadRequestError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default BadRequestError;
