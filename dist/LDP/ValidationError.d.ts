import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
export interface ValidationError extends TransientResource {
    errorDetails: Pointer;
}
export interface ValidationErrorFactory extends ModelFactory<ValidationError> {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ValidationError: ValidationErrorFactory;
