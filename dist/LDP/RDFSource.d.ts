import * as Document from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    created: Date;
    modified: Date;
    defaultInteractionModel: Pointer.Class;
    accessPoints: Pointer.Class[];
    accessControlList: Pointer.Class;
}
export default Class;
