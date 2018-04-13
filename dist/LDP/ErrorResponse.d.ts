import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { Error } from "./Error";
export interface ErrorResponse extends Resource {
    errors: Error[];
    requestID: string;
    statusCode: number;
}
export interface ErrorResponseFactory extends ModelFactory<ErrorResponse> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    getMessage(errorResponse: ErrorResponse): string;
}
export declare const ErrorResponse: ErrorResponseFactory;
