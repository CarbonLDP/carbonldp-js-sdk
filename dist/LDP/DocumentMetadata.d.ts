import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as VolatileResource from "./VolatileResource";
import * as Map from "./Map";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    resource: Pointer.Class;
    eTag?: string;
    bNodesMap?: Map.Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
}
export default Class;
