import * as ObjectSchema from "./../ObjectSchema";
import * as DocumentMetadata from "./DocumentMetadata";
import * as VolatileResource from "./VolatileResource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    documentsMetadata: DocumentMetadata.Class[];
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
