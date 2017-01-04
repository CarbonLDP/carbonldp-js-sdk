import * as Document from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document.Class {
    name: string;
    description?: string;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string, description?: string): Class;
    static createFrom<T extends Object>(object: T, name: string, description?: string): T & Class;
}
export default Class;
