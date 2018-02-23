import * as Fragment from "./../Fragment";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Fragment.Class {
    granting: boolean;
    permissions: Pointer[];
    subjects: Pointer[];
    subjectsClass: Pointer;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static createFrom<T extends Object>(object: T, granting: boolean, subjects: Pointer[], subjectClass: Pointer, permissions: Pointer[]): T & Class;
}
export default Class;
