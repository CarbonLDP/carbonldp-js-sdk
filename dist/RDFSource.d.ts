import * as Document from "./Document";
import ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema;
export interface Class extends Document.Class {
    defaultInteractionModel: Pointer.Class;
    accessPoints: Pointer.Class[];
    accessControlList: Pointer.Class;
}
