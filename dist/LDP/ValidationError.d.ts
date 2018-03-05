import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface ValidationError extends Resource {
    errorDetails: Pointer;
}
export interface ValidationErrorConstant extends ModelFactory<ValidationError> {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ValidationError: ValidationErrorConstant;
export default ValidationError;
