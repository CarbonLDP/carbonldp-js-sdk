import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    focusNode: Pointer;
    resultPath?: Pointer;
    value?: any;
    sourceShape?: Pointer;
    sourceConstraintComponent?: Pointer;
    detail?: Pointer;
    resultMessage?: string;
    resultSeverity?: Pointer;
}
export default Class;
