import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export declare const CONTEXT: ObjectSchema.Class;
export interface Class extends Pointer.Class {
    key: string;
    expirationTime: Date;
}
export declare class Factory {
    hasClassProperties(object: Object): boolean;
    decorate<T extends Object>(object: T): T & Class;
    hasRDFClass(pointer: Pointer.Class): boolean;
    hasRDFClass(expandedObject: Object): boolean;
}
export declare let factory: Factory;
export default Class;
