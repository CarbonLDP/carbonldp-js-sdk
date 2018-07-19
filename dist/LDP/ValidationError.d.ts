import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Pointer } from "../Pointer/Pointer";
import { Resource } from "../Resource/Resource";
import { C } from "../Vocabularies/C";
export interface ValidationError extends Resource {
    errorDetails: Pointer;
}
export interface ValidationErrorFactory extends ModelSchema {
    TYPE: C["ValidationError"];
    SCHEMA: ObjectSchema;
}
export declare const ValidationError: ValidationErrorFactory;
