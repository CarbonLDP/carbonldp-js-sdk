import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies";
export interface ValidationError extends TransientResource {
    errorDetails: Pointer;
}
export interface ValidationErrorFactory extends ModelSchema {
    TYPE: C["ValidationError"];
    SCHEMA: ObjectSchema;
}
export declare const ValidationError: ValidationErrorFactory;
