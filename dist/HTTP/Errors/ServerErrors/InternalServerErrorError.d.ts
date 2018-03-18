import { HTTPError } from "../HTTPError";
export declare class InternalServerErrorError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default InternalServerErrorError;
