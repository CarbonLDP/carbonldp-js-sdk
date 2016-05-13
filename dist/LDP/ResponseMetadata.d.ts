import * as ObjectSchema from "./../ObjectSchema";
import * as ResourceMetadata from "./ResourceMetadata";
import * as VolatileResource from "./VolatileResource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    resourcesMetadata: ResourceMetadata.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static hasRDFClass(object: Object): boolean;
}
export default Class;
