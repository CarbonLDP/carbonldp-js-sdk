import * as Document from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    created: Date;
    modified: Date;
}
export declare class Factory {
}
export default Class;
