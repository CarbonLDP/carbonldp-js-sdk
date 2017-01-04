import * as ObjectSchema from "./../ObjectSchema";
import * as Role from "./../Auth/Role";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Role.Class {
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string, description?: string): Class;
    static createFrom<T extends Object>(object: T, name: string, description?: string): T & Class;
}
export default Class;
