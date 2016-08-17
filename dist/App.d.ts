import * as Document from "./Document";
import * as ObjectSchema from "./ObjectSchema";
import Pointer from "./Pointer";
import * as Role from "./App/Role";
import * as Roles from "./App/Roles";
import Context from "./App/Context";
export interface Class extends Document.Class {
    name: string;
    description?: string;
    allowsOrigins?: (Pointer | string)[];
}
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(name: string, description?: string): Class;
    static createFrom<T extends Object>(object: T, name: string, description?: string): T & Class;
}
export { Context, Role, Roles };
export default Class;
