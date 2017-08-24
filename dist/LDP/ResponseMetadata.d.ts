import * as ObjectSchema from "./../ObjectSchema";
import { Class as BNodesMapping } from "./BNodesMapping";
import * as ResourceMetadata from "./ResourceMetadata";
import * as VolatileResource from "./VolatileResource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    resourcesMetadata?: ResourceMetadata.Class[];
    bNodesMapping?: BNodesMapping;
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
