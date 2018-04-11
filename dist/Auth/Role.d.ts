import { Document } from "../Document";
import * as ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Document {
    name: string;
    description?: string;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string, description?: string): Class;
    static createFrom<T extends object>(object: T, name: string, description?: string): T & Class;
}
export default Class;
