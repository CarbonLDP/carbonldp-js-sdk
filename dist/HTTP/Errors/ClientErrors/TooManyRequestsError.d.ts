import { HTTPError } from "../HTTPError";
export declare class TooManyRequestsError extends HTTPError {
    static readonly statusCode: number;
    readonly name: string;
}
export default TooManyRequestsError;
