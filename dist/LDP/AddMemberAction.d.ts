import * as Document from "./../Document";
import * as Fragment from "./../Fragment";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Fragment.Class {
    targetMember: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static createDocument(targetMember: Pointer.Class): Document.Class;
}
export default Class;
