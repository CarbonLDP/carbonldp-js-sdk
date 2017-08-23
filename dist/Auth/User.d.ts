import * as Document from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    name: string;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
}
export default Class;
