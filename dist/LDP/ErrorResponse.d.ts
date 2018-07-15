import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import { Error } from "./Error";
export interface ErrorResponse extends Resource {
    errors: Error[];
    requestID: string;
    statusCode: number;
}
export interface ErrorResponseFactory extends ModelSchema {
    TYPE: C["ErrorResponse"];
    SCHEMA: ObjectSchema;
    is(value: any): value is ErrorResponse;
    getMessage(errorResponse: ErrorResponse): string;
}
export declare const ErrorResponse: ErrorResponseFactory;
