import * as VolatileResource from "./../LDP/VolatileResource";
import * as ObjectSchema from "./../ObjectSchema";
import { PersistedDocument } from "./../PersistedDocument";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends VolatileResource.Class, PersistedDocument {
    version: string;
    buildDate: Date;
}
export default Class;
