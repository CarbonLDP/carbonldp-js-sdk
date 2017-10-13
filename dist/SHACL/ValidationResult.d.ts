import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    focusNode: Pointer.Class;
    resultPath?: Pointer.Class;
    value?: any;
    sourceShape?: Pointer.Class;
    sourceConstraintComponent?: Pointer.Class;
    detail?: Pointer.Class;
    resultMessage?: string;
    resultSeverity?: Pointer.Class;
}
export default Class;
