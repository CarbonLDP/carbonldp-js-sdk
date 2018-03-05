import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { CarbonError } from "./CarbonError";
export interface ErrorResponse extends Resource {
    errors: CarbonError[];
    requestID: string;
    statusCode: number;
}
export interface ErrorResponseConstant extends ModelFactory<ErrorResponse> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    getMessage(errorResponse: ErrorResponse): string;
}
export declare const ErrorResponse: ErrorResponseConstant;
export default ErrorResponse;
