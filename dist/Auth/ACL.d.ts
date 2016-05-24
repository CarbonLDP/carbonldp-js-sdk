import * as ACE from "./ACE";
import * as ObjectSchema from "./../ObjectSchema";
import * as Document from "./../Document";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    accessTo: Pointer.Class;
    accessControlEntries?: ACE.Class[];
    inheritableEntries?: ACE.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
