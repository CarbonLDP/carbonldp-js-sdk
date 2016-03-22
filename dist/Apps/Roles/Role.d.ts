import * as Document from "./../../Document";
import * as ObjectSchema from "./../../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    name: string;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string): Class;
    static createFrom<T extends Object>(object: T, name: string): T & Class;
}
export default Class;
