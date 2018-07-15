import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface ValidationResult extends Resource {
    focusNode: Pointer;
    resultPath?: Pointer;
    value?: any;
    sourceShape?: Pointer;
    sourceConstraintComponent?: Pointer;
    detail?: Pointer;
    resultMessage?: string;
    resultSeverity?: Pointer;
}
export interface ValidationResultFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ValidationResult: ValidationResultFactory;
