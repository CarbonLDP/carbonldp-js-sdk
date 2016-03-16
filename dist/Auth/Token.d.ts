import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import Credentials from "./Credentials";
export declare const RDF_CLASS: string;
export declare const CONTEXT: ObjectSchema.Class;
export interface Class extends Pointer.Class, Credentials {
    key: string;
    expirationTime: Date;
}
export declare class Factory {
    static is(value: any): boolean;
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
    static hasRDFClass(pointer: Pointer.Class): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
}
export default Class;
