import * as Fragment from "./../Fragment";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Fragment.Class {
    granting: boolean;
    permissions: Pointer.Class[];
    subjects: Pointer.Class[];
    subjectsClass: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static createFrom<T extends Object>(object: T, granting: boolean, subjects: Pointer.Class[], subjectClass: Pointer.Class, permissions: Pointer.Class[]): T & Class;
}
export default Class;
