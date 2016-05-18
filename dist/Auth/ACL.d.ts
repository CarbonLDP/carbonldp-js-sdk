import * as ACE from "./ACE";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends PersistedDocument.Class {
    accessTo: Pointer.Class;
    accessControlEntries?: ACE.Class[];
    inheritableEntries?: ACE.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(document: T): T & Class;
}
export default Class;
