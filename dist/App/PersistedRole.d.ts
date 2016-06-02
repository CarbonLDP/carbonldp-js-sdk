import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Role from "./../Auth/Role";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Role.Class {
    parentRole?: Pointer.Class;
    childRoles?: Pointer.Class[];
    agents?: Pointer.Class[];
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string): Class;
    static createFrom<T extends Object>(object: T, name: string): T & Class;
}
export default Class;
