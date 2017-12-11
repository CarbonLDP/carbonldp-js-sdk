import * as VolatileResource from "./../LDP/VolatileResource";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class, PersistedDocument.Class {
    version: string;
    buildDate: Date;
}
export default Class;
